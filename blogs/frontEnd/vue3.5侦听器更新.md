---
title: vue3.5侦听器更新
date: 2024-09-25
tags:
 - 前端
 - Vue
categories: 
 - 前端随笔
sidebar: 'auto'
---

今天来看下 Vue3.5 版本对于侦听器的更新。

## deep配置支持层级
3.5版本更新后，deep不止可以配成 true 或者 false，还能配置数字类型，层级从1开始（测试写0和写1的效果一致）。
```js
interface dataInterface {name:String, age: number, frends: String[]}
const data = reactive<dataInterface>({
  name: 'zhangSan',
  age: 18,
  frends: []
})

watch(data, (newValue) => {
  console.log(newValue)
}, { deep: 2 } )

let index = 0
const timer = setInterval(() => {
  index++
  data.frends.push(index.toString())
  if(index >= 5) {
    clearInterval(timer)
    data.age = 19
  }
},2000)
```
如果这里配成2的话，对frends数组中增删元素就不会触发侦听器啦，除非把整个数组替换。

这个功能还是比较实用的吧，因为watch默认是深层监听，如果数据结构非常复杂的话开销还是挺大的，在只需要监听浅层数据的情况下可以自由控制层数，颗粒度更小了。

## onWatcherCleanup()
这个函数是为了清理watch和watchEffect的副作用，但其实在此之前已经有`onCleanup`了，说实话用处不是很大，只是选择用哪个的问题，贴一下官方的例子和使用对比：
```js
// onWatcherCleanup
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})

// onCleanup
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})
```