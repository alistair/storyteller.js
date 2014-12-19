/** @jsx React.DOM */
var React = require("react");
var Postal = require('postal');

// {id: , active: , title: , children:[]}

var buildItem = function(item){
	var children = item.children.map(function(x){
		return buildItem(x);
	});

	if (item.active){
		return ActiveOutlineItem({title: item.title, children: children});
	}
	else {
		return OutlineItem({title: item.title, id: item.id, children: children});
	}
}

var ActiveOutlineItem = React.createClass({
	render: function(){
		return (
			<li key={this.props.id}><b>{this.props.title}</b><ul>{this.props.children}</ul></li>
		);
	}
});

var OutlineItem = React.createClass({
	render: function(){
		var id = this.props.id;
		
		var onclick = function(e){
			Postal.publish({
				channel: 'editor',
				topic: 'select-holder',
				data: {holder: id}
			});

			e.preventDefault();
		}

		return (
			<li key={this.props.id}>
				<a href="#" onClick={onclick}>{this.props.title}</a>
				<ul>{this.props.children}</ul>
			</li>
		);
	}
});

module.exports = React.createClass({
	render: function(){
		var outline = buildItem(this.props.outline);

		return (<ul className="spec-outline">{outline}</ul>);
	}
});