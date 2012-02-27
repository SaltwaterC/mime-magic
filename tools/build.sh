#!/bin/sh

file_version="5.11"

build_file=0
if [ ! -f share/magic.mgc -o ! -f bin/file ]
then
	echo "file(1) is not installed"
	build_file=1
else
	installed_file_version=`bin/file -v | grep -Eo "[0-9]\.[0-9]+"`
	echo "file(1) $installed_file_version is installed, expecting $file_version"
	if [ "$installed_file_version" != "$file_version" ]
	then
		make purge
		build_file=1
	fi
fi

if [ ! -d src/file-$file_version ]
then
	cd arc
	tar -xf file-$file_version.tar.gz
	mkdir ../src
	mv file-$file_version ../src
	cd ..
fi

if [ $build_file -eq 1 ]
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
