import app = require('./app');
 require("./components/employee/partials/editEmployee.html");
 require("./components/employee/partials/listEmployee.html");
 require("./components/employee/partials/addEmployee.html");
 require('./components/employee/directives/tableView.html');
 require('./components/employee/partials/employeeHeader.html')

//Bootstrap app
document.addEventListener("DOMContentLoaded", function(event) {
    angular.bootstrap(document, [app.name]);
});