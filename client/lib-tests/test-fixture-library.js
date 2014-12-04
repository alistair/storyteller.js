var expect = require('chai').expect;
var FixtureLibrary = require('./../lib/fixture-library');

var fixtureData = [require('./math-fixture-data'), require('./zork-fixture-data')];

var StubLoader = require('./stub-loader');

var Comment = require('./../lib/comment');

describe('The FixtureLibrary', function(){
	var library = new FixtureLibrary(fixtureData);

	var data = {
		type: 'section',
		key: 'Math', 
		steps: [
			{key: 'StartWith', cells: {x: 1}},
			{key: 'Add', cells: {x: 5}},
			{key: 'Subtract', cells: {x: 2}},
			{key: 'TheResultShouldBe', cells: {x: 4}},
			{key: 'Adding', cells:{x:1, y:2, result:3}}
		]
	};

	it('can find a fixture by name', function(){
		var math = library.find('Math');
		var zork = library.find('Zork');

		expect(math.key).to.equal('Math');
		expect(zork.key).to.equal('Zork');
	});


});