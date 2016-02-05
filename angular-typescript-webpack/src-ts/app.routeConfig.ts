export class routeConfig{
    static $inject = ['$routeProvider', 'appConstant'];
    constructor($routeProvider: ng.route.IRouteProvider, appConstant) {
        $routeProvider
            .when('/employees', {
                templateUrl: 'components/employee/partials/listEmployee.html',
                controller: "employeeListCtrl",
                resolve: {
                    employeeList: function(employeeSrvc, $templateCache) {
                        return employeeSrvc.getEmployees();
                    }
                }
            }).when('/employee/add', {
                templateUrl: 'components/employee/partials/addEmployee.html',
                controller: 'employeeAddCtrl'
            }).when('/employee/:id', {
                templateUrl: 'components/employee/partials/editEmployee.html',
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
}