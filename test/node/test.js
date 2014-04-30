'use strict';

var assert = require('chai').assert;
var isogram = require('../../lib/isogram');

describe('isogram', function() {
  it('should be a function.', function() {
    assert.isFunction(isogram);
  });

  it('should return a string by default.', function() {
    assert.isString(isogram());
  });

  it('should not accept four characters.', function() {
    assert.throws(function() {
      isogram('abcd');
    });
  });

  it('should not accept eight characters.', function() {
    assert.throws(function() {
      isogram('abcdefgh');
    });
  });

  it('should not accept any numbers.', function() {
    assert.throws(function() {
      isogram('12345');
    });
  });
});
