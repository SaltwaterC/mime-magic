// This is the generic test for path/to/file => mime/type

module.exports = function (path, expectedMime) {
	'use strict';

	var mime = require('../../');
	var assert = require('assert');
	
	var callbacks = {
		mime: false,
		fileWrapper: false
	};

	mime(path, function (err, res) {
		callbacks.mime = true;
		assert.ifError(err);
		assert.deepEqual(res, expectedMime);
	});
	
	mime.fileWrapper(path, function (err, res) {
		callbacks.fileWrapper = true;
		assert.ifError(err);
		assert.deepEqual(res, expectedMime);
	});

	process.on('exit', function () {
		var i;
		for (i in callbacks) {
			if (callbacks.hasOwnProperty(i)) {
				assert.ok(callbacks[i]);
			}
		}
	});
};
