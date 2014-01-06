/*!
 * isogram v0.3.0
 * (c) 2013 - 2014 Shinnosuke Watanabe
 * Available under the MIT license
*/

(function() {
  'use strict';
  
  var snippets = [
    '!function(_v0_,_v1_,_v2_,_v3_,_v4_){_v0_.GoogleAnalyticsObject=_v2_,_v0_[_v2_]||(_v0_[_v2_]=function(){(_v0_[_v2_].q=_v0_[_v2_].q||[]).push(arguments)}),_v0_[_v2_].l=+new Date,_v3_=_v1_.createElement("script"),_v4_=_v1_.scripts[0],_v3_.src="//www.google-analytics.com/analytics.js",_v4_.parentNode.insertBefore(_v3_,_v4_)}(this,document,"ga");',
    '!function(_v0_,_v1_,_v2_,_v3_,_v4_,_v5_){_v0_.GoogleAnalyticsObject=_v3_,_v0_[_v3_]||(_v0_[_v3_]=function(){(_v0_[_v3_].q=_v0_[_v3_].q||[]).push(arguments)}),_v0_[_v3_].l=+new Date,_v4_=_v1_.createElement(_v2_),_v5_=_v1_.getElementsByTagName(_v2_)[0],_v4_.src="//www.google-analytics.com/analytics.js",_v5_.parentNode.insertBefore(_v4_,_v5_)}(this,document,"script","ga");',
    '!function(_v0_,_v1_,_v2_,_v3_,_v4_,_v5_,_v6_){_v0_.GoogleAnalyticsObject=_v4_,_v0_[_v4_]=_v0_[_v4_]||function(){(_v0_[_v4_].q=_v0_[_v4_].q||[]).push(arguments)},_v0_[_v4_].l=+new Date,_v5_=_v1_.createElement(_v2_),_v6_=_v1_.getElementsByTagName(_v2_)[0],_v5_.src=_v3_,_v6_.parentNode.insertBefore(_v5_,_v6_)}(this,document,"script","//www.google-analytics.com/analytics.js","ga");'
  ];
  
  // check if the arrray contains repeated values
  function hasDuplicates (el, pos, arr) {
    return arr.indexOf(el) !== pos;
  }
  
  var toString = Object.prototype.toString;
  
  function isObject (variable) {
    return toString.call(variable) === '[object Object]';
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
      throw 'Please pass an argument with 5 or more and 7 or less characters.';
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
  
  Isogram.version = '0.3.0';
  
  var root = typeof window === 'object'? window: this;

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
  else if (typeof module !== 'undefined' && module.exports) {
    (module.exports = Isogram).isogram = Isogram;
  }
  else {
    // in a browser or Rhino
    root.isogram = Isogram;
  }

}());
