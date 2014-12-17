var $ = require('jquery');
var spec = require('./lib-tests/object-mother').specification();

// TEMP
spec.steps[0].active = true;


var Shell = require('./lib/shell');
var shell = new Shell($('#main'));


var EditorPresenter = require('./lib/editor-presenter');

var presenter = new EditorPresenter(spec);
var loader = require('./components/component-loader');

presenter.activate(loader, shell);