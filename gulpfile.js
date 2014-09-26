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


gulp.task('css', function(){
	var glob = ['node_modules/bootstrap/dist/css/bootstrap.min.css'];

	return gulp.src(glob)
		.pipe(new gulp.dest('client/public/stylesheets'));

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





gulp.task('mocha:watch', function() {
    gulp.watch('client/components/*.jsx', ['react']);
    gulp.watch(['working/**', 'test/**'], ['mocha']);
});

var mocha_webpack_config = {
    entry: client_entry_file,
    output: {
        path: __dirname + '/test',
        filename: "bundle.js",
        publicPath: '/javascript/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx$/, loader: 'jsx' },
        ]
    }
};

var client_entry_file = "./test/mocha-entry.js";
var client_test_folder = __dirname + '/test/';


gulp.task('test:client', function(){
    var karma = require('gulp-karma');
    var entryWriter = require('./util/webpack-test-bundle');

    return gulp.src(client_entry_file)
        .pipe(entryWriter({folder: client_test_folder, entryFile: client_entry_file, excludes: ['bundle.js']}))
        .pipe(webpack(mocha_webpack_config))
        .pipe(gulp.dest('./test'))
        .pipe(karma({
          configFile: 'karma.conf.js',
          action: 'run'
        }))
        .on('error', function(err) {
          // Make sure failed tests cause gulp to exit non-zero
          throw err;
        });

});






