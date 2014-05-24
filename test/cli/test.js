/* jshint curly: false */

'use strict';

var exec = require('child_process').exec;
var assert = require('chai').assert;
var chalk = require('chalk'); 

const isogram = 'node bin/isogram ';

describe('"isogram" command', done => {
  it('should generate colored Google Analytics code by defult.', done => {
    exec(isogram, (err, stdout) => {
      if (err) done(err);
      assert.include(
        stdout,
        `${ chalk.green('G') },${ chalk.green('o') },${ chalk.green('O') }`
      );
      done();
    });
  });
  
  it('should accept "-i" flag.', done => {
    exec(isogram + '-i UA-01234-5', (err, stdout) => {
      if (err) done(err);
      assert.include(stdout, '"UA-01234-5"');
      done();
    });
  });
  
  it('should accept "--id" flag.', done => {
    exec(isogram + '--id 67890-1', (err, stdout) => {
      if (err) done(err);
      assert.include(stdout, '"UA-67890-1"');
      done();
    });
  });
  
  it('should accept "-d" flag.', done => {
    exec(isogram + '-d foo.org', (err, stdout) => {
      if (err) done(err);
      assert.include(stdout, '"foo.org"');
      done();
    });
  });
  
  it('should accept "--domain-name" flag.', done => {
    exec(isogram + '--domain-name "bar.com"', (err, stdout) => {
      if (err) done(err);
      assert.include(stdout, '"bar.com"');
      done();
    });
  });
  
  it('should accept "-m" flag.', done => {
    exec(isogram + '-m', (err, stdout) => {
      if (err) done(err);
      assert.include(stdout, ';ga("create","');
      done();
    });
  });

  it('should accept "--minify" flag.', done => {
    exec(isogram + '--minify', (err, stdout) => {
      if (err) done(err);
      assert.include(stdout, ';ga("create","');
      done();
    });
  });

  it('should accept "--no-color" flag.', done => {
    exec(isogram + '--no-color', (err, stdout) => {
      if (err) done(err);
      assert.notInclude(stdout, '\x1b');
      done();
    });
  });

  it('should display an error massage when it takes four characters.', done => {
    exec(isogram + 'abcd', (err, stdout, stderr) => {
      if (err) done(err);
      assert.notOk(stdout);
      assert.ok(stderr);
      done();
    });
  });

  it('should display an error massage when it takes eight characters.', done => {
    exec(isogram + 'abcdefgh', (err, stdout, stderr) => {
      if (err) done(err);
      assert.notOk(stdout);
      assert.ok(stderr);
      done();
    });
  });

  it('should display an error massage when it takes numbers.', done => {
    exec(isogram + '12345', (err, stdout, stderr) => {
      if (err) done(err);
      assert.notOk(stdout);
      assert.ok(stderr);
      done();
    });
  });
});
