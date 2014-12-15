var expect = require('chai').expect;
var $ = require('jquery');
var EditorPresenter = require('./../client/lib/editor-presenter');
var loader = require('./../client/components/component-loader');
var Postal = require('postal');

function CellDriver(element){
	this.isTextbox = function(){
		return element.tagName == 'INPUT' && element.getAttribute('type').toUpperCase() == 'TEXT';
	};

	this.isReadonly = function(){
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

	this.click = function(){
		$(element).click();
	}

	this.hasFocus = function(){
		return element == document.activeElement;
	}
}


describe('Editing a Specification Integration tests', function(){
	var spec = require('./../client/lib-tests/object-mother').specification();
	var shell = require('./../client/lib/shell');	

	var presenter = null;

	before(function(){
		$('<div id="shell-holder"></div>').appendTo(document.body);
	});

	beforeEach(function(){
		Postal.reset();

		shell.tearDown();
		$('#shell-holder').html('');
		$('<div><div id="menu-pane"></div><div id="main-pane"></div></div>').appendTo($('#shell-holder'));

		presenter = new EditorPresenter(spec);
		presenter.activate(loader, shell);
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

	it('moves a cell back to readonly after another cell receives focus', function(){
		cellFor('0.2', 'x').click();

		cellFor('0.4', 'y').click();

		expect(cellFor('0.2', 'x').isReadonly()).to.be.true;
		expect(cellFor('0.2', 'x').hasFocus()).to.be.false;

		expect(cellFor('0.4', 'y').isTextbox()).to.be.true;
		expect(cellFor('0.4', 'y').hasFocus()).to.be.true;

	});

	it('changes a cell to editor mode after clicking on it', function(){
		cellFor('0.2', 'x').click();

		var cell = cellFor('0.2', 'x');
		expect(cell.isTextbox()).to.be.true;
		expect(cell.value()).to.equal('2');

	});

	it('should make a cell in edit mode be focused', function(){
		cellFor('0.3', 'x').click();

		expect(cellFor('0.3', 'x').hasFocus()).to.be.true;
	});


});