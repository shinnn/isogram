'use strict';

var assert = require('chai').assert;
var isogram = require(process.cwd() + '/lib/isogram.js');

describe('isogram', () => {
  it('should be a function.', () => {
    assert.isFunction(isogram);
  });

  it('should return a string by default.', () => {
    assert.isString(isogram());
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
