# This is the main config file for your site. Add any "require" statements or any other global directives here.

require 'maruku' # Comment out if you don't want to use Markdown

Fir.config do |config|
	config.site_name = 'Change me in config.rb'
	config.perform_caching = false
end