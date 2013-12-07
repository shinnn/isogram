# isogram

[![Dependency Status](https://david-dm.org/shinnn/isogram.png)](https://david-dm.org/shinnn/isogram)
[![devDependency Status](https://david-dm.org/shinnn/isogram/dev-status.png)](https://david-dm.org/shinnn/isogram#info=devDependencies)

Generate a Google Analytics tracking snippet with any *isogrammic* parameters you like

## Installation

### CLI executable

```
npm install -g isogram
```

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

```
isogram qwerty --id 12345678-9 --domain-name example.com
```

This command outputs the following Universal Analytics snippet:

```javascript
!function(q,w,e,r,t,y){q.GoogleAnalyticsObject=r,q[r]||(q[r]=function(){(q[r].q=q[r].q||[]).push(arguments)}),q[r].l=+new Date,t=w.createElement(e),y=w.getElementsByTagName(e)[0],t.src="//www.google-analytics.com/analytics.js",y.parentNode.insertBefore(t,y)}(window,document,"script","ga");

ga('create', 'UA-12345678-9', 'example.com');
ga('send', 'pageview');
```

## License

Copyright (c) 2013 Shinnosuke Watanabe All rights reserved.

Unless otherwise stated, all source code in this repository is licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).
