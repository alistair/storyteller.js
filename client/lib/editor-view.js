var loader = require('./../components/component-loader');
var React = require("react");

function EditorView(){
	// TODO -- support alternative layouts

	this.editor = null;
	this.sectionMenu = null;
}

// have this tear down React components
EditorView.prototype.tearDown = function(){
	throw new Error('not yet...');
}

EditorView.prototype.updateSpec = function(spec){
	if (this.editor == null){
		this.editor = React.renderComponent(
			spec.editor(loader), document.getElementById('editor-pane'));
	}
	else {
		throw new Error('can only do fresh, not updating yet');
	}
}

EditorView.prototype.displaySectionMenu = function(section){
	throw new Error('not implemented yet');
}

EditorView.prototype.hideSectionMenu = function(){
	throw new Error('not implemented yet');
}

module.exports = EditorView;