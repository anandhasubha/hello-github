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
    getEmployees: () => any;
    getEmployee: (empID: any) => any;
}

class EmployeeSrvc implements IEmployeeSrvc {
    static $inject = ['$http', '$q', 'appConstant', '$filter', 'cacheSrvc'];

    constructor(public $http: ng.IHttpService,
        private $q: ng.IQService, private appConstant: any,
        private $filter: ng.IFilterService,
        public cacheSrvc: any
    ) {}

    //Retrieve all employees for listing
    getEmployees = () => {
        var self = this;
        var deferred = self.$q.defer();
        var empList = this.cacheSrvc.get("empList");

        if (empList !== null && empList !== undefined) {
            deferred.resolve(empList);
        } else {
            self.$http.get(self.appConstant.JSON_EMPLOYEES_LIST)
                .success(function(response: any) {
                    self.cacheSrvc.set("empList", response.data);
                    deferred.resolve(response.data);
                })
                .error(function(response: any) {
                    console.error("Error : " + response.msg);
                    deferred.reject(response.msg);
                });
        }
        return deferred.promise;
    }

    //Retrieve on employee for modifying
    getEmployee = (empID) => {
        var empList = this.cacheSrvc.get("empList");
        var employee = null;
        if (empList)
            employee = this.$filter('filter')(empList.recordSet, function(record, index) {
                if (record) {
                    return (record.id + '' == empID);
                }
            })[0];
        return employee;
    }
}

employeeModule.service('employeeSrvc', EmployeeSrvc);
