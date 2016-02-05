/**
 *@ngdoc service
 *@name angularApp.shared.cacheService
 *@description
 * <p>
 * To show the error or success message  using toastr notifications
 * Read More : https://docs.angularjs.org/api/ng/type/$cacheFactory.Cache
 * </p>
 */
interface ICacheSrvc {
    set: (key: any, value: any) => void;
    get: (key: any) => string;
}

export class CacheSrvc implements ICacheSrvc {
    static $inject = ['$cacheFactory'];

    constructor(private $cacheFactory: any) {
        // toastr.options = this.options;
    };

    set = (key, value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    get = (key) => {
        return JSON.parse(window.localStorage.getItem(key));
    };
}
