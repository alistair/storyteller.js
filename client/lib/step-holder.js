
var uuid = require('node-uuid');
var ArrayList = require('./array-list');
var _ = require('lodash');
var Comment = require('./comment');

function OutlineNode(holder){
	this.id = holder.id;
	this.title = holder.title;
	this.active = holder.active;

	this.children = _.filter(holder.steps, function(x){
		return x.isHolder();
	}).map(function(x){
		return new OutlineNode(x);
	});
}

function StepHolder(id){
	var self = this;

	self.id = id || uuid.v4();

	self.steps = new ArrayList();
	self.active = false;

	self.addStep = function(step){
		step.parent = self;

		self.steps.add(step);
	}

	self.isHolder = function(){
		return true;
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

	self.readSteps = function(data, library){
		if (!data.steps){
			return;
		}

		data.steps.forEach(function(x){
			var step = self.buildStep(x, library);
			self.addStep(step);
		});
	}


	self.buildStep = function(data, library, fixture){
		if (data.type == 'comment') return new Comment(data.text);

		if (data.type == 'section'){
			var Section = require('./section');
			return new Section(data, library);
		}

		if (self.fixture != null){
			// TODO -- be smart enough to deal w/ 'Missing/Unknown Grammar'
			var grammar = self.fixture.find(data.key);
			var step = grammar.buildStep(data);  
			
			return step;
		}

		throw new Error('Unknown type for data and no fixture: ' + JSON.stringify(data));
	}

	self.buildComponents = function(func){
		return _.map(self.steps, func);
	}

	self.findByPath = function(path){
		if ( !(path instanceof Array)){
			path = path.split('.');
		}

		if (path.length == 0) return null;

		var next = path.shift();
		var position = parseInt(next);
		if (isNaN(position)){
			if (next.length > 1){
				throw new Error('A cell address has to be the last value in the path dot notation');
			}
		}
		else {
			if (position >= this.steps.length){
				throw new RangeError('Index is out of range.');
			}

			var child = this.steps[position];
			if (path.length == 0){
				return child;
			}

			return child.findByPath(path);
		}

		// #.#.#.Letter or name

		

	}

	self.clearActiveState = function(){
		this.active = false;
		this.steps.forEach(function(x){
			x.clearActiveState();
		});
	}

	self.outline = function(){
		return new OutlineNode(this);
	}

}

module.exports = StepHolder;