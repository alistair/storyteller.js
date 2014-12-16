/** @jsx React.DOM */
var React = require("react");
var Postal = require('postal');

module.exports = React.createClass({
	render: function(){
		var onclick = Postal.publish({
			channel: 'editor',
			topic: 'select-cell',
			data: {section: this.props.section}
		});

		return (
			<a onClick={onclick}>add steps...</a>
		);
	}
});