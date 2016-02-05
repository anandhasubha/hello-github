/**
 *@ngdoc object
 *@name angularApp.employee
 *@description
 * <p>
 * Defines an application module "angularApp.employee" at global namespace.
 * This module demonstrates angular's feature and capabilities
 * Features
 * <ul>
 *   <li> Listing employees.</li>
 *   <li> Adding employees.</li>
 *   <li> Updating employees.</li>
 *   <li> Removing employees.</li>
 * </ul>
 * </p>
 */
import employeeSrvc = require('./employeeSrvc');
import employeeListCtrl = require('./employeeListCtrl');
import employeeEditCtrl = require('./employeeEditCtrl');
import employeeAddCtrl = require('./employeeAddCtrl');
import employeeTable = require('./directives/tableDirective');

var employeeModule = angular
        .module('angularApp.employee', []);
employeeModule.service('employeeSrvc', employeeSrvc.EmployeeSrvc);
employeeModule.controller('employeeListCtrl', employeeListCtrl.EmployeeListCtrl);
employeeModule.controller('employeeEditCtrl', employeeEditCtrl.EmployeeEditCtrl);
employeeModule.controller('employeeAddCtrl', employeeAddCtrl.EmployeeAddCtrl);
employeeModule.directive('tableEmployee', employeeTable.EmployeeTable.factory());

export = employeeModule;