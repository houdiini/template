const gulp = require('gulp');
const { config } = require('../package.json');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');
let inject = require('gulp-inject');
let htmlmin = require('gulp-htmlmin');
let gutil = require('gulp-util');
let runSequence = require('run-sequence');

gulp.task('html', () => {
  let sources = gulp.src([config.build.js + '/*.js', config.build.css + '/*.css'], {read: false});

  return gulp.src(config.src.html)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(inject(sources, {
      transform: staticInject
    }))
    .pipe(inject(sources, {
      starttag: '<!-- inject:head -->',
      transform: staticPreload
    }))
    .pipe(gutil.env.type === 'production' ? htmlmin({collapseWhitespace: true}) : gutil.noop())
    .pipe(gulp.dest(config.build.html));
});

gulp.task('html:watch', ['html'], () => {
  gulp.watch([config.src.html, config.build.root + '/assets/**/*'], function() {
    runSequence('html', 'server:reload');
  });
});

function staticInject(filepath) {
  if (filepath.slice(-4) === '.css') {
    return `<link rel="stylesheet" href="${ filepath }">`;
  } else if (filepath.slice(-3) === '.js') {
    return `<script src="${ filepath }"></script>`;
  } else {
    // Use the default transform as fallback:
    return inject.transform.apply(inject.transform, arguments);
  }
};

function staticPreload(filepath) {
  if (filepath.slice(-4) === '.css') {
    return `<link rel="preload" href="${ filepath }" as="style">`;
  } else if (filepath.slice(-3) === '.js') {
    return `<link rel="preload" href="${ filepath }" as="script">`;
  }
};