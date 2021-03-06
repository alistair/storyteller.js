var fs = require('fs');
var path = require('path');
var _ = require('lodash');

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


function writeFile(folder, entryFile, excludes){
    excludes = excludes || [];

    var filter = function(f){
        if (path.basename(entryFile) == f) return false;

        if (path.extname(f) === '.js'){
            return !_.contains(excludes, f);
        }

        return false;
    }


    fs.readdir(folder, function(err, files) {
        var builder = new StringBuilder('// AUTO-GENERATED by the webpack-test-bundle package');

        files = _.filter(files, filter);
        files.forEach(function(file){
            var line = "require('" + folder + file + "');";
            builder.appendLine(line);
        });

        fs.writeFile(entryFile, builder.text, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Wrote the webpack test entry file to " + entryFile);
            }
        }); 

    });
}


var through = require('through');

var pipe = function(options){
    return through(function(data){
        this.emit('data', data);
    },
    function end () {
        writeFile(options.folder, options.entryFile, options.excludes);

        this.emit('end');
    });
}

pipe.writeFile = writeFile;

module.exports =pipe;

