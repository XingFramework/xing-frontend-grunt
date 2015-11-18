/**
 * The `index` task compiles the `index.html` file as a Grunt template. CSS
 * and JS files co-exist here but they get split apart later.
 */
module.exports =
{
  options: {
    liveReloadPort: '<%= ports.liveReload %>'
  },

  /**
   * When it is time to have a completely compiled application, we can
   * alter the above to include only a single JavaScript and a single CSS
   * file. Now we're back!
   */
  build: {
    src: ['<%= app_files.html %>'],
    dest: '<%= compile_targets.index %>',
    js: [
      '<%= compile_targets.traceur_runtime %>',
      '<%= compile_targets.vendor_js %>',
      '<%= compile_targets.js %>'
    ],
    css: [
      '<%= compile_targets.css %>'
    ]
  },

  deploy: {
    production: true,
    src: ['<%= app_files.html %>'],
    dest: '<%= compile_targets.index %>',
    js: [
      '<%= compile_targets.js %>'
    ],
    css: [
      '<%= compile_targets.css %>'
    ]
  }
};