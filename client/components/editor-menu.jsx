/** @jsx React.DOM */

var React = require("react");

module.exports = React.createClass({
	render: function(){
		return (
			<span><button>Undo</button><button>Redo</button></span>
		);
	}
});