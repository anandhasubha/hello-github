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

interface IEmployeeAddCtrlScope extends ng.IScope{
    empData: any;
    addDone: () => void;
    cancelAdd: () => void;
}

export class EmployeeAddCtrl {
    static $inject = ['$scope', '$location', '$routeParams', 'employeeSrvc', 'ToastrSrvc','cacheSrvc'];
    public constructor(public $scope: IEmployeeAddCtrlScope
        , private $location: ng.ILocationService
        , private $routeParams: any
        , private employeeSrvc: any
        , private ToastrSrvc: any
        , private cacheSrvc: any) {
        var recordset = employeeSrvc.employeeData.recordSet;
        var id = recordset[recordset.length - 1].id;
        $scope.empData = {
            id:++id
        };
        
        $scope.addDone = function() {
           $scope.empData.Action='';
            recordset.push($scope.empData);
            cacheSrvc.set("empList",employeeSrvc.employeeData)
            ToastrSrvc.notifySuccess('Employee added successfully');
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
employeeModule.controller('employeeAddCtrl', EmployeeAddCtrl);