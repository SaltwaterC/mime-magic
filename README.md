## About [![build status](https://secure.travis-ci.org/SaltwaterC/mime-magic.png)](http://travis-ci.org/SaltwaterC/mime-magic) ![stillmaintained](http://stillmaintained.com/SaltwaterC/mime-magic.png)

MIME type detection library for node.js. Unlike the [mime](https://github.com/broofa/node-mime) module, mime-magic does not return the type by interpreting the file extension. Instead it uses the [libmagic(3)](http://linux.die.net/man/3/libmagic) library which provides the result by reading the "magic number" of the file itself.

It provides just a simple [file(1)](http://linux.die.net/man/1/file) wrapper. The file(1) source tree is provided along with this package. It is built during the installation process. The module aims to use the latest available file version along with the up-to-date magic database.

The Windows version of file(1) is bundled with the package. It is a native binary build with MinGW.

## Installation

Either manually clone this repository into your node_modules directory, run `make build` (under unices), or the recommended method:

> npm install mime-magic

## Usage mode

```javascript
var mime = require('mime-magic');

mime('/path/to/foo.pdf', function (err, type) {
	if (err) {
		console.error(err.message);
		// ERROR: cannot open `/path/to/foo.pdf' (No such file or directory)
	} else {
		console.log('Detected mime type: %s', type);
		// application/pdf
	}
});
```

You may use an array of paths. The callback gets an array of mimes:

```javascript
var files = [
	'/path/to/foo.pdf',
	'/path/to/foo.txt'
];

mime(files, function (err, types) {
	if (err) {
		console.error(err.message);
		// ERROR: cannot open `/path/to/foo.pdf' (No such file or directory)
		// ERROR: cannot open `/path/to/foo.txt' (No such file or directory)
	} else {
		console.log(types);
		// ['application/pdf', 'text/plain']
	}
});
```

Under Windows, you must escape the backslash separators of the path argument:

```javascript
mime('C:\\path\\to\\foo.pdf', function (err, type) {
	// do something
});
```

You may also pass a path that uses forward slashes as separators:

```javascript
mime('C:/path/to/foo.pdf', function (err, type) {
	// do something
});
```

Passing relative paths is supported. The file wrapper uses child_process.execFile() behind the scenes, therefore the err argument contains the information returned by the execFile() method itself plus the error message returned by file(1).

## Notices

The mime.fileWrapper method is deprecated. The preferred method is to call the module directly.

The module is developed under Ubuntu 12.04, and Windows 7. It is tested under OS X Lion, and FreeBSD 9.0. Other platforms may be supported, but the behavior is untested.

The Windows binaries are built by myself under Windows 7 / MinGW + MSYS.

Here's the virustotal.com analysis:

 * [file.exe](https://www.virustotal.com/file/7141c8c0f7a8dbc7c9f2108c72565ad69cf248b88a3d274a41e7242a8cf7b1d4/analysis/1352984623/)
 * [libgnurx-0.dll](https://www.virustotal.com/file/ff6104a6c02ccebde66fb988924412cbdf9fd8b5e5a1a0699833b3892048d688/analysis/1352984639/)

Please notice that some antiviruses may throw false positives.

node.js libmagic bindings were initially planned. The plans for adding them are suspended. The library gets the job done. If you feel like contributing such support, pull requests are welcome. Beware: since v0.4.1 libmagic(3) is statically linked into file(1). You need to revert to building the libmagic part as dynamic library in order to implement the node.js bindings.

## Contributors

 * [Felix Chan](https://github.com/felixchan) - [#1](https://github.com/SaltwaterC/mime-magic/pull/1): couldn't use fileWrapper more than once unless restarted server.
 * [eddyb](https://github.com/eddyb) - [#3](https://github.com/SaltwaterC/mime-magic/pull/3): support for arrays of paths, with the callback getting an array of mime-types.
