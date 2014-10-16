var uuid = require('node-uuid');

function Arg(cell, data){
	this.key = cell.key;
	this.result = null;
	this.cell = cell;
	this.changed = false;
	this.data = data;

	this.value = data.cells[this.key] || cell.default;
	this.id = data.id || uuid.v4(); // the default id is only for testing

	return this;
}

Arg.isMissing = function(props){
	return props.value == null && props.cell.default == null;
}

Arg.status = function(props){
	if (props.result){
		return props.result.status || 'ok';
	}
	else {
		return 'ok';
	}
}

Arg.prototype.isMissing = function(){
	return Arg.isMissing(this);
}

Arg.prototype.store = function(data){
	if (!data.cells) data.cells = {};

	data.cells[this.key] = this.value || this.cell.default;
}





module.exports = Arg;