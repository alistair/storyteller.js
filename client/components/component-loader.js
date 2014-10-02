var React = require('react');

function Loader(){
	var loader = this;

	this.add = function(method, path){
		var component = require(path);
		loader[method] = function(props){
			return component(props);
		}
	}

	this.span = function(text){
		return React.DOM.span(null, text);
	}
}

var loader = new Loader();
loader.add('cell', './cell');
loader.add('line', './line');
loader.add('previewContainer', './preview-container');
loader.add('specPreview', './spec-preview');
loader.add('previewCell', './preview-cell');

module.exports = loader;
