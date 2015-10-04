var gulp = require('gulp');
var concatCSS = require('gulp-concat-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
//var connect = require('gulp-connect');
var minifyCSS = require('gulp-minify-css'); // css minification
var liveReload = require('gulp-livereload');
var bs = require('browser-sync').create('DZ1 server');
var useref = require('gulp-useref');
var plumber = require('gulp-plumber');

var root = 'app';   ///*ja server root path
var paths = {
    index: '/index.html'
    //,root:
    , scripts: '/**/*.js'
    , styles: '/**/*.css'
    , images: '/img/**/*'
}

//gulp.task('connect', function() {
//  connect.server({
//    // root:'app',
//    root: root,
//    livereload: true
//  })
//});

gulp.task('server', function () {

    ///*ja Done according to http://www.browsersync.io/docs/api/index.html#api-watch
    bs.watch("app/*.html").on("change", bs.reload);
    bs.watch("app/css/*.css", function (event, file) {
    if (event === "change") {
        bs.reload("*.css");
    }
});

    bs.init({
        port: 9000,
        server: {
            baseDir: root //,
            //files: [root + paths.scripts, '/css/*.css']//paths.styles]//root + paths.styles]
        }
    });
});


//// Build

gulp.task('css', function () {
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

gulp.task('html', function () {
        var assets = useref.assets();

        gulp.src('index.html')
            .pipe(connect.reload())
    }
)


gulp.task('watch', function () {

// ja Не работает Finished 'watch' after 27 ms
//  gulp.watch([
//      'app/*.html',
//      'app/js/**/*.js',
//      'app/сss/**/*.css'
//    ])
//    .on('change', bs.reload);

//gulp.watch(paths.styles).on('change',bs.reload);
    gulp.watch('app/сss/**/*.css').on('change', bs.reload);

    // gulp.watch('css/*.css',['css']);
    // gulp.watch('index.html',['html']);

});

// gulp.task('default', ['connect', 'html', 'css', 'watch'])
gulp.task('default', ['server', 'watch']);
