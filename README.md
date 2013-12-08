# isogram

[![NPM version](https://badge.fury.io/js/isogram.png)](http://badge.fury.io/js/isogram)
[![Dependency Status](https://david-dm.org/shinnn/isogram.png)](https://david-dm.org/shinnn/isogram)
[![devDependency Status](https://david-dm.org/shinnn/isogram/dev-status.png)](https://david-dm.org/shinnn/isogram#info=devDependencies)

Generate a Google Analytics tracking snippet with any *isogrammic* parameters you like

## Installation

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
isogram company --id 12345678-9 --domain-name your-company.com
```

#### output

```javascript
!function(c,o,m,p,a,n,y){c.GoogleAnalyticsObject=a,c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)},c[a].l=+new Date,n=o.createElement(m),y=o.getElementsByTagName(m)[0],n.src=p,y.parentNode.insertBefore(n,y)}(this,document,"script","//www.google-analytics.com/analytics.js","ga");

ga('create', 'UA-12345678-9', 'your-company.com');
ga('send', 'pageview');
```

## License

Copyright (c) 2013 Shinnosuke Watanabe All rights reserved.

Unless otherwise stated, all source code in this repository is licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).

[![endorse](https://api.coderwall.com/shinnn/endorsecount.png)](https://coderwall.com/shinnn)