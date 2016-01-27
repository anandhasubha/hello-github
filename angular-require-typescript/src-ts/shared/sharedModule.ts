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

///<amd-dependency path="angular"/>

var sharedModule = angular
    .module('angularApp.shared', []);
export = sharedModule;
