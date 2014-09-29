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

var _ = require('lodash');
var Cell = require('./cell');
var PreviewCell = require('./previewCell');

function SentenceParser(format, cells, parts){
	this.format = format;
	this.cells = cells;
	this.parts = parts;

	this.current = this.format;
}

SentenceParser.prototype.parse = function(){
	this.parseNext(0);
}

SentenceParser.prototype.addText = function(text){
	this.parts.push(new TextPart(text));
}

SentenceParser.prototype.addCell = function(started){
	var ended = this.current.indexOf('}');
	if (ended < 0){
		throw 'Mismatched brackets in format "' + this.format + "'";
	}

	var key = this.current.substring(started + 1, ended);
	if (!this.cells[key]){
		this.cells[key] = {key: key};
	}

	this.parts.push(new CellPart(this.cells[key]));

	if (ended <= this.current.length - 1){
		this.parseNext(ended + 1);
	}
}	

SentenceParser.prototype.parseNext = function(from){
	this.current = this.current.substring(from);
	if (this.current.length == 0) return;

	var started = this.current.indexOf('{');
	if (started > -1){
		if (started == 0){
			this.addCell(started);
		}
		else{
			this.addText(this.current.substring(0, started));

			this.addCell(started);
		}
	}
	else{
		this.addText(this.current);
	}
}



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

Sentence.prototype.buildEditor = function(){

}

Sentence.prototype.buildPreview = function(){
	
}


function CellPart(cell){
	this.type = "Cell";
	this.cell = cell;
	this.key = cell.key;
}


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

function TextPart(text){
	this.text = text;
	this.type = "Text";


	return this;
}

TextPart.prototype.buildEditor = TextPart.prototype.buildPreview =  function(data){
	return React.DOM.span(null, this.text)
}



module.exports = Sentence;

