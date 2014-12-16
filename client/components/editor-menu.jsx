/** @jsx React.DOM */

var React = require("react");

module.exports = React.createClass({
	// also specId and specPath

	getInitialState: function(){
		return {undoEnabled: false, redoEnabled: false};
	},

	render: function(){
		var presenter = this.props.presenter;

		var callRedo = function(){
			presenter.redo();
		}

		var callUndo = function(){
			presenter.undo();
		}


		return (
			<span>
				<button id="undo" disabled={!this.state.undoEnabled} onClick={callUndo}>Undo</button>
				<button id="redo" disabled={!this.state.redoEnabled} onClick={callRedo}>Redo</button>
			</span>
		);
	}
});