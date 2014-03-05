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
  
  // check if an array contains repeated values
  function hasDuplicates (el, pos, arr) {
    return arr.indexOf(el) !== pos;
  }
  
  var toStr = Object.prototype.toString;
  
  function isObject (variable) {
    return toStr.call(variable) === '[object Object]';
  }
  
  function Isogram (characters, options) {
    if (isObject(characters)) {
      options = characters;
      characters = undefined;
    }

    if (!options) options = {};
    if (characters === undefined) characters = 'GoOgle';

    var params = characters.split('');
    
    if (params.length < 5 || params.length > 7 ) {
      throw 'Please pass an argument with five, six or seven characters.';
    }
		
		for (var i=0; i < params.length; i++) {
			try {
				new Function('this.' + params[i]).call({});
			} catch (e) {
				throw params[i] + ' is not a valid JavaScript variable name.';
			}
		}
		
    if (params.some(hasDuplicates)) {
      throw characters + ' is not isogram.';
    }
	
    var gaLoader = snippets[params.length - 5];

    var colorlize;
  
    if (options.color) {
      var ansi = require('ansi-styles');
      colorlize = function (letters, color) {
        return ansi[color].open + letters + ansi[color].close;
      };
    } else {
      colorlize = function (letters) {
        return letters;
      };
    }
  
    for (i=0; i < params.length; i++) {
      gaLoader = gaLoader.replace(
        new RegExp('_v' + i + '_', 'g'),
        colorlize(params[i], 'green')
      );
    }
    
    var id, domain;

    if (options.id) {
      id = ('' + options.id).replace(/^UA-/, '');
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
