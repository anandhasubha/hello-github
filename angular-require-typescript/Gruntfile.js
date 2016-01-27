module.exports = function (grunt) {

    // load the task
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-json-server');
    grunt.loadNpmTasks('grunt-concurrent');

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
        ts: {
            dist: {
                src: [
                    './typings/tsd.d.ts',
                    'src-ts/**/*.ts',
                // '!./**/*.d.ts',
                    '!./baseDir.ts'
                ],
                cwd: './',
                dest: './dist',
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
        connect: {
            server: {
                options: {
                    protocol: 'http', // or 'http2'
                    port: 8000,
                    hostname: 'localhost',
                    livereload: false,
                    base: '.',
                    keepalive: true,
                    open: 'http://localhost:8000/dist/index.html'
                }
            },
        },
        
        json_server: {
            options: {
                port: 3000,
                hostname: 'localhost',
                db: 'data/employeeList.json'
            }
        },
        
          concurrent: {
            server: {
                tasks: [
                    'json_server',
                    'connect:server'
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.registerTask("default", ["ts:dev"]);
    grunt.registerTask('jsonServer', ['concurrent:server']);
    // grunt.registerTask("server", ["connect:server"]);

    grunt.registerTask('server', function () {
        grunt.task.run([
            'clean:dist',
            'ts:dist',
            'copy:htmlToDist',
            'jsonServer'
        ]);
    });

}
