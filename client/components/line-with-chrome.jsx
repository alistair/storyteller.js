/** @jsx React.DOM */

var React = require("react");
var DeleteGlyph = require('./delete-glyph');

// TODO -- also needs to take in the actual Step

module.exports = React.createClass({
	render: function(){
		return (
			<div className="sentence" id={this.props.step.id}>
				<DeleteGlyph step={this.props.step} />
				{this.props.components}
			</div>
		);
	}
});