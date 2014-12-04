var StepHolder = require('./step-holder');

function Specification(data, library){
	StepHolder.call(this, data.id);

	this.title = data.title;

	this.type = 'specification';

	this.readSteps(data, library);

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