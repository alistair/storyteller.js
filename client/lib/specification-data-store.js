var FixtureLibrary = require('./fixture-library');
var Specification = require('./specification');

function SpecificationDataStore(){
	this.spec = null;
	this.steps = {};
	this.library = null;


	this.activateFixtures = function(fixtures){
		// TODO -- make this be more selective later?
		this.library = new FixtureLibrary(fixtures);
	}

	this.loadSpecification = function(data){
		this.spec = new Specification(data, this.library);
		var steps = {};

		var readHolder = function(holder){
			steps[holder.id] = holder;

			var children = holder.children();
			for (var i = 0; i < children.length; i++){
				readHolder(children[i]);
			}
		}

		readHolder(this.spec);

		this.steps = steps;
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

	this.find = function(id){
		if (this.steps.hasOwnProperty(id)){
			return this.steps[id];
		}

		return null;
	}

	this.removeStep = function(step){
		delete this.steps[step.id];
	}

	this.storeStep = function(step){
		this.steps[step.id] = step;
	}
}

module.exports = SpecificationDataStore;