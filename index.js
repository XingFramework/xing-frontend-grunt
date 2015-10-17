modules.exports = function(grunt, options) {
  var path = require('path');
  var lodash = require('lodash');

  options = options || {};

  var configOverride  = options.configOverride  || path.join(process.cwd(), 'config/grunt');
  var buildConfigPath = options.buildConfigPath || path.join(process.cwd(), "build.config.js");
  var userConfig      = options.buildConfig     || require(buildConfigPath);
  var jitGruntConfig  = options.jitGrunt        || true;
  var portsConfig     = options.portsConfig     || require('./ports.js');

  var buildConfig = require("./build-config.js");
  buildConfig.pkg = grunt.file.readJSON("package.json");

  lodash.merge(buildConfig, userConfig); //some concerns about correctness
  lodash.merge(buildConfig, portsConfig);

  require('load-grunt-config')(
    grunt,
    {
      init: true,
      data: buildConfig,
      configPath: path.join(__dirname, 'config'),
      overridePath: configOverride,
      jitGrunt: jitGruntConfig
    });
};
