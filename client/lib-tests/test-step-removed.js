var expect = require('chai').expect;
var changes = require('./../lib/change-commands');
var StepHolder = require('./../lib/step-holder');
var Specification = require('./../lib/specification');


describe('stepRemoved', function(){
	var step1 = {};
	var step2 = {};
	var step3 = {};
	var step4 = {};

	var newStep = {};

	var holder = null;
	var event = null;
	var spec = null;

	beforeEach(function(){
		holder = new StepHolder();
		event = changes.stepRemoved(holder, newStep);
		spec = new Specification({}, null);

		holder.clear();

		holder.addStep(step1);
		holder.addStep(step2);
		holder.addStep(newStep);
		holder.addStep(step3);
		holder.addStep(step4);


	});

	it('removes the step from the parent on apply', function(){
		expect(holder.steps.contains(newStep)).to.be.true;

		event.apply(spec);

		expect(holder.steps.contains(newStep)).to.be.false;
	});

	it('should remove the step from the data spec on apply', function(){
		event.apply(spec);

		expect(spec.find(newStep.id)).to.equal(null);
	});

	it('adds the original step back to the holder in the right position', function(){
		event.apply(spec);

		event.unapply(spec);

		expect(holder.steps[2]).to.equal(newStep);
	});

	it('puts the original step back into the spec on unapply', function(){
		event.apply(spec);
		event.unapply(spec);

		expect(spec.find(newStep.id)).to.equal(newStep);
	});
});