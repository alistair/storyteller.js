var expect = require('chai').expect;
var Sentence = require('./../lib/sentence');
var Fixture= require('./../lib/fixture');

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
});