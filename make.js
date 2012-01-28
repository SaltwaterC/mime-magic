// make wrapper so it would not mess the Windows installation
if (process.platform !== 'win32')
{
	require('child_process').execFile('/usr/bin/env', ['make', process.argv[2]]);
}
