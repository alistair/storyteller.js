var expect = require('chai').expect;
var Section = require('./../lib/section');
var Fixture = require('./../lib/fixture');
var Sentence = require('./../lib/sentence');
var Step = require('./../lib/step');
var _ = require('lodash');

describe('Section', function(){
	var fixtureData = require('./math-fixture-data');
	var fixture = new Fixture(fixtureData);

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
	}

	var section = new Section(data, fixture);

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

	// TODO -- later this will need to be recursive
	it('can return the immediate descendents', function(){
		var descendents = section.descendents();

		expect(_.contains(descendents, section.steps[0])).to.be.true;
		expect(_.contains(descendents, section.steps[1])).to.be.true;
		expect(_.contains(descendents, section.steps[2])).to.be.true;
		expect(_.contains(descendents, section.steps[3])).to.be.true;
		expect(_.contains(descendents, section.steps[4])).to.be.true;
	});
});