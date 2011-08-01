var p = require('path');
var cp = require('child_process');

var trim = function (string) {
	string = string || '';
	return string.replace(/^\s*/, '').replace(/\s*$/, '');
};

var fileWrapper = function (path, cb) {
	path = p.resolve(path);
	cp.exec('/usr/bin/env file --brief --mime-type ' + path, function (err, stdout, stderr) {
		stdout = trim(stdout);
		stderr = trim(stderr);
		if (err) {
			var message = '';
			if (stderr) {
				message = stderr;
			} else if (stdout) { // some version send the error over STDOUT
				message = stdout;
			}
			err.message = message; 
			cb(err);
		} else {
			cb(null, stdout);
		}
	});
};

exports.fileWrapper = fileWrapper;
