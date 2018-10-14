let gulp = require('gulp'),
  runSequence = require('run-sequence');

gulp.task('build', () => {
  let env = 'production';
  this.env = 'production';
  this.production = true;
  process.env.NODE_ENV = env;
  return runSequence('clean', ['style', 'script', 'img'], 'html');
});

gulp.task('build:watch', () => {
  runSequence('clean', ['style:watch', 'script:watch',], 'html:watch', 'img:watch');
});

gulp.task('dev', ['build:watch', 'server'], () => {
  return '';
});
