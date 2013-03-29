## v5.14.0
 * Version numbering scheme changed.
 * Updates the bundled file(1) version to 5.14.
 * Added support for [config](https://github.com/lorenwest/node-config) in order to be able to specify your own paths to file(1) and magic.mgc [#9](https://github.com/SaltwaterC/mime-magic/issues/9).

## v0.4.3
 * Updates the bundled file(1) version to 5.13.

## v0.4.2
 * Updates the bundled file(1) version to 5.12. Changes the Windows build system to Cygwin due to the instability of the file-5.12 builds under MinGW + MSYS.

## v0.4.1
 * Static build of libmagic into the file utility. Simplifies the building and loading of the file utility. Makes the libmagic node.js bindings impossible with this setup, but things aren't moving into that direction.
 * Static build for the Windows binary. Removed the UPX compression due to slow binary startup times.

## v0.4
 * Deprecated the usage of mime.fileWrapper(). Calling mime() directly is preferred - [#7](https://github.com/SaltwaterC/mime-magic/issues/7).
 * jslint compliant.

## v0.3
 * Uses different installation mode for the file(1) utility. Under restrictive environments, such as Heroku, the library may use the system installed libmagic database which is not forward compatible.

## v0.2.6
 * Updates the bundled file(1) version to 5.11.
 * Support for passing an array of paths with the callback getting an array of MIME types - [#3](https://github.com/SaltwaterC/mime-magic/pull/3).

## v0.2.5
 * The make.js wrapper outputs the whole process after file(1) installation.

## v0.2.4
 * Updates the bundled file(1) version to 5.10.
 * Windows support.

## v0.2.3
 * Merges the changes from [#1](https://github.com/SaltwaterC/mime-magic/pull/1): couldn't use fileWrapper more than once unless restarted server.

## v0.2.2
 * Updates the bundled file(1) version to 5.09.
 * Uses child_process.execFile() instead of child_process.exec(). Besides avoiding spawning a new shell, the current approach also avoids path escaping issues and command injections.

## v0.2.1
 * Updates the bundled file(1) version to 5.08. This version adds application/zip detection among others.
 * Updates the build tool to rebuild file(1) if the expected version is different than the installed version.

## v0.2
 * Includes the file(1) (v5.07) source tree along with a build script which was made to work on Ubuntu / OS X. The wrapper uses this file version along with the appropriate magic database.

## v0.1.1
 * Updated the error detection code. Some file 4.x/5.x versions used to send the error message via STDOUT. The recent versions fix this behavior by sending the error message via STDERR. mime-magic error reporting is compatible with both.

## v0.1
 * Initial release featuring a simple file(1) wrapper.
