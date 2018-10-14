const gulp        = require('gulp');
const {config} = require('../package.json');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// Static server
gulp.task('server', function() {
  browserSync.init({
    open: false,
    server: {
      baseDir: config.build.html,
    }
  });
});

gulp.task('server:reload', function() {
  return reload();
});
