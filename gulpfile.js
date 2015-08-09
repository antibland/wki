var gulp = require('gulp');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer')
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');

gulp.task('compress', function() {
  return gulp.src([
      'public/javascripts/utilities.js',
      'public/javascripts/dropdown.js',
      'public/javascripts/global.js'
    ])
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/dist/js'))
    .pipe(livereload());
});

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
  gulp.watch('public/javascripts/*.js', ['compress']);
});

gulp.task('default', ['watch']);
