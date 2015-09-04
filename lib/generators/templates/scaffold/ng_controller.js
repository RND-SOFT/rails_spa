<%- controller_name = class_name.pluralize + 'Ctrl' -%>
<%- service_name = class_name.singularize -%>
<%- factory_name = '$' + class_name.singularize.downcase -%>
app.controller('<%= controller_name %>', ['$scope', 'Page', '<%= service_name %>', '<%= factory_name %>', function ($scope, Page, <%= service_name %>, <%= factory_name %>) {
  var ctrl = this;

  Page.current = '<%= service_name.pluralize %>';

  ctrl.<%= class_name.pluralize.downcase %> = $<%= service_name.downcase %>.query()
}])