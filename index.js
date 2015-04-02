/*!
 * isogram | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/isogram
*/
var arrayToSentence = require('array-to-sentence');
var assertUnique = require('assert-unique');
var gaLoaderSnippets = require('ga-loader-snippets');
var gaTrackerSnippet = require('ga-tracker-snippet');
var isVarName = require('is-var-name');

module.exports = function isogram(characters, options) {
  'use strict';

  if (arguments.length === 0) {
    characters = 'GoOgle';
  } else if (typeof characters !== 'string') {
    if (arguments.length !== 1 || typeof characters !== 'object') {
      throw new TypeError('First argument must be a string or an object.');
    }

    options = characters;
    characters = 'GoOgle';
  }

  if (options) {
    if (typeof options !== 'object') {
      throw new TypeError(
        options +
        ' is not an object. Second argument must be an object.'
      );
    }
  } else {
    options = {};
  }

  var len = characters.length;

  var invalidChars = [];
  for (var i = 0; i < len; i++) {
    var char = characters.charAt(i);
    if (!isVarName(char) && i === characters.indexOf(char)) {
      invalidChars.push('"' + char + '"');
    }
  }
  if (invalidChars.length > 0) {
    var isPlural = invalidChars.length !== 1;
    throw new Error(
      arrayToSentence(invalidChars) + ' cannot be used as ' +
      (isPlural ? '' : 'a ') + 'JavaScript parameter name' + (isPlural ? 's' : '') + '.'
    );
  }

  if (len < 3 || 7 < len) {
    throw new RangeError('Number of characters must be no less than 3 and no greater than 7.');
  }

  assertUnique.apply(null, characters.split(''));

  var gaTracker = gaTrackerSnippet(options);

  var gaLoader = gaLoaderSnippets['with' + len + 'params']
  .replace(
    new RegExp('([A-' + String.fromCharCode(65 + len - 1) + '])(?=[^a-z])', 'g'),
    function(str) {
      var char = characters.charAt(str.charCodeAt(0) - 65);
      if (options.color) {
        // Colorize with ANSI green color
        char = '\u001b[32m' + char + '\u001b[39m';
      }
      return char;
    }
  );

  if (options.globalName) {
    gaLoader = gaLoader.replace(/"ga"/g, '"' + options.globalName + '"');
  }

  if (options.singleQuotes === undefined || options.singleQuotes) {
    gaLoader = gaLoader.replace(/"/g, '\'');
  }

  if (options.minify) {
    return gaLoader.replace(/\n/g, '') + gaTracker;
  }

  return gaLoader + '\n\n' + gaTracker;
};
