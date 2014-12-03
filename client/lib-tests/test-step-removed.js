var expect = require('chai').expect;
var changes = require('./../lib/change-commands');
var StepHolder = require('./../lib/step-holder');

describe('stepRemoved', function(){
	var step1 = {};
	var step2 = {};
	var step3 = {};
	var step4 = {};

	var newStep = {};

	var holder = null;
	var event = null;

	beforeEach(function(){
		holder = new StepHolder();
		event = changes.stepRemoved(holder, newStep);

		holder.clear();

		holder.addStep(step1);
		holder.addStep(step2);
		holder.addStep(newStep);
		holder.addStep(step3);
		holder.addStep(step4);


	});

	it('removes the step from the parent on apply', function(){
		expect(holder.steps.contains(newStep)).to.be.true;

		event.apply(null);

		expect(holder.steps.contains(newStep)).to.be.false;
	});

	it('adds the original step back to the holder in the right position', function(){
		event.apply(null);

		event.unapply(null);

		expect(holder.steps[2]).to.equal(newStep);
	});
});