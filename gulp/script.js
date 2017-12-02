let gulp = require("gulp"),
  uglify = require("gulp-uglify"),
  // babelify   = require("babelify"),
  browserify = require("gulp-browserify"),
  vueify = require("vueify"),
  rename = require("gulp-rename"),
  runSequence = require("run-sequence"),
  jsdoc = require('gulp-jsdoc3'),
  { config } = require("../package.json");
let notify = require("gulp-notify");
let plumber = require('gulp-plumber');

gulp.task('jsdoc', () => {
  if (config.doc)
    return gulp.src(['README.md', config.src.js])
      .pipe(jsdoc().on('error', (e) => {
        console.log(e);
        notify("Oops! JSdoc error")
      }))
})

gulp.task('script', ['jsdoc'], () => {
  let transformations = [];
  if (config.es6)
    transformations.push("babelify");
  if (config.vue)
    transformations.push('vueify')

  return gulp.src(config.src.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
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
  gulp.watch(config.src.js, function() { runSequence('clean:js', 'script') });
})