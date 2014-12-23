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
				{key: 'Adding', cells:{x:1, y:2, result:3}},
				{key: 'Tabulating', collections: {steps: [
					{key: 'Enter', cells: {x: 1}},
					{key: 'Press', cells: {button: 'add'}},
					{key: 'Enter', cells: {x: 2}},
					{key: 'ValueShouldBe', cells: {value: '3'}}
				]}}
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
		}
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