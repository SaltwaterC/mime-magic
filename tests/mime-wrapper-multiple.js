var test = require('./includes/test.js');

var files = [
		'data/foo.txt.bz2',
		'data/foo.txt.gz',
		'data/foo.txt.zip',
		'data/foo.txt.tar',
		'data/foo.pdf',
		'data/foo.txt'
];

var expected = [
		'application/x-bzip2',
		'application/x-gzip',
		'application/zip',
		'application/x-tar',
		'application/pdf',
		'text/plain'
];

test(files, expected);
