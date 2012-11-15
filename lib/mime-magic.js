'use strict';

var p = require('path');
var cp = require('child_process');

var fileExec = p.resolve(__dirname + '/../bin/file');
var fileFlags = ['--magic-file', p.resolve(__dirname + '/../share/magic.mgc'), '--brief', '--mime-type'];

/**
 * Wrapper for the file(1) utility
 * 
 * @param path
 * @param {Function} cb
 */
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
module.exports = fileWrapper;

// the deprecation warning
var fileWrapperDeprecated = function () {
	console.error('Warning: mime-magic use of mime.fileWrapper() is deprecated. Use mime() instead.');
	fileWrapper.apply(this, arguments);
};
module.exports.fileWrapper = fileWrapperDeprecated;
