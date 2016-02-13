/**
 * Main build script for Numerousness.js.
 * To run, navigate to the base project directory and run: node build/build.js
 */
(function(){
	'use strict';
	
	var UglifyJs2 = require('uglify-js'),
		Rjs       = require('requirejs'),
		AmdClean  = require('amdclean'),
		exec      = require('child_process').exec,
		fs        = require('fs');
	
	var licenseText = fs.readFileSync('LICENSE.txt', 'utf8'),
		licenseComment = formatLicenseComment(licenseText);
	
	var version = '0.0.0.0',
		date = new Date();
	
	var config = {
		rjs: {
			baseUrl: 'src/lib',
			name: 'thruster',
			out: 'dist/thruster.js',
			paths: {
				'thruster': '../thruster'
			},
			
			optimize: 'none', // AMDclean won't work on minified files
			useStrict: true,
			removeCombined: true,
			
			// Do further processing after r.js has worked its magic
			onModuleBundleComplete: onRjsModuleBundleComplete
		},
		
		amdClean: {},
		
		uglifyJs2: {
			fileIn: 'dist/thruster.js',
			fileOut: 'dist/thruster.min.js',
			warnings: true
		}
	};
	
	/**
	 * Additional build steps to run after r.js has optimised modules into one file.
	 */
	function onRjsModuleBundleComplete(data) {
		console.log('r.js optimisation complete.');
		
		var outputFile = data.path;
		
		// Remove AMD module definitions using AMDclean (https://github.com/gfranko/amdclean)
		// This way we don't need to include an AMD module loader in the finished library.
		console.log('Running AMDclean...');
		var cleanedCode = AmdClean.clean({
			'filePath': outputFile
		});
		cleanedCode = cleanedCode.replace(/@VERSION@/, version);     // Replace version number
		cleanedCode = cleanedCode.replace(/@DATE@/, date.getTime());           // Replace build date
		fs.writeFileSync(outputFile, licenseComment + cleanedCode);  // Write to disk
		console.log('AMDclean complete.');
		
		// Minify resulting code with UglifyJS2 (https://github.com/mishoo/UglifyJS2)
		console.log('Uglifying code...');
		var uglifiedCode = UglifyJs2.minify(outputFile, config.uglifyJs2);
		fs.writeFileSync(config.uglifyJs2.fileOut, licenseComment + uglifiedCode.code);  // Write to disk
		console.log('Uglification complete.');
	};
	
	/**
	 * Wraps the license text in a JS comment and indents it nicely.
	 */
	function formatLicenseComment(licenseText) {
		var comment = '';
		var licenseArr = licenseText.split('\r\n');
		
		for (var i in licenseArr) {
			comment += ' * ' + licenseArr[i] + '\r\n';
		}
		
		return '/**\r\n' + comment + '**/\r\n';
	};
	
	
	console.log('Starting build...');
	
	console.log('Generating documentation...');
	exec('jsdoc src -r -d docs');
	console.log('Finished generating documentation.');
	
	// Run r.js optimizer
	console.log('Running r.js optimisations...')
	Rjs.optimize(config.rjs);
})();