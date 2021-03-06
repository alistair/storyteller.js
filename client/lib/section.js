var uuid = require('node-uuid');
var StepHolder = require('./step-holder');
var _ = require('lodash');

function Section(data, fixture){
	StepHolder.call(this, data.id, fixture);

	if (fixture == null){
		fixture = library.find(data.key);
	}

	if (fixture == null){
		throw new Error('Unknown Fixture ' + data.key);
	}

	this.key = fixture.key;
	this.type = 'section';
	this.fixture = fixture;
	this.title = this.fixture.title;

	this.readSteps(data);
}

Section.prototype.children = function(){
	// TODO -- this will need to be recursive later
	return this.steps;
}

// for execution
Section.prototype.write = function(){
	return {
		key: this.key,
		type: 'section',
		steps: this.writeSteps()
	}
}

// for persistence
Section.prototype.pack = function(){
	return {
		key: this.key,
		id: this.id,
		type: 'section',
		steps: this.packSteps()
	}
}

Section.prototype.preview = function(loader){
	var components = this.buildComponents(function(x){
		return x.preview(loader);
	});

	return loader.previewContainer({title: this.fixture.title, components: components});
}

Section.prototype.editor = function(loader, deleteSubject){
	var components = this.buildComponents(function(x){
		return x.editor(loader);
	});

	if (!deleteSubject){
		deleteSubject = this;
	}

	return loader.editorContainer({title: this.fixture.title, components: components, subject: this, deleteSubject: deleteSubject});
}

// This will be *much* later for embedded sections
Section.prototype.editorWithoutChrome = function(loader){
	throw new Error('Not implemented yet');
}

Section.prototype.grammars = function(){
	return _.sortBy(this.fixture.grammars, function(x){
		return x.title;
	});
}

module.exports = Section;