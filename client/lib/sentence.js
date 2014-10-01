var _ = require('lodash');
var SentenceParser = require('./sentence-parser');
var Step = require('./step');

function Sentence(metadata){
	var cells = {};

	(metadata.cells || []).forEach(function(c){
		cells[c.key] = c;
	});

	this.key = metadata.key;
	this.description = metadata.description;

	this.parts = [];

	this.cells = cells;

	var parser = new SentenceParser(metadata.format, this);
	parser.parse();

	var usedCells = _.filter(this.parts, function(part){
		return part.type == "Cell";
	}).map(function(p){return p.cell.key});

	var allCells = _.keys(cells);
	var unusedCells = _.difference(allCells, usedCells).join(', ');

	if (unusedCells.length > 0){
		throw new Error('Cell(s) ' + unusedCells + ' are unaccounted for in the sentence format');
	}

	this.allCells = _.values(this.cells);

}

Sentence.prototype.buildStep = function(data){
	return new Step(data, this.allCells);
}

Sentence.prototype.newStep = function(){
	return this.buildStep({key: this.key, cells: {}});
}

Sentence.prototype.editor = function(components){
	throw new Error("Not implemented yet!");
}

Sentence.prototype.preview = function(components){
	throw new Error("Not implemented yet!");
}

Sentence.prototype.editorWithoutChrome = function(components){
	throw new Error("Not implemented yet!");
}

Sentence.prototype.addCell = function(key){
	if (!this.cells[key]){
		this.cells[key] = {key: key};
	}

	this.parts.push(new CellPart(this.cells[key]));
}

Sentence.prototype.addText = function(text){
	this.parts.push(new TextPart(text));
}

function CellPart(cell){
	if (cell == null) throw new Error("'cell' cannot be null");

	this.type = "Cell";
	this.cell = cell;
	this.key = cell.key;
}

// TODO -- do this with a builder
//var Cell = require('./cell');
//var PreviewCell = require('./previewCell');

/* SPIKE BELOW-------------------->
CellPart.prototype.buildEditor = function(data){
	// TODO -- do something w/ callbacks for state tracking
	var cellData = data[this.key] || {result: null, value: null, changed: false};

	var props = {
		cell: this.cell,

	};

	_.assign(props, cellData);

	return Cell(props);
}

CellPart.prototype.buildPreview = function(data){
	return PreviewCell(data);
}
*/

function TextPart(text){
	this.text = text;
	this.type = "Text";


	return this;
}

/* SPIKE BELOW!!!!!!!!!!!!!!

TextPart.prototype.buildEditor = TextPart.prototype.buildPreview =  function(data){
	return React.DOM.span(null, this.text)
}

*/




module.exports = Sentence;

