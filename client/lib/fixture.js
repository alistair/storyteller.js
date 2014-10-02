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

// TODO -- add UT
Fixture.prototype.buildStep = function(data){
	return new Section(data, this);
}

// TODO -- add UT
Fixture.prototype.preview = function(section, loader){
	var fixture = this;

	var components = _.map(section.steps, function(step){
		// TODO -- watch for comment and todo's
		var grammar = fixture.find(step.key);
		return grammar.preview(step, loader);
	});

	return loader.previewContainer({title: this.title, components: components});
}

// TODO -- add UT
Fixture.prototype.editor = function(section, loader){
	throw new Error('Not implemented yet');
}

// TODO -- add UT
Fixture.prototype.editorWithoutChrome = function(section, loader){
	throw new Error('Not implemented yet');
}
		
module.exports = Fixture;