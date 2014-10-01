var _ = require('lodash');


function SentenceParser(format, sentence){
	this.format = format;
	this.sentence = sentence;

	this.current = this.format;
}

SentenceParser.prototype.parse = function(){
	this.parseNext(0);
}

SentenceParser.prototype.addText = function(text){
	this.sentence.addText(text);
}

SentenceParser.prototype.addCell = function(started){
	var ended = this.current.indexOf('}');
	if (ended < 0){
		throw 'Mismatched brackets in format "' + this.format + "'";
	}

	var key = this.current.substring(started + 1, ended);


	this.sentence.addCell(key);

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



module.exports = SentenceParser;