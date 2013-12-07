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
	
  if (isogram === undefined) {
    isogram = 'GOogle';
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
  
  for (var i=0; i < alphabets.length; i++) {
    funcStr = funcStr.replace(new RegExp('__v' + i + '__', 'g'), alphabets[i]);
  }

  console.log(funcStr + additional);
};