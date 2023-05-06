require(["gitbook"], function(gitbook) {

    // start事件
    gitbook.events.bind("start", function(e, pluginConfig) {
        // // 域名 锚定 广告
        // // 获取<head>标签
        // let head = document.getElementsByTagName('head')[0];
        // // 创建<script>元素
        // let script = document.createElement('script');
        // script.async = true;
        // script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9261110029983076";
        // script.crossOrigin = "anonymous";

        // // 将<script>元素添加到<head>标签中
        // head.appendChild(script);
        // console.log("google ads test");
    });

    // page.change事件
    gitbook.events.bind("page.change", function() {
        // ads_2 多重广告
        let ads_2_divElement = document.querySelector('div.page-inner');
        let ads_2_scriptElement = document.createElement('script');

        ads_2_scriptElement.setAttribute('async', '');
        ads_2_scriptElement.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9261110029983076');
        ads_2_scriptElement.setAttribute('crossorigin', 'anonymous');

        let ads_2_insElement = document.createElement('ins');
        ads_2_insElement.setAttribute('class', 'adsbygoogle');
        ads_2_insElement.setAttribute('style', 'display:block');
        ads_2_insElement.setAttribute('data-ad-format', 'autorelaxed');
        ads_2_insElement.setAttribute('data-ad-client', 'ca-pub-9261110029983076');
        ads_2_insElement.setAttribute('data-ad-slot', '5386382335');

        let ads_2_script2Element = document.createElement('script');
        ads_2_script2Element.textContent = '(adsbygoogle = window.adsbygoogle || []).push({});';

        ads_2_divElement.insertBefore(ads_2_scriptElement, ads_2_divElement.firstChild);
        ads_2_divElement.insertBefore(ads_2_insElement, ads_2_divElement.firstChild);
        ads_2_divElement.insertBefore(ads_2_script2Element, ads_2_divElement.firstChild);

        // ads_1 展示
        let divElement = document.querySelector('div.page-inner');
        let scriptElement = document.createElement('script');

        scriptElement.setAttribute('async', '');
        scriptElement.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9261110029983076');
        scriptElement.setAttribute('crossorigin', 'anonymous');

        let insElement = document.createElement('ins');
        insElement.setAttribute('class', 'adsbygoogle');
        insElement.setAttribute('style', 'display:block');
        insElement.setAttribute('data-ad-client', 'ca-pub-9261110029983076');
        insElement.setAttribute('data-ad-slot', '9153402808');
        insElement.setAttribute('data-ad-format', 'auto');
        insElement.setAttribute('data-full-width-responsive', 'true');

        let script2Element = document.createElement('script');
        script2Element.textContent = '(adsbygoogle = window.adsbygoogle || []).push({});';

        divElement.appendChild(scriptElement);
        divElement.appendChild(insElement);
        divElement.appendChild(script2Element);

        // 检查是否存在广告禁用
        let ad_check_ins = document.getElementsByTagName("ins");
        setTimeout(function() {
          for (let i = 0; i < ad_check_ins.length; i++) {
            let ad_check_div = ad_check_ins[i].getElementsByTagName("div");
            if (ad_check_div.length > 0) {
              console.log("yes ad");
              // 加入一根粗横线
              let treeviewContainer = document.querySelector('.treeview__container');
              if (treeviewContainer) {
                let horizontalLine = document.createElement('hr');
                horizontalLine.style.borderTop = "2px solid black";
                treeviewContainer.insertAdjacentElement('beforebegin', horizontalLine);
              }
              break;

            } else {
              let ad_image = document.createElement("img");
              ad_image.src = "https://img.shields.io/badge/%E5%A6%82%E6%9E%9C%E5%8F%AF%E4%BB%A5-%E8%AF%B7%E5%9C%A8%E5%BD%93%E5%89%8D%E7%BD%91%E7%AB%99%E7%A6%81%E7%94%A8AdBlock-red?style=for-the-badge&logo=adblockplus&logoColor=C70D2C&labelColor=silver";
              ad_image.alt = "如果可以，请在当前网站禁用 AdBlock";
              let ad_section = document.getElementsByClassName("normal markdown-section")[0];
              ad_section.insertBefore(ad_image, ad_section.firstChild);
              console.log("no ad");
              break;
            }
          }
        }, 3000);

    });

});