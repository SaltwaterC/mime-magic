'use strict';

var mime = require('../');
var assert = require('assert');

var callback = 0;

mime('data/foobar', function (err, res) {
	callback++;
	assert.ok(err instanceof Error);
	assert.equal(err.code, 1);
});

process.on('exit', function () {
	assert.strictEqual(callback, 1);
});
