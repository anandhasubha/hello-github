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

//Load sub modules
var route = require('./app.routes');
var configModule = require('./config/configModule');
var sharedModule = require('./shared/sharedModule');
var employeeModule = require('./components/employee/employeeModule');

//Init app
var app = angular.module('angularApp', ['ngRoute', 'ngSanitize',
    configModule.name,
    sharedModule.name,
    employeeModule.name
]).config(['$routeProvider', 'appConstant',
    route.routeConfig
]);

export = app;
