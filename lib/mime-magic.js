var p = require('path');
var cp = require('child_process');

var fileExec = p.resolve(__dirname + '/../bin/file');
var fileFlags = ['--magic-file', p.resolve(__dirname + '/../share/magic.mgc'), '--brief', '--mime-type'];

var trim = function (string) {
	string = string || '';
	return string.trim();
};

var fileWrapper = function (path, cb) {
	var flags = JSON.parse(JSON.stringify(fileFlags)); //
	flags.push(path);
	cp.execFile(fileExec, flags, function (err, stdout) {
		stdout = stdout.trim();
		if (err) {
			if (stdout) {
				err.message = stdout;
			}
			cb(err);
		} else {
			cb(null, stdout);
		}
	});
};
exports.fileWrapper = fileWrapper;
