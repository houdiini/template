let gulp = require('gulp'),
  csso = require('gulp-csso'),
  autoprefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  { config } = require('../package.json'),
  runSequence = require('run-sequence'),
  rename = require('gulp-rename');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');
let hash = require('gulp-hash');
let gutil = require('gulp-util');


gulp.task('style', () => {
  gulp.src(config.src.scss)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(sass())
    .pipe(autoprefix({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gutil.env.type === 'production' ? csso({ restructed: false }) : gutil.noop())
    .pipe(hash())
    .pipe(gulp.dest(config.build.css))
    // .pipe(gulp.dest('.'));
});

gulp.task('style:watch', ['style'], () => {
  return gulp.watch(config.src.scss, function() { runSequence('clean:style', 'style') });
})