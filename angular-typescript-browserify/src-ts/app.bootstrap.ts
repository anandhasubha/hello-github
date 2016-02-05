var angular: ng.IAngularStatic = require('angular');
require('angular-sanitize');
require('angular-route');

import app = require('./app');

//Bootstrap app
document.addEventListener("DOMContentLoaded", function(event) {
    angular.bootstrap(document, [app.name]);
}); 
