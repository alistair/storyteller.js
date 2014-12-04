
var uuid = require('node-uuid');
var ArrayList = require('./array-list');
var _ = require('lodash');
var Comment = require('./comment');


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

	self.packSteps = function(){
		return _.map(self.steps, function(step){
			return step.pack();
		}).filter(function(x){
			return x != null;
		});
	}

	self.writeSteps = function(){
		return _.map(self.steps, function(step){
			return step.write();
		});
	}

	self.buildStep = function(data, library){
		if (data.type == 'comment') return new Comment(data.text);

		if (data.type == 'section'){
			var Section = require('./section');
			return new Section(data, library);
		}

		throw new Error('Unknown type for data: ' + JSON.stringify(data));
	}
}

module.exports = StepHolder;