/* global chai, isogram */

'use strict';

var assert = chai.assert;

describe('isogram', function() {
  it('should be a function.', function() {
    assert.isFunction(isogram);
  });
});

describe('ga', function() {
  it('should return a function.', function() {
    assert.isFunction(window.ga);
  });
});

describe('document.scripts[0].src', function() {
  it('should be "//www.google-analytics.com/analytics.js".', function() {
    var firstScript = document.scripts[0];
    var src = firstScript.src;
    assert.notEqual(src.indexOf('//www.google-analytics.com/analytics.js'), -1);
  });
});
