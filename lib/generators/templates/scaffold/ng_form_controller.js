<%- controller_name = class_name.pluralize + 'FormCtrl' -%>
<%- service_name = class_name.singularize -%>
<%- factory_name = '$' + class_name.singularize.downcase -%>
app.controller('<%= controller_name %>', ['$scope', 'Page', '$routeParams', '$location', '<%= service_name %>', '<%= factory_name %>', function ($scope, Page, $routeParams, $location, <%= service_name %>, <%= factory_name %>) {
  var ctrl = this;

  Page.current = '<%= service_name.pluralize %>';

  if ($routeParams.id) {
    ctrl.<%= class_name.singularize.downcase %> = <%= factory_name%>.get({id: $routeParams.id})
    ctrl.save = function () {
      <%= factory_name %>.update({id: $routeParams.id}, {<%= class_name.singularize.downcase %>: ctrl.<%= class_name.singularize.downcase %>}, function (res) {
        $location.url('/<%= class_name.pluralize.downcase %>');
      })
    }
  } else {
    ctrl.save = function () {
      <%= factory_name %>.save({<%= class_name.singularize.downcase %>: ctrl.<%= class_name.singularize.downcase %>}, function (res) {
        $location.url('/<%= class_name.pluralize.downcase %>');
      })
    }
  }
}])