rails_spa.directive('scroll', ['$timeout', function($timeout) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, el, attrs, controller) {
      if (attrs.axis=='x') {
        Ps.initialize(el[0], {suppressScrollY: true, useBothWheelAxes: true});
      } else if (attrs.axis=='y') {
        Ps.initialize(el[0], {suppressScrollX: true});
      } else {
        Ps.initialize(el[0]);
      }

      $scope.$watch(function () {
        return attrs.rebuld
      }, function(val) {
        $timeout(function () {
          Ps.update(el[0]);
        })
      });

    }
  };
}]);