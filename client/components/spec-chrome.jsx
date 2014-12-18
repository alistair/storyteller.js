/** @jsx React.DOM */

var React = require("react");

var Outline = require('./spec-outline');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			editor: React.DOM.span(null, 'the editor should be here'),
			outline: {title: 'placeholder', active: true, children: []}
		}
	},

	render: function(){
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-4">
						<p>Lifecycle will be here</p>
						<p>Retries count</p>
						<p>Tags here</p>
						<Outline outline={this.state.outline} />
					</div>
					<div className="col-md-8">{this.state.editor}</div>
				</div>
			</div>
		);
	}
});