var uuid = require('node-uuid');

function Arg(cell, data, id){
	if (!id){
		throw new Error('No id for the data passed into Arg: ' + JSON.stringify(data));
	}

	this.key = cell.key;
	this.result = null;
	this.cell = cell;
	this.changed = false;
	this.data = data;
	this.editing = false;

	this.value = data.cells[this.key] || cell.default;
	this.id = id

	if (!this.cell.editor){
		this.cell.editor = 'text';
	}

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