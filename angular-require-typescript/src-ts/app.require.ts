/**
 *@ngdoc overview
 *@name config
 *@description
 *<p>
 * Defines RequireJS configuration file to load all the dependencies
 *  <ul>
 *   <li> Loads all the angularjs core libraries,3rd party libraries and its dependencies 
 *   <li> Use shim to add AMD module behaviour to Non-AMD libraries
 *   <li> Initialize & kick starts the angular application.
 * </ul>
 * Read More : http://www.devbridge.com/articles/understanding-amd-requirejs/
 *</p>
 */

 ///<reference path="../typings/tsd.d.ts"/>

require.config({

    /* Define cache buster that is used to To invalidate the browser cache whenever 
        new version is released .It forces the browser to fetch latest files from the
        server instead of cache */

    //urlArgs: 'bust=@@revision',
    //enforceDefine: true,

    // define library shortcuts
    paths: {
        'angular': '/assets/libs/angular',
        'angular-route': '/assets/libs/angular-route',
        'angular-mocks': '/assets/libs/angular-mocks',
        'jquery': '/assets/libs/jquery',
        'toastr': '/assets/libs/toastr',
        'templates':'templates'
    },

    /**
     * Some libs does not support AMD out of the box.
     * Use Shim to add AMD module behaviour to Non-AMD libraries
     * Remember: only use shim config for non-AMD scripts,
     * i.e scripts that do not already call define(). The shim
     * config will not work correctly if used on AMD scripts, 
     */
    shim: {
        'angular': {
            //Dependenct script 'jquery' should be loaded before loading 'angular' script
            deps: ['jquery'],
            //Once angular is loaded as AMD, use the global 'angular' as the module value.
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'templates':{
             deps: ['angular']
        },
        priority: [
            'angular'
        ]
    },

    // define application bootstrap in deps (smiliar to main method in Java )
    deps: [
        // './app'
    ]
});

require(['angular', 'app',
        'app.routes',
    ],
    function(angular: ng.IAngularStatic) {
        angular.bootstrap(document, ['angularApp']);
    }
);
