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
arg.editing = true;
arg.cell.editor = 'text';

var myCell = Cell(arg);
React.renderComponent(myCell, document.getElementById('cell'));

var component = spec.editor(loader);

React.renderComponent(
  component,
  document.getElementById('main')
);




var Postal = require('postal');
var subscription = Postal.subscribe({
	channel: 'editor',
	topic: '*',
    callback: function(data, envelope) {
        console.log('Got data: ' + JSON.stringify(data));
    }
});
