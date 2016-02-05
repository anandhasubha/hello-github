module.exports = function(grunt) {

    // load the task
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-uglify");

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

        browserify: {
            dist: {
                src: [
                    './typings/tsd.d.ts',
                    'src-ts/app.bootstrap.ts',
                    '!./baseDir.ts',
                    'src-ts/**/*.html',
                    '!src-ts/index.html'
                ],
                dest: './dist/build.js',
                options: {
                    browserifyOptions: {
                        plugin: [
                            ['tsify', {
                                extensions: 'ts'
                            }]
                        ],
                        watch: false
                    },
                    transform: [
                        ["browserify-ng-html2js", {
                            module: "angularApp",
                            baseDir: "./src-ts/"
                        }]
                    ]
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
        uglify: {
            build: {
                files: {
                    './dist/build.min.js': ['./dist/build.js']
                }
            }
        }
    });
    grunt.registerTask('server', function() {
        grunt.task.run([
            'clean:dist',
            'copy:htmlToDist',
            "browserify:dist",
            "uglify:build",
            'connect'
        ]);
    });

    grunt.registerTask("default", ['server']);
}
