var Cell = require('./cell');
var Line = require('./line');
var PreviewContainer = require('./preview-container');


function Loader(){
	var loader = this;

	this.add = function(method, path){
		var component = require(path);
		loader[method] = function(props){
			return component(props);
		}
	}
}

var loader = new Loader();
loader.add('cell', './cell');
loader.add('line', './line');
loader.add('previewContainer', './preview-container');
loader.add('specPreview', './spec-preview');
loader.add('previewCell', './preview-cell');

module.exports = loader;
