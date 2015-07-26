module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {  
          transform: [
            ["babelify", {
              sourceMaps: true,
              // Use runtime transformer to include regenerator polyfill in built module
              optional: ["runtime"]
            }]
          ],
          browserifyOptions: {
            debug: true
          }
        },
        files: {
          "./dist/knockout-diagram.js": ["./src/index.js"]
        }
      }
    },
    watch: {
      scripts: {
        files: ["./src/**/*.js"],
        tasks: ["eslint", "browserify"]
      }
    },
    eslint: {
      target: ["./src/**/*.js"],
      options: {
        globals: ["ko", "jQuery"]
      }
    }
  });
 
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-eslint");
 
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", ["eslint", "browserify"]);
};
