var uuid = require('node-uuid');

function StepHolder(id){
	var self = this;

	self.id = id || uuid.v4();

	self.steps = [];

	self.addStep = function(step){
		step.parent = self;

		self.steps.push(step);
	}
}

module.exports = StepHolder;