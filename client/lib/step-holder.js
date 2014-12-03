var uuid = require('node-uuid');
var ArrayList = require('./array-list');

function StepHolder(id){
	var self = this;

	self.id = id || uuid.v4();

	self.steps = new ArrayList();

	self.addStep = function(step){
		step.parent = self;

		self.steps.add(step);
	}

	self.removeStep = function(step){
		var position = self.steps.indexOf(step);

		self.steps.removeAt(position);

		return position;
	}

	self.insertStep = function(index, step){
		step.parent = self;

		self.steps.insertAt(index, step);
	}

	self.clear = function(){
		self.steps = new ArrayList();
	}
}

module.exports = StepHolder;