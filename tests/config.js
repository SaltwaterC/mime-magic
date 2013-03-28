process.env.NODE_CONFIG_DIR = __dirname + '/cfg';

var mime = require('../');
var test = require('./includes/test.js');

var p = require('path');
var assert = require('assert');

var libPath = p.resolve(__dirname + '/../lib');
var fileExec = p.resolve(libPath + '/../bin/file');
var magicFile = p.resolve(libPath + '/../share/magic.mgc');

assert.strictEqual(mime.fileExec, fileExec);
assert.strictEqual(mime.magicFile, magicFile);

test('data/foo.txt', 'text/plain');
