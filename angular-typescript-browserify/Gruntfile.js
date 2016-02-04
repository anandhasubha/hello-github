module.exports = function(grunt) {

    // load the task
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-browserify");
    
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
                    'src-ts/**/*.ts',
                    '!./baseDir.ts',
                    'src-ts/**/*.html',
                    '!src-ts/index.html'
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
                    },
                    transform:
                        [["browserify-ng-html2js", {
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
