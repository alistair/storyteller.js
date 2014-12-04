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

	this.write = function(){
		return {
			title: this.title,
			steps: this.writeSteps()
		}
	}

	this.pack = function(){
		return {
			steps: this.packSteps()
		}
	}
}

module.exports = Specification;