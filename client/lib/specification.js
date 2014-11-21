var StepHolder = require('./step-holder');

function Specification(data, library){
	StepHolder.call(this, data.id);

	this.title = data.title;

	this.type = 'specification';

	for (var i = 0; i < data.steps.length; i++){
		var step = library.buildStep(data.steps[i]);
		this.addStep(step);
	}

	this.children = function(){
		return this.steps;
	}
}

module.exports = Specification;