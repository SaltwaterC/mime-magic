// make wrapper so it would not mess the Windows installation

if (process.platform !== 'win32')
{
	require('child_process').execFile('/usr/bin/env', ['make', process.argv[2]], function (err, stdout) {
		if (err) {
			console.log(err.message);
			process.exit(1);
		} else {
			console.log(stdout);
		}
	});
}
