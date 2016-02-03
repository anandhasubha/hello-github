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

class EmployeeListCtrl implements IEmployeeListCtrlScope {
    static $inject: Array < string > = ['employeeList'];
    public empData: any;
    public headers: any;
    public tData: any;
    public reverse: boolean;
    public constructor(private employeeList: any) {
        var vm = this;
        vm.reverse = false;

        //Load employee list 
        vm.empData = employeeList;
        vm.headers = vm.empData.fieldKeyMapping;
        vm.tData = vm.empData.recordSet;
    }
}
employeeModule.controller('employeeListCtrl', EmployeeListCtrl);
