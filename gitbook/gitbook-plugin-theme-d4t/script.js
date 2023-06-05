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
        $('.page-inner .markdown-section').find('h1,h2,h3,h4,h5').each(function(){
            let cls = 'anchor-h1';
            if($(this).is('h2')){
                cls = 'anchor-h2';
            }
            if($(this).is('h3')){
                cls ='anchor-h3';
            }
            if($(this).is('h4')){
                cls ='anchor-h4';
            }
            if($(this).is('h5')){
                cls ='anchor-h5';
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

    // 增加内容导航栏目跟随滚动
    // 获取第一个可见标题的函数
    function getFirstVisibleHeading() {
      // 选择所有的 h1、h2、h3 标题元素
      var headings = document.querySelectorAll("h1, h2, h3, h4, h5");

      // 遍历标题元素列表
      for (var i = 0; i < headings.length; i++) {
        var heading = headings[i];

        // 判断标题元素是否在可视区域内（距离可视区域顶部的距离小于等于阈值）
        if (isElementInViewport(heading, 20)) {
          // 如果是，则返回标题元素的文本内容
          return heading.textContent;
        }
      }

      // 如果没有可见的标题元素，则返回空字符串
      return "";
    }

    // 判断元素是否在可视区域内的函数
    function isElementInViewport(element, percentage) {
      // 获取元素的位置信息
      var rect = element.getBoundingClientRect();
      // 获取窗口的高度
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      var elementTop = rect.top;
      var elementBottom = rect.bottom;
      // 根据给定的百分比计算阈值
      var threshold = windowHeight * (percentage / 100);

      // 判断元素是否在可视区域内（距离可视区域顶部或底部的距离小于等于阈值）
      return (elementTop >= 0 && elementTop <= threshold) || (elementBottom >= 0 && elementBottom <= threshold);
    }

    // 每次滚动后更新
    function scrollCheck() {
        // 当滚动 book-body 或 body-inner 元素时触发事件
        $('.book-body, .body-inner').on('scroll', function() {
          // 获取第一个可见标题
          var firstVisibleHeading = getFirstVisibleHeading();
          // 如果存在可见标题
          if (firstVisibleHeading !== "") {
            // 根据标题生成锚点的 ID
            var anchorId = 'an_' + firstVisibleHeading;
            // 根据锚点的 ID 获取锚点元素
            var anchorElement = document.getElementById(anchorId);

            // 如果锚点元素存在
            if (anchorElement !== null) {
              // 移除已选中的锚点样式
              $('.anchor-text, .selected').removeClass('selected');
              // 添加选中样式到当前锚点元素
              $(anchorElement).addClass('selected');
            }
          }
        });
    }


    gitbook.events.on('start', function() {

    });

    gitbook.events.on('page.change', function() {
        setBase();
        generateSectionNavigator();
        mobileAdaptation();
        scrollCheck();
    });
});
