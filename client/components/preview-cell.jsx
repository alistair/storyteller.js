/** @jsx React.DOM */

var React = require("react");
var builders = require("./builders");

// TODO -- when this is a Cell, no need to worry about default
module.exports = React.createClass({
	render: function(){
		var builder = builders.get(this.props.cell.type);

		var text = builder.display(this.props.cell, this.props.value);

		return (
			<span className="preview-cell" title={this.props.cell.description}>{text}</span>
		);
	}
});