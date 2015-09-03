class NgControllerGenerator < Rails::Generators::NamedBase
  source_root File.expand_path("../templates", __FILE__)

  def create_ng_controller
    template "ng_controller.js", File.join('app/assets/javascripts/controllers', class_path, "#{file_name}_ctrl.js")
  end

end