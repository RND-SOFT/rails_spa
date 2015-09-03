rails_spa.run(['$rootScope', 'ngNotify', 'Validate', function ($rootScope, ngNotify, Validate) {
  ngNotify.config({
      theme: 'pure',
      position: 'top',
      duration: 2000,
      type: 'info'
  });

  $rootScope.$on('loading:finish', function (h, res) {
    if (res.data && res.data.msg) {
      ngNotify.set(res.data.msg, 'success');
    }
  })

  $rootScope.$on('loading:error', function (h, res) {
    if (res.data) {
      if (res.data.msg)
        ngNotify.set(res.data.msg, 'error');
      else if (res.data.errors)
        Validate(res.data.errors)
    }
  })
}])

rails_spa.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}])