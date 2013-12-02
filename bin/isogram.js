#!/usr/bin/env node

var pkg = require('../package.json');
var isogram = require('../lib/isogram');

var program = require('commander');

program
	.version(pkg.version)
	.option('-i, --id <tracking ID>', 'change tracking-ID')
	.option('-d, --domain-name <domain>', 'change domain')
	.option('-m, --minify', 'minify source')
	.parse(process.argv);

isogram(program.args, {
  id: program.id,
  domain: program.domainName,
  minify: program.minify
});
