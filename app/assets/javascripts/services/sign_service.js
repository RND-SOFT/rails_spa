rails_spa.service('Sign', ['$http', '$rootScope', function ($http, $rootScope) {
  var Sign = this;

  Sign.open = function (type) {
    Sign.opened = type;
    $rootScope.showOverlay = true;
  }

  Sign.close = function (type) {
    Sign.opened = false;
    $rootScope.showOverlay = false;
  }

  Sign.in = function () {
    $http.post(Routes.user_session_path(), {user: Sign.form})
      .success(function (res) {
        window.location.reload()
      })
  }

  Sign.out = function () {
    $http.delete(Routes.destroy_user_session_path())
      .success(function (res) {
        window.location = "/";
      })
  }
}])