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
		'key1': {value: '', changed: true/false, }

	}
}


*/

var _ = require('lodash');

function SentenceParser(format, cells, parts){
	this.format = format;
	this.cells = cells;
	this.parts = parts;

	this.current = this.format;

	this.parse = function(){
		this.parseNext(0);
	}

	this.addText = function(text){
		this.parts.push(new TextPart(text));
	}

	this.addCell = function(started){
		var ended = this.current.indexOf('}');
		if (ended < 0){
			throw 'Mismatched brackets in format "' + this.format + "'";
		}

		var key = this.current.substring(started + 1, ended);
		if (!cells[key]){
			cells[key] = {key: key};
		}

		parts.push(new CellPart(cells[key]));

		if (ended <= this.current.length - 1){
			this.parseNext(ended + 1);
		}
	}	

	this.parseNext = function(from){
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
}



function Sentence(metadata){
	this.cells = {};
	metadata.cells.forEach(function(c){
		this.cells[c.key] = c;
	});

	this.key = metadata.key;
	this.description = metadata.description;

	this.parts = [];


	var parser = new SentenceParser(metadata.format, this.cells, this.parts);
	parser.parse();

	// TODO -- parse the parts, cause parts are parts
}





function CellPart(cell){
	this.type = "Cell";
	this.cell = cell;
	this.key = cell.key;
}

CellPart.prototype.buildEditor = function(data){

}

CellPart.prototype.buildDisplay = function(data){

}

function TextPart(text){
	this.text = text;
	this.type = "Text";



	return this;
}

TextPart.prototype.buildEditor = function(data){
	
}

TextPart.prototype.buildDisplay = function(data){
	
}


module.exports = Sentence;

