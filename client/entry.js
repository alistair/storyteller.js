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

var EditorView = require('./lib/editor-view');
var view = new EditorView();

var EditorPresenter = require('./lib/editor-presenter');

var presenter = new EditorPresenter(view);

presenter.startEditing(specData, library);