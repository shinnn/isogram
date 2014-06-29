/*!
 * isogram v0.4.3
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

  var toStr = Object.prototype.toString;

  function isObject(variable) {
    return toStr.call(variable) === '[object Object]';
  }

  function arrayToSentence(arr) {
    var result = '';
    arr.forEach(function(elm, index)  {
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

  function isogram() {var characters = arguments[0];if(characters === void 0)characters = 'GoOgle';var options = arguments[1];if(options === void 0)options = {};
    if (isObject(characters)) {
      options = characters;
      characters = 'GoOgle';
    }

    var params = characters.split('');

    var invalidChars = [];
    params.forEach(function(elm)  {
      try {
        new Function('var ' + elm)();
      } catch (e) {
        invalidChars.push(elm);
      }
    });
    if (invalidChars.length > 0) {
      var message = '';
      if (invalidChars.length === 1) {
        message = ' is not a valid JavaScript parameter name.';
      } else {
        message = ' are not valid JavaScript parameter names.';
      }
      throw arrayToSentence(invalidChars) + message;
    }

    var duplicates = [];
    var charactersCopy = characters;
    for (var i=0; i < charactersCopy.length; i++) {
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

    params.forEach(function(elm, index)  {
      gaLoader = gaLoader.replace(
        new RegExp((("_v" + index) + "_"), 'g'),
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

  isogram.version = '0.4.3';

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
