var expect = require('chai').expect;
var Cell = require('./../lib/cell');
var Arg = require('./../lib/arg');


describe('Arg', function(){
	it('should grab the basic props from the cell', function(){
		var cell = new Cell('foo');
		var step = {cells:{foo: 'A'}};

		var arg = new Arg(cell, step, 1);

		expect(arg.cell).to.equal(cell);
		expect(arg.result).to.be.null;
		expect(arg.key).to.equal('foo');
	});

	it('uses text as the default editor if none', function(){
		var step = {cells:{foo: 'A'}};

		var arg = new Arg({}, step, 1);
		expect(arg.cell.editor).to.equal('text');
	});

	it('editing should be false by default', function(){
		var cell = new Cell('foo');
		var step = {cells:{foo: 'A'}};

		var arg = new Arg(cell, step, 1);

		expect(arg.editing).to.be.false;
	});

	it('should not be changed by default', function(){
		var cell = new Cell('foo');
		var step = {cells:{foo: 'A'}};

		var arg = new Arg(cell, step, 1);

		expect(arg.changed).to.be.false;
	});

	it('should use the actual value if it exists', function(){
		var cell = new Cell('foo');
		cell.default = 'B';

		var step = {cells:{foo: 'A'}};

		var arg = new Arg(cell, step, 1);
		expect(arg.value).to.equal('A');
	});

	it('should use the default if there is no given value', function(){
		var cell = new Cell('foo');
		cell.default = 'B';

		var step = {cells:{}};

		var arg = new Arg(cell, step, 1);
		expect(arg.value).to.equal('B');
	});

	it('should not be missing with a default', function(){
		var cell = new Cell('foo');
		cell.default = 'B';

		var step = {cells:{}};

		var arg = new Arg(cell, step, 1);

		expect(arg.isMissing()).to.be.false;
	});

	it('should not be missing with a value', function(){
		var cell = new Cell('foo');

		var step = {cells:{foo: 'A'}};

		var arg = new Arg(cell, step, 1);

		expect(arg.isMissing()).to.be.false;
	});

	it('should be missing with neither a value or default', function(){
		var cell = new Cell('foo');

		var step = {cells:{}};

		var arg = new Arg(cell, step, 1);

		expect(arg.isMissing()).to.be.true;
	});

	it('should store its value back into persisted data', function(){
		var cell = new Cell('foo');

		var step = {cells:{foo: 'A'}};

		var arg = new Arg(cell, step, 1);
		arg.value = 'C';

		var data = {};
		arg.store(data);

		expect(data.cells.foo).to.equal('C');
	});
});