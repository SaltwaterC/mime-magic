npm:
	/usr/bin/env npm install

publish: npm
	/usr/bin/env npm publish

build:
	tools/build.sh

purge:
	rm -rf src/
	rm -rf bin/
	rm -rf share/

test: npm
	tools/test.sh
