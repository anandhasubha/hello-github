/**
 *@ngdoc object
 *@name angularApp.employee.directives.tableEmployee
 *@description
 * <p>
 * Builds the logic around employee table.
 * </p>
 */
interface IEmpTableDirScope extends ng.IScope {
    tdata: any[];
    reverse: boolean;
    editFn: (id:number, index: number) => void;
    deleteFn: (index:number) => void;
    sortBy_head: (head: any) => void;
}

export class EmployeeTable implements ng.IDirective {

    restrict = 'E';
    scope = {
        headers: "=",
        tdata: "=",
        onclick: "&",
        reverse: "="
    };

    templateUrl = 'components/employee/directives/tableView.html';

    constructor(private $filter: ng.IFilterService
        , private $location: ng.ILocationService, private employeeSrvc: any) {
    };

    link = (scope: IEmpTableDirScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
        var self = this;
        scope.editFn = function(id, index) {
            self.$location.path('/employee/' + id);
        };
        
        scope.deleteFn = function(index) {
            scope.tdata.splice(index, 1);
            var empdata=self.employeeSrvc.getEmpList();
            empdata.recordSet=scope.tdata;
            self.employeeSrvc.setEmpList(empdata)            
        };
        
        scope.sortBy_head = function(head) {
            scope.reverse = !scope.reverse;
            scope.tdata = self.$filter('orderBy')(scope.tdata, head, scope.reverse);
        };
    }

    static factory(): ng.IDirectiveFactory {
        const directive = ($filter: ng.IFilterService, $location: ng.ILocationService, employeeSrvc: any) => new EmployeeTable($filter, $location, employeeSrvc);
        directive.$inject = ['$filter','$location', 'employeeSrvc'];
        return directive;
    }
}
