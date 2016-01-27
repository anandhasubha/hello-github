/**
 *@ngdoc object
 *@name angularApp.config.appConstant
 *@description
 * <p>
 * Define application wide constants and Configuration values using angular constant service.
 * </p>
 */

import configModule = require('./configModule');

configModule.constant('appConstant', {
    /* Messages for toastr */
    SUCCESS_MSG_TITLE: 'Success!',
    ERROR_MSG_TITLE: 'Alert!',

    /* path for json files */
    JSON_EMPLOYEES_LIST: '/data/EmployeeList.json',

    //Token
    AUTH_TOKEN: 'cDhhZG1pbjpQQHNzd29yZDE=',

    //Path
    PATH_DEFAULT_MODULE: '/employee'
});
