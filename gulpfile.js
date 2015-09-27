var gulp=require('gulp');
var concatCSS= require('gulp-concat-css');
var rename= require('gulp-rename');
var notify= require('gulp-notify');
var minifyCSS= require('gulp-minify-css');

gulp.task('default',function(){
  gulp.src('css/*.css')
  .pipe(concatCSS("bundle.css"))
  // .pipe(minifyCSS("bundle.css"))
  .pipe(minifyCSS())
  .pipe(rename("bundle.min.css"))
  .pipe(gulp.dest("out/"));

}
)

gulp.task('watch',function(){
  gulp.watch('css/*.css',['default']);
}

)
