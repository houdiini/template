let gulp       = require("gulp"),
    uglify     = require("gulp-uglify"),
    // babelify   = require("babelify"),
    browserify = require("gulp-browserify"),
    vueify     = require("vueify"),
    rename     = require("gulp-rename"),
    runSequence = require("run-sequence"),
    {config}     = require("../package.json");

gulp.task('script', () => {
    let transformations = [];
    if (config.es6)
        transformations.push("babelify");
    if (config.vue)
        transformations.push('vueify')

    return gulp.src(config.src.js)
            .pipe(browserify({
                transform: transformations
            }))
            .pipe(gulp.dest(config.build.js))
            // .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(config.build.js))
});

gulp.task('script:watch', ['script'], () => {
    gulp.watch(config.src.js + '/*.js', function() { runSequence('clean:js', 'script') });
})