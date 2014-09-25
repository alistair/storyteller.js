var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var webpack = require('gulp-webpack');
var _ = require('lodash');
/*
Tasks
-------------------
1.) Default: do a full web pack for prod, do all mocha tests
2.) test
3.) test-watch
4.) harness -- does the webpack watch thing
5.) test:client
6.) 




*/


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

gulp.task('mocha:watch', function() {
    gulp.watch('client/components/*.jsx', ['react']);
    gulp.watch(['working/**', 'test/**'], ['mocha']);
});

gulp.task("harness", ['css'], function(){
    var stream = gulp.src('bundle.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('client/public/javascript/'));

        stream.on('end', function(){
            console.log('Starting up the react hot loading harness at http://localhost:3000...');

            var childProcess = require('child_process');
            var runner = childProcess.spawn('node', ['server.js']);

            runner.stdout.on('data', function (data) {
              if (data.toString().indexOf('bundle is now VALID') > -1){
                console.log("Launching the browser now...");
                var open = require("open");
                open("http://localhost:3000/harness.htm");
                console.log("CTRL-C to stop the web server");
              }
            });
        });

        return stream;
});


function StringBuilder(text){
    this.text = '';
    var endOfLine = require('os').EOL;

    this.appendLine = function(text){
        if (arguments.length == 0){
            this.text = this.text + endOfLine;
            return;
        }

        this.text = this.text + text + endOfLine;
    };

    if (text){
        this.appendLine(text);
    }

    return this;
}

gulp.task('mocha:entry', function(){
    var fs = require('fs');
    var path = require('path');

    var folder = __dirname + '/test/';
    console.log(folder);

    fs.readdir(folder, function(err, files) {
        var builder = new StringBuilder('// AUTO-GENERATED by the gulp mocha:entry task');

        files = _.filter(files, function(f){return path.extname(f) === '.js';});
        files.forEach(function(file){
            if (file === 'mocha-entry.js') return;

            var line = "require('" + folder + file + "');";
            builder.appendLine(line);
        });

        var entryFile = "./test/mocha-entry.js";
        fs.writeFile(entryFile, builder.text, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Wrote the mocha entry file to " + entryFile);
            }
        }); 

    });

});



