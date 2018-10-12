const gulp = require('gulp');
const { config } = require('../package.json');
let notify = require('gulp-notify');
let plumber = require('gulp-plumber');
let inject = require('gulp-inject');
let htmlmin = require('gulp-htmlmin');
let gutil = require('gulp-util');


gulp.task('html', () => {
  let sources = gulp.src([config.build.js + '/*.js', config.build.css + '/*.css'], {read: false});

  return gulp.src(config.src.html)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(inject(sources, {
      transform: djangoStatic
    }))
    .pipe(inject(sources, {
      starttag: '<!-- inject:head -->',
      transform: djangoStaticPreload
    }))
    .pipe(gutil.env.type === 'production' ? htmlmin({collapseWhitespace: true}) : gutil.noop())
    .pipe(gulp.dest(config.build.html));
});

gulp.task('html:watch', ['html'], () => {
  gulp.watch([config.src.html, config.build.js, config.build.css], ['html']);
});

/**
 *
 * @function djangoStatic
 * Подставляет css и js в темплейт
 *
 */
function djangoStatic(filepath) {
  if (filepath.slice(-4) === '.css') {
    return `<link rel="stylesheet" href="{% static '${ filepath }' %}">`;
  } else if (filepath.slice(-3) === '.js') {
    return `<script src="{% static '${ filepath }' %}"></script>`;
  } else {
    // Use the default transform as fallback:
    return inject.transform.apply(inject.transform, arguments);
  }
};

function djangoStaticPreload(filepath) {
  if (filepath.slice(-4) === '.css') {
    return `<link rel="preload" href="{% static '${ filepath }' %}" as="style">`;
  } else if (filepath.slice(-3) === '.js') {
    return `<link rel="preload" href="{% static '${ filepath }' %}" as="script">`;
  }
};