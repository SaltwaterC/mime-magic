purge:
	rm -rf src/
	rm -rf bin/.libs
	rm -f bin/file
	rm -f lib/libmagic.so
	rm -f lib/libmagic.so.1

publish: purge
	/usr/bin/env npm -f publish

build:
	tools/build.sh

tests: test
check: test
test: build
	tools/test.sh
