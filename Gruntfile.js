'use strict';

module.exports = function (grunt) {
	// Show elapsed time at the end
	require('time-grunt')(grunt);
	// Load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			bin: {
				src: ['bin/index.js']
			}
		},
		nodemon: {
			dev: {
				script: 'bin/index.js',
				options: {
					args: [
						grunt.option('target')
					].concat( process.argv.slice(3) )
				}
			}
		}
	});

	// Default task.
	grunt.registerTask('default', ['jshint', 'nodemon']);

	grunt.registerTask('test', ['jshint']);

};
