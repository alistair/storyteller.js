var MissingGrammar = require('./missing-grammar');
var Section = require('./section');
var _ = require('lodash');



function Fixture(data){
	this.key = data.key;
	this.title = data.title;

	var builders = {};
	builders['sentence'] = require('./sentence');
	builders['embedded-section'] = require('./embedded-section');

	var grammars = {};
	data.grammars.forEach(function(metadata){
		var ctor = builders[metadata.type];
		if (ctor){
			grammars[metadata.key] = new ctor(metadata);
		}
		else {
			throw new Error('Fixture does not support a grammar type ' + metadata.type);
		}
	});

	this.grammars = grammars;
}

Fixture.prototype.newStep = function(){
	return new Section({}, this);
}

Fixture.prototype.find = function(key){
	if (this.grammars[key]){
		return this.grammars[key];
	}

	return new MissingGrammar(key);
}

// tested through the Section ctor
Fixture.prototype.buildStep = function(data){
	return new Section(data, this);
}

	
module.exports = Fixture;