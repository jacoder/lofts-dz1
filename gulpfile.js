var gulp=require('gulp');
var concatCSS= require('gulp-concat-css');
var rename= require('gulp-rename');
var notify= require('gulp-notify');
var connect= require('gulp-connect');
var minifyCSS= require('gulp-minify-css');
var liveReload= require('gulp-livereload');
var browserSync=reuire('browser-sync');

gulp.task('connect',function(){
  connect.server({
    // root:'app',
    root:'.',
    livereload:true
  } )
})

gulp.task('server',function(){
  browserSync({
    port:9000,
    server:{
      baseDir:'app'
    }
  });
});

gulp.task('css',function(){
  gulp.src('css/*.css')
  .pipe(concatCSS("bundle.css"))
  // .pipe(minifyCSS("bundle.css"))
  .pipe(minifyCSS(''))
  .pipe(rename("bundle.min.css"))
  .pipe(gulp.dest("app/css"))
  .pipe(connect.reload())

  // .pipe(livereload())
  // .pipe(notify('Done!'))
  ;
}
)

gulp.task('html',function(){
    gulp.src('index.html')
    .pipe(connect.reload())
}

)


gulp.task('watch',function(){
  gulp.watch('css/*.css',['css']);
  gulp.watch('index.html',['html']);

})

gulp.task('default',['connect','html','css','watch'])
