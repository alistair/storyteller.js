var expect = require('chai').expect;

var FixtureLibrary = require('./../lib/fixture-library');

var fixtureData = [require('./math-fixture-data'), require('./zork-fixture-data')];

var Specification = require('./../lib/specification');


describe('Specification', function(){
	

	describe('when building a specification from data', function(){
		var specData = {
			title: 'My first specification',
			steps: [
				{
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
			]
		}

		var library = new FixtureLibrary(fixtureData);
		var specification = new Specification(specData, library);

		it('should have a section after building', function(){
			var section = specification.steps[0];
			expect(section.key).to.equal('Math');
			expect(section.steps.length).to.equal(5);
		});

		it('should put itself as the parent on each child step', function(){
			expect(specification.steps[0].parent).to.equal(specification);
		});
	});






});