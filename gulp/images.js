let gulp     = require("gulp"),
    imagemin = require("gulp-imagemin"),
    {config} = require("../package.json");

gulp.task('img', () => {
    return gulp.src(config.src.img + '/*')
        .pipe( imagemin( {
            interlaced: true,
            progressive: true,
            optimizationLevel: 89494,
            bitDepthReduction: false,
            verbose: true,
            svgoPlugins: [{removeViewBox: false}]
        } ) )
        .pipe(gulp.dest(config.build.img));
})

gulp.task('img:watch', ['img'], () => {
    return gulp.wacth(config.src.img, ['img']);
})