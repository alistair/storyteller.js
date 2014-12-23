var expect = require('chai').expect;
var $ = require('jquery');
var EditorPresenter = require('./../client/lib/editor-presenter');
var loader = require('./../client/components/component-loader');
var Postal = require('postal');


var CellDriver = require('./cell-driver');

describe('Editing with EmbeddedSections', function(){
	var spec = null;
	var Shell = require('./../client/lib/shell');
	var shell = null;	

	var presenter = null;
	var div = null;

	beforeEach(function(){
		spec = require('./../client/lib-tests/object-mother').specification();


		Postal.reset();

		div = $('<div></div>').appendTo(document.body).get(0);

		$('<div><h3 class="test-title"></h3><div class="menu-pane"></div><div class="main-pane"></div></div>').appendTo(div);

		shell = new Shell(div);

		presenter = new EditorPresenter(spec);
		presenter.activate(loader, shell);
	});


	function cellFor(search, cell){
		var step = spec.findByPath(search);
		var css = '#' + step.id + " .cell[data-cell='" + cell + "']";

		var element = $(css, div).get(0);
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

	function assertCellValue(search, expected){
		var arg = spec.findByPath(search);
		expect(arg.value.toString()).to.equal(expected);
	}

	function assertElementExists(search){
		expect($(search, div).length).to.equal(1);
	}

	function assertElementDoesNotExist(search){
		expect($(search, div).length).to.equal(0);
	}

	function idFor(search){
		return spec.findByPath(search).id;
	}

	it('can render an embedded section', function(){
		var id = idFor('0.5.steps');

		assertElementExists('#' + id);
	});

	it('can delete an embedded section', function(){
		var stepId = idFor('0.5');
		var sectionId = idFor('0.5.steps');

		$('#' + sectionId + ' .delete').click();

		assertElementDoesNotExist('#' + sectionId);

		expect(spec.find(stepId)).to.be.null;
	});

	// Have to do this manually, can't get double click to fire
	/*
	it('can add a new step to an embedded section', function(){
		var sectionId = idFor('0.5.steps');

		// Having trouble getting the click to happen in tests on 
		// the step holder adder, so here
		Postal.publish({
			channel: 'editor',
			topic: 'select-holder',
			data: {holder: sectionId}
		});

		var search = $('#' + sectionId + ' a[data-key=Enter]', div);
		expect(search.length).to.equal(1);
		search.dblclick();

		expect(spec.findByPath('0.5.steps.5').grammar.key).to.equal('Enter');

		var newStepId = idFor('0.5.steps.5');

		assertElementExists('#' + newStepId);

	});
*/

	it('can delete a step from within the embedded section', function(){
		var stepId = idFor('0.5.steps.0');
		assertElementExists('#' + stepId);
		expect(spec.find(stepId)).to.not.be.null;

		$('#' + stepId + ' .delete', div).click();

		assertElementDoesNotExist('#' + stepId);
		expect(spec.find(stepId)).to.be.null;

		
	});

	it('can edit a cell from within an embedded section', function(){
		cellFor('0.5.steps.0', 'x').click();
		cellFor('0.5.steps.0', 'x').typeText('12');

		cellFor('0.0', 'x').click();

		expect(spec.findByPath('0.5.steps.0.x').value).to.equal('12');
	});
});