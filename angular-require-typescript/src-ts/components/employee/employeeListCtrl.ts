/**
*@ngdoc object
*@name angularApp.employee.employeeListCtrl
*@description
* <P>
* Invokes appropriate services to retrieve all employee from backend service 
 * and updates View state via scope.
* </p>
*/

import employeeModule = require('./employeeModule');

export interface IEmployeeListCtrlScope {
    empData: any;
    headers: any;
    tData: any;
    reverse: boolean;
}

class EmployeeListCtrl {
    static $inject = ['$scope', 'employeeList'];
    public constructor(public $scope: IEmployeeListCtrlScope
        , private employeeList: any) {

        $scope.reverse = false;

        //Load employee list 
        $scope.empData = employeeList;
        $scope.headers = $scope.empData.fieldKeyMapping;
        $scope.tData = $scope.empData.recordSet;
    }
}
employeeModule.controller('employeeListCtrl', EmployeeListCtrl);
