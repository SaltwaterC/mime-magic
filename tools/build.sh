#!/bin/sh

if [ ! -d src/file-5.07 ]
then
	cd arc
	tar -xf file-5.07.tar.gz
	mkdir ../src
	mv file-5.07 ../src
	cd ..
fi

if [ ! -f share/magic.mgc -o ! -f bin/file ]
then
	cd src/file-5.07
	./configure
	make
	cd ../../
	mkdir -p share
	cp src/file-5.07/magic/magic.mgc share
	mkdir -p bin/.libs
	./src/file-5.07/src/file -v
	cp src/file-5.07/src/file bin/file
	cp src/file-5.07/src/.libs/file bin/.libs
fi

exit 0
