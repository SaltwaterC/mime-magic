var mime = require('../');
var assert = require('assert');

mime.fileWrapper('data/foobar', function (err, res) {
	assert.ok(err instanceof Error);
	assert.equal(err.code, 1);
});
