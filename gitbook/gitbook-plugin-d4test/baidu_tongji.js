require(["gitbook"], function(gitbook) {

    // start事件
    gitbook.events.bind("start", function(e, pluginConfig) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = "var _hmt = _hmt || [];(function() {var hm = document.createElement('script');hm.src = 'https://hm.baidu.com/hm.js?3675030a9721336abea8cd0e46b3f76b';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(hm, s);})();";
        head.appendChild(script);
    });

    // page.change事件
    gitbook.events.bind("page.change", function() {
        _hmt.push(['_trackEvent', location.pathname, 'page.change', '', '']);
    });

});