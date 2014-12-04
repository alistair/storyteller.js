var expect = require('chai').expect;
var fixtureData = [require('./math-fixture-data'), require('./zork-fixture-data')];
var SpecificationDataStore = require('./../lib/specification-data-store');
var Specification = require('./../lib/specification');
var FixtureLibrary = require('./../lib/fixture-library');

function FakeChange(){
	this.applied = 0;
	this.unapplied = 0;

	this.apply = function(store){
		this.applied++;
	}

	this.unapply = function(store){
		this.unapplied++;
	}

	this.reset = function(){
		this.applied = 0;
		this.unapplied = 0;
	}
}

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

		var library = new FixtureLibrary(fixtureData);

		store.loadSpecification(specData, library);
	});

	it('can store a new step', function(){
		var step = {id: 3};

		store.storeStep(step);

		expect(store.find(3)).to.equal(step);
	});

	it('can remove an old step', function(){
		var step = {id: 3};

		store.storeStep(step);

		store.removeStep(step);

		expect(store.find(3)).to.be.null;
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

	it('calculates the initial state', function(){
		expect(store.changeStatus()).to.deep.equal({applied: 0, unapplied: 0});
	});

	it('performs the very first change', function(){
		var change = new FakeChange();

		store.apply(change);

		expect(change.applied).to.equal(1);
		expect(store.changeStatus()).to.deep.equal({applied: 1, unapplied: 0});
	});

	it('performs a second change', function(){
		var change1 = new FakeChange();
		var change2 = new FakeChange();

		store.apply(change1);
		store.apply(change2);

		expect(change1.applied).to.equal(1);
		expect(change2.applied).to.equal(1);
		expect(store.changeStatus()).to.deep.equal({applied: 2, unapplied: 0});
	});

	it('can undo', function(){
		var change1 = new FakeChange();
		var change2 = new FakeChange();

		store.apply(change1);
		store.apply(change2);

		store.undo();

		// only #2 should be unapplied
		expect(change1.unapplied).to.equal(0);
		expect(change2.unapplied).to.equal(1);

		expect(store.changeStatus()).to.deep.equal({applied: 1, unapplied: 1});

		store.undo();

		expect(change1.unapplied).to.equal(1);
		expect(change2.unapplied).to.equal(1);

		expect(store.changeStatus()).to.deep.equal({applied: 0, unapplied: 2});
	});

	it('can redo', function(){
		var change1 = new FakeChange();
		var change2 = new FakeChange();

		store.apply(change1);
		store.apply(change2);

		store.undo();

		store.redo();

		expect(change1.unapplied).to.equal(0);
		expect(change2.unapplied).to.equal(1);		
		expect(change2.applied).to.equal(2);

		expect(store.changeStatus()).to.deep.equal({applied: 2, unapplied: 0});		
	});

	it('series of changes, undos, and redos', function(){
		var change1 = new FakeChange();
		var change2 = new FakeChange();
		var change3 = new FakeChange();
		var change4 = new FakeChange();

		store.apply(change1);
		store.apply(change2);
		store.apply(change3);

		store.undo();
		store.undo();

		store.apply(change4);

		expect(store.changeStatus()).to.deep.equal({applied: 2, unapplied: 0});		
	});

	it('applies a change with only undos in the queues', function(){
		var change1 = new FakeChange();
		var change2 = new FakeChange();
		var change3 = new FakeChange();
		var change4 = new FakeChange();

		store.apply(change1);
		store.apply(change2);
		store.apply(change3);

		store.undo();
		store.undo();
		store.undo();
	
		store.apply(change4);

		expect(store.changeStatus()).to.deep.equal({applied: 1, unapplied: 0});	
	});



});