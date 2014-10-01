var Sentence = require('./sentence');
//var Comment = require('./comment');
//var TODO = require('./todo');
//var MissingGrammar = require('./missing-grammar');

function Fixture(data){
	

	this.key = data.key;
	this.title = data.title;

	var grammars = {};
	data.grammars.forEach(function(metadata){
		if (metadata.type == 'sentence'){
			grammars[metadata.key] = new Sentence(metadata);
		}
		else {
			throw new Error('Fixture does not support a grammar type ' + metadata.type);
		}
	});

	this.grammars = grammars;
}

Fixture.prototype.find = function(key){
	if (this.grammars[key]){
		return this.grammars[key];
	}

	throw new Error('Missing grammar named ' + key);
}

module.exports = Fixture;