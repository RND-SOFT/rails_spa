class SpaDeviseGenerator < Rails::Generators::Base
  source_root File.expand_path("../templates/devise", __FILE__)

  def create_sessions_controller
    template "spa_devise_sessions.rb", File.join('app/controllers/users', "sessions_controller.rb")
  end

  def create_registrations_controller
    template "spa_devise_registrations.rb", File.join('app/controllers/users', "registrations_controller.rb")
  end

  def create_views
    template "views/sessions/new.html.slim", File.join("app/views/devise/sessions/new.html.slim")
    template "views/registrations/new.html.slim", File.join("app/views/devise/registrations/new.html.slim")
  end

  def create_ng_controller
    template "sign_controller.js", File.join("app/assets/javascripts/controllers/sign_ctrl.js")
  end

  def update_routes_js
    file = File.read("app/assets/javascripts/routes.js")

    replace_to = <<-DOC
    .when('/users/sign_in', {
      templateUrl: Routes.user_session_path(),
      controller: 'SignCtrl as ctrl',
      reloadOnSearch: false
    })
    .when('/users/sign_up', {
      templateUrl: Routes.user_registration_path(),
      controller: 'SignCtrl as ctrl',
      reloadOnSearch: false
    })
    DOC

    if file.include?(replace_to)
      file.sub!(replace_to.strip, '')
    else
      file.sub!('.otherwise({', replace_to.strip + ".otherwise({")
    end

    File.open('app/assets/javascripts/routes.js', 'w') do |f|
      f.write(file)
    end

  end
end