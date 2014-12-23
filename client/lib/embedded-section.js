var Section = require('./section');

function EmbeddedSection(metadata){

}

EmbeddedSection.prototype.buildStep = function(data){
	throw new Error("Not implemented yet!");
}

EmbeddedSection.prototype.newStep = function(){
	throw new Error("Not implemented yet!");
}

EmbeddedSection.prototype.editor = function(step, loader){
	throw new Error("Not implemented yet!");
}


EmbeddedSection.prototype.preview = function(step, loader){
	throw new Error("Not implemented yet!");
}

EmbeddedSection.prototype.editorWithoutChrome = function(step, loader){
	throw new Error("Not implemented yet!");
}