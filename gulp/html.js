const gulp = require("gulp"),
  { config } = require("../package.json");
let notify = require("gulp-notify");
let plumber = require('gulp-plumber');

gulp.task('html', () => {
  return gulp.src(config.src.html)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(gulp.dest(config.build.html))
})

gulp.task('html:watch', () => {
  gulp.watch(config.src.html, ['html'])
})