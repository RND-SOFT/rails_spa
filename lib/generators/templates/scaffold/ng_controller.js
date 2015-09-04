<%- controller_name = class_name.pluralize + 'Ctrl' -%>
<%- service_name = class_name.singularize -%>
<%- factory_name = '$' + class_name.singularize.downcase -%>
app.controller('<%= controller_name %>', ['$scope', 'Page', '<%= service_name %>', '<%= factory_name %>', function ($scope, Page, <%= service_name %>, <%= factory_name %>) {
  var ctrl = this;

  Page.current = '<%= service_name.pluralize %>';

  ctrl.<%= class_name.pluralize.downcase %> = $<%= service_name.downcase %>.query()

  ctrl.delete<%= class_name.singularize%> = function (id) {
    if (confirm("Вы уверены?")) {
      <%= factory_name %>.delete({id: id}, function (res) {
        ctrl.<%= class_name.pluralize.downcase %> = _.filter(ctrl.<%= class_name.pluralize.downcase %>, function (<%= class_name.singularize.downcase %>) {
          return <%= class_name.singularize.downcase %>.id != id;
        })
      })
    }
  }
}])