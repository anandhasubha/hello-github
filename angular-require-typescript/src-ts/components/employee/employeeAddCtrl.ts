/**
 *@ngdoc object
 *@name angularApp.employee.employeeeAddCtrl
 *@description
 * <p>
 * Invokes appropriate services to retrieve a particular employee from backend service 
 * and updates the same employee.
 * </p>
 */
import employeeModule = require('./employeeModule');

interface IEmployeeAddCtrlScope {
    empData: any;
    addDone: () => void;
    closeAddPage: () => void;
}

export class EmployeeAddCtrl implements IEmployeeAddCtrlScope {
    static $inject: Array < string > = ['$location', '$routeParams', 'employeeSrvc', 'ToastrSrvc'];
    public empData: any = {};
    public addDone;
    public closeAddPage;
    public constructor(private $location: ng.ILocationService,
        private $routeParams: any, private employeeSrvc: any, private ToastrSrvc: any) {
        var vm = this;
        vm.empData = {
            id: (Math.round(Math.random() * 1000))
        }

        vm.addDone = () => {
            employeeSrvc.addEmployee(vm.empData);
            ToastrSrvc.notifySuccess('Employee added successfully');
            vm.closeAddPage();
        };

        vm.closeAddPage = () => {
            $location.path('/employee');
        };
    }
}
employeeModule.controller('employeeAddCtrl', EmployeeAddCtrl);
