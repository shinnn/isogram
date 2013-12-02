module.exports = function(isogram, options) {
  
  var setting = {
    id: 'XXXXX-X',
    domain: '',
    minify: false
  };
  
  for (var attrname in options) {
    if (options[attrname]) {
      setting[attrname] = options[attrname];
    }
  }
  
  var fs = require('fs');
  var UglifyJS = require('uglify-js');

  var args;
  
  if (Array.isArray(arguments[0])) {
    args = arguments[0];
  } else {
    args = Array.prototype.slice.call(arguments);    
  }
  
  var alphabets = args[0].split('');
  var domain = setting.domain ? ("', '" + setting.domain) : '';

  var isDuplicate = function(el, pos, arr) {
    return arr.indexOf(el) !== pos;
  };

  if (alphabets.some(isDuplicate)) {
    console.warn(args[0] + ' is not isogram.');
    return;
  }

  var funcStr = '' +
		fs.readFileSync(__dirname + '/snippets/' + alphabets.length + 'params.js');

  var create = "ga('create', 'UA-" +
     setting.id + domain + "');";
     
  var send = "ga('send', 'pageview');";
  
  var additional = ['\n', create, send].join('\n');
  
  if (setting.minify) {
    additional = additional.replace(/\s+/g, '');
  }
  
  for (var i=0; i < alphabets.length; i++) {
    funcStr = funcStr.replace(new RegExp('__v' + i + '__', 'g'), alphabets[i]);
  }

  var minified = UglifyJS.minify(funcStr, {
    fromString: true,
    mangle: false
  }).code;

  console.log(minified + additional);
};
