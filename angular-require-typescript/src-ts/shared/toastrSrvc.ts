/**
 *@ngdoc service
 *@name angularApp.shared.ToastrSrvc
 *@description
 * <p>
 * To show the error or success message  using toastr notifications
 * Read More : https://github.com/CodeSeven/toastr.
 * </p>
 */
import sharedModule = require('./sharedModule');
import toastr = require('toastr');

sharedModule.factory('ToastrSrvc', ['appConstant', function(appConstant) {
    var options: ToastrOptions = {
        closeButton: true,
        debug: false,
        positionClass: 'toast-top-right', //'toast-top-full-width',
        onclick: null,
        showDuration: 300,
        hideDuration: 1000,
        timeOut: 5000,
        extendedTimeOut: 1000,
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
    };
    toastr.options = options;

    return {
        /**
         * @ngdoc method
         * @name app.util.ToastrSrvc#notifyError
         * @methodOf app.util.ToastrSrvc
         * @description To notify error messages
         * @param {object} msg Message to notify error                 
         */
        notifyError: function(msg) {
            toastr.error(msg, appConstant.ERROR_MSG_TITLE);
        },
        /**
         * @ngdoc method
         * @name app.util.ToastrSrvc#notifySuccess
         * @methodOf app.util.ToastrSrvc
         * @description To notify success messages
         * @param {object} msg Message to notify success                 
         */
        notifySuccess: function(msg) {
            toastr.success(msg, appConstant.SUCCESS_MSG_TITLE);
        }
    };
}]);
