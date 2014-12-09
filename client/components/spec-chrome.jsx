/** @jsx React.DOM */

var React = require("react");

module.exports = React.createClass({
	getInitialState: function(){
		return {
			editor: React.DOM.span(null, 'the editor should be here')
		}
	},

	render: function(){
		return (
			<div>{this.state.editor}</div>
		);
	}
});