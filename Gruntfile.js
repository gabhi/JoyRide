module.exports = function (grunt) {

	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			all: {
				src: [ "public/*.js" ],
				options: {
					jshintrc: ".jshintrc"
				}
			}
		},
		concat: {
			dist: {
				src: [
					"public/lib/tquery-bundle.js",
					"public/lib/tquery.norequirejs.js",
					"public/lib/THREEx.KeyboardState.js",
					"public/lib/tquery.keyboard.js",
					"public/lib/THREEx.DeviceOrientationState.js",
					"public/lib/tquery.deviceorientation.js",
					"public/lib/tquery.grassground.js",
					"public/lib/tquery.light.shadow.js",
					"public/lib/tquery.cubetexture.js",
					"public/lib/tquery.skymap.js",
					"public/lib/Car.js",
					"public/lib/tquery.car.js",
					"public/lib/tquery.car.keyboard.js",
					"public/lib/tquery.car.deviceorientation.js",
					"public/lib/tquery.car.cameracontrols.js",
					"public/lib/fonts/droid/droid_serif_bold.typeface.js",
					"public/lib/tquery.text.js",
					"public/lib/THREEx.GeometryWobble.js",
					"public/lib/tquery.geometry.wobble.js",
					"public/js/game.js"
				],
				dest: "public/dist/joyride.min.js"
			},
			options: {
				stripBanners: true,
				banner: "/*!\n * <%= pkg.name %>\n * <%= pkg.description %>\n * @version <%= pkg.version %> - <%= grunt.template.today(\'yyyy-mm-dd\') %>\n * @author <%= pkg.author.name %> <<%= pkg.author.url %>>\n */\n"
			}
		},
		uglify: {
			dist: {
				src: [ "<banner:meta.banner>",
					"public/lib/tquery-bundle.js",
					"public/lib/tquery.norequirejs.js",
					"public/lib/THREEx.KeyboardState.js",
					"public/lib/tquery.keyboard.js",
					"public/lib/THREEx.DeviceOrientationState.js",
					"public/lib/tquery.deviceorientation.js",
					"public/lib/tquery.grassground.js",
					"public/lib/tquery.light.shadow.js",
					"public/lib/tquery.cubetexture.js",
					"public/lib/tquery.skymap.js",
					"public/lib/Car.js",
					"public/lib/tquery.car.js",
					"public/lib/tquery.car.keyboard.js",
					"public/lib/tquery.car.deviceorientation.js",
					"public/lib/tquery.car.cameracontrols.js",
					"public/lib/fonts/droid/droid_serif_bold.typeface.js",
					"public/lib/tquery.text.js",
					"public/lib/THREEx.GeometryWobble.js",
					"public/lib/tquery.geometry.wobble.js",
					"public/js/game.js"
				],
				dest: "public/dist/joyride.min.js"
			},
			options: {
				banner: "/*!\n * <%= pkg.name %>\n * <%= pkg.description %>\n * @version <%= pkg.version %> - <%= grunt.template.today(\'yyyy-mm-dd\') %>\n * @author <%= pkg.author.name %> <<%= pkg.author.url %>>\n */\n"
			}
		}
	});

	// Load grunt tasks from npm packages
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");

	// Lint task that runs JSHint over files.
	grunt.registerTask("lint", ["jshint"]);

	// Default task.
	grunt.registerTask("default", ["jshint", "concat", "uglify"]);

};