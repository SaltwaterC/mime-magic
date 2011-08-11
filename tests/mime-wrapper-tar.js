var mime = require('../');
var assert = require('assert');

mime.fileWrapper('data/foo.txt.tar', function (err, res) {
	assert.ifError(err);
	assert.deepEqual(res, 'application/x-tar');
});
