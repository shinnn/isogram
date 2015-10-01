/* jshint unused:true */

'use strict';

var exec = require('child_process').exec;

var eachExec = require('each-exec');
var test = require('tape');

var pkg = require('./package.json');
var isogram = require('./');

var bin = 'node ' + pkg.bin + ' ';

test('"isogram" command', function(t) {
  t.plan(20);

  exec(bin, function(err, stdout, stderr) {
    t.deepEqual(
      [err, stdout, stderr],
      [null, isogram() + '\n', ''],
      'should generate Google Analytics code.'
    );
  });

  var expected = isogram({
    id: '01234-5',
    domain: 'foo.org',
    globalName: 'bar',
    minify: true,
    singleQuotes: false,
    color: true
  }) + '\n';

  eachExec([
    bin + '--id 01234-5 --domain foo.org --global bar --minify --double --color',
    bin + '-i 01234-5 -d foo.org -g bar -m -w -c'
  ], function(err, stdouts, stderrs) {
    t.deepEqual(
      [err, stdouts[0], stderrs[0]],
      [null, expected, ''],
      'should reflect option flags to the result.'
    );
    t.equal(
      stdouts[0],
      stdouts[1],
      'should use short flags as aliases.'
    );
  });

  exec(bin + '--no-color', function(err, stdout, stderr) {
    t.deepEqual(
      [err, stdout, stderr],
      [null, isogram({color: false}) + '\n', ''],
      'should omit ANSI colors from the result, using --no-color flag.'
    );
  });

  exec(bin + '--no-track', function(err, stdout, stderr) {
    t.deepEqual(
      [err, stdout, stderr],
      [null, isogram({track: false}) + '\n', ''],
      'should omit `create` and `send` commands if using --no-track flag.'
    );
  });

  eachExec([
    bin + '--version',
    bin + '-v'
  ], function(err, stdouts, stderrs) {
    t.deepEqual(
      [err, stdouts[0], stderrs[0]],
      [null, pkg.version + '\n', ''],
      'should print version number using --version flag.'
    );
    t.equal(
      stdouts[0],
      stdouts[1],
      'should use -v as an alias of --version.'
    );
  });

  eachExec([
    bin + '--help',
    bin + '-h'
  ], function(err, stdouts, stderrs) {
    t.ok(
      /Usage/.test(stdouts[0]),
      'should print usage information using --help flag.'
    );
    t.deepEqual(
      [err, stderrs[0]],
      [null, ''],
      'should print nothing to stderr when --help flag is enabled.'
    );
    t.equal(
      stdouts[0],
      stdouts[1],
      'should use -h as an alias of --help.'
    );
  });

  exec(bin + '12abcd', function(err, stdout, stderr) {
    t.strictEqual(
      err.code,
      1,
      'should exit with code 1 when it takes invalid characters.'
    );
    t.equal(
      stderr,
      '"1" and "2" cannot be used as JavaScript parameter names.\n',
      'should print error message when it takes invalid characters.'
    );
  });

  exec(bin + 'aabbcd', function(err, stdout, stderr) {
    t.strictEqual(
      err.code,
      1,
      'should exit with code 1 when it takes duplicated characters.'
    );
    t.equal(
      stderr,
      '"a" and "b" are duplicated.\n',
      'should print error message when it takes duplicated characters.'
    );
  });

  exec(bin + 'ab', function(err, stdout, stderr) {
    t.strictEqual(
      err.code,
      1,
      'should exit with code 1 when it takes less than 3 characters.'
    );
    t.equal(
      stderr,
      'Number of characters must be no fewer than 3 and no greater than 7.\n',
      'should print error message when it takes less than 3 characters.'
    );
  });

  exec(bin + 'abcdefgh', function(err, stdout, stderr) {
    t.strictEqual(
      err.code,
      1,
      'should exit with code 1 when it takes more than 7 characters.'
    );
    t.equal(
      stderr,
      'Number of characters must be no fewer than 3 and no greater than 7.\n',
      'should print error message when it takes more than 7 characters.'
    );
  });

  exec(bin + '--global ↓', function(err, stdout, stderr) {
    t.strictEqual(
      err.code,
      1,
      'should exit with code 1 when --global flag takes an invalid name.'
    );
    t.equal(
      stderr,
      '↓ cannot be used as a global variable name.\n',
      'should print error message when --global flag takes an invalid name.'
    );
  });
});
