class Create<%= class_name.pluralize %> < ActiveRecord::Migration
  def change
    create_table :<%= class_name.pluralize.downcase %> do |t|
      t.string :file
      t.integer :fileable_id
      t.string :fileable_type
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
