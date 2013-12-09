/*!
 * isogram v@version
 * Copyright (c) 2013 Shinnosuke Watanabe
 * Available under the MIT license
*/

(function(){
  'use strict';
  
  var snippets = [
    '@file: 5params',
    '@file: 6params',
    '@file: 7params'
  ];
  
  // check if the arrray contains repeated values
  function hasDuplicates (el, pos, arr) {
    return arr.indexOf(el) !== pos;
  }
  
  function Isogram(characters, options) {
    
    if (options) options = {};
    if (characters === undefined) characters = 'GoOgle';

    var params = characters.split('');
    
    if (params.length < 5 || params.length > 7 ) {
      throw 'Please pass an argument with 5 or more and 7 or less characters.';
    }
  

    if (params.some(hasDuplicates)) {
      throw characters + ' is not isogram.';
    }
	
    var gaLoader = snippets[params.length - 5];

    var colorlize;
  
    if (options.color) {
      var ansi = require('ansi-styles');
      colorlize = function (letters, color){
        return ansi[color].open + letters + ansi[color].close;
      };
    } else {
      colorlize = function (letters){
        return letters;
      };    
    }
  
    for (var i=0; i < params.length; i++) {
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
  
  
  var root = this;

  // some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' &&
      typeof define.amd == 'object' &&
      define.amd) {
    root.isogram = Isogram;

    // define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module
    define(function() {
      return Isogram;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (typeof module !== 'undefined') {
    // in Node.js or RingoJS
    if (module.exports) {
      (module.exports = Isogram).isogram = Isogram;
    }
  }
  else {
    // in a browser or Rhino
    root.isogram = Isogram;
  }

}());
