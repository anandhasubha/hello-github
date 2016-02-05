module.exports = function (grunt) {
    var path = require('path');
    var webpack= require('webpack');
    // load the task
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-json-server');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-webpack');
    
    console.log("%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7",path.resolve(__dirname, './src-ts'));

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
        connect: {
            server: {
                options: {
                    protocol: 'http', // or 'http2'
                    port: 9000,
                    hostname: 'localhost',
                    livereload: false,
                    base: '.',
                    keepalive: true,
                    open: 'http://localhost:9000/dist/index.html'
                }
            },
        },
        webpack: {
            defaultDev: {
                // webpack options
                entry: './src-ts/bootstrap.ts',
                vendor: ["jquery", "angular", "angular-route", "angular-sanitize"],
                output: {
                    path: __dirname + '/dist',
                    filename: 'bundle.js'
                },
                plugins: [
                    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
                ],
                resolve: {
                    // Add `.ts` and `.tsx` as a resolvable extension.
                    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.yeti.css', '.min.css', '.eot', '.woff', '.woff2', '.svg', '.html'],
                    alias: {
                        // Bind version of jquery, angular, angular-route with alias names
                        "jquery": "../assets/libs/jquery.js",

                        "angular": "../assets/libs/angular.js",

                        "angular-route": "../assets/libs/angular-route.js",
                        
                        'angular-sanitize':'../assets/libs/angular-sanitize.js'
                    }
                },
                module: {
                    preLoaders: [
                        { 
                            test: /\.js$/, 
                            loader: 'baggage?[file].html&[file].css' 
                        }
                    ],
                    loaders: [
                        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                        { test: /\.tsx?$/, loader: 'ts-loader' },
                        //all files with a '.css' extension will be handled by 'style-loader','file-loader','url-loader' and 'css-loader'
                        {
                            test: /\.css$/,
                            loader: "style-loader!css-loader"
                        }, {
                            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                            loader: "url-loader?limit=10000&minetype=application/font-woff"
                        }, {
                            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                            loader: "file-loader"
                        }, {
                            test: /\.html$/,
                            loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './src-ts')) + '/!html'
                        }
                    ]
                }
            },

        }
        
        

    });
    
    
    

    grunt.registerTask("default", ["ts:dev"]);

    grunt.registerTask('server', function () {
        grunt.task.run([
            'clean:dist',
            'copy:htmlToDist',
            'webpack:defaultDev',
            'connect:server'
        ]);
    });

}
