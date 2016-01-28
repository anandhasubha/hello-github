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
    closeEditPage: () => void;
}

export class EmployeeEditCtrl implements IEmployeeEditCtrlScope{
    static $inject = ['$location', '$routeParams', 'employeeSrvc', 'ToastrSrvc'];
    public empData: any ={};
    public editDone;
    public closeEditPage;
    public constructor(private $location: ng.ILocationService,
        private $routeParams: any, private employeeSrvc: any, private ToastrSrvc: any) {
        var vm=this; 
        
        vm.empData = angular.copy(employeeSrvc.getEmployee($routeParams.id));

        vm.editDone = function() {
            employeeSrvc.updateEmployee(vm.empData)
            ToastrSrvc.notifySuccess('Employee updated successfully');
            vm.closeEditPage();
        };
       
        vm.closeEditPage = function() {
            $location.path('/employee');
        };
    }
}
employeeModule.controller('employeeEditCtrl', EmployeeEditCtrl);
