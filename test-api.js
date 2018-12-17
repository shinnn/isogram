/* jshint unused: true */
'use strict';

var chalk = require('chalk');
var gaLoaderSnippets = require('ga-loader-snippets');
var gaTrackerSnippet = require('ga-tracker-snippet');
var isogram = require('.');
var scriptEqual = require('script-equal');
var test = require('tape');

var scriptTagPattern = /^<script>((?:.|\n)*?)<\/script>$/;

function extractCode(snippet) {
  var match = snippet.match(scriptTagPattern)[1];
  return match;
}

test('isogram()', function(t) {
  t.ok(
    scriptEqual(isogram(), gaLoaderSnippets.with6params + gaTrackerSnippet()),
    'should create a Google Analytics string with 6 parameters by default.'
  );

  t.equal(
    isogram(null),
    isogram(),
    'should return the default value when it takes one argument and it is falsy.'
  );

  ['AaB', 'AaBG', 'AaBGT', 'AaあGTå', 'AaアGTåN'].forEach(function(params) {
    t.ok(
      scriptEqual(
        isogram(params),
        gaLoaderSnippets['with' + params.length + 'params'] + gaTrackerSnippet()
      ),
      'should create a Google Analytics string with ' + params.length + ' parameters.'
    );
  });

  t.ok(
    scriptEqual(
      isogram({id: 'UA-36461297-9'}),
      gaLoaderSnippets.with6params + gaTrackerSnippet({id: '36461297-9'})
    ),
    'should change web property ID using `id` option.'
  );

  t.ok(
    scriptEqual(
      isogram({id: '36461297-3'}),
      gaLoaderSnippets.with6params + gaTrackerSnippet({id: '36461297-3'})
    ),
    'should add UA- prefix to web property ID automatically.'
  );

  t.ok(
    scriptEqual(
      isogram({domain: 'foo.example.com'}),
      gaLoaderSnippets.with6params + gaTrackerSnippet({domain: 'foo.example.com'})
    ),
    'should set domain using `domain` option.'
  );

  t.ok(
    scriptEqual(
      isogram({globalName: 'f'}),
      gaLoaderSnippets.with6params.replace('ga', 'f') +
      gaTrackerSnippet({globalName: 'f'})
    ),
    'should change the global function name using `globalName` option.'
  );

  t.ok(
    scriptEqual(
      isogram('ANTqrつぁ', {minify: true}),
      gaLoaderSnippets.with7params + gaTrackerSnippet()
    ),
    'should minify the code without changing its structure, using `minify` option.'
  );

  t.notOk(
    /\n|\s(?!Date)/.test(isogram('Vtカxc', {minify: true})),
    'should remove unnecessary whitespaces and newlines, using `minify` option.'
  );

  t.notEqual(
    isogram({color: true}).indexOf(chalk.green('G')),
    -1,
    'should add green color to the parameters using `color` option.'
  );

  t.equal(
    chalk.stripColor(isogram({color: true, minify: true})),
    isogram({color: false, minify: true}),
    'should not change code structure, even if `color` option is enabled.'
  );

  t.equal(
    isogram({singleQuotes: false}),
    isogram(null).replace(/'/g, '\"'),
    'should replace all the single quotes with double quotes, using `minify` option.'
  );

  t.ok(
    scriptEqual(
      isogram({track: false}),
      gaLoaderSnippets.with6params
    ),
    'should not include the tracker snippet if `track` option is false.'
  );

  t.ok(
    scriptTagPattern.test(isogram({scriptTag: true})),
    'should surround the code with script tags, using `scriptTag` option.'
  );

  t.ok(
    scriptTagPattern.test(isogram({scriptTag: true, id: '36461297-3'})),
    'should surround the code and tracker with script tags, using `scriptTag` option.'
  );

  t.ok(
    scriptEqual(
      extractCode(isogram({scriptTag: true})),
      gaLoaderSnippets.with6params + gaTrackerSnippet()
    ),
    'should have normal inner code when using `scriptTag`'
  );

  t.ok(
    scriptEqual(
      extractCode(isogram({scriptTag: true, id: '36461297-3'})),
      gaLoaderSnippets.with6params + gaTrackerSnippet({id: '36461297-3'})
    ),
    'should have normal inner code, even when using tracker.'
  );

  t.throws(
    () => isogram(124578),
    /TypeError.*First argument must be a string or an object\.$/,
    'should fail when it takes one argument which is not a string or an object.'
  );

  t.throws(
    () => isogram(['zxcvbn'], {}),
    /TypeError.*First argument must be a string or an object\.$/,
    'should fail when it takes two arguments but the first is not a string or an object.'
  );

  t.throws(
    () => isogram('zxcv', 12),
    /Second argument must be an object/,
    'should fail when it takes a value as its second argument but it isn\'t an object.'
  );

  t.throws(
    () => isogram('ab', null),
    /Number of characters must be no fewer than 3 and no greater than 7\./,
    'should not accept less than 3 characters.'
  );

  t.throws(
    () => isogram('abcdefgh', undefined),
    /Number of characters must be no fewer than 3 and no greater than 7\./,
    'should not accept more than 7 characters.'
  );

  t.throws(
    () => isogram('AaA'),
    /"A" is duplicated\./,
    'should fail when a character in the string is duplicated.'
  );

  t.throws(
    () => isogram('AAqAqああ'),
    /"A", "q" and "あ" are duplicated\./,
    'should fail when characters  in the string are duplicated.'
  );

  t.throws(
    () => isogram('atW↑v'),
    /"↑" cannot be used as a JavaScript parameter name\./,
    'should not accept an invalid parameter name.'
  );

  t.throws(
    () => isogram('123'),
    /"1", "2" and "3" cannot be used.*s\./,
    'should not accept invalid parameter names.'
  );

  t.end();
});
