---
title: vue3组合式函数复用逻辑
date: 2024-08-19
tags:
 - 前端
 - Vue
 - 逻辑复用
 - websocket
categories: 
 - 前端随笔
sidebar: 'auto'
---
## 前言
在开发过程中，我们经常在不同地方使用相同的逻辑的代码，新手还在一顿ctrl cv，而老手已经在开始封装了（doge）

封装也不是一件很高级的事，例如一个转换时间格式函数也是一种封装，但这种是**无状态逻辑**的函数，它在接收一些输入后立刻返回所期望的输出。

而本次要介绍的**组合式函数**则是**有状态逻辑**的函数，他是利用 Vue 的组合式 API 来封装的，瞬间就高级起来了。

## 案例
直接上例子，正巧最近做的项目中用到了websocket，正好拿来练练手，目标就是抽出一个可以用来初始化websocket，并且带有默认的配置，在组件卸载和页面刷新的时候能自动关闭websocket的函数。
```js
// use-websocket.js
import { onMounted, onUnmounted } from "vue";

let websocket = null
const default_config = {
  url: '',
  onopen: () => {
    console.log('websocket连接成功')
  },
  onmessage: (e) => {
    console.log('websocket接收到消息', e)
  },
  onerror: (e) => {
    console.log('websocket连接错误', e)
  },
  onclose: () => {
    console.log('websocket连接关闭')
  }
}

export const useWebsocket = () => {
  const initWebsocket = (config = {}) => {
    destroy()
    config = {...default_config, ...config}
    websocket = new WebSocket(config.url)
    websocket.onopen = config.onopen
    websocket.onmessage = config.onmessage
    websocket.onerror = config.onerror
    websocket.onclose = config.onclose
  }
  const sendMessage = (message) => {
    if (websocket && websocket.readyState === websocket.OPEN) {
      websocket.send(message)
    }
  }
  const destroy = () => {
    if (websocket && websocket.readyState !== websocket.CLOSED) {
      websocket.close()
      websocket = null
    }
  }
  
  const handleBeforeUnload = () => {
    destroy()
  }

  onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
  })

  onUnmounted(() => {
    destroy()
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })
  return {
    initWebsocket,
    sendMessage
  }
}
```
使用：
```vue
<template>
  <div>
    <button @click="init">初始化websocket</button>
    <br />
    <input v-model="input" />
    <button @click="sendMessage(input)">发送消息</button>
    <div>接收消息：
      <br />
      {{text}}
    </div>
  </div>
</template>

<script setup>
import {useWebsocket} from "../hooks/use-websocket";
import {v4 as uuidv4} from "uuid";
import { ref } from 'vue'

const input = ref('')
const text = ref('')
const { initWebsocket, sendMessage } = useWebsocket()

const init = () => {
  const base = 'ws://localhost:3000'
  // 接收的信息展示到页面
  const onmessage = (event) => {
    console.log('onMessage', event.data)
    text.value = event.data
  }
  const config = {
    url: base + '/websocket/' + uuidv4(),
    onmessage
  }
  initWebsocket(config)
}
</script>

```
通过代码可以看出，经过简单的封装之后，websocket使用起来已经非常简单，只需要传入最基本的配置，也不用去管卸载组件或者页面刷新时有没有关闭websocket，或者创建了重复的实例，有需求的话监听函数也可以自定义。

在本例子中，用到的组合式API只有onMounted和onUnMounted，用于添加和移除监听器，其实这个也可以封装成组合式函数，官方例子中就有，使用起来也更加方便。这里我就直接贴官方代码了（绝对不是因为我懒）：
```
// event.js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  // 如果你想的话，
  // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}

// 使用
useEventListener(window, 'mousemove', (event) => {
  x.value = event.pageX
  y.value = event.pageY
})
```

心细的小伙伴可能看出来，这个组合式函数命名的方式是useXXX，看起来和React中的hooks类似，这其实是官方推荐的约定，也确实借鉴了React的一部分灵感。虽然实现的方式不同，但对于我们开发者来说，不同框架有着类似的命名方式以及逻辑能力，也可以让我们更快上手。

## 简单的总结
总之，vue3的组合式函数就是可以利用一些组合式API来管理状态的函数，并且可以在组合式函数中调用其他组合式函数，用于复用逻辑，减少代码量以及简化代码组织。在vue2中，如果要达到类似的效果需要使用mixin，相比之下mixin有一些短板，如不同的mixin互相调用，出现问题会难以溯源等，官方也推荐在vue3中使用组合式函数来代替mixin。

如果想了解更多关于vue3组合式函数信息，可以查阅[官方文档](https://cn.vuejs.org/guide/reusability/composables.html)。

如果有什么问题欢迎讨论~