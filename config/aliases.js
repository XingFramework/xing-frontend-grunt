module.exports = {
  default: [ 'compile' ],

  delta: [ 'develop', 'karma:unit:start', 'connect', 'watch' ],
  'delta:develop': [ 'develop', 'karma:unit:start', 'watch' ],
  'delta:integrate': [ 'integrate', 'karma:unit:start', 'connect', 'watch' ] ,

  build: [
    'clean:build',
    'html2js', //'jshint:target',
    'compass:build',
    'concat_sourcemap:compile_vendor_js',
    'concat_sourcemap:compile_css',
    'copy:build_app_assets', 'copy:build_vendor_assets',
    'copy:compile_assets', 'copy:vendor_fonts',
    'copy:karmaUnit'
  ],

  qa: {
    description: "Check source code before deploy",
    tasks: [ 'jshint:src', 'jsonlint']
  },

  'develop-build': {
    description: "Compile the app under development",
    tasks: [
      'build',
      'xing-traceur:build',
      'copy:traceur_runtime',
      'index:build',
      'ngAnnotate:build',
      'ngAnnotate:build_vendor'
    ]
  },

  develop: {
    description: "Compile the app under development",
    tasks: [ 'copy:development-env', 'develop-build']
  },

  integrate: {
    description: "Compile the app under development",
    tasks: [ 'copy:integration-env', 'develop-build']
  },

  'ci-test': {
    description: "First pass at a build-and-test run",
    tasks: [
      'copy:test-env',
      'develop-build',
      'jsonlint:fixtures',
      'xing-traceur:es6test',
      'xing-traceur:es6testhelp',
      'jshint:test',
      'html2js:test',
      'xing-traceur:test',
      'ngAnnotate:test',
      'karma:dev'
    ]
  },

  compile: {
    description: "Compile the app in preparation for deploy",
    tasks: [
      'copy:production-env',
      'xing-traceur:es6src',
      'jshint:precompile',
      'build',
      'xing-traceur:deploy',
      'index:deploy',
      'concat_sourcemap:compile_js',
      'ngAnnotate:compile',
      'uglify',
      'bushcaster:dist',
      'string-replace:dist',
      'compress:all'
    ]
  }
};
