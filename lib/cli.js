'use strict';

var isogram = require('./isogram');

var program = require('commander');
var chalk = require('chalk');

program
  .version('0.4.3')
  .usage('[5, 6 or 7 characters] [options]')
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
  console.log(output);

} catch (e) {
  console.error(chalk.red(e));
}
