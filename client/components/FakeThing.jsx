/** @jsx React.DOM */

var React = require("React");

module.exports = React.createClass({
	render: function(){
		return (
			<div>{this.props.text}</div>
		)
	}
});

