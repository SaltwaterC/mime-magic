// This is the generic test for:
// path/to/file => mime/type
// ['path/to/file1', 'path/to/file2'] => ['mime/type1', 'mime/type2']

module.exports = function (path, expectedMime) {
	'use strict';
	
	var mime = require('../../');
	var assert = require('assert');
	
	var callback = false;
	
	mime(path, function (err, res) {
		callback = true;
		assert.ifError(err);
		assert.deepEqual(res, expectedMime);
	});
	
	process.on('exit', function () {
		assert.ok(callback);
	});
};
