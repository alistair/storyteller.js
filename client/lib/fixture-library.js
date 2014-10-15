var Fixture = require('./fixture');

function FixtureLibrary(data){
	this.fixtures = {};

	for (var i = 0; i < data.length; i++){
		var fixture = new Fixture(data[i]);
		this.fixtures[fixture.key] = fixture;
	}

}

FixtureLibrary.prototype.find = function(key){
	// TODO -- will need to be smarter about misses
	return this.fixtures[key];
}

FixtureLibrary.prototype.buildStep = function(data){
	// TODO -- check if it's a comment or a TODO

	var fixture = this.find(data.key);
	return fixture.buildStep(data);
}

// TODO -- NOT TESTED, ONLY SPIKED!!!!!!!
FixtureLibrary.prototype.preview = function(spec, loader){
	var library = this;

	var components = _.map(spec.steps, function(step){
		// TODO -- comment or TODO
		var fixture = library.find(step.key);
		return fixture.preview(step, loader);
	});

	return loader.specPreview({title: spec.title, components: components});
}

FixtureLibrary.prototype.editor = function(spec, loader){
	throw new Error('Not implemented yet');
}

module.exports = FixtureLibrary;

