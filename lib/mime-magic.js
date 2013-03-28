'use strict';

/* core modules */
var p = require('path');
var cp = require('child_process');

/* config support */
var config, fileExec, magicFile;

try { // loading the configuration by using config
	// patching in a proper runtime.json
	if (!process.env.NODE_CONFIG_DIR) {
		process.env.NODE_CONFIG_RUNTIME_JSON = process.env.NODE_CONFIG_RUNTIME_JSON || __dirname + '/runtime.json';
	}

	config = require('config')['mime-magic'];

	fileExec = config.file || '/../bin/file';
	magicFile = config.magic || '/../share/magic.mgc';

	if (!config.absolute) {
		fileExec = p.resolve(__dirname + config.file);
		magicFile = p.resolve(__dirname + config.magic);
	}
} catch (e) { // no config found, using defaults
	fileExec = p.resolve(__dirname + '/../bin/file');
	magicFile = p.resolve(__dirname + '/../share/magic.mgc');
}

var fileFlags = ['--magic-file', magicFile, '--brief', '--mime-type'];

/**
 * Wrapper for the file(1) utility
 * 
 * @param path
 * @param {Function} cb
 */
var fileWrapper = function(path, cb) {
	cp.execFile(fileExec, fileFlags.concat(Array.isArray(path) ? path : [path]), function(err, stdout) {
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
var fileWrapperDeprecated = function() {
	console.error('Warning: mime-magic use of mime.fileWrapper() is deprecated. Use mime() instead.');
	fileWrapper.apply(this, arguments);
};
module.exports.fileWrapper = fileWrapperDeprecated;

// exporting the actual used config stuff
module.exports.config = config || {};
module.exports.fileExec = fileExec;
module.exports.magicFile = magicFile;
