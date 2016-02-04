module.exports = function(grunt) {

    // load the task
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-angular-templates');

    // Configure grunt here
    grunt.initConfig({
        clean: {
            dist: ['dist']
        },
        copy: {
            htmlToDist: {
                cwd: './src-ts',
                expand: true,
                src: ['**/*.html'],
                dest: 'dist/'
            },
        },

        browserify: {
            dist: {
                src: [
                    './typings/tsd.d.ts',
                    'src-ts/**/*.ts',
                    '!./baseDir.ts'
                ],
                dest: './dist/build.js',
                options: {
                    browserifyOptions: {
                        plugin: [
                            ['tsify', {
                                extensions: 'jsx'
                            }]
                        ],
                        watch: false
                    }
                },
            },
        },

        connect: {
            default: {
                options: {
                    port: 8000,
                    base: ".",
                    debug: true,
                    keepalive: true,
                    open: 'http://localhost:8000/dist/index.html'
                }
            }
        },

        ngtemplates: {

            options: {
                module: 'angularApp',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }

            },

            dist: {
                cwd: 'src-ts',
                src: 'components/employee/**/*.html',
                dest: 'dist/templates.js',
            }

        }
    });
    grunt.registerTask('server', function() {
        grunt.task.run([
            'clean:dist',
            'copy:htmlToDist',
            "browserify:dist",
            'connect'
        ]);
    });

    grunt.registerTask("default", ['server']);
}
