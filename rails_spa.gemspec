# -*- encoding: utf-8 -*-
require File.expand_path('../lib/rails_spa/version', __FILE__)

Gem::Specification.new do |gem|
  gem.name          = "rails_spa" 
  gem.authors       = ["Kononenko Paul"]
  gem.email         = ["kinnalru@gmail.com"]
  gem.description   = "Lol"
  gem.summary       = "Lal"
  #gem.homepage      = "https://github.com/bokmann/font-awesome-rails"
  #gem.licenses      = ["MIT", "SIL Open Font License"]

  gem.version       = RailsSpa::VERSION
  gem.files         = `git ls-files`.split("\n")
  gem.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  gem.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  gem.require_paths = ["lib"]

  gem.required_ruby_version = '>= 1.9.3'

  gem.add_dependency "slim-rails"
  gem.add_dependency "js-routes"
  gem.add_dependency "gon"

end
