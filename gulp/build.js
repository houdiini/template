let gulp = require("gulp"),
	runSequence = require("run-sequence");

gulp.task('build:dev', () => {
	runSequence('clean', ['style', 'script', 'img'])
});