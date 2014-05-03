module.exports = (grunt) ->
  'use strict'

  require('jit-grunt') grunt, {
    es6transpiler: 'grunt-es6-transpiler'
  }
  
  templateData = ->
    data =
      version: grunt.file.readJSON('package.json').version
      year: grunt.template.today 'yyyy'

    for paramNum in [5,6,7]
      _snippet = grunt.file.read "tmp/snippets-min/#{ paramNum }params.js"
      data["snippet_#{ paramNum }params"] = _snippet
    
    data
  
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    jshint:
      options:
        jshintrc: '.jshintrc'
      main: ['src/*.js']
      test_node: ['test/node/*.js']
      test_browser: ['test/browser/*.js']
      
    uglify:
      options:
        mangle: false
        preserveComments: false
      snippets:
        files: [
          expand: true
          cwd: 'src/snippets'
          src: ['*.js']
          dest: 'tmp/snippets-min'
        ]
    
    template:
      main:
        options:
          data: templateData
        files:
          'lib/isogram.js': ['src/isogram-es6.js']
          'lib/cli.js': ['src/cli-es6.js']
      no_arg:
        options:
          data:
            param: ''
        src: ['test/browser/template.html']
        dest: 'tmp/test/browser/test1_no_arg.html'
      five_args:
        options:
          data:
            param: "'isogr'"
        src: ['test/browser/template.html']
        dest: 'tmp/test/browser/test2_five_args.html'
      six_args:
        options:
          data:
            param: "'isogra'"
        src: ['test/browser/template.html']
        dest: 'tmp/test/browser/test3_six_args.html'
      seven_args:
        options:
          data:
            param: "'isogram'"
        src: ['test/browser/template.html']
        dest: 'tmp/test/browser/test4_seven_args.html'

    es6transpiler:
      main:
        options:
          globals:
            define: false
        files:
          'lib/cli.js': ['lib/cli.js']
          'lib/isogram.js': ['lib/isogram.js']
      tests:
        options:
          globals:
            describe: false
            it: false
        files: [
          expand: true
          src: ['test/**/*.js']
          dest: 'tmp'
        ]

    clean:
      tmp: ['lib', 'tmp']
      
    mochaTest:
      test:
        options:
          reporter: 'spec'
        src: ['tmp/test/node/*.js']
    
    mocha:
      options:
        mocha:
          ignoreLeaks: false
        run: true
        reporter: 'Spec'
      browser:
        src: ['tmp/test/browser/*.html']
    
    watch:
      main:
        files: ['src/*.js', 'bin/*.js']
        tasks: ['build']
      test:
        files: ['test/**/*', '!**/.*', '!**/*arg*']
        tasks: ['template', 'test']

    release:
      options:
        bump: false
    
  grunt.registerTask 'build', [
    'clean'
    'jshint'
    'uglify'
    'template:main'
    'es6transpiler'
  ]
  
  grunt.registerTask 'test', [
    'clean'
    'jshint'
    'uglify'
    'template'
    'es6transpiler'
    'mochaTest'
    'mocha'
  ]
  
  grunt.registerTask 'default', ['test', 'watch']
  
  grunt.registerTask 'publish', ['test', 'release:patch']
  