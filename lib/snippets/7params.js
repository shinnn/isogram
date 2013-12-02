// http://mathiasbynens.be/notes/async-analytics-snippet#universal-analytics

(function (__v0__, __v1__, __v2__, __v3__, __v4__, __v5__, __v6__) {
    __v0__.GoogleAnalyticsObject = __v4__;
    __v0__[__v4__] = __v0__[__v4__] || function () {
        (__v0__[__v4__].q = __v0__[__v4__].q || []).push(arguments)
    }, __v0__[__v4__].l = +new Date;
    __v5__ = __v1__.createElement(__v2__),
    __v6__ = __v1__.getElementsByTagName(__v2__)[0];
    __v5__.src = __v3__;
    __v6__.parentNode.insertBefore(__v5__, __v6__)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
