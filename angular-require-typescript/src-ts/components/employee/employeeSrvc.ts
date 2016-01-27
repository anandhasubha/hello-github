/**
 *@ngdoc service
 *@name angularApp.employee.employeeSrvc
 *@description
 * <p>
 *  This emulates storing the data a lot like the server would.
 * </p>
 */
import employeeModule = require('./employeeModule');

export interface IEmployeeSrvc {
    employeeData: any;
    getEmployees: () => any;
    getEmployee: (empID: any) => any;
}

class EmployeeSrvc implements IEmployeeSrvc {
    static $inject = ['$http', '$q', 'appConstant', '$filter', 'cacheSrvc'];

    public employeeData: any;

    constructor(public $http: ng.IHttpService,
        private $q: ng.IQService, private appConstant: any,
        private $filter: ng.IFilterService,
        public cacheSrvc: any
        ) {
        this.employeeData = this.cacheSrvc.get("empList");
    }

    //Retrieve all employees for listing
    getEmployees = () => {
        var self = this;
        var deferred = self.$q.defer();
        if (self.employeeData !== null) {
            deferred.resolve(self.employeeData);
        } else {
            self.$http.get(self.appConstant.JSON_EMPLOYEES_LIST)
                .success(function(response: any) {
                    self.cacheSrvc.set("empList",response.data);
                    self.employeeData = self.cacheSrvc.get("empList");
                    deferred.resolve(self.employeeData);
                })
                .error(function(response: any) {
                    console.error("Error : " + response.msg);
                    deferred.reject(self.employeeData);
                });
        }
        return deferred.promise;
    }

    //Retrieve on employee for modifying
    getEmployee = (empID) => {
        var employee = this.$filter('filter')(this.cacheSrvc.get("empList").recordSet, function(record, index) {
            return (record.id + '' == empID);
        })[0];
        return employee;
    }
}

employeeModule.service('employeeSrvc', EmployeeSrvc);
