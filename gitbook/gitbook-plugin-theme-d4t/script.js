require(['gitbook', 'jquery'], function(gitbook, $) {

    function getRootPath() {
        const pathName = window.location.pathname.substring(1);
        const webName = pathName === '' ? '' : pathName.substring(0, pathName.indexOf('/'));
        if (webName === '') {
            return window.location.protocol + '//' + window.location.host;
        }
        else {
            return window.location.protocol + '//' + window.location.host + '/' + webName;
        }
    }

    //生成内容导航
    function generateSectionNavigator(){
        $('.page-inner .markdown-section').find('h1,h2,h3').each(function(){
            let cls = 'anchor-h1';
            if($(this).is('h2')){
                cls = 'anchor-h2';
            }
            if($(this).is('h3')){
                cls ='anchor-h3';
            }
            const text = $(this).text();
            const href = $(this).attr("id");
            $('.book-anchor-body').append("<a id='an_"+text+"' class='anchor-text "+cls+"' title='"+text+"'  href='#"+href+"'>"+text+"</a>")
        });

        $('.book-anchor-body>a').click(function(){
            $('.book-anchor-body>a').removeClass('selected');
            $(this).addClass('selected');
        });

        let hash = decodeURIComponent(location.hash);
        if(hash){
            hash = hash.substring(1);
            $('#an_'+hash).addClass('selected');
        }

    }

    function setBase(){
        const $title = $('.header-inner .title');
        $title.text(gitbook.state.config.title);

        const $search = $('#book-search-input');
        const placeholder = gitbook.state.config.pluginsConfig['d4t']['search-placeholder'] || '输入关键字搜索';
        $search.find('input').attr('placeholder',placeholder);
        $search.append("<span id='searchBtn'>搜索</span>");
        $search.focus();
        $('#searchBtn').click(function(e){});

        //去掉gitbook-link
        $('.summary .gitbook-link').hide();
        $('.summary .divider').hide();
    }

    // 移动设备适配
    function mobileAdaptation(){
      // 检测是否是移动端访问
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet/i.test(navigator.userAgent)) {
        // 如果是移动端访问，隐藏.book-anchor
        var bookAnchor = document.querySelector('.book-anchor');
        bookAnchor.style.display = 'none';

        // 调整.page-inner的padding属性
        var pageInner = document.querySelector('.page-inner');
        pageInner.style.padding = '40px 20px 40px 40px';
        pageInner.style.maxWidth = 'none';

        // 如果是手机而不是平板，则搜索框下移适配
        if (window.innerWidth <= 800) {
            // 搜索框下移适配
            var bookSearchInput = document.getElementById('book-search-input');
            // 下移元素 20 个像素
            bookSearchInput.style.position = 'relative';
            bookSearchInput.style.top = '20px';
            // 将元素置于最上层
            bookSearchInput.style.zIndex = '1';

            // head下移适配
            var bookHeader = document.querySelector('.book-header');
            bookHeader.style.padding = '19px 8px';

        }
      }
    };

    gitbook.events.on('start', function() {

    });

    gitbook.events.on('page.change', function() {
        setBase();
        generateSectionNavigator();
        mobileAdaptation();
    });
});
