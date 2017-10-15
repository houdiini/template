const gulp = require("gulp"),
    {config} = require("../package.json");

gulp.task('html', () => {
    return gulp.src(config.src.html)
            .pipe(gulp.dest(config.build.html))
})

gulp.task('html:watch', () => {
    gulp.watch(config.src.html, ['html'])
})

