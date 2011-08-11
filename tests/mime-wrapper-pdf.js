var mime = require('../');
var assert = require('assert');

mime.fileWrapper('data/foo.pdf', function (err, res) {
	assert.ifError(err);
	assert.deepEqual(res, 'application/pdf');
});
