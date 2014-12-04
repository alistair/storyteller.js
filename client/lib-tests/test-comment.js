var expect = require('chai').expect;
var Comment = require('./../lib/comment');

describe('Comment', function(){
	it('assigns an id on creation', function(){
		var comment = new Comment('foo');
		expect(comment.hasOwnProperty('id')).to.be.true;
	});

	it('returns null for pack', function(){
		var comment = new Comment('foo');

		expect(comment.pack()).to.be.null;
	});

	it('writes out data for persistence', function(){
		var comment = new Comment('foo');

		var data = comment.write();

		expect(data).to.deep.equal({type: 'comment', text: 'foo'});
	});

	it('is not changed by default', function(){
		var comment = new Comment('foo');

		expect(comment.changed).to.be.false;
	});
});
