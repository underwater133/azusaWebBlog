---
title: html2canvas踩坑记（位置偏移、连续生成错乱、a-textarea不换行）
date: 2024-04-26
tags:
 - 前端
categories: 
 - 前端随笔
sidebar: 'auto'
---
## 前言
嗨害嗨，来啦！本篇是记录在使用html2canvas时遇到的一些问题，场景是页面上有很多个A4纸大小的dom节点竖着排列，需要在前端将这一长串dom转化成pdf并且需要分页，那么选择使用的库就是经典搭配html2canvas+jspdf了，使用下来html2canvas本身还是存在许多问题的，比如有些样式不支持，生成之后位置偏移等等。

## 问题记录
具体的用法就不赘述了，网上有很多类似的案例，这里就记录遇到的问题。
### 生成位置偏移
有些样式看着正常，但生成之后在pdf中位置就偏移了，有什么办法能不影响当前页面而修改生成后的pdf呢？答案是有的，经过翻阅[html2canvas官方文档](https://html2canvas.hertzen.com/configuration)后，发现在生成canvas时，可以传递配置参数，将需要转化的dom克隆一份，通过修改克隆的dom上的样式即可达到上面说的效果。
```js
html2canvas(dom, {
    onclone: function (documentClone) {
        // 调整
        const titles = documentClone.querySelectorAll(".title")
        for(const title of titles) {
          title.style.marginTop = '20px'
        }
    }
}).then(canvas => {
  //...
})
```

### 连续生成导致内容全部挤在一起
这个问题是困扰我最久的，在生成完pdf后，需要将页面的数据替换之后继续生成，但奇怪的事情发生了，单次生成没问题，而一旦连续调用生成的函数，后面生成的每一页pdf中，内容都挤在一起。

起初以为是每次生成间隔时间太短，数据还没完全替换上去就生成才导致的，发现加上定时器在数据替换后的几秒后才生成也是一样的效果。

后面又尝试了各种做法，例如每次只截取页面中的一页生成canvas，生成之后拼成长图再转成pdf；还有生成一份pdf之后就销毁当前组件，重新打开新的组件去生成pdf，结果都是一样，内容都挤在一堆。

正当我百思不得其解时，发现如果我是手动点击按钮生成的，即使点的很快也不会导致内容错乱，但只要在代码中自动调用生成函数就会，那我在完成数据替换时，用代码去模拟按钮点击是否可行呢？结果还真的可以，真的玄乎！代码大概是这样：
```js
function genPdf() {
  html2canvas(dom).then(canvas => {
    // 处理分页
    // 生成pdf
    // 判断是否需要继续生成，是则重新请求数据并替换
    // 模拟按钮点击
    document.querySelector('#genPdf').click() // 点击调用genPdf()
    // 这里如果是直接调用genPdf则会内容错乱
  })
}
```
这个只能算是一个偏方，原理我也不懂，如果有遇到相同问题的可以试试，不保证能用- -。

### a-textarea文字不换行
这个是与antd控件不兼容的问题，替换成div就可以正常换行了。如果需要可编辑的div，可以按照如下方法：
```vue
<div @input="value = $event.target.innerText" contenteditable="true" style="word-break: break-all;">{{ value }}</div>
```
加上break-all可以强制让单词换行，以免破坏结构。