let gulp = require("gulp"),
	runSequence = require("run-sequence");

gulp.task('build:dev', () => {
	runSequence('clean', ['style', 'script', 'img'])
});

gulp.task('build:watch', () => {
	runSequence('clean', ['style:watch', 'script:watch', 'img:watch', 'html:watch'], 'server');
})