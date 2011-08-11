var mime = require('../');
var assert = require('assert');

mime.fileWrapper('data/foo.txt.bz2', function (err, res) {
	assert.ifError(err);
	assert.deepEqual(res, 'application/x-bzip2');
});
