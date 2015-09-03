rails_spa.config(['$httpProvider', '$locationProvider', '$compileProvider', function ($httpProvider, $locationProvider, $compileProvider) {

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript|blob|data):/);
  /*
   *  Set token for AngularJS ajax methods
  */
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').content;

  /*
   *  Enable HTML5 History API
  */
  $locationProvider.html5Mode(true).hashPrefix('!');
}]);