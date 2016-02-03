/**
 *@ngdoc service
 *@name angularApp.util.authInterceptors
 *@description
 * <p>
 * Auth Interceptor Module to handle authentication & authorization pre-processing of 
 * request or postprocessing of responses. Intercept requests before they are handed to
 * the server and responses before they are handed
 * over to the application code that initiated these requests
 * </p>
 */
import configModule = require('./configModule');

/* Define custom auth interceptors to intercept REST request & reponse calls.
       Iterceptors are service factories injected with dependencies (if specified)
       and returns the interceptor */
configModule.factory('authInterceptor', ['$q',
    function($q) {
        return {
            /* 
              Optional Method :request interceptors get called with a http config object. 
              The function is free to modify the config object or create a new one.The 
              function needs to return the config object directly,or a promise containing 
              the config or a new config object.
             */
            request: function(config) {
                //Attach the auth token to every request
                config.headers.Authorization = 'Basic cDhhZG1pbjpQQHNzd29yZDE=';
                return config || $q.when(config);
            },

            /* 
              Optional Method :requestError interceptors gets called when a previous interceptor
              threw an error or resolved with a rejection.
             */
            requestError: function(errorRequest) {
                // do something on error
                return $q.reject(errorRequest);
            },

            /* 
                Optional Method :response interceptors get called with http response object. 
                The function is free to modify the response object or create a new one.The 
                function needs to return the response object directly, or as a promise containing 
                the response or a new response object. 
              */
            response: function(response) {
                return response;
            },

            /* optional Method : responseError interceptor gets called when a previous interceptor 
               threw an error or resolved with a rejection. */
            responseError: function(response) {
                // Add custom error if there is no error data
                if (!response.data) {
                    response.data = "Service error. Please contact admin";
                }
                return $q.reject(response);
            }
        };
    }
]);
