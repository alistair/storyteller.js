var React = require('react');
var TU = require('react-test-utils');
var expect = require('chai').expect;

var Cell = require('./../client/components/cell');
var $ = require('jquery');

describe('Rendering a Cell', function(){
	var cell = null;
	var div = null;
	var props = null;

	beforeEach(function(){
		cell = null;
		div = null;

		props = {
			cell: {
				key: 'X',
				description: 'The first operand',
				default: null,
				type: null, // should default to text
				size: null,   // should default to medium
				options: null // doesn't matter in most cases
			},
			result: null, // would be {status, error, actual},
			value: null,
			callback: function(val){},
			changed: false
		};
	});

	function element(){
		if (!cell){
			cell = new Cell(props);
			div = document.createElement('div');
			React.renderComponent(cell, div);
		}

		return div.firstChild;
	}

	function elementShouldHaveClass(clazz){
		var classes = element().className.split(' ');
		expect(classes).to.contain(clazz);
	}

	function elementShouldNotHaveClass(clazz){
		var classes = element().className.split(' ');
		expect(classes).to.not.contain(clazz);
	}

	function elementTypeShouldBe(type){
		expect(element().nodeName).to.equal(type.toUpperCase());
	}

	function elementShouldBeSpanWithText(text){
		elementTypeShouldBe('span');
		innerTextShouldBe(text);
	}

	function innerTextShouldBe(text){
		expect(element().innerHTML).to.equal(text);
	}

	describe('default visualizations', function(){
		it('should be a readonly span', function(){
			elementTypeShouldBe('span');
		});

		it('should have the cell class', function(){
			elementShouldHaveClass('cell');
		});

		it('has the description in the title', function(){
			props.cell.description = 'a description of this cell';
			expect(element().title).to.equal('a description of this cell');
		});
	});

	describe('render changed display', function(){
		it('should show as changed if changed', function(){
			props.changed = true;

			elementShouldHaveClass('changed');
		});

		it('should not show as changed if not changed', function(){
			props.changed = false;
			elementShouldNotHaveClass('changed');
		});
	});

	describe('Rendering a Cell without results', function(){
		it('with no default and no value', function(){
			elementShouldBeSpanWithText('[X]');
			elementShouldHaveClass('missing');
		});
	
		it('with no value but a default', function(){
			props.cell.default = 'bar';

			elementShouldBeSpanWithText('bar');
			elementShouldNotHaveClass('missing');
		});

		it ('with a value but no default', function(){
			props.value = 'my sweet love';
			props.cell.default = null;

			elementShouldBeSpanWithText('my sweet love');
			elementShouldNotHaveClass('missing');
		});

		it('with both a value and a default, value wins', function(){
			props.value = 'my sweet love';
			props.cell.default = 'whaa whaa';

			elementShouldBeSpanWithText('my sweet love');
			elementShouldNotHaveClass('missing');
		});
	});

	describe('Rendering a Cell with results', function(){
		it('is okay', function(){
			props.result = {
				status: 'ok'
			};

			props.value = 'foo';

			elementShouldBeSpanWithText('foo');
			elementShouldNotHaveClass('error');
			elementShouldNotHaveClass('failed');
			elementShouldNotHaveClass('success');

		});

		it('is successful', function(){
			props.result = {
				status: 'success'
			};

			props.value = 'foo';

			elementShouldBeSpanWithText('foo');
			elementShouldNotHaveClass('error');
			elementShouldNotHaveClass('failed');
			elementShouldHaveClass('success');
		});

		it('failed with a value', function(){
			props.result = {
				status: 'failed',
				actual: 'bar'
			};

			props.value = 'foo';

			elementShouldBeSpanWithText('foo, but was bar');
			elementShouldNotHaveClass('error');
			elementShouldHaveClass('failed');
			elementShouldNotHaveClass('success');
		});

		it('has an error', function(){
			props.result = {
				status: 'error',
				error: 'it is bad!'
			}

			props.value = 'foo';

			elementTypeShouldBe('button');
			elementShouldHaveClass('cell');
			elementShouldHaveClass('btn');
			elementShouldHaveClass('btn-warning');


		});
	});



});


