/**
 *@ngdoc service
 *@name angularApp.shared.ToastrSrvc
 *@description
 * <p>
 * To show the error or success message  using toastr notifications
 * Read More : https://github.com/CodeSeven/toastr.
 * </p>
 */
//Load jquery and toastr 
require('../../assets/libs/jquery.js');
var toastr = require('../../assets/libs/toastr.js'); 

interface IToastrSrvc {
    options: ToastrOptions;
    notifyError: (msg: any) => void;
    notifySuccess: (msg: any) => void;
}

export class ToastrSrvc implements IToastrSrvc {
    static $inject = ['appConstant'];

    options = {
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

    constructor(private appConstant: any) {
        toastr.options = this.options;
    };

    notifyError = (msg) => {
        toastr.error(msg, this.appConstant.ERROR_MSG_TITLE);
    };

    notifySuccess = (msg) => {
        toastr.success(msg, this.appConstant.SUCCESS_MSG_TITLE);
    };
}
