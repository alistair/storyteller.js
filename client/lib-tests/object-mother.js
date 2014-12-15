var specData = {
	title: 'My first specification',
	steps: [
		{
			type: 'section',
			key: 'Math', 
			steps: [
				{key: 'StartWith', cells: {x: 1}},
				{key: 'Add', cells: {x: 5}},
				{key: 'Subtract', cells: {x: 2}},
				{key: 'TheResultShouldBe', cells: {x: 4}},
				{key: 'Adding', cells:{x:1, y:2, result:3}}
			]
		},
		{type: 'comment', text: 'foo'},
		{type: 'comment', text: 'bar'},
		{
			type: 'section',
			key: 'Math', 
			steps: [
				{key: 'Adding', cells:{x:1, y:2, result:3}}
			]
		},
	]
}

var fixtureData = [require('./math-fixture-data'), require('./zork-fixture-data')];
var Specification = require('./../lib/specification');
var FixtureLibrary = require('./../lib/fixture-library');

module.exports = {
	library: function(){
		return new FixtureLibrary(fixtureData);
	},

	specification: function(){
		var lib = this.library();

		return new Specification(specData, lib);
	}
}