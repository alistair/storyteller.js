var Section = require('./section');
var Fixture = require('./fixture');
var Step = require('./step');

function EmbeddedSection(metadata){
	this.key = metadata.key;
	this.fixture = new Fixture(metadata.fixture);
	this.title = metadata.title;
	this.collection = metadata.collection || 'steps';
}

EmbeddedSection.prototype.buildStep = function(data){
	var step = new Step(data, [], this);

	var steps = data.collections[this.collection];
	var section = new Section({steps: steps}, this.fixture);

	step.collections[this.collection] = section;

	return step;
}

EmbeddedSection.prototype.newStep = function(){
	var step = new Step({}, [], this);
	step.collections[this.collection] = new Section({steps: []}, this.fixture);

	return step;
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

module.exports = EmbeddedSection;