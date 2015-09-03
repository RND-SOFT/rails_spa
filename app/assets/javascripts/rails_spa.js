/*
*= require_self
*= require_tree .
*/

var rails_spa = angular.module("rails_spa", ["ngResource", "ngRoute", "ngSanitize", "ngNotify"])

rails_spa.run(['$rootScope', 'Page', 'Sign', function ($rootScope, Page, Sign) {
  $rootScope.gon = gon;
  $rootScope.Routes = Routes;
  $rootScope.Page = Page;
  $rootScope.Sign = Sign;
}])