require(["gitbook"], function(gitbook) {
  // 加载完成后更新
  gitbook.events.bind("page.change", function(e, pluginConfig) {
    // 获取所有的<img>元素
    let images = document.getElementsByTagName('img');

    // 遍历每个图片并设置缩小效果
    for (let i = 0; i < images.length; i++) {
      let img = images[i];

      // 检查图片地址是否包含"logo"或"shields.io"
      if (img.src.includes("logo") || img.src.includes("shields.io") || img.src.includes("netlify")) {
        continue; // 不缩小带有"logo"或"shields.io"的图片
      }
      
      // 图片缩小50%
      img.style.zoom = '50%';
      // 居中展示
      img.style.display = 'block';
      img.style.marginLeft = 'auto';
      img.style.marginRight = 'auto';
    }

    // 获取当前页面中所有的video标签
    let videoTags = document.querySelectorAll('video');

    // 循环遍历每个video标签并设置样式
    videoTags.forEach(video => {
      video.style.display = 'block';
      video.style.marginLeft = 'auto';
      video.style.marginRight = 'auto';
      video.style.maxWidth = '100%'; // 让视频自适应容器宽度
    });
  });
});
