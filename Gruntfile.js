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
					'src/helpers/common.js', 
					'src/refs/data.js', 
					'src/models/Game.js', 
					'src/models/Ship.js', 
					'src/app.js'
				],
				dest: 'dist/app.js',
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					clearRequireCache: true
				},
				src: ['tests/**/*.js']
			},
		},
		watch: {
			scripts: {
				files: 'src/**/*.js',
				tasks: ['concat'],
				options: {
					livereload: true,
					interrupt: true,
				},
			}
		}
	});

	grunt.registerTask('default', ['concat', 'mochaTest']);
	
}