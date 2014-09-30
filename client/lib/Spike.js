/*

-- Sentence Metadata --
{
	key: 'name',
	format: 'some {words} in a {format}',
	description: '',
	cells: [
		{key: '', description: '', default: '', editor: '', options: []}
	]
}


-- Step Metadata --
{
	key: '',
	comment: '',
	cells: {
		'key1': {value: '', changed: true/false, result: }

	}
}


*/

/*
cell = {
	key: '',
	description: '',
	default: '',
	editor: 'select', 'text', 'number' -- later --> date, time, big-text, radio(?), typeahead(?)
	options: ['', ''] or [{key: '', display: ''}]
}

result = {
	status: ok, success, failure, error,
	error: '',
	actual: ''
}

props = {
	cell: {},
	value: '',
	result: {},
	callback: function(val){},
	changed: true/false

}

*/

var uuid = require('node-uuid');
// uuid.v4();

//function Step(metadata)

function CellCollection(cells){
	this.cells = {};

	cells.forEach(function(c){
		this.cells[c.key] = c;
	});
}

CellCollection.prototype.find = function(key){
	if (!this.cells[key]){
		var cell = {key: key, default: null};
		this.cells[key] = cell;
	}

	return this.cells[key];
}

CellCollection.prototype.all = function(){
	var allCells = [];
	for (key in cells){
		allCells.push(key);
	}

	return allCells;
}

function Cell(metadata, step){
	this.key = metadata.key;
	this.result = null;
	this.changed = false;
	this.cell = metadata;

	this.value = step.cells[this.key] || metadata.default;
}

Cell.prototype.isMissing = function(){
	return this.value != null;
}

Cell.prototype.store = function(data){
	if (!data.cells) data.cells = {};

	data.cells[this.key] = this.value || this.cell.default;
}

function Step(data, grammar){

}
