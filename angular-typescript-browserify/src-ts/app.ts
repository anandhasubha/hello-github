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

var jQuery = require('../assets/libs/jquery.js');
require('../assets/libs/angular.js');
require('../assets/libs/angular-route.js');
require('./config/appConstant');
require('./shared/toastrSrvc');
require('./components/employee/employeeSrvc');
require('./components/employee/employeeListCtrl');
require('./components/employee/employeeEditCtrl');
require('./components/employee/employeeAddCtrl');
require('./components/employee/employeeListCtrl');
require('./components/employee/directives/tableDirective'); 

var app = angular.module('angularApp', ['ngRoute', 'ngSanitize',
        'angularApp.config',
        'angularApp.shared',
        'angularApp.employee'
    ]);
export = app;