var expect = require('chai').expect;
var changes = require('./../lib/change-commands');
var StepHolder = require('./../lib/step-holder');
var SpecificationDataStore = require('./../lib/specification-data-store');


describe('stepRemoved', function(){
	var step1 = {};
	var step2 = {};
	var step3 = {};
	var step4 = {};

	var newStep = {};

	var holder = null;
	var event = null;
	var store = null;

	beforeEach(function(){
		holder = new StepHolder();
		event = changes.stepRemoved(holder, newStep);
		store = new SpecificationDataStore();

		holder.clear();

		holder.addStep(step1);
		holder.addStep(step2);
		holder.addStep(newStep);
		holder.addStep(step3);
		holder.addStep(step4);


	});

	it('removes the step from the parent on apply', function(){
		expect(holder.steps.contains(newStep)).to.be.true;

		event.apply(store);

		expect(holder.steps.contains(newStep)).to.be.false;
	});

	it('should remove the step from the data store on apply', function(){
		event.apply(store);

		expect(store.find(newStep.id)).to.equal(null);
	});

	it('adds the original step back to the holder in the right position', function(){
		event.apply(store);

		event.unapply(store);

		expect(holder.steps[2]).to.equal(newStep);
	});

	it('puts the original step back into the store on unapply', function(){
		event.apply(store);
		event.unapply(store);

		expect(store.find(newStep.id)).to.equal(newStep);
	});
});