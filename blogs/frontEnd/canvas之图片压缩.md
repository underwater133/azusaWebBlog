---
title: canvas之图片压缩
date: 2023-04-13
tags:
 - 前端
 - canvas
categories: 
 - 前端随笔
---

今天又学了 canvas 中很多有趣的方法，这里来记录一下如何使用 canvas 进行图片压缩。

可以用两种方法来实现，第一种是toDataURL()，第二种是 toBlob()。

想了解更详细的信息，可以通过[此处](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas#%E4%BF%9D%E5%AD%98%E5%9B%BE%E7%89%87)查看，或者直接看我下方的代码，很好理解。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <img id="img" style="display: none;" />
  <canvas id="canvas" style="display: none;"></canvas>
  <img id="compress_img" />
  <button id="download">下载</button>
  <script>
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas')
    const img = document.getElementById('img')
    const compress_img = document.getElementById('compress_img')
    const btn = document.getElementById('download')

    let compress_url = ''
    const ctx = canvas.getContext('2d')
    img.onload = () => {
      const ori_width = img.naturalWidth, ori_height = img.naturalHeight // 因为图片没有展示，所以需要通过 naturalWidth 和 naturalHeight 来获取宽高
      canvas.width = ori_width
      canvas.height = ori_height
      ctx.drawImage(img, 0, 0)

      // 方法一：toDataURL
      // 第一个参数是想要保存的类型，具体也可以参考上面的文档，第二个参数是质量，在 0 - 1 之间，你可以有选择地提供从 0 到 1 的品质量，1 表示最好品质，0 基本不被辨析但有比较小的文件大小。
      compress_url = canvas.toDataURL('image/jpeg', 0.95) 
      // 实测如果是一些小的图片，要求压缩之后的质量还很高的话（例如0.9），可能比原图会更大一点点
      
      compress_img.src = compress_url


      // 方法二：toBlob
      // 第一个参数是回调函数，会接收一个 blob 类型的参数，也就是转换之后得到的；第二个参数是转换的类型；第三个参数是质量
      canvas.toBlob(function(blob){
        compress_url = URL.createObjectURL(blob)
        // 使用URL.createObjectURL(blob)函数可以创建一个Blob URL，这个URL表示参数中的对象。Blob URL并不是永久有效的，它的生命周期和创建它的窗口中的document绑定，也就是说，一旦用户关闭了或者离开了包含创建Blob URL脚本的文档，该Blob URL就失效了。
        compress_img.onload = () => {
          // 图片加载后就不需要这个 blob 对象了，解除引用释放内存。
          URL.revokeObjectURL(blob)
        }
        compress_img.src = compress_url
      }, "image/jpeg", 0.95);
    }
    img.src = "../images/login_bg.jpg"

    btn.onclick = () => {
      const a = document.createElement('a');
      a.href = compress_url;
      a.download = 'compress.jpg';
      a.click();
    }
  </script>
</body>
</html>
```

上面的例子应该很好理解，在实际使用的过程中，我们一般通过上传文件来获取到图片，然后动态生成 img 和 canvas 去压缩，我就直接模拟了。如果是上传组件获取到的图片，可以获取到很多详细信息，宽和高就不能像我例子里那么写了。

如果图片很小，只有几十k或者几百k，那其实没有压缩的必要，我们可以设定一个界限，当超过这个界限才进行压缩。

生成的图片类型也是可以选择的，不论之前是什么格式，通过中间一层 canvas 就可以转成其他的类型。

我这里压缩之后的图片宽和高和之前是一样的，如果想要按比例缩小也可以，例如要求宽和高为原来的一半，那么可以这么修改：
```js
canvas.width = ori_width * 0.5
canvas.height = ori_height * 0.5
// 第一个参数为原图，第二、三个参数为在画布上的起始位置 x 和 y，第四、五个参数为把 宽 和 高 缩放为多少
ctx.drawImage(img, 0, 0, ori_width * 0.5, ori_height * 0.5)

// 如果我们还是写 ctx.drawImage(img, 0, 0) 的话，则画布上只展示原图的左上四分之一的部分，没有缩放。
```
那么压缩之后的图片就小更多。

这只是一个很简单的版本，具体要求可以根据业务来决定。