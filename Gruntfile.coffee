module.exports = (grunt) ->
  'use strict'

  require('load-grunt-tasks')(grunt)
  
  templateData = ->
    data =
      version: grunt.file.readJSON('package.json').version

    for paramNum in [5,6,7]
      _snippet = grunt.file.read "src/.tmp/snippets/#{ paramNum }params.js"
      data["snippet_#{ paramNum }params"] = _snippet
    
    data
  
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

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
        
    template:
      options:
        data: templateData
      dist:
        files:
          'lib/isogram.js': ['src/isogram.js']
          'bin/cli.js': ['src/cli.js']
        
    clean:
      tmp: ['src/.tmp']
    
    mocha:
      src: ['test/**/*.html']
      options:
        mocha:
          ignoreLeaks: false
        run: true
        reporter: 'Nyan'
    
    watch:
      main:
        files: ['src/*.js', 'bin/*.js']
        tasks: ['uglify', 'template', 'jshint', 'clean']
      test:
        files: ['test/**/*']
        tasks: ['mocha']
    
    release:
      options:
        bump: false

  defaultTasks = [
    'uglify'
    'template'
    'jshint'
    'mocha'
    'clean'
    'watch'
  ]
  
  grunt.task.registerTask 'default', defaultTasks

  grunt.task.registerTask 'test', ['mocha']
  
  # tmp
  grunt.task.registerTask 'publish', ['release:patch']
  