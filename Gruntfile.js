/**
 * Created by wissile on 1/6/15.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // js error check
        jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        // css error check
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['css/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['css/*.css']
            }
        },
        // html error check
        htmllint: {
            all: ["*.html"]
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js/*.js'],
                dest: 'dist/js/script.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/script.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        // minify html markup
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '',                             // Project root
                    src: '*.html',                       // Source
                    dest: 'dist/'                        // Destination
                }]
            }
        },
        // reduce image sizes
        imagemin: {
            dist: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/img/',               // Destination path prefix
                    optimizationLevel: 7
                }]
            }
        },
        // Remove unused CSS across multiple files
        uncss: {
            dist: {
                files: {
                    'dist/css/style.css': ['index.html', '404.html']
                }
            }
        },
        // minify css and add .min.css ext
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            files: ['<%= jshint.files %>','<%= csslint.files %>'],
            tasks: ['jshint', 'csslint']
        }
    });
    //Linting check for errors
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html');
    //Watch task
    grunt.loadNpmTasks('grunt-contrib-watch');
    //Prepare for distribution
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //CL grunt command for checking errors
    grunt.registerTask('watch', ['htmllint', 'csslint', 'jshint']);
    //CL grunt command for deployment dist folder to server
    grunt.registerTask('build', ['concat:dist',
                                'uglify:dist',
                                'imagemin:dist',
                                //'uncss:dist',
                                'cssmin:dist',
                                'htmlmin:dist'
    ]);

};