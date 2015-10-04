var gulp = require('gulp');
var concatCSS = require('gulp-concat-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var connect = require('gulp-connect');
var minifyCSS = require('gulp-minify-css'); // css minification
var liveReload = require('gulp-livereload');
var browserSync = require('browser-sync');
var useref=require('gulp-useref');


gulp.task('connect', function() {
  connect.server({
    // root:'app',
    root: 'app',
    livereload: true
  })
})

gulp.task('server', function() {
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });
});


//// Build

gulp.task('css', function() {
  gulp.src('app/css/*.css')
    .pipe(concatCSS("bundle.css"))
    // .pipe(minifyCSS("bundle.css"))
    .pipe(minifyCSS(''))
    .pipe(rename("bundle.min.css"))
    .pipe(gulp.dest("app/css"))
    .pipe(connect.reload())

  // .pipe(livereload())
  // .pipe(notify('Done!'))
  ;
})

gulp.task('html', function() {
  var assets=useref.assets();

    gulp.src('index.html')
      .pipe(connect.reload())
  }

)


gulp.task('watch', function() {
  gulp.watch([
      'app/*.html',
      'app/js/**/*.js',
      'app/сss/**/*.css'
    ])
    .on('change', browserSync.reload);

  // gulp.watch('css/*.css',['css']);
  // gulp.watch('index.html',['html']);

})

// gulp.task('default', ['connect', 'html', 'css', 'watch'])
gulp.task('default', ['server', 'watch']);
