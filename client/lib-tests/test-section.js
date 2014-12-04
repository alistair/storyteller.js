var expect = require('chai').expect;
var Section = require('./../lib/section');
var Fixture = require('./../lib/fixture');
var Sentence = require('./../lib/sentence');
var Step = require('./../lib/step');
var _ = require('lodash');
var FixtureLibrary = require('./../lib/fixture-library');

describe('Section', function(){
	var fixtureData = require('./math-fixture-data');
	var fixture = new Fixture(fixtureData);

	var data = {
		id: 1,
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

	var section = new Section(data, new FixtureLibrary([fixtureData]));

	it('can write for persistence', function(){
		var data = section.write();

		expect(data.key).to.equal(section.key);
		expect(data.hasOwnProperty('id')).to.be.false;
		expect(data.type).to.equal('section');

		expect(data.steps.length).to.equal(5);
	});

	it('can pack data for execution', function(){
		var data = section.pack();

		expect(data.id).to.equal(section.id);
		expect(data.type).to.equal('section');

		expect(data.steps.length).to.equal(5);
	});

	it('should connect the grammar to each child step', function(){
		expect(section.steps[0].grammar.key).to.equal('StartWith');
		expect(section.steps[4].grammar.key).to.equal('Adding');
	});

	it('uses the persisted id if it exists', function(){
		expect(section.id).to.equal(1);
	});

	it('assigns an id if one is not in the data', function(){
		var section = new Section({type: 'section', key: 'Math', steps: []}, fixture);

		expect(section.id).to.not.be.null;
	});

	it('should make itself the parent of all children', function(){
		expect(section.steps[0].parent).to.equal(section);
		expect(section.steps[1].parent).to.equal(section);
		expect(section.steps[2].parent).to.equal(section);
		expect(section.steps[3].parent).to.equal(section);
		expect(section.steps[4].parent).to.equal(section);
	});

	it('should be able to build a simple sentence step for the data', function(){
		expect(section.steps[0] instanceof Step).to.be.true;
		expect(section.steps[1] instanceof Step).to.be.true;
		expect(section.steps[2] instanceof Step).to.be.true;
		expect(section.steps[3] instanceof Step).to.be.true;
		expect(section.steps[4] instanceof Step).to.be.true;

		// these mechanics are tested through Sentence
		expect(section.steps[0].findValue('x')).to.equal(1);
		expect(section.steps[1].findValue('x')).to.equal(5);
	});

	it('can return the immediate children', function(){
		var descendents = section.children();

		expect(_.contains(descendents, section.steps[0])).to.be.true;
		expect(_.contains(descendents, section.steps[1])).to.be.true;
		expect(_.contains(descendents, section.steps[2])).to.be.true;
		expect(_.contains(descendents, section.steps[3])).to.be.true;
		expect(_.contains(descendents, section.steps[4])).to.be.true;
	});
});