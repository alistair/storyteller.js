/** @jsx React.DOM */

var React = require("react");


var builders = {
	add: function(key, strategy){
		if (typeof(strategy) === 'function'){
			this[key] = {
				edit: strategy,
				display: function(cell, value){
					return value.toString();
				}
			}
		}
		else {
			this[key] = strategy;
		}
	}
};

builders.add('text', function(cell, value, callback){
	var cb = function(e){
		callback(e.target.value);
	}

	return (
		<input type="text" value={value} onchange={callback} />
	);
});


module.exports = builders;