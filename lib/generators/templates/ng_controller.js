app.controller('<%= class_name %>Ctrl', ['$scope', 'Page', function ($scope, Page) {
  var ctrl = this;

  Page.current = '<%= class_name %>'
}])