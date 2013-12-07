module.exports = (grunt) ->
  'use strict'

  require('load-grunt-tasks')(grunt)
  
  replacePatterns = [];
  
  for paramNum, i in [5,6,7]
    replacePatterns[i] =
      match: "#{ paramNum }params"
      replacement: do (paramNum) ->
        -> grunt.file.read "src/.tmp/snippets/#{ paramNum }params.js"
  
  grunt.initConfig
    jshint:
      main: ['src/*.js', 'bin/*.js']
      
    uglify:
      options:
        mangle: false
        preserveComments: false
      snippets:
        files: [
          expand: true,
          cwd: 'src/snippets'
          src: ['*.js']
          dest: 'src/.tmp/snippets'
        ]
    
    replace:
      main:
        options:
          prefix: '@file: '
          patterns: replacePatterns
        files: [
          src: ['src/*.js']
          dest: 'lib/isogram.js'
        ]
    
    clean:
      tmp: ['src/.tmp']
      
    watch:
      main:
        files: ['src/*.js', 'bin/*.js']
        tasks: ['uglify', 'replace', 'jshint', 'clean']

  defaultTasks = [
    'uglify'
    'replace'
    'jshint'
    'clean'
    'watch'
  ]
  
  grunt.task.registerTask 'default', defaultTasks
  