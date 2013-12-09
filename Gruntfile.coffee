module.exports = (grunt) ->
  'use strict'

  require('load-grunt-tasks')(grunt)
  
  replacePatterns = [];
  
  for paramNum, i in [5,6,7]
    replacePatterns[i] =
      match: "file: #{ paramNum }params"
      replacement: do (paramNum) ->
        -> grunt.file.read "src/.tmp/snippets/#{ paramNum }params.js"
  
  replacePatterns.push
    match: "version"
    replacement: ->
       grunt.file.readJSON('package.json').version
  
  grunt.initConfig
    jshint:
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
          dest: 'src/.tmp/snippets'
        ]
    
    replace:
      main:
        options:
          prefix: '@'
          patterns: replacePatterns
        files: [
          {
            src: ['src/isogram.js']
            dest: 'lib/isogram.js'
          }
          {
            src: ['src/cli.js']
            dest: 'bin/cli.js'
          }
        ]
    
    clean:
      tmp: ['src/.tmp']
    
    watch:
      main:
        files: ['src/*.js', 'bin/*.js']
        tasks: ['uglify', 'replace', 'jshint', 'clean']
    
    release:
      options:
        bump: false

  defaultTasks = [
    'uglify'
    'replace'
    'jshint'
    'clean'
    'watch'
  ]
  
  grunt.task.registerTask 'default', defaultTasks

  # tmp
  grunt.task.registerTask 'publish', ['release:patch']
  