/*

-- Sentence Metadata --
{
	key: 'name',
	format: 'some {words} in a {format}',
	description: '',
	cells: [
		{key: '', description: '', default: '', editor: '', options: []}
	]
}


-- Step Editor Model --
{
	key: '',
	comment: '',
	cells: {
		'key1': {value: '', changed: true/false, result: }

	},


	tables: {
		

	}
}

-- Persisted Step Model --
{
	key: 'foo',
	comment: '',
	cells: {key1: value1, key2: value2}
	
	-- and possibly for paragraphs --
	tables: {key1: [children steps]}

	-- for a table --
	rows: []
}

*/

/*
cell = {
	key: '',
	description: '',
	default: '',
	editor: 'select', 'text', 'number' -- later --> date, time, big-text, radio(?), typeahead(?)
	options: ['', ''] or [{key: '', display: ''}]
}

result = {
	status: ok, success, failure, error,
	error: '',
	actual: ''
}

props = {
	cell: {},
	value: '',
	result: {},
	callback: function(val){},
	changed: true/false

}

*/

var uuid = require('node-uuid');





function Grid(metadata, data){

}







