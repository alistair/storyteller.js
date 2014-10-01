function Arg(cell, data){
	this.key = cell.key;
	this.result = null;
	this.cell = cell;
	this.changed = false;

	this.value = data.cells[this.key] || cell.default;
}

Arg.prototype.isMissing = function(){
	return this.value == null && this.cell.default == null;
}

Arg.prototype.store = function(data){
	if (!data.cells) data.cells = {};

	data.cells[this.key] = this.value || this.cell.default;
}

module.exports = Arg;