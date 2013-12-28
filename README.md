# isogram

[![NPM version](https://badge.fury.io/js/isogram.png)](http://badge.fury.io/js/isogram)
[![Build Status](https://travis-ci.org/shinnn/isogram.png?branch=master)](https://travis-ci.org/shinnn/isogram)
[![Dependency Status](https://david-dm.org/shinnn/isogram.png)](https://david-dm.org/shinnn/isogram)
[![devDependency Status](https://david-dm.org/shinnn/isogram/dev-status.png)](https://david-dm.org/shinnn/isogram#info=devDependencies)

Generate Google's Universal Analytics code with any *isogrammic* parameters you like

![Alt text](./demo.gif "Screencast")

## Introduction

### Story

Here is the default tracking code of Google's Universal Analytics.
(cf. [Introduction to Analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs/))

```javascript
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
```

It has the immediate invoked function with seven parameters `i` `s` `o` `g` `r` `a` `m`.

On the other hand, here is the tracking code used in the [`index.html`](https://github.com/h5bp/html5-boilerplate/blob/master/index.html) of [HTML5 Boilerplate](http://html5boilerplate.com/).

```javascript
(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;e=o.createElement(i);r=o.getElementsByTagName(i)[0];e.src='//www.google-analytics.com/analytics.js';r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
```

As you can see, its parameters are `b` `o` `i` `l` `e` `r`, different from the original's.
This alteration with the sense of fun is [authored by Mathias Bynens](https://github.com/h5bp/html5-boilerplate/commit/48d49e96d6db282eb9686d31ebbc5cbbbdd4d966 "Update to Google Universal Analytics"), based on [the way of optimization and minification he blogged](http://mathiasbynens.be/notes/async-analytics-snippet#universal-analytics).

After seeing that, I modularized Bynens's way as this program, *isogram*.

### What is *isogram*?

*isogram* is a code generator. It enables us to change the parameters of the Google Analytics tracking code, as we like, as long as they are [isogrammic](http://en.wikipedia.org/wiki/Isogram).

Isn't it very useful? Indeed, it is so. But, I think, *isogram* can surprise the poeple seeing the source of your website, [such as Bynens's commit](https://github.com/h5bp/html5-boilerplate/commit/48d49e96d6db282eb9686d31ebbc5cbbbdd4d966#all_commit_comments "notes on commit").

## Installation

Make sure you have installed [Node](http://nodejs.org/).

### CLI executable

```
npm install -g isogram
```

### Programmatic use on Node

Coming soon.

## Usage

### Use on command line

```
isogram [parameters] [options]
```

#### Parameters

Default: `GoOgle`

`[parameters]` need to be a **nonpattern** word with 5, 6, or 7 characters, each of whom can be a valid JavaScript variable name.

For example, `yummy` is not valid, but `YuMmy` is valid.

#### Options

```
-h, --help                   output usage information
-V, --version                output the version number
-i, --id <tracking ID>       change tracking-ID
-d, --domain-name <domain>   change domain name
-m, --minify                 minify output
```

#### Example

###### command

```
isogram Company --id 12345678-9 --domain-name your-company.com
```

###### output

```javascript
!function(C,o,m,p,a,n,y){C.GoogleAnalyticsObject=a,C[a]=C[a]||function(){(C[a].q=C[a].q||[]).push(arguments)},C[a].l=+new Date,n=o.createElement(m),y=o.getElementsByTagName(m)[0],n.src=p,y.parentNode.insertBefore(n,y)}(this,document,"script","//www.google-analytics.com/analytics.js","ga");

ga("create", "UA-12345678-9', 'your-company.com");
ga("send", "pageview");
```

## License

Copyright (c) 2013 [Shinnosuke Watanabe](https://github.com/shinnn) All rights reserved.

Unless otherwise stated, all source code in this repository is licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).

[![endorse](https://api.coderwall.com/shinnn/endorsecount.png)](https://coderwall.com/shinnn)