# isogram

[![NPM version](https://badge.fury.io/js/isogram.png)](http://badge.fury.io/js/isogram)
[![Build Status](https://travis-ci.org/shinnn/isogram.png?branch=master)](https://travis-ci.org/shinnn/isogram)
[![Dependency Status](https://david-dm.org/shinnn/isogram.png)](https://david-dm.org/shinnn/isogram)
[![devDependency Status](https://david-dm.org/shinnn/isogram/dev-status.png)](https://david-dm.org/shinnn/isogram#info=devDependencies)

Generate [Google's Universal Analytics snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/#quickstart) with any *isogrammic* parameters you like

## Installation

Make sure you have installed [Node](http://nodejs.org/).

### CLI executable

```
npm install -g isogram
```

### Programmatic use on Node

Coming soon.

## Usage

```
isogram [characters] [options]
```

The available options are:

```
-h, --help                   output usage information
-V, --version                output the version number
-i, --id <tracking ID>       change tracking-ID
-d, --domain-name <domain>   change domain
-m, --minify                 minify source
```

## Example

### CLI

#### command

```
isogram Company --id 12345678-9 --domain-name your-company.com
```

#### output

```javascript
!function(C,o,m,p,a,n,y){C.GoogleAnalyticsObject=a,C[a]=C[a]||function(){(C[a].q=C[a].q||[]).push(arguments)},C[a].l=+new Date,n=o.createElement(m),y=o.getElementsByTagName(m)[0],n.src=p,y.parentNode.insertBefore(n,y)}(this,document,"script","//www.google-analytics.com/analytics.js","ga");

ga("create", "UA-12345678-9', 'your-company.com");
ga("send", "pageview");
```

## License

Copyright (c) 2013 [Shinnosuke Watanabe](https://github.com/shinnn) All rights reserved.

Unless otherwise stated, all source code in this repository is licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).

[![endorse](https://api.coderwall.com/shinnn/endorsecount.png)](https://coderwall.com/shinnn)