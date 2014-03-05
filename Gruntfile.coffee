module.exports = (grunt) ->
  'use strict'

  require('load-grunt-tasks') grunt
  
  TMP = 'src/.tmp/'
  
  templateData = ->
    data =
      version: grunt.file.readJSON('package.json').version
      year: grunt.template.today 'yyyy'

    for paramNum in [5,6,7]
      _snippet = grunt.file.read "#{ TMP + paramNum }params.js"
      data["snippet_#{ paramNum }params"] = _snippet
    
    data
  
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    jshint:
      options:
        evil: true
        camelcase: true
        trailing: true
        indent: 2
        node: true
      main: ['src/*.js']
      
    uglify:
      options:
        mangle: false
        preserveComments: false
      snippets:
        files: [
          expand: true,
          cwd: 'src/snippets'
          src: ['*.js']
          dest: TMP
        ]
          
    template:
      main:
        options:
          data: templateData
        files:
          'lib/isogram.js': ['src/isogram.js']
          'lib/cli.js': ['src/cli.js']
      no_arg:
        options:
          data:
            param: ''
        src: ['test/browser/template.html']
        dest: 'test/browser/test1_no_arg.html'
      five_args:
        options:
          data:
            param: "'isogr'"
        src: ['test/browser/template.html']
        dest: 'test/browser/test2_five_args.html'
      six_args:
        options:
          data:
            param: "'isogra'"
        src: ['test/browser/template.html']
        dest: 'test/browser/test3_six_args.html'
      seven_args:
        options:
          data:
            param: "'isogram'"
        src: ['test/browser/template.html']
        dest: 'test/browser/test4_seven_args.html'
    
    clean:
      testHtml: ['test/browser/*.html', '!**/template.html']
      
    mochaTest:
      test:
        options:
          reporter: 'spec'
        src: ['test/node/*.js']
    
    mocha:
      options:
        mocha:
          ignoreLeaks: false
        run: true
        reporter: 'Spec'
      browser:
        src: ['test/**/*.html', '!**/template.html']
    
    watch:
      main:
        files: ['src/*.js', 'bin/*.js']
        tasks: ['build']
      test:
        files: ['test/**/*', '!**/.*', '!**/*arg*']
        tasks: ['template', 'test', 'clean']
    
    release:
      options:
        bump: false

  grunt.registerTask 'test', ['jshint', 'mochaTest', 'mocha']

  grunt.registerTask 'build', [
    'uglify'
    'template'
    'test'
    'clean'
  ]
  
  grunt.registerTask 'default', ['build', 'watch']
  
  grunt.registerTask 'publish', ['build', 'release:patch']
  