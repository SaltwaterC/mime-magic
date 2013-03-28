'use strict';

var mime = require('../../');
var assert = require('assert');

// This is the generic test for:
// path/to/file => mime/type
// ['path/to/file1', 'path/to/file2'] => ['mime/type1', 'mime/type2']

module.exports = function(path, expectedMime) {
	var callback = 0;

	mime(path, function(err, res) {
		callback++;
		assert.ifError(err);
		assert.deepEqual(res, expectedMime);
	});

	process.on('exit', function() {
		assert.strictEqual(callback, 1);
	});
};
