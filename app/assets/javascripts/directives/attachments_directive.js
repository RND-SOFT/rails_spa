rails_spa.directive('attachments', ['$http', function ($http) {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      attachments: "=attachments",
      destroyUrl: "=destroyUrl"
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: 'attachments.html',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.deleteSlide = function (id, $index, $event) {
        $event.preventDefault();
        if (confirm("Вы уверены?")) {
          $http.delete($scope.destroyUrl(id))
            .success(function () {
              $scope.attachments.splice($index, 1);
            })
        }

        $event.stopPropagation();
      }
    }
  };
}]);