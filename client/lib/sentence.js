var _ = require('lodash');
var SentenceParser = require('./sentence-parser');


function Sentence(metadata){
	var cells = {};

	(metadata.cells || []).forEach(function(c){
		cells[c.key] = c;
	});

	this.key = metadata.key;
	this.description = metadata.description;

	this.parts = [];

	this.cells = cells;

	var parser = new SentenceParser(metadata.format, this.cells, this.parts);
	parser.parse();

	var usedCells = _.filter(this.parts, function(part){
		return part.type == "Cell";
	}).map(function(p){return p.cell.key});

	var allCells = [];
	for (key in cells){
		allCells.push(key);
	}

	var unusedCells = _.difference(allCells, usedCells).join(', ');

	if (unusedCells.length > 0){
		throw new Error('Cell(s) ' + unusedCells + ' are unaccounted for in the sentence format');
	}
}

Sentence.prototype.editor = function(){
	throw new Error("Not implemented yet!");
}

Sentence.prototype.preview = function(){
	throw new Error("Not implemented yet!");
}

Sentence.prototype.editorWithoutChrome = function(){
	throw new Error("Not implemented yet!");
}






module.exports = Sentence;

