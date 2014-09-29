/** @jsx React.DOM */

var React = require("react");
var builders = require("./builders");


module.exports = React.createClass({
	render: function(){
		var builder = builders.get(this.props.cell.type);

		var text = builder.display(this.props.value || this.props.default);

		return (
			<span className="cell" title={this.props.description}>{text}</span>
		);
	}
});