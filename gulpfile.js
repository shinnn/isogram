/*jshint unused:true */
'use strict';

var spawn = require('child_process').spawn;

var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var gulp = require('gulp');
var mergeStream = require('merge-stream');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var tapSpec = require('tap-spec');
var toCamelCase = require('to-camel-case');

gulp.task('lint', function() {
  gulp.src('*.js')
    .pipe($.jscs('package.json'))
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish))
    .pipe($.jshint.reporter('fail'));
  gulp.src('*.json')
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
});

gulp.task('clean', rimraf.bind(null, 'dist'));

gulp.task('build', ['lint', 'bower-install', 'clean'], function() {
  var browser = gulp.src('index.js')
    .pipe($.replace(/^.+?require.+?\n/mg, ''))
    .pipe($.replace(new RegExp(bowerDeps.join('|'), 'g'), 'window.$&'))
    .pipe($.replace('module.exports', 'window.isogram'))
    .pipe($.rename(bower.main))
    .pipe(gulp.dest(''));

  var standalone = browserify({
    entries: ['./index.js'],
    standalone: 'isogram'
  })
    .bundle()
    .pipe(source('isogram-standalone.js'))
    .pipe(gulp.dest('dist'));

  return mergeStream(browser, standalone);
});

gulp.task('test', ['build'], function(cb) {
  var cp = spawn('node', ['node_modules/.bin/tape', 'test*.js'], {
    stdio: [null, null, process.stderr]
  });
  cp.stdout.pipe(tapSpec()).pipe(process.stdout);
  cp.on('close', function(code) {
    cb(code ? new Error('Exited with code ' + code) : null);
  });
});

gulp.task('watch', function() {
  gulp.watch('{,src/}*.js', ['test']);
  gulp.watch('{*.json,.jshintrc}', ['lint']);
});

gulp.task('default', ['test', 'watch']);
