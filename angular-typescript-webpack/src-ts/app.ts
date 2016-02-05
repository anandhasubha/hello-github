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
require('jquery');
//Load angular libraries
require('angular');
require('angular-route');
require('angular-sanitize');
//Load the required styles below
require("../assets/css/bootstrap.yeti.css");
require("../assets/fonts/font-awesome.min.css");
require("../assets/css/toastr.css");
require("../assets/css/styles.css");
require('./shared/toastrSrvc.ts');

//Load sub modules
var route=require('./routeConfig');
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
