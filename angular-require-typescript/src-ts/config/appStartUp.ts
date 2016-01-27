  /**
   *@ngdoc object
   *@name angularApp.config.appStartup
   *@description
   * <p>
   * To configure or define global settings and functions that should be registered during
   * application startup phase(config & run)
   * </p>
   */
  import configModule = require('./configModule');
  
  /* Setting global configration during application startup - config phase  */
  configModule.config(['$httpProvider', function($httpProvider) {
      //Enable CORS
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      //Attach the authentication token
      $httpProvider.interceptors.push('authInterceptor');
  }]); // end of config

  /* Setting global settings/features during application startup - run phase  */
  configModule.run(['$rootScope', '$window', '$location', 'appConstant',
      function($rootScope, $window, $location, appConstant) {
          //Protect urls - verify if the login token has been created before navigating to url
          // $rootScope.$on('$routeChangeStart', function(event, next) {
          //     var authorised;
          //     if (next.access !== undefined) {
          //         authorised = (($window.sessionStorage.token == appConstant.AUTH_TOKEN) ? true : false);
          //         if (!authorised) {
          //             event.preventDefault();
          //             $location.path('/login');
          //         }
          //     }
          // });
      }
  ]); //end of run
