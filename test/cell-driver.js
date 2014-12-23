var $ = require('jquery');

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
		$(element).blur();
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

module.exports = CellDriver;