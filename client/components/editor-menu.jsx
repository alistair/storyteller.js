/** @jsx React.DOM */

var React = require("react");

var Icon = require('./icon');

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
				<button 
					id="preview" 
					className="btn btn-default"><Icon image="view.png"/>Preview</button>



				<button 
					id="run" 
					className="btn btn-default"><Icon image="run.png"/>Run</button>

				<button 
					id="clear-results" 
					className="btn btn-default"><Icon image="clear-results.png"/>Clear Results</button>


				<button 
					id="undo" 
					className="btn btn-default" 
					disabled={!this.state.undoEnabled} 
					title="Undo last change"
					onClick={callUndo}><Icon image="undo.png" />Undo</button>


				<button 
					id="redo" 
					className="btn btn-default" 
					disabled={!this.state.redoEnabled} 
					title="Redo the last change"
					onClick={callRedo}><Icon image="redo.png" />Redo</button>
			</span>
		);
	}
});