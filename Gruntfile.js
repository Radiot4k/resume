"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "fonts/**/*.{woff,woff2}",
            "img/**",
            "*.php",
            "*.ico",
            "*.json",
            "*.xml",
            "*.png",
            "*.js",
            "*.svg"
          ],
          dest: "build"
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "build/index.html": "build/index.html"
        }
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.css": "source/less/style.less"
        }
      }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")()
          ]
        },
        src: "build/css/*.css"
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    svgstore: {
      options: {
        includeTitleElement: false,
        cleanup: ["fill"]
      },
      sprite: {
        files: {
          "build/img/sprite.svg": ["source/img/*.svg"]
        }
      }
    },

    posthtml: {
      options: {
        use: [
          require("posthtml-include")()
        ]
      },
      html: {
        files: [{
          expand: true,
          cwd: "source",
          src: ["*.html"],
          dest: "build"
        }]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          src: ["source/img/*.{png,jpg,svg}"]
        }]
      }
    },

    cwebp: {
      images: {
        options: {
          q: 80
        },
        files: [{
          expand: true,
          src: ["source/img/*.{png,jpg}"]
        }]
      }
    },

    uglify: {
      js: {
        files: {
          "build/js/script.min.js": ["source/js/*.js"],
          "build/sw.min.js": ["source/sw.js"]
        }
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "build/*.html",
            "build/css/*.css",
            "build/js/*.js"
          ]
        },
        options: {
          server: "build/",
          watchTask: true,
          notify: false,
          open: true,
          cors: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["source/*.html"],
        tasks: ["posthtml", "htmlmin"]
      },
      style: {
        files: ["source/less/**/*.less"],
        tasks: ["less", "postcss", "csso"]
      },
      js: {
        files: ["source/js/**/*.js", "source/*.js"],
        tasks: ["uglify"]
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);

  grunt.registerTask("build", ["clean", "copy", "less", "postcss", "csso", "svgstore", "posthtml", "htmlmin", "uglify"]);
};
