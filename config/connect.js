var liveReloadPort = require('../ports.js').liveReloadPort;

module.exports = {
  server: {
    options: {
      debug: true,
      open: true,
      port: 9000,
      hostname: 'localhost',
      livereload: liveReloadPort,
      middleware: function(connect, options, middlewares) {
        middlewares.unshift(function(req, res, next) {
          if(/application\/json/.test(req.headers["accept"])){
            res.setHeader("Content-Type", "application/json");
            req.url = req.url + ".json";
          }
          next();
        });

        return middlewares;
      },
      base: [
        './bin',
        '../dummy-api'
      ]
    }
  }
};
