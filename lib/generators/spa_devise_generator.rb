class SpaDeviseGenerator < Rails::Generators::NamedBase
  source_root File.expand_path("../templates", __FILE__)
  argument :scope, required: true

  def create_sessions_controller
    template "spa_devise_sessions.rb", File.join('app/controllers/users', class_path, "sessions_controller.rb")
  end

  def create_registrations_controller
    template "spa_devise_registrations.rb", File.join('app/controllers/users', class_path, "registrations_serializer.rb")
  end
end