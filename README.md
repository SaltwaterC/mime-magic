## About

MIME type detection library for node.js. Unlike the existing [mime](https://github.com/bentomas/node-mime) module, mime-magic does not return the type by interpreting the file extension. Instead it uses the [libmagic(3)](http://linux.die.net/man/3/libmagic) library that does it properly.

Currently it provides just a simple [file(1)](http://linux.die.net/man/1/file) wrapper to get the things moving, but in the long run, the purpose of this module is to provide proper node.js libmagic bindings. The file(1) source tree is provided along with this package. It is built during the installation process. The module aims to use the latest available file version along with the up-to-date magic database.

## Installation

Either manually clone this repository into your node_modules directory, run `make build`, or the recommended method:

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

Passing relative paths is supported. The fileWrapper uses child_process.exec behind the scenes, therefore the err argument contains the information returned by the exec method itself plus the error message returned by file(1).

## Notice

The module was developed under Ubuntu 10.04. It was tested under OS X Snow Leopard and FreeBSD 8.2. Other platforms may be supported, but the behavior is untested.
