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

interface IEmployeeAddCtrlScope extends ng.IScope {
    empData: any;
    addDone: () => void;
    cancelAdd: () => void;
}

export class EmployeeAddCtrl {
    static $inject = ['$scope', '$location', '$routeParams', 'employeeSrvc', 'ToastrSrvc', 'cacheSrvc'];
    public constructor(public $scope: IEmployeeAddCtrlScope, private $location: ng.ILocationService,
        private $routeParams: any, private employeeSrvc: any, private ToastrSrvc: any, private cacheSrvc: any) {
        var empList = null;
        employeeSrvc.getEmployees().then(function(data) {
            empList = data;

            // var id = recordset[recordset.length - 1].id;
            var employees = empList.recordSet;
            var newId = Math.max.apply(Math, employees.map(function(employee) {
                return employee.id;
            }));

            //Get the new id
            $scope.empData = {
                id: ++newId
            };
        });

        $scope.addDone = function() {
            //Push record in scope
            $scope.empData.Action = '';
            empList.recordSet.push($scope.empData);

            //Update cache
            cacheSrvc.set("empList", empList);
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
