purge:
	rm -rf src/
	rm -rf bin/.libs
	rm -f bin/file

publish: purge
	/usr/bin/env npm -f publish

build:
	tools/build.sh

test: build
	tools/test.sh
