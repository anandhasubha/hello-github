/**
 *@ngdoc object
 *@name angularApp.employee.employeeeEditCtrl
 *@description
 * <p>
 * Invokes appropriate services to retrieve a particular employee from backend service 
 * and updates the same employee.
 * </p>
 */
import employeeModule = require('./employeeModule');

interface IEmployeeEditCtrlScope {
    empData: any;
    editDone: () => void;
    cancelEdit: () => void;
}

export class EmployeeEditCtrl {
    static $inject = ['$scope', '$location', '$routeParams', 'employeeSrvc', 'ToastrSrvc', 'cacheSrvc'];
    public constructor(public $scope: IEmployeeEditCtrlScope, private $location: ng.ILocationService,
        private $routeParams: any, private employeeSrvc: any, private ToastrSrvc: any, private cacheSrvc: any) {
        $scope.empData = angular.copy(employeeSrvc.getEmployee($routeParams.id));

        $scope.editDone = function() {
            var empList = cacheSrvc.get('empList');
            var updatedEmpId = -1;
            empList.recordSet.forEach(function(employee, index) {
                if (employee.id == $scope.empData.id) {
                    updatedEmpId = index;
                }
            });
            empList.recordSet[updatedEmpId] = $scope.empData;
            cacheSrvc.set('empList', empList);
            ToastrSrvc.notifySuccess('Employee updated successfully');
            closeEditPage();
        };
        $scope.cancelEdit = function() {
            closeEditPage();
        };
        var closeEditPage = function() {
            $location.path('/employee');
        };
    }
}
employeeModule.controller('employeeEditCtrl', EmployeeEditCtrl);
