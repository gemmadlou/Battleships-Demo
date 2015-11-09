'use strict';

module.exports = function(grunt) {
	
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
					'src/models/**/*.js',
					'src/services/**/*.js',
					'src/refs/*.js',
					'src/helpers/*.js',
					'src/app.js'
				],
				dest: 'dist/app.js',
			}
		},
		mocha_phantomjs: {
			all: ['tests/**/*.html']
		},
		watch: {
			scripts: {
				files: [
					'src/**/*.js',
					'tests/**/*.js'
				],
				tasks: ['concat', 'mocha_phantomjs'],
				options: {
					livereload: true,
					interrupt: true,
				},
			}
		}
	});

	grunt.registerTask('default', ['concat', 'mocha_phantomjs']);
	
}