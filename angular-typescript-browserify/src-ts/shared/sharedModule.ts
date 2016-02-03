/**
 *@ngdoc object
 *@name angularApp.shared
 *@description
 * <p>
 * Defines an application module "angularApp.shared" at global namespace.
 * Features 
 * <ul>
 *   <li> Hosts all the common and utility services</li>
 * </ul>
 * </p>
 */

import toastrSrvc = require('./toastrSrvc');
import cacheSrvc = require('./cacheSrvc');

var sharedModule = angular
    .module('angularApp.shared', []);
sharedModule.service('toastrSrvc', toastrSrvc.ToastrSrvc);
sharedModule.service('cacheSrvc', cacheSrvc.CacheSrvc);

export = sharedModule;
