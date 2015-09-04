require 'rails/generators/active_record'
require 'active_support/core_ext'
include Rails::Generators::Migration

class SpaScaffoldGenerator < Rails::Generators::NamedBase
  source_root File.expand_path("../templates/scaffold", __FILE__)

  argument :attributes, type: :array, default: [], banner: "field[:type][:index] field[:type][:index]"

  def self.next_migration_number(path)
    unless @prev_migration_nr
      @prev_migration_nr = Time.now.utc.strftime("%Y%m%d%H%M%S").to_i
    else
      @prev_migration_nr += 1
    end
    @prev_migration_nr.to_s
  end

  def create_controller
    template "spa_controller.rb", File.join('app/controllers', class_path, "#{file_name.pluralize}_controller.rb")
  end

  def create_serializer_file
    template "spa_serializer.rb", File.join('app/serializers', class_path, "#{file_name.pluralize}_serializer.rb")
  end

  def create_migration_file
    migration_template "spa_migration.rb", "db/migrate/create_#{file_name.pluralize}.rb"
  end

  def create_model_file
    template "spa_model.rb", File.join('app/models', class_path, "#{file_name.singularize}.rb")
  end

  def create_ng_controller
    template "ng_controller.js", File.join('app/assets/javascripts/controllers', class_path, "#{file_name.pluralize}_ctrl.js")
  end

  def create_ng_service
    template "ng_service.js", File.join('app/assets/javascripts/services', class_path, "#{file_name.singularize}.js")
  end

  def create_views
    template "views/index.html.slim", File.join("app/views/#{file_name.pluralize}/index.html.slim")
    template "views/show.html.slim", File.join("app/views/#{file_name.pluralize}/show.html.slim")
    template "views/edit.html.slim", File.join("app/views/#{file_name.pluralize}/edit.html.slim")
    template "views/new.html.slim", File.join("app/views/#{file_name.pluralize}/new.html.slim")
    template "views/_form.html.slim", File.join("app/views/#{file_name.pluralize}/_form.html.slim")
  end

  def update_routes_js
    file = File.read("app/assets/javascripts/routes.js")

    replace_to = <<-DOC
    .when('/', {
      templateUrl: Routes.#{class_name.singularize.downcase}_path(),
      controller: '#{class_name.singularize}Ctrl as ctrl',
      reloadOnSearch: false
    })
    .otherwise({
    DOC

    file.sub!('.otherwise({', replace_to.strip)

    File.open('app/assets/javascripts/routes.js', 'w') do |f|
      f.write(file)
    end

  end

  def update_routes_rb
    file = File.read("config/routes.rb")
    replace_to = <<-DOC
    scope :spa do    
    resources :#{class_name.downcase}
    DOC
    file.sub!('scope :spa do', replace_to.strip)

    File.open('config/routes.rb', 'w') do |f|
      f.write(file)
    end

  end
end