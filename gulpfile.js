var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer')
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');

gulp.task('build-css', function() {
  return gulp.src('public/stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .on('error', function (err) {
      gutil.log(err);
      this.emit('end');
    })
    .pipe(cssmin())
    .pipe(autoprefixer({
      browsers: [
        '> 1%',
        'last 2 versions',
        'firefox >= 4',
        'safari 7',
        'safari 8',
        'IE 9',
        'IE 10',
        'IE 11'
      ],
      cascade: false
    }))
    .pipe(gulp.dest('public/stylesheets')).on('error', gutil.log)
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('public/stylus/*.styl', ['build-css']);
});

gulp.task('default', ['watch']);
