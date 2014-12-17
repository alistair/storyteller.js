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

	// TODO: Someday this needs to become an object.defineproperty getter
	this.title = metadata.format;

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
	return new Step(data, this.allCells, this);
}

Sentence.prototype.newStep = function(){
	return this.buildStep({key: this.key, cells: {}});
}

Sentence.prototype.editor = function(step, loader){
	var components = _.map(this.parts, function(part){
		return part.editor(step, loader);
	});

	return loader.chromedLine({step: step, components: components});
}


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


CellPart.prototype.preview = function(step, loader){
	var value = step.findValue(this.key);
	if (value == null || typeof value === 'undefined'){
		value = '[' + this.key + ']';
	}

	return loader.previewCell({cell: this.cell, value: value});
}

CellPart.prototype.editor = function(step, loader){
	var arg = step.args.find(this.cell.key);

	return loader.cell(arg);
}


function TextPart(text){
	this.text = text;
	this.type = "Text";


	return this;
}

TextPart.prototype.preview = function(step, loader){
	return loader.span(this.text);
}

TextPart.prototype.editor = function(step, loader){
	return loader.span(this.text);
}



module.exports = Sentence;

