/**
 *@ngdoc object
 *@name angularApp.employee.directives.tableEmployee
 *@description
 * <p>
 * Builds the logic around employee table.
 * </p>
 */
import employeeModule = require('../employeeModule');

interface IEmpTableDirScope extends ng.IScope {
    tdata: any[];
    reverse: boolean;
    editFn: (id:number, index: number) => void;
    deleteFn: (index:number) => void;
    sortBy_head: (head: any) => void;
}

class EmployeeTable implements ng.IDirective {

    restrict = 'E';
    scope = {
        headers: "=",
        tdata: "=",
        onclick: "&",
        reverse: "="
    };

    templateUrl = '/dist/components/employee/directives/tableView.html';

    constructor(private $filter: ng.IFilterService
        , private $location: ng.ILocationService) {
    };

    link = (scope: IEmpTableDirScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        var self = this;
        scope.editFn = function(id, index) {
            self.$location.path('/employee/' + id);
        }
        scope.deleteFn = function(index) {
            scope.tdata.splice(index, 1);
        }
        scope.sortBy_head = function(head) {
            scope.reverse = !scope.reverse;
            scope.tdata = self.$filter('orderBy')(scope.tdata, head, scope.reverse);
        };
    }

    static factory(): ng.IDirectiveFactory {
        const directive = ($filter: ng.IFilterService, $location: ng.ILocationService) => new EmployeeTable($filter, $location);
        directive.$inject = ['$filter','$location'];
        return directive;
    }
}
employeeModule.directive('tableEmployee', EmployeeTable.factory());