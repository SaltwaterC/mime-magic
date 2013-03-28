#!/bin/sh

## CONFIG
file_version="5.14"
## /CONFIG

build_file=0
if [ ! -f bin/file ]
then
	echo "file(1) is not installed: bin/file not found"
	build_file=1
fi

if [ $build_file -eq 0 ]
then
	installed_file_version=$(bin/file -v | grep -Eo "[0-9]\.[0-9]+")
	echo "file(1) $installed_file_version is installed, expecting $file_version"
	if [ "$installed_file_version" != "$file_version" ]
	then
		make purge
		build_file=1
	fi
fi

if [ ! -d src/file-$file_version ]
then
	cd vendor
	tar -xf file-$file_version.tar.gz
	mkdir ../src
	mv file-$file_version ../src
	cd ..
fi

if [ $build_file -eq 1 ]
then
	build_file=0
	cd src/file-$file_version
	./configure --disable-shared
	make
	cd ../../
	cp src/file-$file_version/magic/magic.mgc share
	cp src/file-$file_version/src/file bin/file
	
	make debug
fi

exit 0
