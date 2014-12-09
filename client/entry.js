
var spec = require('./lib-tests/object-mother').specification();
var shell = require('./lib/shell');

var EditorPresenter = require('./lib/editor-presenter');

var presenter = new EditorPresenter(spec);
var loader = require('./components/component-loader');

presenter.activate(loader, shell);