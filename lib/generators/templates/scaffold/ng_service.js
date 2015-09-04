<%- service_name = class_name.singularize -%>
<%- factory_name = '$' + class_name.singularize.downcase -%>
app.service('<%= service_name %>', ['<%= factory_name %>', function (<%= factory_name %>) {
  var <%= service_name %> = this;

  
}])

app.factory('<%= factory_name %>', ['$resource', function ($resource) {
  return $resource(Routes.<%= class_name.singularize.downcase %>_path(':id', {format: 'json'}), {id: '@id'}, {
    update: {method: 'PUT'}
  })
}])