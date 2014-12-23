var Section = require('./section');
var Fixture = require('./fixture');
var Step = require('./step');

function EmbeddedSection(metadata){
	this.key = metadata.key;
	this.fixture = new Fixture(metadata.fixture);
	this.title = metadata.title || this.fixture.title;
	this.collection = metadata.collection || 'steps';
}

EmbeddedSection.prototype.buildStep = function(data){
	var step = new Step(data, [], this);

	var steps = this.readSection(data);
	var section = new Section({steps: steps}, this.fixture);

	this.writeSection(step, section);

	return step;
}

EmbeddedSection.prototype.writeSection = function(step, section){
	step.collections[this.collection] = section;
}

EmbeddedSection.prototype.readSection = function(step){
	return step.collections[this.collection];
}

EmbeddedSection.prototype.newStep = function(){
	var step = new Step({}, [], this);
	var section = new Section({steps: []}, this.fixture);
	this.writeSection(step, section);

	return step;
}

EmbeddedSection.prototype.editor = function(step, loader){
	var section = this.readSection(step);
	return section.editor(loader, step);
}


EmbeddedSection.prototype.preview = function(step, loader){
	throw new Error("Not implemented yet!");
}

EmbeddedSection.prototype.editorWithoutChrome = function(step, loader){
	throw new Error("Not implemented yet!");
}

module.exports = EmbeddedSection;