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
loader.add('cell', './Cell');
loader.add('line', './line');
loader.add('previewContainer', './preview-container');
loader.add('specPreview', './spec-preview');
loader.add('previewCell', './preview-cell');
loader.add('chromedLine', './line-with-chrome');
loader.add('editorContainer', './editor-container');
loader.add('specEditor', './editor-container');
loader.add('specChrome', './spec-chrome');
loader.add('editorMenu', './editor-menu');
loader.add('commentEditor', './comment-editor');

module.exports = loader;
