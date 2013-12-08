/*!
 * isogram v0.0.4
 * Copyright (c) 2013 Shinnosuke Watanabe
 * Available under the MIT license
*/

module.exports = function Isogram(isogram, options) {
  
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
    console.warn('Please pass an argument with 5 or more and 7 or less characters.');
    return;
  }
  
  var alphabets = isogram.split('');
  var domain = setting.domain ? ("', '" + setting.domain) : '';

  function isDuplicate (el, pos, arr) {
    return arr.indexOf(el) !== pos;
  }

  if (alphabets.some(isDuplicate)) {
    console.warn(isogram + ' is not isogram.');
    return;
  }
	
  var snippets = [
    '!function(__v0__,__v1__,__v2__,__v3__,__v4__){__v0__.GoogleAnalyticsObject=__v2__,__v0__[__v2__]||(__v0__[__v2__]=function(){(__v0__[__v2__].q=__v0__[__v2__].q||[]).push(arguments)}),__v0__[__v2__].l=+new Date,__v3__=__v1__.createElement("script"),__v4__=__v1__.scripts[0],__v3__.src="//www.google-analytics.com/analytics.js",__v4__.parentNode.insertBefore(__v3__,__v4__)}(this,document,"ga");',
    '!function(__v0__,__v1__,__v2__,__v3__,__v4__,__v5__){__v0__.GoogleAnalyticsObject=__v3__,__v0__[__v3__]||(__v0__[__v3__]=function(){(__v0__[__v3__].q=__v0__[__v3__].q||[]).push(arguments)}),__v0__[__v3__].l=+new Date,__v4__=__v1__.createElement(__v2__),__v5__=__v1__.getElementsByTagName(__v2__)[0],__v4__.src="//www.google-analytics.com/analytics.js",__v5__.parentNode.insertBefore(__v4__,__v5__)}(this,document,"script","ga");',
    '!function(__v0__,__v1__,__v2__,__v3__,__v4__,__v5__,__v6__){__v0__.GoogleAnalyticsObject=__v4__,__v0__[__v4__]=__v0__[__v4__]||function(){(__v0__[__v4__].q=__v0__[__v4__].q||[]).push(arguments)},__v0__[__v4__].l=+new Date,__v5__=__v1__.createElement(__v2__),__v6__=__v1__.getElementsByTagName(__v2__)[0],__v5__.src=__v3__,__v6__.parentNode.insertBefore(__v5__,__v6__)}(this,document,"script","//www.google-analytics.com/analytics.js","ga");'
  ];
	
  var funcStr = snippets[alphabets.length - 5];

  var create = "ga('create', 'UA-" + setting.id + domain + "');";
     
  var send = "ga('send', 'pageview');";
  
  var additional = ['\n', create, send].join('\n');
  
  if (setting.minify) {
    additional = additional.replace(/\s+/g, '');
  }
  
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
      new RegExp('__v' + i + '__', 'g'),
      colorlize(alphabets[i], 'green')
    );
  }

  console.log(funcStr + additional);
};
