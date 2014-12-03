#!/usr/bin/env node
'use strict';

var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    i: 'id',
    d: 'domain',
    g: ['global', 'globalName'],
    w: 'double',
    m: 'minify',
    c: 'color',
    h: 'help',
    v: 'version'
  },
  string: ['_', 'id', 'domain', 'g', 'global'],
  boolean: ['minify', 'color', 'help', 'version']
});

var chalk = require('chalk');

if (argv.version) {
  console.log(require('./package.json').version);
} else if (argv.help) {
  var sumUp = require('sum-up');
  var yellow = chalk.yellow;

  var pkg = require('./package.json');

  console.log([
    sumUp(pkg),
    '',
    'Usage: ' + pkg.name + ' <parameters> [options]',
    '',
    'Options:',
    yellow('--id,       -i <ID>    ') + '  Set web property ID',
    yellow('--domain,   -d <domain>') + '  Set domain',
    yellow('--global,   -g <name>  ') + '  Change global variable name ("ga" by default)',
    yellow('--minify,   -m         ') + '  Minify output like UglifyJS',
    yellow('--double,   -w         ') + '  Use double quotes (single quotes by default)',
    yellow('--no-color,            ') + '  Print code in a single color',
    yellow('--color,    -c         ') + '  Colorize parameters anyway (enabled by default)',
    yellow('--help,     -h         ') + '  Print usage information',
    yellow('--version,  -v         ') + '  Print version',
    ''
  ].join('\n'));

} else {
  argv.color = argv.color || (chalk.supportsColor && !argv['no-color']);
  argv.singleQuotes = !argv.double;

  var isogram = require('./');

  try {
    var code;

    if (argv._.length === 0) {
      code = isogram.apply(null, [argv]);
    } else {
      code = isogram.apply(null, [argv._[0], argv]);
    }

    console.log(code);
  } catch (e) {
    process.stderr.write(e.message + '\n', function() {
      process.exit(1);
    });
  }
}
