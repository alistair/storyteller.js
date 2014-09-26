var expect = require('chai').expect;

describe('simple arithmetic', function(){
	it('should be able to add numbers', function(){
		expect(5).to.equal(2 + 3);

	});

	it('should be able to substract numbers', function(){
		expect(5).to.equal(7 - 2);
		expect(5).to.equal(7 - 2);
		expect(5).to.equal(7 - 2);
	});
});