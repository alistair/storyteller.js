/** @jsx React.DOM */

/*
cell = {
	key: '',
	description: '',
	default: '',
	editor: 'select', 'text', 'number' -- later --> date, time, big-text, radio(?), typeahead(?)
	options: ['', ''] or [{key: '', display: ''}]
}

result = {
	status: ok, success, failure, error,
	error: '',
	actual: ''
}

props = {
	cell: {},
	value: '',
	result: {},
	callback: function(val){},
	changed: true/false

}

Editor
------
buildEditor(cell, value, callback) : component

*/

var React = require("react");


module.exports = React.createClass({
	render: function(){
		return (
			<span>{this.props.value}</span>
		)
	}
});

