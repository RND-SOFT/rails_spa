/*
*= require perfect-scrollbar.min
*= require pace.min
*= require dcbox
*= require angular
*= require ng-notify
*= require underscore
*= require angular-resource
*= require angular-sanitize
*= require angular-route
*= require angular-locale_ru-ru
*= require_self
*= require_tree .
*/

var rails_spa = angular.module("rails_spa", ["ngResource", "ngRoute", "ngSanitize", "ngNotify"])

rails_spa.run(['$rootScope', 'Page', 'Sign', function ($rootScope, Page, Sign) {
  $rootScope.Page = Page;
  $rootScope.Sign = Sign;
}])