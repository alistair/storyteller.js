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

	var self = this;

	data.steps.forEach(function(x){
		// TODO -- has to be smart enough to deal w/ comments, TODO
		var grammar = fixture.find(x.key);
		var step = grammar.buildStep(x);  

		self.addStep(step);
	});

	return self;
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

module.exports = Section;