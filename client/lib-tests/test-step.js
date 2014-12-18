var expect = require('chai').expect;

var Cell = require('./../lib/cell');
var Step = require('./../lib/step');

describe('Step', function(){
	describe('when getting a cell value', function(){
		var cells = [new Cell('A'), new Cell('B'), new Cell('C')];
		var data = {key: 'foo', cells: {
			A: 1,
			B: 2,
			C: 3
		}};

		var step = new Step(data, cells);

		it('should find the value happy path', function(){
			expect(step.findValue('A')).to.equal(1);
		});

		it('should resolve to null if the cell arg is missing', function(){
			expect(step.findValue('D')).to.be.null;
		});

		it('should resolve the default if the cell arg is null', function(){
			step.args.find('A').default = -1;
			step.args.find('A').value = null;

			expect(step.findValue('A')).to.equal(-1);
		});

		it('should resolve to null if value is null and default is null', function(){
			step.args.find('A').default = null;
			step.args.find('A').value = null;

			expect(step.findValue('A')).to.null;
		});
	});

	it('should have an id', function(){
		var step1 = new Step({key: 'foo'}, []);
		var step2 = new Step({key: 'foo'}, []);
		var step3 = new Step({key: 'foo'}, []);
	

		expect(step1.id).to.not.be.null;
		expect(step2.id).to.not.be.null;
		expect(step3.id).to.not.be.null;
	
		expect(step1.id).to.not.equal(step2.id);
		expect(step1.id).to.not.equal(step3.id);
		expect(step2.id).to.not.equal(step3.id);
	});

	it('by default is not a holder', function(){
		var step1 = new Step({key: 'foo'}, []);

		expect(step1.isHolder()).to.be.false;
	});

	it('should capture the grammar key of the data', function(){
		var step = new Step({key: 'foo'}, []);
		expect(step.key).to.equal('foo');
	});

	it('should build up args', function(){
		var cells = [new Cell('A'), new Cell('B'), new Cell('C')];
		var data = {key: 'foo', cells: {
			A: 1,
			B: 2,
			C: 3
		}};

		var step = new Step(data, cells);

		expect(step.args.length).to.equal(3);

		expect(step.args.find('A').value).to.equal(1);
		expect(step.args.find('B').value).to.equal(2);
		expect(step.args.find('C').value).to.equal(3);
	});

	it('children just gives you an empty array -- FOR RIGHT NOW', function(){
		var cells = [new Cell('A'), new Cell('B'), new Cell('C')];
		var data = {key: 'foo', cells: {
			A: 1,
			B: 2,
			C: 3
		}};

		var step = new Step(data, cells);

		expect(step.children().length).to.equal(0);
	});

	it('should write arg data back out', function(){
		var cells = [new Cell('A'), new Cell('B'), new Cell('C')];
		var data = {key: 'foo', cells: {
			A: 1,
			B: 2,
			C: 3
		}};

		var step = new Step(data, cells);

		step.args.find('A').value = 4;

		var data = step.write();

		expect(data).to.deep.equal({key: 'foo', cells: {A: 4, B: 2, C: 3}});
	});

	it('should put the id in the packed data', function(){
		var cells = [new Cell('A'), new Cell('B'), new Cell('C')];
		var data = {key: 'foo', cells: {
			A: 1,
			B: 2,
			C: 3
		}};

		var step = new Step(data, cells);

		step.args.find('A').value = 4;

		var data = step.pack();

		expect(data).to.deep.equal({id: step.id, key: 'foo', cells: {A: 4, B: 2, C: 3}});
	});
});