var expect = require('chai').expect;
var $ = require('jquery');
var EditorPresenter = require('./../client/lib/editor-presenter');
var loader = require('./../client/components/component-loader');

function CellDriver(element){
	this.isTextbox = function(){
		throw 'not implemented';
	};

	this.isReadonly = function(){
		console.log('element tagName = ' + element.tagName);
		return element.tagName == 'SPAN';
	};

	this.tabOff = function(){
		throw 'not implemented';
	};

	this.typeText = function(text){
		throw 'not implemented';
	};

	this.value = function(){
		if (this.isReadonly()){
			return element.innerHTML;
		}

		return $(element).val();
	};
}

describe('Editing a Specification Integration tests', function(){
	var spec = require('./../client/lib-tests/object-mother').specification();
	var shell = require('./../client/lib/shell');	

	var presenter = null;

	before(function(){
		$('<div><div id="menu-pane"></div><div id="main-pane"></div></div>').appendTo(document.body);
	});

	beforeEach(function(){
		presenter = new EditorPresenter(spec);
		presenter.activate(loader, shell);
	});

	afterEach(function(){
		presenter.deactivate();
	});

	function cellFor(search, cell){
		var step = spec.findByPath(search);
		var css = '#' + step.id + " .cell[data-cell='" + cell + "']";

		var element = $(css).get(0);
		return new CellDriver(element);
	}

	function cellShouldBeReadonlyWithText(search, cell, expected){
		var cell = cellFor(search, cell);
		expect(cell.isReadonly()).to.be.true;
		expect(cell.value()).to.equal(expected);
	}

	it('should display cell values in initial state', function(){
		cellShouldBeReadonlyWithText('0.0', 'x', '1');
		cellShouldBeReadonlyWithText('0.4', 'y', '2');
		cellShouldBeReadonlyWithText('0.4', 'result', '3');
		cellShouldBeReadonlyWithText('3.0', 'y', '2');
	});


});