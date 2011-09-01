var mime = require('../');
var assert = require('assert');

mime.fileWrapper('data/foo.txt.zip', function (err, res) {
	assert.ifError(err);
	assert.deepEqual(res, 'application/zip');
});
