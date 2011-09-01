#!/bin/sh

file_version="5.08"

if [ ! -d src/file-$file_version ]
then
	cd arc
	tar -xf file-$file_version.tar.gz
	mkdir ../src
	mv file-$file_version ../src
	cd ..
fi

if [ ! -f share/magic.mgc -o ! -f bin/file ]
then
	cd src/file-$file_version
	./configure
	make
	cd ../../
	mkdir -p share
	cp src/file-$file_version/magic/magic.mgc share
	mkdir -p bin/.libs
	./src/file-$file_version/src/file -v
	cp src/file-$file_version/src/file bin/file
	cp src/file-$file_version/src/.libs/file bin/.libs
fi

exit 0
