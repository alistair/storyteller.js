var StepHolder = require('./step-holder');

function Specification(data, library){
	StepHolder.call(this);

	this.title = data.title;

	for (var i = 0; i < data.steps.length; i++){
		var step = library.buildStep(data.steps[i]);
		this.addStep(step);
	}
}

module.exports = Specification;