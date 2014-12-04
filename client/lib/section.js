var uuid = require('node-uuid');
var StepHolder = require('./step-holder');


function Section(data, library){
	StepHolder.call(this, data.id);

	var fixture = library.find(data.key);
	if (fixture == null){
		throw new Error('Unknown Fixture ' + data.key);
	}

	this.key = fixture.key;
	this.type = 'section';
	this.fixture = fixture;

	this.readSteps(data, library);
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

Section.prototype.editor = function(loader){
	throw new Error('Not implemented yet');
}

Section.prototype.editorWithoutChrome = function(loader){
	throw new Error('Not implemented yet');
}

module.exports = Section;