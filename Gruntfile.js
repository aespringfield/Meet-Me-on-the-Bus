module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      html: {
        expand: true,
        cwd: 'client/views',
        src: ['index.html', '**/*.html'],
        dest: 'server/public/views/'
      },
      css: {
        expand: true,
        cwd: 'client/styles',
        src: ['style.css'],
        dest: 'server/public/styles/'
      },
      scripts: {
        expand: true,
        cwd: 'client/scripts',
        src: ['*.js',
              '**/*.js'],
        dest: 'server/public/scripts/'
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/',
        src: ['css/bootstrap.min.css',
              'css/bootstrap.min.css.map',
              'js/bootstrap.min.js'],
        dest: 'server/public/vendors/bootstrap/'
      },
      angular: {
        expand: true,
        cwd: 'node_modules/angular/',
        src: ['angular.js',
              'angular.min.js',
              'angular.min.js.map'],
        dest: 'server/public/vendors/angular/'
      },
      angularRoute: {
        expand: true,
        cwd: 'node_modules/angular-route',
        src: ['angular-route.js',
              'angular-route.min.js',
              'angular-route.min.js.map'],
        dest: 'server/public/vendors/angular-route/'
      },
      angularMoment: {
        expand: true,
        cwd: 'node_modules/angular-moment',
        src: ['angular-moment.js',
              'angular-moment.min.js',
              'angular-moment.min.js.map'],
        dest: 'server/public/vendors/angular-moment/'
      },
      moment: {
        expand: true,
        cwd: 'node_modules/moment',
        src: ['moment.js'],
        dest: 'server/public/vendors/moment/'
      },
      angularMaterial: {
        expand: true,
        cwd: 'node_modules/angular-material',
        src: ['angular-material.js',
              'angular-material.css',
              'layouts/angular-material.layouts.css',
              'layouts/angular-material.layout-attributes.css',
              'modules/js/datepicker/datepicker.js',
              'modules/js/datepicker/datepicker.css'],
        dest: 'server/public/vendors/angular-material/'
      },
      angularMessages: {
        expand: true,
        cwd: 'node_modules/angular-messages',
        src: ['angular-messages.js'],
        dest: 'server/public/vendors/angular-messages/'
      },
      angularAria: {
        expand: true,
        cwd: 'node_modules/angular-aria',
        src: ['angular-aria.js'],
        dest: 'server/public/vendors/angular-aria/'
      },
      angularAnimate: {
        expand: true,
        cwd: 'node_modules/angular-animate',
        src: ['angular-animate.js'],
        dest: 'server/public/vendors/angular-animate/'
      },
      angularDatePicker: {
        expand: true,
        cwd: 'node_modules/angular-date-picker',
        src: ['angular-date-picker.js',
              'angular-date-picker.css'],
        dest: 'server/public/vendors/angular-date-picker/'
      },
      mdPickers: {
        expand: true,
        cwd: 'node_modules/mdPickers/dist',
        src: ['mdPickers.css',
              'mdPickers.js'],
        dest: 'server/public/vendors/mdPickers/'
      }
    },
    watch: {
      files: [
        'client/**/*.*',
        'client/**/**/*.*'
      ],
      tasks: ['copy']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'watch']);
};
