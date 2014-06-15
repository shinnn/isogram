/*!
 * isogram v<%= version %>
 * (c) 2013 - <%= year %> Shinnosuke Watanabe
 * Available under the MIT license
*/

(function() {
  'use strict';

  const snippets = [
    '<%= snippet_5params %>',
    '<%= snippet_6params %>',
    '<%= snippet_7params %>'
  ];

  const toStr = Object.prototype.toString;

  function isObject(variable) {
    return toStr.call(variable) === '[object Object]';
  }

  function arrayToSentence(arr) {
    let result = '';
    arr.forEach((elm, index) => {
      if (index > 0) {
        if (index < arr.length - 1) {
          result += ', ';
        } else {
          result += ' and ';
        }
      }
      result += '"' + elm + '"';
    });

    return result;
  }

  function colorize(str) {
    // green
    return '\x1b[32m' + str + '\x1b[39m';
  }

  function isogram(characters = 'GoOgle', options = {}) {
    if (isObject(characters)) {
      options = characters;
      characters = 'GoOgle';
    }

    var params = characters.split('');

    let invalidChars = [];
    params.forEach((elm) => {
      try {
        new Function('var ' + elm)();
      } catch (e) {
        invalidChars.push(elm);
      }
    });
    if (invalidChars.length > 0) {
      let message = '';
      if (invalidChars.length === 1) {
        message = ' is not a valid JavaScript parameter name.';
      } else {
        message = ' are not valid JavaScript parameter names.';
      }
      throw arrayToSentence(invalidChars) + message;
    }

    let duplicates = [];
    let charactersCopy = characters;
    for (let i=0; i < charactersCopy.length; i++) {
      if (charactersCopy.lastIndexOf(params[i]) !== i) {
        duplicates.push(params[i]);
        charactersCopy = charactersCopy.replace(
          new RegExp(params[i], 'g'),
          ''
        );
      }
    }

    if (duplicates.length > 0) {
      throw arrayToSentence(duplicates) +
            (duplicates.length === 1? ' is': ' are') +
            ' duplicated.';
    }

    if (params.length < 5 || params.length > 7) {
      throw 'Please pass an argument with 5, 6 or 7 characters.';
    }

    var gaLoader = snippets[params.length - 5];

    params.forEach((elm, index) => {
      gaLoader = gaLoader.replace(
        new RegExp(`_v${ index }_`, 'g'),
        options.color? colorize(elm): elm
      );
    });

    var id, domain;

    if (options.id) {
      id = options.id.toString().replace(/^UA-/, '');
    } else {
      id = 'XXXXX-X';
    }

    domain = options.domain ? ('", "' + options.domain) : '';

    var additional = [
      '\n',
      'ga("create", "UA-' + id + domain + '");',
      'ga("send", "pageview");'
    ].join('\n');

    if (options.minify) {
      additional = additional.replace(/\s+/g, '');
    }

    return gaLoader + additional;
  }

  isogram.version = '<%= version %>';

  var root = typeof window === 'object'? window: this;

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define === 'function' &&
      typeof define.amd === 'object' &&
      define.amd) {
    define(isogram);

  // check for `exports` after `define`
  // in case a build optimizer adds an `exports` object
  } else if (typeof module !== 'undefined' && module.exports) {
    (module.exports = isogram).isogram = isogram;

  // in a browser or Rhino
  } else {
    root.isogram = isogram;
  }

}());
