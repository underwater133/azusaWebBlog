---
title: css知识点查漏补缺
date: 2024-10-13
tags:
 - 前端
 - CSS
categories: 
 - 前端随笔
sidebar: 'auto'
---
# 前言
记录一些容易遗漏的、好玩的知识点~

## 轮播背景颜色跟随轮播图颜色改变
网上的做法大部分是通过js去修改背景颜色，并且这个颜色是从后端拿到的，也就是需要先预设好而不是能够根据轮播图实时获取的。

那么有什么办法可以不先预设颜色呢？答案是借助前端一些开源库来实现，例如`colorThief`，可以通过算法来获取图片的主色调，不仅如此也能自行决定要获取多少种颜色，相当于一个调色盘。

如果对颜色精确度要求比较高的，可以通过第一种方式先预设好一些颜色用接口获取，如果想要偷懒一点则可以采用第二种方式来获取图片的颜色。

核心代码：
```html
<!--全局scss-->
root {
--banner-bg-color1: #fff;
--banner-bg-color2: #fff;
--banner-bg-color3: #fff;
}


<script>
const setBannerBgColor = async (index) => {
    const colorThief = new ColorThief()
    const img = document.querySelector('#banner' + (index + 1)).querySelector('img')
    const [c1, c2, c3] = await colorThief.getColor(img)
    const styleDom = document.documentElement.style
    styleDom.setProperty('--banner-bg-color1', c1)
    styleDom.setProperty('--banner-bg-color2', c2)
    styleDom.setProperty('--banner-bg-color3', c3)
}
</script>

<style lang="scss">
.banner {
    width: 750rpx;
    padding: 30rpx 0;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200rpx; /* 根据需要调整高度 */
        background-color: rgb(var(--banner-bg-color1), var(--banner-bg-color2), var(--banner-bg-color3));
    }
}
</style>
```
在uni-app中使用可能遇到的问题及解决方案

问题一：跨平台兼容性

不同平台对于CSS的支持可能存在差异，特别是在移动端。为了确保背景颜色的兼容性，我们需要测试在不同的设备和浏览器上。

解决方案：使用uniapp的条件编译功能，针对不同的平台编写特定的样式或者使用polyfill来弥补某些平台的特性缺失。

问题二：性能问题

图片颜色的提取可能会消耗较多的计算资源，尤其是在移动设备上。如果处理不当，可能会导致页面卡顿或者加载延迟。

解决方案：可以考虑使用Web Workers来进行后台处理，或者在图片加载完成后再进行颜色提取，避免在渲染关键路径上进行繁重的计算。

问题三：颜色匹配的准确性

自动提取的颜色可能与设计师的预期存在偏差，导致最终效果不佳。

解决方案：可以提供一个手动调整的选项，让设计师或者用户能够微调背景颜色，以达到最佳效果。

参考：[https://zhuanlan.zhihu.com/p/692729109](https://zhuanlan.zhihu.com/p/692729109)

此外我还实现过一个轮播图修改时，背景图片也跟随一起改变，并且轮播图是背景图片中的一部分，可以看[这篇文章](/frontEnd/uniapp实现轮播图和背景图双重切换.html)

## 模糊效果
有两种模糊效果，一种是针对元素本身的，另一种的针对背景的，语法基本一致。
```css
.element {
  background-color: rgba(255, 255, 255, 0.5);
  /*作用于背景*/
  backdrop-filter: blur(10px);
  /*作用于元素本身*/
  filter: blur(10px);
}
```
例如，`filter: blur(10px);`会在元素上应用一个10像素半径的高斯模糊效果;而`backdrop-filter: blur(10px);`会在元素的背景上应用一个10像素半径的高斯模糊效果，而元素的前景内容（如文本）保持清晰。