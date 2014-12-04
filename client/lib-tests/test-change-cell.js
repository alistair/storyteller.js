var expect = require('chai').expect;
var fixtureData = [require('./math-fixture-data'), require('./zork-fixture-data')];
var SpecificationDataStore = require('./../lib/specification-data-store');
var Specification = require('./../lib/specification');
var FixtureLibrary = require('./../lib/fixture-library');
var changes = require('./../lib/change-commands');

describe('ChangeCell', function(){
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

		var library = new FixtureLibrary(fixtureData);
		store.loadSpecification(specData, library);
	});


	it('can apply the change', function(){
		expect(store.find(2).args.find('x').value).to.equal(1);
		expect(store.find(2).args.find('x').changed).to.be.false;

		expect(changes.cellValue(2, 'x', 4)).to.not.be.null;

		store.apply(changes.cellValue(2, 'x', 4));

		expect(store.find(2).args.find('x').value).to.equal(4);
		expect(store.find(2).args.find('x').changed).to.be.true;
	});

	it('can undo if the cell was otherwise unchanged', function(){
		store.apply(changes.cellValue(2, 'x', 4));
		store.undo();

		expect(store.find(2).args.find('x').value).to.equal(1);
		expect(store.find(2).args.find('x').changed).to.be.false;		
	});

	it('can undo if the cell was previously changed', function(){
		store.apply(changes.cellValue(2, 'x', 3));
		store.apply(changes.cellValue(2, 'x', 4));
		store.undo();

		expect(store.find(2).args.find('x').value).to.equal(3);
		expect(store.find(2).args.find('x').changed).to.be.true;	
	});
});