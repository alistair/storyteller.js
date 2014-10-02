var uuid = require('node-uuid');
var ArgCollection = require('./arg-collection');

function Step(data, cells){
	this.id = uuid.v4();
	this.args = new ArgCollection(cells, data);
	this.key = data.key;
}

Step.prototype.descendents = function(){
	
	// TODO -- gotta get table data
	return [];
}

Step.prototype.write = function(){
	var data = {key: this.key, cells: {}};

	console.log('args: ' + this.args.length);
	this.args.store(data);

	return data;
}

Step.prototype.pack = function(){
	var data = this.write();
	data.id = this.id;

	return data;
}

// TODO -- add a UT
Step.prototype.findValue = function(key){
	var arg = this.args.find(key);
	if (arg == null) return null;

	return arg.value || arg.default;


}


module.exports = Step;