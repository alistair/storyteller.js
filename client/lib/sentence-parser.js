var _ = require('lodash');


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

function CellPart(cell){
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

module.exports = SentenceParser;