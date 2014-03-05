#!/usr/bin/env node

var isogram = require('./isogram');

var program = require('commander');
var ansi = require('ansi-styles');

program
	.version('0.3.0')
  .usage('[characters (5 or more and 7 or less)] [options]')
	.option('-i, --id <tracking ID>', 'change tracking-ID')
	.option('-d, --domain-name <domain>', 'change domain')
	.option('-m, --minify', 'minify source')
	.option('--no-color', 'no color')
	.parse(process.argv);

try {
  var output = isogram(program.args[0], {
    id: program.id,
    domain: program.domainName,
    minify: program.minify,
    color: program.color
  });
  
} catch (e) {
  console.error(ansi.red.open + e + ansi.red.close);
  return;
}

console.log(output);
