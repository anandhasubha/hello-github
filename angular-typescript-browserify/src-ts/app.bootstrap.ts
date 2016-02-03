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

require(['angular', 'app',
        'app.routes',
    ],
    function(angular: ng.IAngularStatic) {
        angular.bootstrap(document, ['angularApp']);
    }
);
