/**
 * @ngdoc overview
 * @name router
 * @description
 * <p>
 * To define application routes,listens and routes application path change to
 * appropriate controller and partials using ngRoute. 
 * </p>
 */
import app = require('app');

app.config(['$routeProvider', 'appConstant',
    function($routeProvider:ng.route.IRouteProvider, appConstant) {
        $routeProvider
            .when('/employee', {
                templateUrl: "components/employee/partials/listEmployee.html",
                controller: "employeeListCtrl",
                resolve: {
                    employeeList: function(employeeSrvc) {
                        return employeeSrvc.getEmployees();
                    }
                }
            }).when('/employee/:id', {
                templateUrl: "components/employee/partials/editEmployee.html",
                controller: 'employeeEditCtrl'
            }).otherwise({
                redirectTo: appConstant.PATH_DEFAULT_MODULE
            });
        console.debug("Router configured");
    }
]);
