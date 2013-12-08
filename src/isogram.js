/*!
 * isogram v@version
 * Copyright (c) 2013 Shinnosuke Watanabe
 * Available under the MIT license
*/

(function(){
  function Isogram(isogram, options) {

    var setting = {
      id: 'XXXXX-X',
      domain: '',
      minify: false,
      color: false
    };
  
    for (var attrname in options) {
      if (options[attrname]) {
        setting[attrname] = options[attrname];
      }
    }

    if (isogram === undefined) {
      isogram = 'GoOgle';
    } else if (isogram.length < 5 || isogram.length > 7 ) {
      throw 'Please pass an argument with 5 or more and 7 or less characters.';
    }
  
    var alphabets = isogram.split('');
    var domain = setting.domain ? ("', '" + setting.domain) : '';

    function isDuplicate (el, pos, arr) {
      return arr.indexOf(el) !== pos;
    }

    if (alphabets.some(isDuplicate)) {
      throw isogram + ' is not isogram.';
    }
    
    var snippets = [
      '@file: 5params',
      '@file: 6params',
      '@file: 7params'
    ];
	
    var funcStr = snippets[alphabets.length - 5];

    var colorlize;
  
    if (setting.color) {
      var ansi = require('ansi-styles');
      colorlize = function (letters, color){
        return ansi[color].open + letters + ansi[color].close;
      };
    } else {
      colorlize = function (letters){
        return letters;
      };    
    }
  
    for (var i=0; i < alphabets.length; i++) {
      funcStr = funcStr.replace(
        new RegExp('_v' + i + '_', 'g'),
        colorlize(alphabets[i], 'green')
      );
    }
    
    setting.id = setting.id.replace(/^UA-/, '');
    
    var create = "ga(\"create\", \"UA-" + setting.id + domain + "\");";
    var send = "ga(\"send\", \"pageview\");";
  
    var additional = ['\n', create, send].join('\n');
  
    if (setting.minify) {
      additional = additional.replace(/\s+/g, '');
    }

    return funcStr + additional;
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
