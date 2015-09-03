$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "rails_spa/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "rails_spa"
  s.version     = RailsSpa::VERSION
  s.authors     = ["Kononenko Paul"]
  s.email       = ["storuky@gmail.com"]
  s.homepage    = "https://github.com/storuky"
  s.summary     = "Create your single page application with rails"
  s.description = ""
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib,vendor}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.1.8"

  s.add_development_dependency "sqlite3"
end
