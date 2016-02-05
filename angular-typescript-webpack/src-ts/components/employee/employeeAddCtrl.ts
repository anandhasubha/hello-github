/**
 *@ngdoc object
 *@name angularApp.employee.employeeeAddCtrl
 *@description
 * <p>
 * Invokes appropriate services to retrieve a particular employee from backend service 
 * and updates the same employee.
 * </p>
 */
interface IEmployeeAddCtrlScope extends ng.IScope {
    empData: any;
    addDone: () => void;
    cancelAdd: () => void;
}

export class EmployeeAddCtrl {
    static $inject = ['$scope', '$location', '$routeParams', 'employeeSrvc', 'toastrSrvc'];
    public constructor(public $scope: IEmployeeAddCtrlScope, private $location: ng.ILocationService,
        private $routeParams: any, private employeeSrvc: any, private toastrSrvc: any) {
        var newId = Math.max.apply(Math, employeeSrvc.getEmpList().recordSet.map(function(employee) {
            return employee.id;
        }));
        $scope.empData = {
            id: ++newId
        }

        $scope.addDone = function() {
            employeeSrvc.addEmployee($scope.empData);
            toastrSrvc.notifySuccess('Employee added successfully');
            closeAddPage();
        };

        $scope.cancelAdd = function() {
            closeAddPage();
        };

        var closeAddPage = function() {
            $location.path('/employee');
        };
    }
}
