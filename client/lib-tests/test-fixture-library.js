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

	var section = library.buildStep(data);	

	it('can find a fixture by name', function(){
		var math = library.find('Math');
		var zork = library.find('Zork');

		expect(math.key).to.equal('Math');
		expect(zork.key).to.equal('Zork');
	});

	// TODO -- going to be killed off
	it('can build all the steps for a section', function(){
		expect(section.steps.length).to.equal(5);

		expect(section.steps[4].findValue('x'))
			.to.equal(1);

		expect(section.steps[4].findValue('y'))
			.to.equal(2);

		expect(section.steps[4].findValue('result'))
			.to.equal(3);
	});

	// TODO -- going to be killed off
	it('can build a comment from data', function(){
		var comment = library.buildStep({type: 'comment', text: 'Foo!'});

		expect(comment.text).to.equal('Foo!');
		expect(comment instanceof Comment).to.be.true;
	});


});