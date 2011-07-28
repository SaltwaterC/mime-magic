var p = require('path');
var cp = require('child_process');

var trim = function (string) {
	return string.replace(/^\s*/, '').replace(/\s*$/, '');
};

var fileWrapper = function (path, cb) {
	path = p.resolve(path);
	cp.exec('/usr/bin/env file --brief --mime-type ' + path, function (err, stdout) {
		stdout = trim(stdout);
		if (err) {
			// At least file 5.0x sends the error message via STDOUT
			err.message = stdout; 
			cb(err);
		} else {
			cb(null, stdout);
		}
	});
};

exports.fileWrapper = fileWrapper;
