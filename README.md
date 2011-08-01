## About

MIME type detection library for node.js. Unlike the existing [mime](https://github.com/bentomas/node-mime) module, mime-magic does not return the type by interpreting the file extension. Instead it uses the [libmagic(3)](http://linux.die.net/man/3/libmagic) library that does it properly.

Currently it provides just a simple [file(1)](http://linux.die.net/man/1/file) wrapper to get the things moving, but in the long run, the purpose of this module is to provide proper node.js libmagic bindings.

## Installation

Either manually clone this repository into your node_modules directory, or the recommended method:

> npm install mime-magic

## Usage mode

```javascript
var mime = require('mime-magic');

mime.fileWrapper('/path/to/foo.pdf', function (err, mime) {
	if (err) {
		console.error(err.message); // ERROR: cannot open `/path/to/foo.pdf' (No such file or directory)
	} else {
		console.log('Detected mime type: %s', mime); // application/pdf
	}
});
```

Passing relative paths is supported. The fileWrapper uses child_process.exec behind the scenes, therefore the err argument contains the information returned by the exec method itself plus the error message returned by file(1). The module was developed against file 5.03 which sends the error message via STDOUT. An unfortunate choice from the developer, but if your file utility behaves differently, then you may not get the exact error message.

## Known issues

Not all the unices are supported by this release. The file(1) invocation is different on OS X for example. Other possible (such as BSD ports) use cases are unknown. Till a proper wrapper and proper bindings are available, consider it usable just under the above circumstances.
