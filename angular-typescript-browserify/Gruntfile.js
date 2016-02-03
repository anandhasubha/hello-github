module.exports = function(grunt) {

    // load the task
    grunt.loadNpmTasks("grunt-ts");
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
                src: ['index.html'],
                dest: 'dist/'
            },
        },
        ts: {
            dist: {
                src: [
                    './typings/tsd.d.ts',
                    'src-ts/**/*.ts',
                    // '!./**/*.d.ts',
                    '!./baseDir.ts'
                ],
                outDir: 'dist',
                options: {
                    compile: true,
                    declaration: false,
                    failOnTypeErrors: true,
                    noImplicitAny: false,
                    noResolve: false,
                    removeComments: true,
                    sourceMap: false,
                    target: 'es5', //es6 not supported yet
                    fast: 'never',
                    module: 'amd'
                }
            }
        },
        browserify: {
            dist: {
                files: {
                    './dist/build.js': ['./dist/app.js']
                },
                options: {
                    transform: ['deamdify'],
                },
            }
        },
        connect: {
            default: {
                options: {
                    port: 8000,
                    base: ".",
                    debug: true,
                    keepalive: true
                }
            }
        },

        ngtemplates: {

            options: {
                module: 'angularApp.employee',
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
            'ts:dist',
            'copy:htmlToDist',
            // 'ngtemplates:dist',
            "browserify:dist",
            'connect'
        ]);
    });

    grunt.registerTask("default", ['server']);
}
