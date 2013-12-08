/*!
 * isogram v0.0.6
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
      '!function(_v0_,_v1_,_v2_,_v3_,_v4_){_v0_.GoogleAnalyticsObject=_v2_,_v0_[_v2_]||(_v0_[_v2_]=function(){(_v0_[_v2_].q=_v0_[_v2_].q||[]).push(arguments)}),_v0_[_v2_].l=+new Date,_v3_=_v1_.createElement("script"),_v4_=_v1_.scripts[0],_v3_.src="//www.google-analytics.com/analytics.js",_v4_.parentNode.insertBefore(_v3_,_v4_)}(this,document,"ga");',
      '!function(_v0_,_v1_,_v2_,_v3_,_v4_,_v5_){_v0_.GoogleAnalyticsObject=_v3_,_v0_[_v3_]||(_v0_[_v3_]=function(){(_v0_[_v3_].q=_v0_[_v3_].q||[]).push(arguments)}),_v0_[_v3_].l=+new Date,_v4_=_v1_.createElement(_v2_),_v5_=_v1_.getElementsByTagName(_v2_)[0],_v4_.src="//www.google-analytics.com/analytics.js",_v5_.parentNode.insertBefore(_v4_,_v5_)}(this,document,"script","ga");',
      '!function(_v0_,_v1_,_v2_,_v3_,_v4_,_v5_,_v6_){_v0_.GoogleAnalyticsObject=_v4_,_v0_[_v4_]=_v0_[_v4_]||function(){(_v0_[_v4_].q=_v0_[_v4_].q||[]).push(arguments)},_v0_[_v4_].l=+new Date,_v5_=_v1_.createElement(_v2_),_v6_=_v1_.getElementsByTagName(_v2_)[0],_v5_.src=_v3_,_v6_.parentNode.insertBefore(_v5_,_v6_)}(this,document,"script","//www.google-analytics.com/analytics.js","ga");'
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
