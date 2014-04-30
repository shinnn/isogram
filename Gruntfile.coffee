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
          'lib/isogram.js': ['src/isogram-es6.js']
          'lib/cli.js': ['src/cli-es6.js']
      no_arg:
        options:
          data:
            param: ''
        src: ['test/browser/template.html']
        dest: '<%= clean.test_html %>/test1_no_arg.html'
      five_args:
        options:
          data:
            param: "'isogr'"
        src: ['test/browser/template.html']
        dest: '<%= clean.test_html %>/test2_five_args.html'
      six_args:
        options:
          data:
            param: "'isogra'"
        src: ['test/browser/template.html']
        dest: '<%= clean.test_html %>/test3_six_args.html'
      seven_args:
        options:
          data:
            param: "'isogram'"
        src: ['test/browser/template.html']
        dest: '<%= clean.test_html %>/test4_seven_args.html'

    clean:
      test_html: ['test/browser/pages']
      
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
        src: ['<%= clean.test_html %>/*.html']
    
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
    
    es6transpiler:
      dist:
        options:
          globals:
            define: true
        files:
          'lib/cli.js': ['lib/cli.js']
          'lib/isogram.js': ['lib/isogram.js']
    
  grunt.registerTask 'build', [
    'jshint'
    'uglify'
    'template:main'
    'es6transpiler'
  ]
  
  grunt.registerTask 'test', [
    'jshint'
    'uglify'
    'template'
    'es6transpiler'
    'mochaTest'
    'mocha'
    'clean'
  ]
  
  grunt.registerTask 'default', ['test', 'watch']
  
  grunt.registerTask 'publish', ['test', 'release:patch']
  