/*!
 * isogram v<%= version %>
 * (c) 2013 - <%= year %> Shinnosuke Watanabe
 * Available under the MIT license
*/

(function() {
  'use strict';
  
  var snippets = [
    '<%= snippet_5params %>',
    '<%= snippet_6params %>',
    '<%= snippet_7params %>'
  ];
  
  var toStr = Object.prototype.toString;
  
  function isObject (variable) {
    return toStr.call(variable) === '[object Object]';
  }
  
  function arrayToSentence (arr) {
    var result = '';
    for (var i=0; i < arr.length; i++) {
      if (i > 0) {
        if (i < arr.length - 1) {
          result += ', ';
        } else {
          result += ' and ';
        }
      }
      result += '"' + arr[i] + '"';
    }
    return result;
  }
  
  function colorize (str) {
    // green
    return '\x1b[32m' + str + '\x1b[39m';
  }
  
  function Isogram (characters, options) {
    if (isObject(characters)) {
      options = characters;
      characters = undefined;
    }

    if (!options) options = {};
    if (characters === undefined) characters = 'GoOgle';

    var params = characters.split('');
    
    var _invalidChars = [];
    for (var i=0; i < params.length; i++) {
      try {
        new Function('var ' + params[i])();
      } catch (e) {
        _invalidChars.push(params[i]);
      }
    }
    if (_invalidChars.length > 0) {
      var _message = '';
      if (_invalidChars.length === 1) {
        _message = ' is not a valid JavaScript parameter name.';
      } else {
        _message = ' are not valid JavaScript parameter names.';
      }
      throw arrayToSentence(_invalidChars) + _message;
    }
		
    var duplicates = [];
    var charactersCopy = characters;
    for (i=0; i < charactersCopy.length; i++) {
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

    for (i=0; i < params.length; i++) {
      gaLoader = gaLoader.replace(
        new RegExp('_v' + i + '_', 'g'),
        options.color? colorize(params[i]): params[i]
      );
    }
    
    var id, domain;

    if (options.id) {
      id = options.id.toString().replace(/^UA-/, '');
    } else {
      id = 'XXXXX-X';
    }
    
    domain = options.domain ? ('", "' + options.domain) : '';
    
    var create = 'ga("create", "UA-' + id + domain + '");';
    var send = 'ga("send", "pageview");';
  
    var additional = ['\n', create, send].join('\n');
  
    if (options.minify) {
      additional = additional.replace(/\s+/g, '');
    }

    return gaLoader + additional;
  }
  
  Isogram.version = '<%= version %>';
  
  var root = typeof window === 'object'? window: this;

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' &&
      typeof define.amd == 'object' &&
      define.amd) {
    root.isogram = Isogram;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "isogram" module
    define('isogram', [], function() {
      return Isogram;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (typeof module !== 'undefined' && module.exports) {
    (module.exports = Isogram).isogram = Isogram;
  }
  else {
    // in a browser or Rhino
    root.isogram = Isogram;
  }

}());
