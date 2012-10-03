'use strict';

var mime = require('../');
var assert = require('assert');

var callbacks = {
	mime: false,
	fileWrapper: false
};

mime('data/foobar', function (err, res) {
	callbacks.mime = true;
	assert.ok(err instanceof Error);
	assert.equal(err.code, 1);
});

mime.fileWrapper('data/foobar', function (err, res) {
	callbacks.fileWrapper = true;
	assert.ok(err instanceof Error);
	assert.equal(err.code, 1);
});

process.on('exit', function () {
	var i;
	for (i in callbacks) {
		if (callbacks.hasOwnProperty(i)) {
			assert.ok(callbacks[i]);
		}
	}
});
