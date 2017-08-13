let gulp   = require("gulp"),
    {config} = require("../package.json"),
    clean  = require("gulp-clean");

gulp.task('clean', () => {
    return gulp.src([
                      config.build.css, 
                      config.build.js,
                      config.build.img,
                      config.build.html
                    ], {read: false})
        .pipe( clean() )
})