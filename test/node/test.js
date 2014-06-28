/* jshint curly: false */

'use strict';

var assert = require('chai').assert;
var fs = require('fs');
var path = require('path');

var pkg = require(path.join(process.cwd(), 'package.json'));
var isogram = require('require-main')();

describe('isogram() on Node', () => {
  it('should be a function.', () => {
    assert.isFunction(isogram);
  });

  it('should return a Google Analytics string.', done => {
    fs.readFile('test/node/fixture.txt', (err, result) => {
      if (err) done(err);
      assert(isogram(), result);
      done();
    });
  });

  it('should not accept four characters.', () => {
    assert.throws(() => isogram('abcd'));
  });

  it('should not accept eight characters.', () => {
    assert.throws(() => isogram('abcdefgh'));
  });

  it('should not accept any numbers.', () => {
    assert.throws(() => isogram('12345'));
  });
});
