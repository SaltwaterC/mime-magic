npm:
	/usr/bin/env npm install

publish: npm
	/usr/bin/env npm publish

build:
	tools/build.sh

purge:
	rm -rf src/
	rm -rf bin/.libs
	rm -f bin/file

test:
	tools/test.sh
