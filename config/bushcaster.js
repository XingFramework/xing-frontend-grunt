
module.exports = function(grunt) {
  return {
    options: {
      hashLength: 8,
      noProcess: true,
      onComplete: function(map, files) {
        var cacheMap = [];
        var dirRE = new RegExp( '^('+grunt.config('build_dirs.root')+'|'+grunt.config('compile_dir')+')\/', 'g' );
        files.forEach(function(file) {
          return cacheMap.push({
            pattern: file.replace( dirRE, '' ),
            replacement: map[file].replace( dirRE, '' )
          });
        });
        grunt.file.write(grunt.config('fingerprintCache'), JSON.stringify(cacheMap));
      }
    },
    dist: {
      files: [
        {
          expand: true,
          cwd: './',
          dest: './',
          src: [
            '<%= compile_targets.js %>',
            '<%= compile_targets.css %>'
          ]
        }
      ]
    }
  };
};
