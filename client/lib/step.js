
var uuid = require('node-uuid');
var ArgCollection = require('./arg-collection');

function Step(data, cells, grammar){
	this.id = data.id || uuid.v4();
	this.args = new ArgCollection(cells, data, this.id);
	this.key = data.key;
	this.type = 'step';
	this.grammar = grammar; // set by the StepHolder.buildStep() method
}

Step.prototype.children = function(){
	
	// TODO -- gotta get table data
	return [];
}

Step.prototype.write = function(){
	var data = {key: this.key, cells: {}};

	this.args.store(data);

	return data;
}

Step.prototype.pack = function(){
	var data = this.write();
	data.id = this.id;

	return data;
}

Step.prototype.findValue = function(key){
	var arg = this.args.find(key);
	if (arg == null) return null;

	return arg.value || arg.default;
}

Step.prototype.preview = function(loader){
	return this.grammar.preview(this, loader);
}

Step.prototype.editor = function(loader){
	return this.grammar.editor(this, loader);
}

Step.prototype.findByPath = function(path){
	return this.args.find(path);
}

Step.prototype.isHolder = function(){
	// TODO: Will need to get fancier later when we
	// introduce embedded sections and tables
	return false;
}

Step.prototype.clearActiveState = function(){
	this.args.clearActiveState();
}


module.exports = Step;