var Arg = require('./arg');

function ArgCollection(cells, data){
	var args = {};

	cells.forEach(function(cell){
		var arg = new Arg(cell, data);
		args[arg.key] = arg;
	});

	this.args = args;
	this.length = cells.length;
}

ArgCollection.prototype.find = function(key){
	return this.args[key];
}

ArgCollection.prototype.allKeys = function(){
	var allCells = [];
	for (key in this.args){
		allCells.push(key);
	}

	return allCells;
}

ArgCollection.prototype.store = function(data){
	for (key in this.args){
		this.args[key].store(data);
	}
}
	
module.exports = ArgCollection;