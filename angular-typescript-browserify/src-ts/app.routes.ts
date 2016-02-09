/**
 * @ngdoc overview
 * @name router
 * @description
 * <p>
 * To define application routes,listens and routes application path change to
 * appropriate controller and partials using ngRoute. 
 * </p>
 */
export class routeConfig {
    static $inject = ['$routeProvider', 'appConstant'];
    constructor($routeProvider: ng.route.IRouteProvider, appConstant) {
        $routeProvider
            .when('/employees', {
                templateUrl: "components/employee/partials/listEmployee.html",
                controller: "employeeListCtrl",
                resolve: {
                    employeeList: ["employeeSrvc", function(employeeSrvc) {
                        return employeeSrvc.getEmployees();
                    }]
                }
            }).when('/employee/add', {
                templateUrl: "components/employee/partials/addEmployee.html",
                controller: 'employeeAddCtrl'
            }).when('/employee/:id', {
                templateUrl: "components/employee/partials/editEmployee.html",
                controller: 'employeeEditCtrl',
                resolve: {
                    checkifIdExists: ["$q", "$route", "employeeSrvc", "$location", function($q, $route, employeeSrvc, $location) {
                        var defer = $q.defer();
                        if ((!isNaN($route.current.params.id)) && employeeSrvc.getEmployee($route.current.params.id)) {
                            defer.resolve();
                        } else {
                            $location.path('/employees');
                            defer.reject()
                        }
                        return defer.promise;
                    }]
                }
            }).otherwise({
                redirectTo: appConstant.PATH_DEFAULT_MODULE
            });
        console.debug("Router configured");
    }
}