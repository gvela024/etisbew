'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const _jasmine = require('gulp-jasmine');
const istanbul = require('gulp-istanbul');
const tap = require('gulp-tap');
const runSequence = require('run-sequence');
const browserify = require('browserify');
const babelify = require('babelify');
const vinyl_source_stream = require('vinyl-source-stream');
const rename = require('gulp-rename');
const fs = require('fs');

const source = ['./src/**/*.js'];
const tests = ['./spec/**/*_spec.js'];
const gulpfile = ['./gulpfile.js'];
const all = [].concat(source).concat(tests).concat(gulpfile);

const jasmineConfig = {
  'spec_dir': 'spec',
  'spec_files': ['**/*_spec.js']
};

gulp.task('setup-istanbul', () => {
  return gulp.src(source)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('require-all', ['setup-istanbul'], () => {
  return gulp.src(source)
    .pipe(tap((f) => require(f.path)));
});

gulp.task('remove-files', () => {
  fs.unlink('./src/static/bundle.js',(error) =>{
    if(error && !error.code == 'ENOENT') {
      console.log(error);
    }
  });
});

gulp.task('test', ['remove-files', 'require-all'], () => {
  console.log('Running tests...');
  return gulp.src(tests)
    .pipe(_jasmine({
      config: jasmineConfig,
      includeStackTrace: true,
      timeout: 1000
    }))
    .pipe(istanbul.writeReports())
    .on('end', () => {
      console.log();
      console.log('Done!');
      console.log();
    });
});

gulp.task('lint', () => {
  const fail = process.argv[2] !== '-i';
  const lint = gulp.src(all)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  if (fail) {
    return lint.pipe(jshint.reporter('fail'));
  } else {
    return lint;
  }
});

gulp.task('build', () => {
  const entryFile = './src/main/View.jsx';
  const bundler = browserify(entryFile, {
    extensions: ['.js', '.jsx']
  });

  bundler.transform(babelify.configure({
    presets: ['es2015', 'react']
  }));

  const stream = bundler.bundle();
  stream.on('error', (error) => {
    console.error(error.message);
    console.error(error.codeFrame);
    process.exit(1);
  });

  stream
    .pipe(vinyl_source_stream(entryFile))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('src/static/'));
});

gulp.task('default', () => {
  runSequence('test');
});
