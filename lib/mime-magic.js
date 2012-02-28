var p = require('path');
var cp = require('child_process');

var fileExec = p.resolve(__dirname + '/../bin/file');
var fileFlags = ['--magic-file', p.resolve(__dirname + '/../share/magic.mgc'), '--brief', '--mime-type'];

var fileWrapper = function (path, cb) {
	cp.execFile(fileExec, fileFlags.concat(Array.isArray(path) ? path : [path]), function (err, stdout) {
		stdout = stdout.trim();
		if (err) {
			if (stdout) {
				err.message = stdout;
			}
			cb(err);
		} else {
			cb(null, Array.isArray(path) ? stdout.split(/\n|\r|\r\n/) : stdout);
		}
	});
};
exports.fileWrapper = fileWrapper;
