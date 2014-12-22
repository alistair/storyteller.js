var StepHolder = require('./step-holder');
var _ = require('lodash');

function Specification(data, library){
	StepHolder.call(this, data.id);

	this.title = data.title;
	this.byId = {};
	this.type = 'specification';


	this.children = function(){
		return this.steps;
	}

	this.grammars = function(){
		return _.sortBy(library.fixtures, function(x){
			return x.title;
		});
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

	// TODO -- only spiked, needs tests
	this.preview = function(loader){
		var components = this.buildComponents(function(x){
			return x.preview(loader);
		});

		var props = {title: this.title, components: components};

		var component = loader.specPreview(props);

		return component;
	}

	this.editor = function(loader){
		var components = this.buildComponents(function(x){
			return x.editor(loader);
		});

		var props = {title: this.title, components: components, subject: this};

		var component = loader.specEditor(props);

		return component;
	}



	this.find = function(id){
		if (this.byId.hasOwnProperty(id)){
			return this.byId[id];
		}

		return null;
	}

	this.undoList = [];
	this.redoList = [];

	this.apply = function(change){
		change.apply(this);
		this.undoList.push(change);

		this.redoList = [];
	}

	this.changeStatus = function(){
		return {applied: this.undoList.length, unapplied: this.redoList.length};
	}

	this.undo = function(){
		if (this.undoList.length == 0) return;

		var last = this.undoList.pop();
		last.unapply(this);

		this.redoList.push(last);
	}

	this.redo = function(){
		if (this.redoList.length == 0) return;

		var last = this.redoList.pop();
		last.apply(this);

		this.undoList.push(last);
	}

	var removeStepBase = this.removeStep;

	this.removeStep = function(step){
		delete this.byId[step.id];
		return removeStepBase(step);
	}



	this.storeStep = function(step){
		this.byId[step.id] = step;
	}

	this.readSteps(data, library);

	var self = this;
	var readHolder = function(holder){
		self.byId[holder.id] = holder;

		if (!holder.children)
			return;

		var children = holder.children();
		for (var i = 0; i < children.length; i++){
			readHolder(children[i]);
		}
	}

	var _activeCell = null;
	var _activeHolder = null;

	var replaceHolder = function(value){
		if (_activeHolder){
			if (_activeHolder == value) return false;

			_activeHolder.active = false;
		}

		value.active = true;
		_activeHolder = value;

		return true;
	}

	self.selectCell = function(id, cell){
		var step = this.find(id);
		if (!step){
			throw new Error('Unable to find a step with id: ' + id);
		}

		// TODO -- gotta make this step.findArg(cell) so that comment
		// can work.
		var arg = step.findByPath(cell);
		if (!arg){
			throw new Error("Unable to find a cell named " + cell + '" for id: ' + id);
		}

		this.activeCell = arg;
		replaceHolder(step.parent);
	}

	self.selectHolder = function(id){
		var holder = this.find(id);

		if (!holder){
			throw new Error('Unable to find the specified holder with id: ' + id);
		}

		this.activeHolder = holder;
	}

	Object.defineProperty(self, 'activeCell', {
		enumerable: true,
		writeable: true,
		get: function(){
			return _activeCell;
		},
		set: function(value){
			if (_activeCell){
				if (_activeCell == value) return;

				_activeCell.active = false;
			}

			value.active = true;
			_activeCell = value;
		}
	});

	Object.defineProperty(self, 'activeHolder', {
		enumerable: true,
		writeable: true,
		get: function(){
			return _activeHolder;
		},
		set: function(value){
			if (replaceHolder(value)){
				if (_activeCell){
					_activeCell.active = false;
					_activeCell = null;
				}
			}

		}	
	});

	readHolder(this);


	// shouldn't be necessary, but still
	this.clearActiveState();
	var lastHolder = _.findLast(this.steps, function(x){
		return x.isHolder();
	});

	if (lastHolder){
		lastHolder.active = true;
		_activeHolder = lastHolder;
	}
	else {
		_activeHolder = this;
		this.active = true;
	}


}



module.exports = Specification;