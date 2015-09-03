rails_spa.directive('datepicker', [function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
      ngModel: "=ngModel"
    }, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
       $(iElm).datepicker();
       var from = new Date();
       $(iElm).datepicker("option", "minDate", from);

       var to = new Date();
       to.setDate(to.getDate() + 90);
       $(iElm).datepicker("option", "maxDate", to);

       $scope.$watch('ngModel', function () {
        $(iElm).datepicker("option", "dateFormat", "dd.mm.yy");
       })
    }
  };
}]);