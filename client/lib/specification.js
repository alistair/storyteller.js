var StepHolder = require('./step-holder');

function Specification(data, library){
	StepHolder.call(this, data.id);

	this.title = data.title;
	this.byId = {};
	this.type = 'specification';


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

		var props = {title: this.title, components: components};

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

	this.removeStep = function(step){
		delete this.byId[step.id];
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

	readHolder(this);
}

module.exports = Specification;