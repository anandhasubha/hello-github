/**
 *@ngdoc object
 *@name angularApp.employee.directives.contenteditable
 *@description
 * <p>
 * Builds the logic around employee table.
 * </p>
 */
import employeeModule = require('../employeeModule');

class ContentEditable implements ng.IDirective {

    constructor(private $sce: any, private employeeSrvc: any) { };
    restrict = 'A';
    require = '?ngModel';

    link = (scope, element: ng.IAugmentedJQuery, attrs:any, ngModel) => {
        var self = this;
        if (!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function() {
            element.html(self.$sce.getTrustedHtml(ngModel.$viewValue || ''));
        };

        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
            scope.$evalAsync(read);
        });
        ngModel.$render();

        // Write data to the model
        function read() {
            debugger;
            var html = element.text();
            // When we clear the content editable the browser leaves a <br> behind
            // If strip-br attribute is provided then we strip this out
            if (attrs.stripBr && html == '<br>') {
                html = '';
            }
            ngModel.$setViewValue(html);
        }
    }

    static factory(): ng.IDirectiveFactory {
        const directive = ($sce: any, employeeSrvc: any) => new ContentEditable($sce, employeeSrvc);
        directive.$inject = ['$sce', 'employeeSrvc'];
        return directive;
    }
}
employeeModule.directive('contenteditable', ContentEditable.factory());
