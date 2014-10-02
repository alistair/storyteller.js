// document.getElementById('main')

var fixtureData = [
	{
		key: 'Math', 
		title: 'Doing some mathematics!', 
		grammars: [
			{type: 'sentence', key: 'StartWith', format: 'Start with {x}'},
			{type: 'sentence', key: 'Add', format: 'Add {x}'},
			{type: 'sentence', key: 'Subtract', format: 'Subtract {x}'},
			{type: 'sentence', key: 'TheResultShouldBe', format: 'The result should be {x}'},
			{type: 'sentence', key: 'Adding', format: 'Adding {x} to {y} should be {result}'}
		]
	}

];


var Fixture = require('./lib/fixture');
function FixtureLibrary(data){
	this.fixtures = {};

	for (var i = 0; i < data.length; i++){
		var fixture = new Fixture(data[i]);
		this.fixtures[fixture.key] = fixture;
	}

	// TODO -- move to prototype
	this.find = function(key){
		// TODO -- will need to be smarter about misses
		return this.fixtures[key];
	}

	this.buildStep = function(data){
		// TODO -- check if it's a comment or a TODO

		var fixture = this.find(data.key);
		return fixture.buildStep(data);
	}
}

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
				{key: 'TheResultShouldBe', cells: {result: 4}},
				{key: 'Adding', cells:{x:1, y:2, result:3}}
			]
		}
	]
}

function Specification(data, library){
	this.title = data.title;
	this.steps = [];

	for (var i = 0; i < data.steps.length; i++){
		this.steps[i] = library.buildStep(data.steps[i]);
	}
}


// Now, let's do some CRAZY spiking stuff

var library = new FixtureLibrary(fixtureData);
var spec = new Specification(specData, library);


var React = require("react");
var Cell = require("./components/cell");
var $ = require("jquery");

var Line = require("./components/line");
var PreviewContainer = require("./components/preview-container");
var SpecPreview = require("./components/spec-preview");

var cell = Cell({value:"I rendered ok!", cell: {key: 'foo', type: 'text'}});
var line = Line({components: [cell]});

React.renderComponent(
  SpecPreview({title: 'I am a preview container!',components: [line]}),
  document.getElementById('main')
);
