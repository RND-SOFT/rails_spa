rails_spa.filter('plur', ['$sce', 'pluralize', function($sce, pluralize){
    return function(count, variants) {
      return count + " " + pluralize(count, variants);
    };
}]);