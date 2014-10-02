var uuid = require('node-uuid');



function Section(data, fixture){
	this.id = uuid.v4();
	this.key = fixture.key;

	var steps = [];

	data.steps.forEach(function(x){
		// TODO -- has to be smart enough to deal w/ comments, TODO

		var grammar = fixture.find(x.key);
		var step = grammar.buildStep(x);  

		steps.push(step);
	});

	this.steps = steps;
}

Section.prototype.descendents = function(){
	// TODO -- this will need to be recursive later
	return this.steps;
}

Section.prototype.write = function(){
	throw new Error('Not implemented yet');
}

Section.prototype.pack = function(){
	throw new Error('Not implemented yet');
}



module.exports = Section;