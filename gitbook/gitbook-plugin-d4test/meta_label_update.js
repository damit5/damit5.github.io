require(["gitbook"], function(gitbook) {

    // 加载完成后更新
    gitbook.events.bind("page.change", function(e, pluginConfig) {
        console.log("test_meta_update");
        // meta keywords
        // 获取当前页面的 URL
        let url = window.location.href;

        // 获取 URL 中除去域名的路径，并对路径中的百分号编码进行解码
        let path = decodeURIComponent(url.split('/').slice(3).join('/'));

        // 将路径字符串按照斜杠分割成数组，并去除数组中的空格和空字符串
        let pathArray = path.split('/').map(s => s.trim()).filter(s => s !== '');

        // 提取关键词，去除关键词前的数字和点，并去除结尾的 .html
        let keywords = pathArray.slice(1).map(s => s.replace(/^\d+\./, '').replace(/\.html$/, '').trim()).join(',');

        // 查找文档中名为 "keywords" 的 meta 标签
        let metaKeywords = document.querySelector('meta[name="keywords"]');

        // 如果找到了该 meta 标签，则更新其 content 属性为提取的关键词；否则，创建一个新的 meta 标签，并将其添加到文档的头部
        if (metaKeywords) {
          metaKeywords.setAttribute('content', keywords);
        } else {
          let newMeta = document.createElement('meta');
          newMeta.setAttribute('name', 'keywords');
          newMeta.setAttribute('content', keywords);
          document.head.appendChild(newMeta);
        }

        // meta description
        // 获取页面上所有的 p 标签元素
        let pElements = document.querySelectorAll('p');

        // 将所有 p 标签元素的内容连接起来
        let descriptionContent = '';
        pElements.forEach((p) => {
          descriptionContent += p.textContent.trim() + ' ';
        });

        // 对连接后的内容进行截断处理
        let MAX_DESCRIPTION_LENGTH = 155;
        if (descriptionContent.length > MAX_DESCRIPTION_LENGTH) {
          descriptionContent = descriptionContent.substring(0, MAX_DESCRIPTION_LENGTH).trim();
        }

        // 查找是否已经存在 meta 的 description
        let existingMetaDescription = document.querySelector('meta[name="description"]');

        // 如果存在，则直接修改其内容
        if (existingMetaDescription) {
          existingMetaDescription.setAttribute('content', descriptionContent);
        }
        // 否则创建一个新的 meta 标签
        else {
          let metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          metaDescription.setAttribute('content', descriptionContent);
          document.head.appendChild(metaDescription);
        }
    });
});