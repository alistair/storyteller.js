var Cell = require('./cell');


function Arg(cell, data){
	this.key = cell.key;
	this.result = null;
	this.cell = cell;
	this.changed = false;
	this.data = data;

	this.value = data.cells[this.key] || cell.default;

	return this;
}

Arg.isMissing = function(props){
	return props.value == null && props.cell.default == null;
}

Arg.prototype.isMissing = function(){
	return Arg.isMissing(this);
}

Arg.prototype.store = function(data){
	if (!data.cells) data.cells = {};

	data.cells[this.key] = this.value || this.cell.default;
}



module.exports = Arg;