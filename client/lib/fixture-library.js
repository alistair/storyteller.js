var Fixture = require('./fixture');
var Comment = require('./comment');

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


FixtureLibrary.prototype.editor = function(spec, loader){
	throw new Error('Not implemented yet');
}

module.exports = FixtureLibrary;

