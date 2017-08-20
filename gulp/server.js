const gulp        = require('gulp'),
    {config} = require("../package.json");
    browserSync = require('browser-sync').create();

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: config.build.html
        }
    });
});