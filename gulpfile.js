var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var webpack = require('gulp-webpack');
var _ = require('lodash');



gulp.task('default', ['css', 'test:client']);


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


var mocha = require('gulp-mocha');


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
var entryWriter = require('./util/webpack-test-bundle');
var client_entry_writer = entryWriter({folder: client_test_folder, entryFile: client_entry_file, excludes: ['bundle.js']})

gulp.task('test:client:lib', function(){
    return gulp.src('./client/lib-tests/test-*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('test:client', ['test:client:lib'], function(){
    var karma = require('gulp-karma');    

    return gulp.src(client_entry_file)
        .pipe(client_entry_writer)
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

gulp.task('test:client:entry', function(){
    return gulp.src(client_entry_file)
        .pipe(client_entry_writer);
});

gulp.task('test:client:build', function(){
    return gulp.src(client_entry_file)
        .pipe(webpack(mocha_webpack_config))
        .pipe(gulp.dest('./test'));
});

gulp.task('test:client:watch', ['test:client:entry', 'test:client:build'], function(){
    var entryWatcher = gulp.watch(['test/test-*.js']);

    var writeEntry = function(e){
        entryWriter.writeFile(client_test_folder, client_entry_file, ['bundle.js']);
    };

    entryWatcher.on('added', writeEntry);
    entryWatcher.on('deleted', writeEntry);

    var webpackWatcher = gulp.watch(['test/**/*.js', 'client/**/*.js', 'client/**/*.jsx', '!test/bundle.js'], ['test:client:build']);

    console.log("Starting up karma, type CTRL-C to stop");
    var karma = require('gulp-karma'); 
    return gulp.src('test/bundle.js')
        .pipe(karma({
          configFile: 'karma.conf.js',
          action: 'start'
        }));
});






