var _ = require('lodash');

function StubLoader(){
	this.add = function(method){
		this[method] = function(props){
			return {
				type: method, 
				props: props
			};
		}
	}


	this.add('cell');
	this.add('line');
	this.add('previewContainer');
	this.add('specPreview');
	this.add('previewCell');
	this.add('chromedLine');
	this.add('editorMenu');
	this.add('editor');
	this.add('editorContainer');
	this.add('specEditor');
	this.add('specChrome');
	this.add('commentEditor');

	this.span = function(text){
		return {type: 'span', text: text};
	}

	return this;
}

module.exports = StubLoader;