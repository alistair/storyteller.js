var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('default', function() {
  console.log('Hello!');
});

gulp.task('mocha', function(){
    return gulp.src(['test/test-*.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            globals: {}
        }));
});

gulp.task('css', function(){
	var glob = ['node_modules/bootstrap/dist/css/bootstrap.min.css'];

	return gulp.src(glob)
		.pipe(new gulp.dest('client/public/stylesheets'));

});

gulp.task('watch-mocha', function() {
    gulp.watch(['lib/**', 'test/**'], ['mocha']);
});