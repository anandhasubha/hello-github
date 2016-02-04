import app = require('./app');

//Bootstrap app
document.addEventListener("DOMContentLoaded", function(event) {
    angular.bootstrap(document, [app.name]);
}); 
