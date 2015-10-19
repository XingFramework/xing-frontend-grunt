/**
 * And for rapid development, we have a watch set up that checks to see if
 * any of the files listed below change, and then to execute the listed
 * tasks when they do. This just saves us from having to type "grunt" into
 * the command-line every time we want to see what we're working on; we can
 * instead just leave "grunt watch" running in a background terminal. Set it
 * and forget it, as Ron Popeil used to tell us.
 *
 * But we don't need the same thing to happen for all the files.
 */
module.exports =
{
  /**
   * By default, we want the Live Reload to work for all tasks; this is
   * overridden in some tasks (like this file) where browser resources are
   * unaffected. It runs by default on port 35729, which your browser
   * plugin should auto-detect.
   */
  options: {
    livereload: require("../ports.js").liveReload
  },

  /**
   * When the Gruntfile changes, we just want to lint it. In fact, when
   * your Gruntfile changes, it will automatically be reloaded!
   */
  gruntfile: {
    files: 'Gruntfile.js',
    tasks: [ 'jshint:gruntfile' ],
    options: {
      livereload: false
    }
  },

  /**
   * When our JavaScript source files change, we want to run lint them and
   * run our unit tests.
   */
  jssrc: {
    options: { livereloadOnError: false },
    files: [ 'src/**/*.js' ],
    tasks: [ 'xing-traceur:es6src', 'jshint:src', 'xing-traceur:build', 'ngAnnotate:build'],
  },

  js_qa: {
    files: [],
    tasks: [ 'xing-traceur:es6src', 'jshint:src', "jsonlint" ],
    options: { atBegin: true }
  },

  /**
   * When assets are changed, copy them. Note that this will *not* copy new
   * files, so this is probably not very useful.
   */
  assets: {
    files: [
      'src/assets/**/*'
    ],
    tasks: [ 'copy:build_assets' ]
  },

  /**
   * When index.html changes, we need to compile it.
   */
  html: {
    files: [ '<%= app_files.html %>' ],
    tasks: [ 'index:build' ],
    options: {
      atBegin: true
    }
  },

  /**
   * When our templates change, we only rewrite the template cache.
   */
  tpls: {
    files: [
      '<%= app_files.atpl %>',
      '<%= app_files.ctpl %>'
    ],
    tasks: [ 'html2js', 'xing-traceur:build', 'ngAnnotate:build'],
  },

  sass: {
    files: [ '<%= build_dirs.stylesheets %>/*.css'],
    tasks: [ 'concat_sourcemap:compile_css' ]
  },

  vendor_js: {
    files: [ 'vendor/**/*.js' ],
    tasks: [ 'concat_sourcemap:compile_vendor_js', 'ngAnnotate:build_vendor']
  },
  /**
   * When a JavaScript unit test file changes, we only want to lint it and
   * run the unit tests. We don't want to do any live reloading.
   */
  jsunit: {
    files: [
      'bin/assets/vendor.js', '<%= app_files.jstest %>', 'test/json-fixtures/**/*', '<%= compile_targets.js %>'
    ],
    tasks: [ 'jsonlint:fixtures', 'xing-traceur:es6test',
      'xing-traceur:es6testhelp', 'jshint:test',
      'html2js:test','xing-traceur:test', 'ngAnnotate:test', 'karma:unit:run'
    ],
    options: {
      livereload: false,
      atBegin: true
    }
  },

  dummyapi: {
    files: [ "../dummy-api/**" ],
    tasks: [ 'jsonlint:dummies' ]
  },

  karmaconfig: {
    files: [
      "karma/karma-unit.tpl.js"
    ],
    tasks: [ 'copy:karmaUnit' ],
    options: {
      reload: true
    }
  },
};
