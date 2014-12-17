var expect = require('chai').expect;
var Sentence = require('./../lib/sentence');
var Fixture= require('./../lib/fixture');
var MissingGrammar = require('./../lib/missing-grammar');
var Section = require('./../lib/section');
var FixtureLibrary = require('./../lib/fixture-library');

describe('Fixture', function(){
	var fixture = null;

	before(function(){
		var data = {
			key: 'Arithmetic',
			title: 'Do some math',
			grammars: [
				{key: 'Adding', type: 'sentence', format: '{x} + {y} should be {z}'},
				{key: 'StartWith', type: 'sentence', format: 'Start with {x}'},
				{key: 'Add', type: 'sentence', format: 'Add {x}'},
				{key: 'Result', type: 'sentence', format: 'The result should be {result}'}
			]


		};

		fixture = new Fixture(data);
	});

	it('can build a new step as a section', function(){
		var section = fixture.newStep();

		expect(section.key).to.equal('Arithmetic');
		expect(section.type).to.equal('section');
		expect(section.steps.length).to.equal(0);
		expect(section.fixture).to.equal(fixture);
	});

	it('should capture the key', function(){
		expect(fixture.key).to.equal('Arithmetic');
	});

	it('should capture the title', function(){
		expect(fixture.title).to.equal('Do some math');
	});

	it('should build grammars for sentences', function(){
		expect(fixture.find('Adding') instanceof Sentence).to.be.true;
		expect(fixture.find('StartWith') instanceof Sentence).to.be.true;
		expect(fixture.find('Add') instanceof Sentence).to.be.true;
		expect(fixture.find('Result') instanceof Sentence).to.be.true;
	});

	it('should resolve a missing grammar for an unknown grammar', function(){
		var grammar = fixture.find('unknown');

		expect(grammar instanceof MissingGrammar).to.be.true;
		expect(grammar.key).to.equal('unknown');
	});


	describe('when building the preview for a section', function(){
		var data = {
			type: 'section',
			key: 'Math', 
			steps: [
				{key: 'StartWith', cells: {x: 1}},
				{key: 'Add', cells: {x: 5}},
				{key: 'TheResultShouldBe', cells: {x: 4}},
				{key: 'Adding', cells:{x:1, y:2, z:3}}
			]
		}

		var fixtureData = {
			key: 'Math',
			title: 'Do some math',
			grammars: [
				{key: 'Adding', type: 'sentence', format: '{x} + {y} should be {z}'},
				{key: 'StartWith', type: 'sentence', format: 'Start with {x}'},
				{key: 'Add', type: 'sentence', format: 'Add {x}'},
				{key: 'TheResultShouldBe', type: 'sentence', format: 'The result should be {x}'}
			]


		};

		var library = new FixtureLibrary([fixtureData]);
		var fixture = library.find('Math');

		var section = new Section(data, library);

		var loader = require('./stub-loader')();
		var preview = section.preview(loader);

		it('should build a preview container with each child step', function(){
			var line1 = fixture.find(section.steps[0].key).preview(section.steps[0], loader);
			var line2 = fixture.find(section.steps[1].key).preview(section.steps[1], loader);
			var line3 = fixture.find(section.steps[2].key).preview(section.steps[2], loader);
			var line4 = fixture.find(section.steps[3].key).preview(section.steps[3], loader);

			expect(preview).to.deep.equal({
				type: 'previewContainer',
				props: {
					title: 'Do some math',
					components: [line1, line2, line3, line4]
				}
			});
		});
	});
});