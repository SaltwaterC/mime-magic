'use strict';

var mime = require('../');
var util = require('util');
var assert = require('assert');

var callback = 0;

mime('data/foobar', function(err, res) {
	util.log('callback for non existent data/foobar');
	callback++;
	assert.ok(err instanceof Error);
	assert.equal(err.code, 1);
});

process.on('exit', function() {
	assert.strictEqual(callback, 1);
});
