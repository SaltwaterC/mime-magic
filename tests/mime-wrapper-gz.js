var mime = require('../');
var assert = require('assert');

mime.fileWrapper('data/foo.txt.gz', function (err, res) {
	assert.ifError(err);
	assert.deepEqual(res, 'application/x-gzip');
});
