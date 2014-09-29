var React = require('react');
var expect = require('chai').expect;
var Sentence = require('./../client/components/sentence')

describe('Sentence', function(){
	var sentence = null;
	var metadata = null;

	beforeEach(function(){
		sentence = null;
	});

	var build = function(metadata){
		metadata.key = metadata.key || 'foo';
		metadata.cells = metadata.cells || [];

		sentence = new Sentence(metadata);
	}

	function partShouldBeText(index, text){
		var part = sentence.parts[index];
		expect(part.text).to.equal(text);
		expect(part.type).to.equal('Text');
		
	}

	function partShouldBeCell(index, key){
		var part = sentence.parts[index];
		expect(part.key).to.equal(key);	
		expect(part.type).to.equal('Cell');
			
	}

	describe('when parsing the format', function(){
		it('no cells', function(){
			build({
				format: 'the foo is afoot'
			});

			expect(sentence.parts.length).to.equal(1);
			partShouldBeText(0, 'the foo is afoot');
		});

		it('only one cell', function(){
			build({
				format: '{go}'
			});

			expect(sentence.parts.length).to.equal(1);
			partShouldBeCell(0, 'go');
		});

		it('one cell at the end', function(){
			build({
				format: 'go to {dest}',
				cells: []
			});

			expect(sentence.parts.length).to.equal(2);
			partShouldBeText(0, 'go to ');
			partShouldBeCell(1, 'dest');
		});

		it('one cell at the beginning', function(){
			build({
				format: '{dest} is the location'
			});

			expect(sentence.parts.length).to.equal(2);
			partShouldBeCell(0, 'dest');
			partShouldBeText(1, ' is the location');

		});

		it('has one cell in the middle', function(){
			build({
				format: 'go {miles} miles'
			});

			expect(sentence.parts.length).to.equal(3);
			partShouldBeText(0, 'go ');
			partShouldBeCell(1, 'miles');
			partShouldBeText(2, ' miles');
		});

		it('has one cell in the middle #2', function(){
			build({
				format: "go '{miles}'"
			});

			expect(sentence.parts.length).to.equal(3);
			partShouldBeText(0, "go '");
			partShouldBeCell(1, 'miles');
			partShouldBeText(2, "'");
		});

		it('has multiple cells', function(){
			build({
				format: 'Add {x} to {y}'
			});

			expect(sentence.parts.length).to.equal(4);
			partShouldBeText(0, 'Add ');
			partShouldBeCell(1, 'x');
			partShouldBeText(2, ' to ');
			partShouldBeCell(3, 'y');
		});
	});
});