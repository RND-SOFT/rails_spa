rails_spa.service('Sign', ['$http', '$rootScope', function ($http, $rootScope) {
  var Sign = this;

  Sign.up = function (user) {
    $http.post(Routes.user_registration_path(), {user: user})
      .success(function (res) {
        window.location = "/"
      })
  }

  Sign.in = function (user) {
    $http.post(Routes.user_session_path(), {user: user})
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