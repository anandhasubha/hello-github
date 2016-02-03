/**
 *@ngdoc service
 *@name angularApp.employee.employeeSrvc
 *@description
 * <p>
 *  This emulates storing the data a lot like the server would.
 * </p>
 */
interface Employee {
    id?: number
    name: string
    age: number
    address: string
    city: string
    state: string
    postalCode: string
    phone: string
    Action?: string
}

interface EmpData{
    fieldKeyMapping:any,
    recordSet:Employee[]
}

interface IEmployeeSrvc {
    getEmployees: () => any;
    getEmployee: (empID: any) => Employee;
    addEmployee: (newEmp: Employee) => EmpData;
    updateEmployee: (updatedEmp: Employee) => EmpData;
    getEmpList: () => EmpData;
    setEmpList: (empList) => void;
}

export class EmployeeSrvc implements IEmployeeSrvc {
    static $inject = ['$http', '$q', 'appConstant', '$filter', 'cacheSrvc'];

    constructor(public $http: ng.IHttpService,
        private $q: ng.IQService, private appConstant: any,
        private $filter: ng.IFilterService,
        public cacheSrvc: any
    ) { }

    //Retrieve all employees for listing
    getEmployees = () => {
        var self = this;
        var deferred = self.$q.defer();
        var empList = this.getEmpList();

        if (empList !== null && empList !== undefined) {
            deferred.resolve(empList);
        } else {
            self.$http.get(self.appConstant.JSON_EMPLOYEES_LIST)
                .success(function(response: any) {
                    this.setEmpList(response.data);
                    deferred.resolve(response.data);
                })
                .error(function(response: any) {
                    console.error("Error : " + response.msg);
                    deferred.reject(response.msg);
                });
        }
        return deferred.promise;
    };

    //Retrieve on employee for modifying
    getEmployee = (empID) => {
        var empList = this.getEmpList();
        var employee = null;
        if (empList)
            employee = this.$filter('filter')(empList.recordSet, function(record, index) {
                if (record) {
                    return (record.id + '' == empID);
                }
            })[0];
        return employee;
    };
    
    // Add new employee
    addEmployee = (newEmp: Employee) => {
        newEmp.Action = '';
        var empList = this.getEmpList();
        empList.recordSet.push(newEmp);
        this.setEmpList(empList);
        return empList;
    };
    
    //Update employee 
    updateEmployee = (updatedEmp: Employee) => {
        var empList = this.getEmpList();
        var updatedEmpId = -1;
        empList.recordSet.forEach(function(employee, index) {
            if (employee.id == updatedEmp.id) {
                updatedEmpId = index;
            }
        });
        empList.recordSet[updatedEmpId] = updatedEmp;
        this.setEmpList(empList);
        return empList;
    };
    
    //fetch empData from LocalStorage
    getEmpList = () => {
        return this.cacheSrvc.get('empList');
    };
    
    //set empData from LocalStorage
    setEmpList = (empList) => {
        this.cacheSrvc.set('empList', empList);
    };
}
