function StubLoader(){
	this.add = function(method){
		this[method] = function(props){
			return {type: method, props: props};
		}
	}

	this.add('cell');
	this.add('line');
	this.add('previewContainer');
	this.add('specPreview');
	this.add('previewCell');
}

module.exports = StubLoader;