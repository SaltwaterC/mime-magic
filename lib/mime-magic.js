var p = require('path');
var cp = require('child_process');

// set the LD_LIBRARY_PATH in order to avoid libmagic.so loading issues
process.env.LD_LIBRARY_PATH = p.resolve(__dirname + '/../lib');

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
			cb(null, Array.isArray(path) ? stdout.split(/\r\n|\n|\r/) : stdout);
		}
	});
};
exports.fileWrapper = fileWrapper;
