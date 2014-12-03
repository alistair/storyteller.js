var expect = require('chai').expect;
var changes = require('./../lib/change-commands');
var StepHolder = require('./../lib/step-holder');


describe('Add Step', function(){
	
	describe('when built with no index', function(){
		var holder = null;
		var newStep = null;
		var added = null;

		beforeEach(function(){
			holder = new StepHolder();

			holder.addStep({});
			holder.addStep({});
			holder.addStep({});

			newStep = {};

			added = changes.stepAdded(holder, newStep);
		});


		it('applies by adding the step last', function(){
			holder.addStep({});
			holder.addStep({});
			holder.addStep({});

			added.apply(null);

			expect(holder.steps.last()).to.equal(newStep);
		});

		it('unapplies by just removing the step from the parent', function(){
			holder.addStep({});
			holder.addStep({});
			holder.addStep({});

			added.apply(null);

			expect(holder.steps.contains(newStep)).to.be.true;

			added.unapply(null);

			expect(holder.steps.contains(newStep)).to.be.false;
		});
	});

	describe('when built for a specific index', function(){
		var step1 = {};
		var step2 = {};
		var step3 = {};
		var step4 = {};

		var newStep = {};

		var holder = null;
		var added = null;

		beforeEach(function(){
			holder = new StepHolder();

			holder.addStep(step1);
			holder.addStep(step2);
			holder.addStep(step3);
			holder.addStep(step4);

			added = changes.stepAdded(holder, newStep, 2);
		});

		it('should be able to insert the step on apply', function(){
			added.apply(null);

			expect(holder.steps.length).to.equal(5);
			expect(holder.steps[2]).to.equal(newStep);
		});

		it('should be able to remove the step on unapply', function(){
			added.apply(null);

			expect(holder.steps.contains(newStep)).to.be.true;

			added.unapply(null);

			expect(holder.steps.contains(newStep)).to.be.false;
		});

	});

});