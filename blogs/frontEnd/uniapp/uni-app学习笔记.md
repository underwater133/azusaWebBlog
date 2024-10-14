---
title: uni-app学习笔记
date: 2024-10-14
tags:
 - 前端
 - uni-app
categories: 
 - 前端随笔
sidebar: 'auto'
---

## 生命周期
分为页面生命周期和组件生命周期。

uni-app中的页面，默认保存在工程根目录下的pages目录下。 每次新建页面，均需在pages.json中配置pages列表；未在pages.json -> pages 中注册的页面，uni-app会在编译阶段进行忽略。

通俗的将页面就是我们所看到的一整个页面，里面可能包含了许多组件，页面需要在pages.json中进行注册。

**页面生命周期**除了支持Vue2和Vue3的生命周期，还有自己的一些生命周期，如onInit、onLoad、onShow、onReady、onHide等等，这些生命周期在不同平台的终端下可能存在兼容性问题，需要注意，使用方法如下：
```vue
<script setup>
import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'
const title = ref('Hello')
onReady(() => {
  console.log('onReady')
})
</script>
```

而**组件生命周期**基本于Vue3的生命周期一致，调用页面特有的生命周期不生效。

### 页面与组件生命周期的执行顺序


## 页面调用接口
### getApp
getApp() 函数用于获取当前应用实例，一般用于获取globalData。也可通过应用实例调用 App.vue methods 中定义的方法。
```vue
// App.vue
<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
    globalData: {
      // ...你的全局数据
      name: 'zhangsan'
    },
    methods: {
      myGlobalMethod: function(params) {
        // ...你的方法逻辑
        console.log('globalConsole', params)
      }
    }
  }
</script>

// 页面or组件
const app = getApp()
app.myGlobalMethod('123')
console.log(app.globalData.name);
```

### getCurrentPages
getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，数组中的元素为页面实例，第一个元素为首页，最后一个元素为当前页面。

## 页面通讯
比较简单，类似Vue2的全局bus事件，就4个方法：`uni.$emit`、`uni.$on`、`uni.$off`、`uni.$once`。

用on注册监听后需要注意用off销毁，如果**只是监听一次**，则直接使用once方法，无需再用off销毁。

## 条件编译