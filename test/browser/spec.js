/* global chai, isogram */

'use strict';

var assert = chai.assert;

describe('isogram', () => {
  it('should be a function.', () => {
    assert.isFunction(isogram);
  });
});

describe('ga', () => {
  it('should return a function.', () => {
    assert.isFunction(window.ga);
  });
});

describe('document.scripts[0].src', () => {
  it('should be "//www.google-analytics.com/analytics.js".', () => {
    var firstScript = document.scripts[0];
    var src = firstScript.src;
    assert.notEqual(src.indexOf('//www.google-analytics.com/analytics.js'), -1);
  });
});
