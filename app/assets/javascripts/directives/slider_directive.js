rails_spa.directive('slider', ['$http', function ($http) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      slides: "=slides",
      destroyUrl: "=destroyUrl"
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: 'slider.html',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.num = 0;

      $scope.slides = $scope.slides || [];
      
      $scope.$watch('slides', function () {
        dcboxInit();
      }, true);

      $scope.deleteSlide = function (id, $index, $event) {
        $event.preventDefault();
        if (confirm("Вы уверены?")) {
          $http.delete($scope.destroyUrl(id))
            .success(function () {
              $scope.slides.splice($index, 1);
            })
        }

        $event.stopPropagation();
      }
    }
  };
}]);