rails_spa.directive('tinymce', ['$timeout', function ($timeout) {
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
    restrict: 'C', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    // templateUrl: '',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      
      $timeout(function () {
        tinymce.init({
          selector: '.tinymce',
          mode : "specific_textareas",
          menubar: false,
          statusbar: false,
          relative_urls : false,
          language: "ru",
          fontsize_formats: "8px 10px 12px 14px 16px 18px 20px 24px 36px",
          plugins: 'code preview lists autoresize link spellchecker youtube',
          paste_word_valid_elements: "b,strong,i,em,h1,h2,table,tr,td,th,tbody,thead",
          toolbar: "removeformat | fontsizeselect | bold italic | undo redo | bullist numlist | alignleft | aligncenter | alignright | link | code preview",
          content_css : "/tinymce/tinymce.css",
          setup : function(ed) {
              ed.on('keydown', function(event) {
                if (event.keyCode == 9) {
                  ed.execCommand('mceInsertContent', false, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
                  event.preventDefault();
                  return false;
                }
              });

              ed.on('change', function(e) {
                watcher();
                $scope.ngModel = ed.getContent();
                $scope.$apply();
              });
           }
        });
      })

      var watcher = $scope.$watch('ngModel', function (model) {
        if (model && tinyMCE.activeEditor)
          tinyMCE.activeEditor.setContent(model)
      })
    }
  };
}]);