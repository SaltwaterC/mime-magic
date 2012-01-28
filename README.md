## About ![still maintained](http://stillmaintained.com/SaltwaterC/mime-magic.png)

MIME type detection library for node.js. Unlike the existing [mime](https://github.com/bentomas/node-mime) module, mime-magic does not return the type by interpreting the file extension. Instead it uses the [libmagic(3)](http://linux.die.net/man/3/libmagic) library which does it properly.

Currently it provides just a simple [file(1)](http://linux.die.net/man/1/file) wrapper to get the things moving, but in the long run, the purpose of this module is to provide proper node.js libmagic bindings. The file(1) source tree is provided along with this package. It is built during the installation process. The module aims to use the latest available file version along with the up-to-date magic database.

The Windows version of file(1) is bundled with the package. It is a native binary build with MinGW and compressed with UPX.

## Installation

Either manually clone this repository into your node_modules directory, run `make build` (under unices), or the recommended method:

> npm install mime-magic

## Usage mode

```javascript
var mime = require('mime-magic');

mime.fileWrapper('/path/to/foo.pdf', function (err, type) {
	if (err) {
		console.error(err.message); // ERROR: cannot open `/path/to/foo.pdf' (No such file or directory)
	} else {
		console.log('Detected mime type: %s', type); // application/pdf
	}
});
```

Under Windows, you must escape the backslash separators of the path argument:

```javascript
mime.fileWrapper('C:\\path\\to\\foo.pdf', function (err, type) {
	// do something
});
```

You may also pass a path that uses forward slashes as separators:

```javascript
mime.fileWrapper('C:/path/to/foo.pdf', function (err, type) {
	// do something
});
```

Passing relative paths is supported. The fileWrapper uses child_process.execFile() behind the scenes, therefore the err argument contains the information returned by the execFile() method itself plus the error message returned by file(1).

## Notice

The module was developed under Ubuntu 10.04 and Windows 7. It was tested under OS X Snow Leopard and FreeBSD 8.2. Other platforms may be supported, but the behavior is untested.

## Contributor

 * [Felix Chan](https://github.com/felixchan) - [#1](https://github.com/SaltwaterC/mime-magic/pull/1): couldn't use fileWrapper more than once unless restarted server
