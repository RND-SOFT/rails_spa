app.config(['$routeProvider', function ($routeProvider) {  
  $routeProvider
    .when('/', {
      templateUrl: Routes.home_path(),
      controller: 'HomeCtrl as ctrl',
      reloadOnSearch: false
    })
    /*
    * Your routing here
    */
    .otherwise({
      redirectTo: '/'
    })
}]);