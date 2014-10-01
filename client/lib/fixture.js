var Sentence = require('./sentence');
var MissingGrammar = require('./missing-grammar');
var Section = require('./section');

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

	return new MissingGrammar(key);
}

Fixture.prototype.buildStep = function(data){
	return new Section(data, this);
}

module.exports = Fixture;