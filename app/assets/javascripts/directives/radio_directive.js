rails_spa.directive('radio', [function() {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      ngModel: '=ngModel',
      options: '=options',
      multiple: '=multiple' 
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: 'radio.html',
    replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      if ($scope.multiple)
        $scope.ngModel = $scope.ngModel || [];

      $scope.isActive = function (id) {
        if ($scope.multiple) {
          return $scope.ngModel.indexOf(id) != -1
        } else {
          return $scope.ngModel == id
        }
      }

      $scope.setActive = function (id) {
        if ($scope.multiple) {
          if ($scope.ngModel.indexOf(id)==-1) {
            $scope.ngModel.push(id)
          } else {
            $scope.ngModel = _.filter($scope.ngModel, function (model) {
              return model != id
            })
          }
        } else {
          $scope.ngModel = id
        }
      }

    }
  };
}]);