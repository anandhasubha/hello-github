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

//Load angular libraries
var angular: ng.IAngularStatic = require('angular');
require('angular-route');
require('angular-sanitize');

//Load sub modules
var configModule = require('./config/configModule');
var sharedModule = require('./shared/sharedModule');
var employeeModule = require('./components/employee/employeeModule');

//Init app
var app = angular.module('angularApp', ['ngRoute', 'ngSanitize',
    configModule.name,
    sharedModule.name,
    employeeModule.name
]).config(['$routeProvider', 'appConstant',
    function($routeProvider: ng.route.IRouteProvider, appConstant) {
        $routeProvider
            .when('/employees', {
                templateUrl: "components/employee/partials/listEmployee.html",
                controller: "employeeListCtrl",
                resolve: {
                    employeeList: function(employeeSrvc) {
                        return employeeSrvc.getEmployees();
                    }
                }
            }).when('/employee/add', {
                templateUrl: "components/employee/partials/addEmployee.html",
                controller: 'employeeAddCtrl'
            }).when('/employee/:id', {
                templateUrl: "components/employee/partials/editEmployee.html",
                controller: 'employeeEditCtrl',
                resolve: {
                    checkifIdExists: function($q, $route, employeeSrvc, $location) {
                        var defer = $q.defer();
                        if (employeeSrvc.getEmployee($route.current.params.id)) {
                            defer.resolve({});
                        } else {
                            $location.path('/employees');
                        }
                        return defer.promise;

                    }
                }
            }).otherwise({
                redirectTo: appConstant.PATH_DEFAULT_MODULE
            });
        console.debug("Router configured");
    }
]);

//Bootstrap app
angular.bootstrap(document, ['angularApp']);
