let gulp     = require('gulp');
let imagemin = require('gulp-imagemin');
let runSequence = require('run-sequence');
let {config} = require('../package.json');
const changed = require('gulp-changed');
let clean = require('gulp-clean');
// let cache = require('gulp-cached');


gulp.task('img', () => {
  return gulp.src(config.src.img)
    .pipe(changed(config.build.img))
    .pipe(imagemin( {
      interlaced: true,
      progressive: true,
      optimizationLevel: 89494,
      bitDepthReduction: false,
      verbose: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(config.build.img));
});

gulp.task('img:watch', ['clean:img', 'img'], () => {
  gulp.watch(config.src.img, function() { runSequence('img') });
});
