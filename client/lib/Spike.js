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


-- Step Editor Model --
{
	key: '',
	comment: '',
	cells: {
		'key1': {value: '', changed: true/false, result: }

	},


	tables: {
		

	}
}

-- Persisted Step Model --
{
	key: 'foo',
	comment: '',
	cells: {key1: value1, key2: value2}
	
	-- and possibly for paragraphs --
	tables: {key1: [children steps]}

	-- for a table --
	rows: []
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


// Cells could be either a table or a regular cell?????
// Not sure I like that.
// cells is a CellCollection
function Step(key, cells, data){
	this.id = uuid.v4();
	this.cells = {};
	this.key = metadata.key;
	
	metadata.cells.forEach(function(c){
		this.cells[c.key] = new Cell(c, data);
	});

	// TODO --later: add tables

	this.tables = {};
}

Step.prototype.descendents = function(){
	
	// TODO -- gotta get table data
	return [];
}

Step.prototype.write = function(){
	var data = {key: this.key, cells: {}};
	this.cells.forEach(function(c){
		data.cells[c.key] = c.value;
	});

	return data;
}

Step.prototype.pack = function(){
	var data = this.write();
	data.id = this.id;

	return data;
}


function Grid(metadata, data){

}


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

CellCollection.prototype.allKeys = function(){
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


