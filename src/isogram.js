/*!
 * isogram v@version
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
    '@file: 5params',
    '@file: 6params',
    '@file: 7params'
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
      new RegExp('_v' + i + '_', 'g'),
      colorlize(alphabets[i], 'green')
    );
  }

  console.log(funcStr + additional);
};
