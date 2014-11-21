function StepHolder(){
	var self = this;

	self.steps = [];

	self.addStep = function(step){
		step.parent = self;

		self.steps.push(step);
	}
}

module.exports = StepHolder;