// document.getElementById('main')

var fixtureData = [require('./lib-tests/math-fixture-data')];


var Fixture = require('./lib/fixture');
var FixtureLibrary = require('./lib/fixture-library');



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

var Specification = require('./lib/specification');


// Now, let's do some CRAZY spiking stuff

var library = new FixtureLibrary(fixtureData);
var spec = new Specification(specData, library);


var React = require("react");

var loader = require('./components/component-loader');

var Cell = require("./components/cell");
var $ = require("jquery");


var Arg = require('./lib/arg');

var arg = new Arg({key: 'X', description: 'The operand'}, {cells: {X: 5}});
React.renderComponent(Cell(arg), document.getElementById('cell'));

React.renderComponent(
  library.preview(spec, loader),
  document.getElementById('main')
);
