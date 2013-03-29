## About [![build status](https://secure.travis-ci.org/SaltwaterC/mime-magic.png?branch=master)](http://travis-ci.org/SaltwaterC/mime-magic)

MIME type detection library for node.js. Unlike the [mime](https://github.com/broofa/node-mime) module, mime-magic does not return the type by interpreting the file extension. Instead it uses the [libmagic(3)](http://linux.die.net/man/3/libmagic) library which provides the result by reading the "magic number" of the file itself.

It provides just a simple [file(1)](http://linux.die.net/man/1/file) wrapper. The file(1) source tree is provided along with this package. It is built during the installation process. The module aims to use the latest available file version along with the up-to-date magic database.

The Windows version of file(1) is bundled with the package. It is a native binary built under cygwin 1.7. The new versioning scheme of mime-magic follows the version number of the upstream file(1) development. mime-magic x.y.z means bundled with file(1) version x.y, patch level z.

## Installation

Either manually clone this repository into your node_modules directory, run `make build` (under unices), or the recommended method:

> npm install mime-magic

You need a working gcc toolchain and GNU or BSD make in order to use the bundled file(1) version.

If the installation of the bundled file(1) fails and you do not wish to install the gcc toolchain and a make utility, mime-magic provides [config](https://github.com/lorenwest/node-config) support, but this is *unsupported* functionality aka if things break, you're on your own. For more details, refer to the [config online documentation](http://lorenwest.github.com/node-config/latest/).

The configuration file contents:

```javascript
/* default.json */

{
	"mime-magic": {
		"file": "path/to/file", // the path to file(1)
		"magic": "path/to/magic.mgc" // the path to the coresponding magic.mgc
		"absolute": true // absolute paths, otherwise they are handled as relative to __dirname of mime-magic.js (mime-magic/lib)
	}
}
```

Example for an OS X 10.8 file 5.13 installed with [Homebrew](http://mxcl.github.com/homebrew/):

```javascript
{
	"mime-magic": {
		"file": "/usr/local/Cellar/file-formula/5.13/bin/file",
		"magic": "/usr/local/Cellar/file-formula/5.13/share/misc/magic.mgc",
		"absolute": true
	}
}
```

Please *do not open issues* if you use the config support instead of the bundled file(1), unless there's a provable issue with the config implementation itself. There are strong reasons behind the decision for providing the bundle: consistency and reliability. As example, file 5.04 which ships with OS X 10.8, is utterly broken:

```bash
file foo
foo: cannot open `foo' (No such file or directory)
echo $?
0
file foo 2>/dev/null
foo: cannot open `foo' (No such file or directory)
echo $?
0
```

In plain English: the command exists with succes and it sends its output to STDOUT instead of STDERR even though it fails to read a proper MIME type as the file does not exist. Detecting a failure is impossible without braindead measures.

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

You can take a peek at the paths resolved internally by the library.

mime.fileExec  => the absolute path to the file(1) binary
mime.magicFile => the absolute path to the magic.mgc database

## Notices

The mime.fileWrapper method is deprecated. The preferred method is to call the module directly as function.

The module is developed under Ubuntu 12.04, Windows 7, and Mac OS X 10.8. It is tested FreeBSD 9.1. Other platforms may be supported, but the behavior is untested.

The Windows binaries are built by me under Windows 7 / cygwin 1.7.

Here's the virustotal.com analysis:

 * [file.exe](https://www.virustotal.com/en/file/ed1afbc74c59f1a2087c4cf1889b72793470d129f9d16c5357235ec891cabcac/analysis/1364565832/)
 * [cygwin1.dll](https://www.virustotal.com/file/df4e2115c80d07ca4345ba92053dcc38c4002554677a04509d02669a50ab86bf/analysis/1359210741/)

Please notice that some antiviruses may throw false positives.

node.js libmagic bindings were initially planned. The plans for adding them are suspended. The library gets the job done. If you feel like contributing such support, pull requests are welcome. Beware: since v0.4.1 libmagic(3) is statically linked into file(1). You need to revert to building the libmagic part as dynamic library in order to implement the node.js bindings.

## Contributors

 * [Felix Chan](https://github.com/felixchan) - [#1](https://github.com/SaltwaterC/mime-magic/pull/1): couldn't use fileWrapper more than once unless restarted server.
 * [eddyb](https://github.com/eddyb) - [#3](https://github.com/SaltwaterC/mime-magic/pull/3): support for arrays of paths, with the callback getting an array of mime-types.
