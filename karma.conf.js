module.exports = function(config) {
  config.set({

    basePath: './app/client',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      'tests/**/*_spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    colors: true,

    logLevel: config.LOG_INFO,

    reporters: ['dots'],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
