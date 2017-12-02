let gulp = require("gulp"),
  { config } = require("../package.json"),
  clean = require("gulp-clean");
  

gulp.task('clean', () => {
  return gulp.src([
      config.build.css,
      config.build.js,
      config.build.img,
      config.build.html
    ], { read: false })
    .pipe(clean())
})

gulp.task('clean:img', () => {
  return gulp.src(config.build.img, { read: false })
    .pipe(clean())
})

gulp.task('clean:js', () => {
  return gulp.src(config.build.js, { read: false })
    .pipe(clean())
})

gulp.task('clean:style', () => {
  return gulp.src(config.build.css, { read: false })
    .pipe(clean())
})

gulp.task('clean:html', () => {
  return gulp.src(config.build.html, { read: false })
    .pipe(clean())
})