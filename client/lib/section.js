var uuid = require('node-uuid');
var StepHolder = require('./step-holder');


function Section(data, fixture){
	StepHolder.call(this);

	this.id = uuid.v4();
	this.key = fixture.key;

	var self = this;

	data.steps.forEach(function(x){
		// TODO -- has to be smart enough to deal w/ comments, TODO

		var grammar = fixture.find(x.key);
		var step = grammar.buildStep(x);  

		self.addStep(step);
	});

}

Section.prototype.descendents = function(){
	// TODO -- this will need to be recursive later
	return this.steps;
}

// for execution
Section.prototype.write = function(){
	throw new Error('Not implemented yet');
}

// for persistence
Section.prototype.pack = function(){
	throw new Error('Not implemented yet');
}



module.exports = Section;