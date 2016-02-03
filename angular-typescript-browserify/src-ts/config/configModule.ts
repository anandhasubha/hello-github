/**
 *@ngdoc object
 *@name angularApp.config
 *@description
 * <p>
 * Defines an application module "app.config" at global namespace.
 * Features 
 * <ul>
 *   <li> Global constants and configurations.</li>
 *   <li> Bootstrap setup process.</li>
 * </ul>
 * </p>
 */
var configModule = angular
    .module('angularApp.config', []);

configModule.constant('appConstant', {
    /* Messages for toastr */
    SUCCESS_MSG_TITLE: 'Success!',
    ERROR_MSG_TITLE: 'Alert!',

    /* path for json files */
    //JSON_EMPLOYEES_LIST: 'http://localhost:3000/data',
    JSON_EMPLOYEES_LIST: '../data/EmployeeList.json',

    //Path
    PATH_DEFAULT_MODULE: '/employees'
});

/* Setting global configration during application startup - config phase  */
configModule.config(['$httpProvider', function($httpProvider) {
	//Enable CORS
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	//Attach the authentication token
	// $httpProvider.interceptors.push('authInterceptor');
}]); // end of config

export = configModule;
