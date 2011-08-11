var mime = require('../');
var assert = require('assert');

mime.fileWrapper('data/foo', function (err, res) {
	assert.ifError(err);
	assert.deepEqual(res, 'text/plain');
});
