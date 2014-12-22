var $ = require('jquery');
var spec = require('./lib-tests/object-mother').specification();

var React = require("react");
var Shell = require('./lib/shell');
var shell = new Shell(document.body);

//React.renderComponent(Layout({}), document.getElementById('nav'));

var EditorPresenter = require('./lib/editor-presenter');

var presenter = new EditorPresenter(spec);
var loader = require('./components/component-loader');

presenter.activate(loader, shell);

var specs = {
	name: 'The project name',
	suites: [],
	specs: []

}