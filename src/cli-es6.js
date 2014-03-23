var isogram = require('./isogram');

var program = require('commander');
var chalk = require('chalk');

program
  .version('<%= version %>')
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
  console.log(output);
  
} catch (e) {
  console.error(chalk.red(e));
}
