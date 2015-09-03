require 'rails/generators/active_record'
require 'active_support/core_ext'
include Rails::Generators::Migration

class SpaUploaderGenerator < Rails::Generators::NamedBase
  source_root File.expand_path("../templates", __FILE__)

  def self.next_migration_number(path)
    unless @prev_migration_nr
      @prev_migration_nr = Time.now.utc.strftime("%Y%m%d%H%M%S").to_i
    else
      @prev_migration_nr += 1
    end
    @prev_migration_nr.to_s
  end

  def create_uploader_file
    template "spa_uploader_controller.rb", File.join('app/controllers', class_path, "#{file_name}_controller.rb")
  end

  def create_serializer_file
    template "spa_uploader_serializer.rb", File.join('app/serializers', class_path, "#{file_name}_serializer.rb")
  end

  def create_migration_file
    migration_template "spa_uploader_migration.rb", "db/migrate/create_#{file_name.pluralize.downcase}.rb"
  end

  def create_model_file
    template "spa_uploader_model.rb", File.join('app/models', class_path, "#{file_name}.rb")
  end

  def create_spa_uploader
    template "spa_uploader_model.rb", File.join('app/uploaders', class_path, "#{file_name}_uploader.rb")
  end
end