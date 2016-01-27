/**
 *@ngdoc service
 *@name angularApp.shared.cacheService
 *@description
 * <p>
 * To show the error or success message  using toastr notifications
 * Read More : https://docs.angularjs.org/api/ng/type/$cacheFactory.Cache
 * </p>
 */
import sharedModule = require('./sharedModule');


sharedModule.factory('cacheSrvc', ['$cacheFactory', function($cacheFactory) {
    var LC={
        set:function (key, value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        },
        get:function (key) {
            return JSON.parse(window.localStorage.getItem(key));
        }
    }
    return LC; 
}]);
