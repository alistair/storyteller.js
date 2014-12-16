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

	this.typeText = function(text){
		element.value = text;
		$(element).change();
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

	function editCell(search, cell, value){
		cellFor(search, cell).click();
		cellFor(search, cell).typeText(value);
	}

	function cellShouldBeReadonlyWithText(search, cell, expected){
		var cell = cellFor(search, cell);
		expect(cell.isReadonly()).to.be.true;
		expect(cell.value()).to.equal(expected);
	}

	describe('Cell display/editing state transitions', function(){
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


	describe('Editing in a single cell', function(){
		before(function(){
			cellFor('0.0', 'x').click();

			expect(cellFor('0.0', 'x').isTextbox()).to.be.true;

			cellFor('0.0', 'x').typeText('13');

			// move off
			cellFor('0.1', 'x').click();	
		});

		it('should record the change to the spec', function(){
			expect(spec.findByPath('0.0.x').value).to.equal('13');	
		});

		it('should be reflected in the read only view after the changes', function(){
			cellShouldBeReadonlyWithText('0.0', 'x', '13');
		});
		
	});


	describe('Editing several cells at a time', function(){
		before(function(){
			editCell('0.3', 'x', '13');
			editCell('3.0', 'x', '17');
			editCell('3.0', 'result', '19');

			// move off
			cellFor('0.0', 'x').click();	
		});

		it('should apply edits to all the fields', function(){
			cellShouldBeReadonlyWithText('0.3', 'x', '13');
			cellShouldBeReadonlyWithText('3.0', 'x', '17');
			cellShouldBeReadonlyWithText('3.0', 'result', '19');
		});
	});
});