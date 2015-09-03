class NgRoutesGenerator < Rails::Generators::Base
  source_root File.expand_path("../templates", __FILE__)

  def create_ng_routes
    template "ng_routes.js", File.join('app/assets/javascripts', "routes.js")
  end

end