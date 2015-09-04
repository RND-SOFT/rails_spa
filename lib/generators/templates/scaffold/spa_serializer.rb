class <%= class_name.pluralize %>Serializer < ActiveModel::Serializer
  attributes :id, <%= attributes.map{|attribute| ':'+attribute.name}.join(', ') %>
end