/** @jsx React.DOM */

var React = require("react");


var builders = {};

builders.text = function(cell, value, callback){
	var cb = function(e){
		callback(e.target.value);
	}

	return (
		<input type="text" value={value} onchange={callback} />
	);
}



module.exports = builders;