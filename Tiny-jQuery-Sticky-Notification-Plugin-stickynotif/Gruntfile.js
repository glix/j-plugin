/**
 * Created by Glenn on 2014-04-27.
 */

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                laxcomma: true
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author.name %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/jquery.stickynotif.min.js': ['src/jquery.stickynotif.js']
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author.name %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/styles/jquery.stickynotif.min.css': ['src/styles/jquery.stickynotif.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

};
