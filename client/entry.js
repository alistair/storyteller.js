// document.getElementById('main')

var fixtureData = [require('./lib-tests/math-fixture-data')];


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

	this.preview = function(spec, loader){
		var library = this;

		var components = _.map(spec.steps, function(step){
			// TODO -- comment or TODO
			var fixture = library.find(step.key);
			return fixture.preview(step, loader);
		});

		return loader.specPreview({title: spec.title, components: components});
	}

	this.editor = function(spec, loader){
		throw new Error('Not implemented yet');
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
				{key: 'TheResultShouldBe', cells: {x: 4}},
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

var loader = require('./components/component-loader');

//var Cell = require("./components/cell");
var $ = require("jquery");



React.renderComponent(
  library.preview(spec, loader),
  document.getElementById('main')
);
