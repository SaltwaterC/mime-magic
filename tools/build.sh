#!/bin/sh

file_version="5.11"

build_file=0
if [ ! -f bin/file -o ! -f lib/libmagic.so ]
then
	echo "file(1) is not installed"
	build_file=1
else
	installed_file_version=`LD_LIBRARY_PATH=lib bin/file -v | grep -Eo "[0-9]\.[0-9]+"`
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
	cp src/file-$file_version/magic/magic.mgc share
	cp src/file-5.11/src/.libs/file bin/file
	cp src/file-5.11/src/.libs/libmagic.so lib/libmagic.so
	
	cd lib
	ln -s libmagic.so libmagic.so.1
	cd ..
	
	echo "--[DEBUG]--"
	echo "Version information:"
	# print the version info for debug purposes
	LD_LIBRARY_PATH=lib bin/file --magic-file share/magic.mgc -v
	echo
	# execute simple lookups to test the installation
	echo "Testing the installation:"
	LD_LIBRARY_PATH=lib bin/file --magic-file share/magic.mgc --mime-type --brief tests/data/foo
	LD_LIBRARY_PATH=lib bin/file --magic-file share/magic.mgc --mime-type --brief tests/data/foo.pdf
	LD_LIBRARY_PATH=lib bin/file --magic-file share/magic.mgc --mime-type --brief tests/data/foo.txt
	LD_LIBRARY_PATH=lib bin/file --magic-file share/magic.mgc --mime-type --brief tests/data/foo.txt.bz2
	LD_LIBRARY_PATH=lib bin/file --magic-file share/magic.mgc --mime-type --brief tests/data/foo.txt.gz
	LD_LIBRARY_PATH=lib bin/file --magic-file share/magic.mgc --mime-type --brief tests/data/foo.txt.tar
	LD_LIBRARY_PATH=lib bin/file --magic-file share/magic.mgc --mime-type --brief tests/data/foo.txt.zip
	
	echo "--[DEBUG]--"
fi

exit 0
