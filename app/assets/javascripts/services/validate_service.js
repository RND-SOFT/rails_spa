rails_spa.factory('Validate', [function(){
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