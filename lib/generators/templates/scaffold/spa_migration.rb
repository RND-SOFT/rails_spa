class Create<%= class_name.pluralize %> < ActiveRecord::Migration
  def change
    create_table :<%= class_name.pluralize.downcase %> do |t|
      <%- attributes.each do |attribute| -%>
      t.<%= attribute.type%> :<%= attribute.name %>
      <%- end -%>
      t.timestamps null: false
    end
  end
end
