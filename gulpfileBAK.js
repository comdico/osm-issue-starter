var gutil = require('gulp-util');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


gulp.task('reloadit', function() {
    browserSync.init({
        proxy: "http://osm:8888/guides/surgical-construction/2018/toc.html"
    });
    gulp.watch("2018/*.html").on("change", browserSync.reload);
    gulp.watch("2018/css/*.css").on("change", browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src('2018/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('2018/css'))
})

gulp.task('watch', function(){
  gulp.watch('2018/scss/**/*.scss', ['sass']);

  // Other watchers
})


//Build tasks for distribution - TODO add image minify
gulp.task('copy-css', function() {
  return gulp
  .src('2018/css/article.css')
  .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-images', function() {
  return gulp
  .src('2018/images/**/*.{png,jpg,gif}')
  .pipe(gulp.dest('dist/images'));
});




// Gulp Tasks
gulp.task('build', ['copy-css', 'copy-images']);

gulp.task('default', ['sass', 'watch', 'reloadit']);
