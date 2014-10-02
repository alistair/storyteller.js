var _ = require('lodash');
var SentenceParser = require('./sentence-parser');
var Step = require('./step');

function Sentence(metadata){
	var cells = {};
	this.type = 'sentence';

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

Sentence.prototype.editor = function(step, loader){
	throw new Error("Not implemented yet!");
}

// TODO -- add UT
Sentence.prototype.preview = function(step, loader){
	var components = _.map(this.parts, function(part){
		return part.preview(step, loader);
	});

	return loader.line({components: components});
}

Sentence.prototype.editorWithoutChrome = function(step, loader){
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
*/

// TODO - UT
CellPart.prototype.preview = function(step, loader){
	var value = step.findValue(this.key);
	if (value == null || typeof value === 'undefined'){
		value = '[' + this.key + ']';
	}

	return loader.previewCell({cell: this.cell, value: value});
}


function TextPart(text){
	this.text = text;
	this.type = "Text";


	return this;
}

// TODO - UT
TextPart.prototype.preview = function(step, loader){
	return loader.span(this.text);
}

/* SPIKE BELOW!!!!!!!!!!!!!!

TextPart.prototype.buildEditor = TextPart.prototype.buildPreview =  function(data){
	return React.DOM.span(null, this.text)
}

*/




module.exports = Sentence;

