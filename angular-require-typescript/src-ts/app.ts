/**
 *@ngdoc object
 *@name angularApp
 *@requires angularApp.config
 *@requires angularApp.login
 *@requires angularApp.shared
 *@description
 *<p>
 * Application entry point, organize, initialize, inject dependencies
 * and coordinates the various pieces of application.Loads sub modules
 * and wire them up into the main module. Act as container
 * for all angular managed objects or modules
 * Can be started in mock mode to run without the serving REST apis
 * </p>
 */

///<amd-dependency path="angular"/>
///<amd-dependency path="angular-route"/>
///<amd-dependency path="./config/appConstant"/>
///<amd-dependency path="./shared/toastrSrvc"/>
///<amd-dependency path="./components/employee/employeeSrvc"/>
///<amd-dependency path="./components/employee/employeeListCtrl"/>
///<amd-dependency path="./components/employee/employeeEditCtrl"/>
///<amd-dependency path="./components/employee/directives/tableDirective"/>

var app = angular.module('angularApp', ['ngRoute',
        'angularApp.config',
        'angularApp.shared',
        'angularApp.employee'
    ]);
export = app;