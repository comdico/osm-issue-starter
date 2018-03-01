var gutil = require('gulp-util');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var del = require('del');
const autoprefixer = require('gulp-autoprefixer');


// Start browserSync server
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "http://osm:8888/guides/surgical-construction/2018/toc.html"
  });
});


gulp.task('sass', function() {
  return gulp.src('2018/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('2018/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('2018/scss/**/*.scss', ['sass']);
  gulp.watch('2018/*.html', browserSync.reload);
});



//Build tasks for distribution - TODO add image minify
gulp.task('copy-css', function() {
  return gulp
  .src('2018/css/article.css')
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css'));
});

//Delete Dist first
gulp.task('clean', function() {
  return del.sync('dist');
})


gulp.task('copy-images', function() {
  return gulp
  .src('2018/images/**/*.{png,jpg,gif}')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'));
});

gulp.task('copy-html', function() {
  return gulp
  .src('2018/*.html}')
  .pipe(gulp.dest('dist/*.html'));
});




// Gulp Tasks
gulp.task('build', ['clean', 'copy-css', 'copy-images']);

gulp.task('default', function(callback) {
  runSequence(['sass', 'copy-html', 'browserSync'], 'watch',
    callback
  )
});
