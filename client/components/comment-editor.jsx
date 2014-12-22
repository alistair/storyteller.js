/** @jsx React.DOM */

var React = require("react");
var TextboxEditor = require('./textbox-editor');
var DeleteGlyph = require('./delete-glyph');
var Icon = require('./icon');
var Postal = require('postal');

module.exports = React.createClass({
	render: function(){
		//var cell = Cell(this.props.arg);


		if (this.props.arg.active){
			var editor = TextboxEditor({arg: this.props.arg, classes: 'form-control'});

			return (
				<div id={this.props.step.id} className="well">{editor}</div>
			);

			
		}
		else {
			var identifier = {step: this.props.step.id, cell: 'text'};
			var editCell = function(e){
				Postal.publish({
					channel: 'editor',
					topic: 'select-cell',
					data: identifier
				});

				e.preventDefault();
				return false;

			}

			return (
				<div 
					id={this.props.step.id} 
					className="comment well" 
					 >
						<DeleteGlyph step={this.props.step} />
						<span className="comment-text" tabIndex="0" role="button" onClick={editCell} onFocus={editCell}>{this.props.arg.value}</span>
				</div>
			);
		}

	}
});