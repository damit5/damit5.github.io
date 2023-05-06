require([
    "gitbook",
    "jQuery"
], function(gitbook, $) {
    var copyrightConfig = {};

    gitbook.events.bind("start", function(e, config) {
        copyrightConfig = config.copyright || {};
        initCopyright();
    });

    gitbook.events.bind("page.change", initCopyright);

    function initCopyright() {
        var copyProtect = copyrightConfig.copyProtect;
        if(!copyProtect){
            return;
        }
        if (window.ActiveXObject) {
            document.body.oncopy = function() {
                event.returnValue = false;
                var t = document.selection.createRange().text;
                var extraCopyrightInfo = getCopyright();
                clipboardData.setData('Text', t + extraCopyrightInfo);
            };
        } else {
            document.oncopy = function(){
                var body_element = document.getElementsByTagName('body')[0];
                var selection;
                selection = window.getSelection();
                var extraCopyrightInfo = getCopyright();
                var copytext = selection + extraCopyrightInfo;
                var newdiv = document.createElement('div');
                newdiv.style.position = 'absolute';
                newdiv.style.left = '-99999px';
                body_element.appendChild(newdiv);
                newdiv.innerHTML = copytext;
                selection.selectAllChildren(newdiv);
                window.setTimeout(function() { body_element.removeChild(newdiv); }, 0);
            };
        }
    }

    function getCopyright() {
        var site = copyrightConfig.site;
        if (site.slice(-1) != "/") {
            site += '/';
        }
        var author = copyrightConfig.author;
        var website = copyrightConfig.website;
        var image = copyrightConfig.image;
        var lang = gitbook.state.innerLanguage;
        if (lang) {
            if (typeof author === 'object') author = author[lang];
            if (typeof website === 'object') website = website[lang];
            if (typeof image === 'object') image = image[lang];
            lang += '/';
        }
        var url = gitbook.state.filepath;
        var readmeReg = /\/?\bREADME\.md$/;
        if (readmeReg.test(url)) {
            url = site + lang + (url === 'README.md' ? '' : url.replace(readmeReg, '/'));
        } else {
            url = site + lang + url.replace(/.md$/, '.html');
        }
        if (/^zh.*/.test(gitbook.state.config.language)) {
            return '<br><br>作者: ' + author + '<br>链接: ' + url + '<br>来源: ' + website + '<br>本文原创发布于「' + website + '」,转载请注明出处,谢谢合作!<br>';
        }
        return '<br><br>作者: ' + author + '<br>链接: ' + url + '<br>来源: ' + website + '<br>本文原创发布于「' + website + '」,转载请注明出处,谢谢合作!<br>';
    }
});