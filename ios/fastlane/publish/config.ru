# This file tells Rack how to boot Fir. It's the point of entry for the whole framework.
# You shouldn't have to modify this file. If you came here looking for the app's config
# file, you're in the wrong place. Look at config.rb instead.

FIR_ROOT = File.expand_path(File.dirname(__FILE__))

require 'fir.rb'
require 'config.rb'

# This is where it all begins.
# See boot.rb in the Fir gem if you're curious about what happens next.
instance_eval(&Fir.boot_proc)