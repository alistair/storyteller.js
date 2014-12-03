var expect = require('chai').expect;
var StepHolder = require('../lib/step-holder');

describe('StepHolder mechanics', function(){
	it('should set the parent on add', function(){
		var step = {};

		var holder = new StepHolder();

		holder.addStep(step);

		expect(step.parent).to.equal(holder);
	});

	it('should allow you to remove a step and get the original position', function(){
		var holder = new StepHolder();

		var step1 = {};
		var step2 = {};
		var step3 = {};
		var step4 = {};
	
		holder.addStep(step1);
		holder.addStep(step2);
		holder.addStep(step3);
		holder.addStep(step4);

		var position = holder.removeStep(step3);
	
		expect(position).to.equal(2);

		expect(holder.steps.length).to.equal(3);
	});

	it('should allow you to add a step at a position', function(){
		var holder = new StepHolder();

		var step1 = {};
		var step2 = {};
		var step3 = {};
		var step4 = {};
	
		holder.addStep(step1);
		holder.addStep(step2);
		holder.addStep(step3);
		holder.addStep(step4);

		var step5 = {};

		holder.insertStep(2, step5);

		expect(step5.parent).to.equal(holder);

		expect(holder.steps[2]).to.equal(step5);
		expect(holder.steps[0]).to.equal(step1);
		expect(holder.steps[4]).to.equal(step4);

	});
});