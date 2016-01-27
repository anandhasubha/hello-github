/**
 *@ngdoc object
 *@name angularApp.config
 *@description
 * <p>
 * Defines an application module "app.config" at global namespace.
 * Features 
 * <ul>
 *   <li> Global constants and configurations.</li>
 *   <li> Bootstrap setup process.</li>
 * </ul>
 * </p>
 */

///<amd-dependency path="angular"/>

var configModule = angular
    .module('angularApp.config', []);
export = configModule;
