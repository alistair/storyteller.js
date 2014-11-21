var expect = require('chai').expect;
var fixtureData = [require('./math-fixture-data'), require('./zork-fixture-data')];
var SpecificationDataStore = require('./../lib/specification-data-store');
var Specification = require('./../lib/specification');

describe('SpecificationDataStore', function(){
	var store = null;

	var specData = {
		title: 'My first specification',
		steps: [
			{
				id: 1,
				type: 'section',
				key: 'Math', 
				steps: [
					{key: 'StartWith', cells: {x: 1}, id:2},
					{key: 'Add', cells: {x: 5}, id:3},
					{key: 'Subtract', cells: {x: 2}, id:4},
					{key: 'TheResultShouldBe', cells: {x: 4}, id: 5},
					{key: 'Adding', cells:{x:1, y:2, result:3}, id: 6}
				]
			},
			{
				id: 7,
				type: 'section',
				key: 'Zork',
				steps: [
					{key: 'SwingSword', cells: {x: 1}, id: 8}
				]
			}
		]
	}

	beforeEach(function(){
		store = new SpecificationDataStore();
		store.activateFixtures(fixtureData);

		store.loadSpecification(specData);
	});

	it('can load the specification', function(){
		expect(store.spec).to.not.be.null;

		expect(store.spec.type).to.equal('specification');
	});

	it('organizes the steps through find by id', function(){
		expect(store.find(2).key).to.equal('StartWith');

		expect(store.find(7).key).to.equal('Zork');
	});

	it('organizes the steps in a tree such that you can find parents too', function(){
		var step = store.find(8);

		expect(step.parent.type).to.equal('section');
		expect(step.parent.parent.type).to.equal('specification');
	});
});