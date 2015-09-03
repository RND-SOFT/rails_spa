angular.module("rails_spa", ["ngResource", "ngRoute", "ngSanitize", "ngNotify"])
.run(['$rootScope', 'Page', 'Sign', function ($rootScope, Page, Sign) {
  $rootScope.gon = gon;
  $rootScope.Routes = Routes;
  $rootScope.Page = Page;
  $rootScope.Sign = Sign;
}])
/*
* Перехватчик запросов
*/
.factory('httpInterceptor', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
  return {
    request: function (config) {
      $rootScope.$broadcast('loading:progress');
      return config || $q.when(config);
    },

    response: function (response) {
      $rootScope.$broadcast('loading:finish', response);
      return response || $q.when(response);
    },

    responseError: function (response) {
      $rootScope.$broadcast('loading:error', response);
      return $q.reject(response);
    }
  };
}])
/*
* Плюрализация на русском языке
*/
.factory("pluralize", function(){     
    return function (count, variants) {
      var result;
      if (variants.length == 3) {
        if (count==1 || (count!=11 && count%100!=11 && count%10==1)) {
          result = variants[0];
        } else if ((count>=2 && count<=4) || ((count%100>20 && count>20)&&(count%10>=2 || count%10<=4))) {
          result = variants[1];
        } else {
          result = variants[2]
        }
      } else if (variants.length == 2) {
        if (count==1)
          result = variants[0];
        else
          result = variants[1];
      }
      return result;
    } 
})
.filter('plur', ['$sce', 'pluralize', function($sce, pluralize){
    return function(count, variants) {
      return count + " " + pluralize(count, variants);
    };
}])
/*
* Валидация форм
*/
.factory('Validate', [function(){
  return function (errors){
    angular.element(document.querySelectorAll('.errors')).remove();
    _.each(errors, function (v, k) {
      var el = document.getElementById(k);
      if (el) {
        angular.element(document.getElementById(k)).append('<span class="errors"></span>');
        var errors = angular.element(document.getElementById(k).querySelector('.errors'));
        
        errors.html('<span class="error">'+v+'</span>')
        setTimeout(function (argument) {
          errors.addClass('show');
        }, 1)
      }
    })
  };
}])
/*
* Нотисы
*/
.run(['$rootScope', 'ngNotify', 'Validate', function ($rootScope, ngNotify, Validate) {
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
.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('httpInterceptor');
}])