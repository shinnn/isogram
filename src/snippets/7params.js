// http://mathiasbynens.be/notes/async-analytics-snippet#universal-analytics

(function (_v0_, _v1_, _v2_, _v3_, _v4_, _v5_, _v6_) {
    _v0_.GoogleAnalyticsObject = _v4_;
    _v0_[_v4_] = _v0_[_v4_] || function () {
        (_v0_[_v4_].q = _v0_[_v4_].q || []).push(arguments)
    }, _v0_[_v4_].l = +new Date;
    _v5_ = _v1_.createElement(_v2_),
    _v6_ = _v1_.getElementsByTagName(_v2_)[0];
    _v5_.src = _v3_;
    _v6_.parentNode.insertBefore(_v5_, _v6_)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
