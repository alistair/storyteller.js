/** @jsx React.DOM */

var React = require("react");

// TODO -- also needs to take in the actual Step

module.exports = React.createClass({
	render: function(){
		return (
			<div className="sentence">{this.props.components}</div>
		);
	}
});