!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.isogram=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    throw new RangeError('Number of characters must be no fewer than 3 and no greater than 7.');
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

},{"array-to-sentence":2,"assert-unique":3,"ga-loader-snippets":5,"ga-tracker-snippet":6,"is-var-name":7}],2:[function(require,module,exports){
/*!
 * array-to-sentence | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/array-to-sentence
*/

module.exports = function arrayToSentence(arr, options) {
  'use strict';

  if (!Array.isArray(arr)) {
    throw new TypeError('First argument must be an array.');
  }

  if (arr.length === 0) {
    return '';
  }

  options = options || {};

  function validateOption(name) {
    if (typeof options[name] !== 'string') {
      throw new TypeError('`' + name + '` option must be a string.');
    }
  }

  if (options.separator === undefined) {
    options.separator = ', ';
  } else {
    validateOption('separator');
  }

  if (options.lastSeparator === undefined) {
    options.lastSeparator = ' and ';
  } else {
    validateOption('lastSeparator');
  }

  if (arr.length === 1) {
    return arr[arr.length - 1];
  }

  return arr.slice(0, -1).join(options.separator) + options.lastSeparator + arr[arr.length - 1];
};

},{}],3:[function(require,module,exports){
/*!
 * assert-unique | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/assert-unique
*/

'use strict';

var arrayDuplicated = require('array-duplicated');
var arrayToSentence = require('array-to-sentence');

module.exports = function assertUnique() {
  if (arguments.length === 0) {
    return;
  }

  var duplicates = arrayDuplicated([].slice.call(arguments));

  if (duplicates.length === 0) {
    return;
  }

  var len = duplicates.length;
  while (len--) {
    if (typeof duplicates[len] === 'function') {
      var fnName = '';
      if (duplicates[len].name) {
        fnName = ': ' + duplicates[len].name;
      }

      duplicates[len] = '[Function' + fnName + ']';
    } else {
      duplicates[len] = JSON.stringify(duplicates[len]);
    }
  }

  var aux;
  if (duplicates.length === 1) {
    aux = 'is';
  } else {
    aux = 'are';
  }

  throw new Error(arrayToSentence(duplicates) + ' ' + aux + ' duplicated.');
};

},{"array-duplicated":4,"array-to-sentence":2}],4:[function(require,module,exports){
/*!
 * array-duplicated | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/array-duplicated
*/

module.exports = function arrayDuplicated(arr) {
  'use strict';

  if (!Array.isArray(arr)) {
    throw new TypeError('Argument must be an array.');
  }

  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) !== i && result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }

  return result;
};

},{}],5:[function(require,module,exports){
/*!
 * HTML5 Boilerplate | MIT (c) HTML5 Boilerplate
 * https://github.com/h5bp/html5-boilerplate
 *
 * ga-loader-snippets | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/ga-loader-snippets
*/

var parts = [
  '!function(A,B,C',
  '){A.GoogleAnalyticsObject=C;A[C]||(A[C]=function(){\n(A[C].q=A[C].q||[]).push(arguments)});A[C].l=+new Date',
  '=B.createElement(',
  '"//www.google-analytics.com/analytics.js"',
  '.parentNode.insertBefore(',
  '=B.getElementsByTagName(D)[0];',
  '(window,document,"ga"'
];

module.exports = {
  with3params: parts[0] + parts[1] + ';var s' + parts[2] + '"script"),\ne=B.scripts[0];s.src=' + parts[3] + ';\ne' + parts[4] + 's,e)}' + parts[6] + ');',
  with4params: parts[0] + ',D' + parts[1] + ';D' + parts[2] + '"script");\nvar e=B.scripts[0];D.src=' + parts[3] + ';\ne' + parts[4] + 'D,e)}' + parts[6] + ');',
  with5params: parts[0] + ',D,E' + parts[1] + ';D' + parts[2] + '"script");\nE=B.scripts[0];D.src=' + parts[3] + ';\nE' + parts[4] + 'D,E)}' + parts[6] + ');',
  with6params: parts[0] + ',D,E,F' + parts[1] + ';E' + parts[2] + 'D);\nF' + parts[5] + 'E.src=' + parts[3] + ';\nF' + parts[4] + 'E,F)}' + parts[6] + ',"script");',
  with7params: parts[0] + ',D,E,F,G' + parts[1] + ';F' + parts[2] + 'D);\nG' + parts[5] + 'F.src=E;G' + parts[4] + 'F,G)}\n' + parts[6] + ',"script",' + parts[3] + ');'
};

},{}],6:[function(require,module,exports){
/*!
 * ga-tracker-snippet | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/ga-tracker-snippet
*/

'use strict';

var isVarName = require('is-var-name');

module.exports = function gaTrackerSnippet(options) {
  if (typeof options === 'string') {
    options = {id: arguments[0], domain: arguments[1]};
  } else {
    options = options || {};
  }

  var templateData = {};

  var defultValues = {
    id: 'XXXXX-X',
    domain: 'auto',
    globalName: 'ga'
  };

  Object.keys(defultValues).forEach(function(key) {
    var prop = options[key];
    if (prop) {
      if (typeof prop !== 'string') {
        throw new TypeError(prop + ' is not a string. ' + key + ' property must be a string.');
      }
      templateData[key] = prop;
    } else {
      templateData[key] = defultValues[key];
    }
  });

  if (!isVarName(templateData.globalName)) {
    throw new Error(templateData.globalName + ' cannot be used as a global variable name.');
  }

  if (templateData.id.indexOf('UA-') === 0) {
    templateData.id = templateData.id.substring(3);
  }

  var space;
  if (options.minify) {
    space = '';
  } else {
    space = ' ';
  }

  var code = templateData.globalName +
             '(\'create\',' + space +
             '\'UA-' + templateData.id + '\',' + space +
             '\'' + templateData.domain + '\');' +
             (options.minify ? '' : '\n') +
             templateData.globalName +
             '(\'send\',' + space + '\'pageview\');';

  if (options.singleQuotes === false) {
    code = code.replace(/'/g, '"');
  }

  return code;
};

},{"is-var-name":7}],7:[function(require,module,exports){
/*!
 * is-var-name | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-var-name
*/

module.exports = function isVarName(str) {
  'use strict';

  if (typeof str !== 'string') {
    return false;
  }

  try {
    new Function('var ' + str)();
  } catch (e) {
    return false;
  }
  return true;
};

},{}]},{},[1])(1)
});