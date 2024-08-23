---
title: vue知识点查漏补缺
date: 2024-08-22
tags:
 - 前端
 - Vue
categories: 
 - 前端随笔
sidebar: 'auto'
---
# 前言
本篇是我阅读Vue3官方文档时，记录的一些自己比较薄弱的知识点，后续可能会有补充~

## 代码复用
封装组件、插槽、mixin、组合式函数（vue3、纯逻辑）、自定义指令

作用域插槽：可以在子组件中向父组件传递参数，如果是默认插槽，使用方式如下：
```vue
// parent
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
	<MyComponent v-slot="slotProps"> // 默认插槽，使用v-slot="slotProps"来接收参数
    // 在插槽中展示子组件传递过来的值
  	{{ slotProps.text }} {{ slotProps.count }}
  </MyComponent>
</template>

// component
<script setup>
const greetingMessage = 'hello'
</script>

<template>
  <div>
		123
		<hr />
  	<slot :text="greetingMessage" :count="1"></slot>
	</div>
</template>
```
如果是具名插槽，则需要带上名字，且存在各自的作用域
```vue
// parent
<MyComponent>
  <template #header="headerProps"> // name为hearder
    {{ headerProps }}
  </template>

  <template #default="defaultProps"> // defalut代表默认插槽
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
    // headerProps、defaultProps 在此处访问不到
  </template>
</MyComponent>

// component
<script setup>
const greetingMessage = 'hello'
</script>

<template>
  <div>
		<slot name="header" :count="0"></slot> // name字段代表插槽名称，不能用来传递信息
		component
		<hr />
  	<slot :text="greetingMessage" :count="1"></slot>
		<br />
		<slot name="footer" :count="2"></slot>
	</div>
</template>
```
如果不需要渲染视图，只需要复用逻辑，可以使用组合式函数来代替无渲染组件（没有渲染视图的组件），不会带来额外组件嵌套的开销。


## 性能优化
[https://cn.vuejs.org/guide/best-practices/performance.html](https://cn.vuejs.org/guide/best-practices/performance.html)
### 页面加载优化
1. 选用正确的架构（纯客户端渲染存在首屏加载缓慢的问题，这可以通过服务器端渲染 (SSR) 或静态站点生成 (SSG) 来缓解）
2. 减少包体积、tree-shaking、代码压缩（gzip）
3. 路由懒加载
4. 代码分割（按需加载）
5. 把组件按组分块（打包配置）

### 页面更新优化
1. 使用内置指令v-once（只渲染一次，后续更新跳过）v-memo（指定依赖项，依赖项不变则跳过渲染）
2. 优化计算属性的稳定性，从 3.4 开始，计算属性**仅在其计算值较前一个值发生更改时才会触发副作用**，即不是以前的依赖项改变则触发更新，但如果返回值是**新建的对象**则不起作用（可以通过手动比较新旧值，如果不变可以返回旧的对象，也不会触发更新）

### 通用优化
1. 大型虚拟列表（只渲染用户视口中能看到的部分），可以使用相关库
2. 减少大型不可变数据的响应性开销（使用 shallowRef() 和 shallowReactive() 来绕开深度响应。浅层式 API 创建的状态只在其顶层是响应式的，对所有深层的对象不会做任何处理。这使得对深层级属性的访问变得更快，但代价是，只能通过替换整个根状态来触发更新）
3. 避免不必要的组件抽象（为了逻辑抽象创建太多组件实例将会导致性能损失）

## 修饰符
1. 事件修饰符（.prevent、.capture、.stop、.self、.once、.passive（让默认行为立即发生））
2. 按键修饰符（.enter等）
3. 鼠标按键修饰符(.left、.right、.middle)

v-model上的修饰符：.lazy、.number、.trim

## defineXXX
一些常用的编译宏命令， 在```<script setup>```中不需要导入就能直接使用。如果没有在```<script setup>```中使用的有另外的写法，具体看官方文档。
1. 使用了```<script setup>```的组件是默认私有的：一个父组件无法访问到一个使用了```<script setup>```的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露：
    ```vue
    <script setup>
    import { ref } from 'vue'

    const a = 1
    const b = ref(2)

    // 像 defineExpose 这样的编译器宏不需要导入
    defineExpose({
      a,
      b
    })
    </script>
    //当父组件通过模板引用获取到了该组件的实例时，得到的实例类型为 { a: number, b: number } (ref 都会自动解包，和一般的实例一样)。
    ```
2. defineProps 用于接收父组件传递进来的参数：
    ```vue
    <script setup>
    defineProps(['title'])
    </script>

    <template>
      <h4>{{ title }}</h4>
    </template>
    ```
3. defineEmits用于抛出事件， 让父组件接收。
    ```vue
    <script setup>
    const emit = defineEmits(['enlarge-text'])

    emit('enlarge-text')
    </script>
    ```

## 组件v-model
[https://cn.vuejs.org/guide/components/v-model.html](https://cn.vuejs.org/guide/components/v-model.html)
v-model 可以在组件上使用以实现双向绑定。
从 Vue 3.4 开始，推荐的实现方式是使用 defineModel() 宏：
```vue
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>
```
父组件可以用 v-model 绑定一个值：
```vue
<!-- Parent.vue -->
<Child v-model="countModel" />
```
defineModel() 返回的值是一个 ref。它可以像其他 ref 一样被访问以及修改，不过它能起到在父组件和当前变量之间的双向绑定的作用：
+ 它的 .value 和父组件的 v-model 的值同步；
+ 当它被子组件变更了，会触发父组件绑定的值一起更新。
defineModel 是一个便利宏，在3.4之前需要用props和emits来实现。

## 路由
history和hash模式的区别：
1. URL 显示:
  + hash 模式: URL 中的 # 符号后面跟着路由的路径，例如 http://example.com/#/home。这种方式利用了浏览器的 hash 特性，即使刷新页面，URL 中的 hash 部分也不会改变，因此路由状态可以保持。#可能会影响用户体验。
  + history 模式: URL 看起来像传统的多页面应用，例如 http://example.com/home。这种方式使用 HTML5 的 History API 来实现无刷新的页面跳转。
2. 浏览器历史交互:
  + hash 模式: 浏览器的历史记录是基于 URL 的 hash 部分的（监听**hashChange事件**来替换组件），因此当用户点击浏览器的前进或后退按钮时，对应的hash会修改，进而展示不同的组件。
  + history 模式: 使用 HTML5 的 **History API**（ pushState() 和 replaceState() 和一个事件onpopstate监听URL变化），浏览器的历史记录会记录每个路由的状态，用户点击前进或后退按钮时，页面不会重新加载，而是通过 Vue Router 来处理路由的切换。
3. 服务器配置:
  + hash 模式: 由于 URL 中包含 #，变化的只有后面的哈希值，实际请求的都是同一个路径，服务器无需做额外的配置，由 Vue Router 来处理路由。
  + history 模式: 需要服务器配置以支持 HTML5 History 模式。**服务器需要配置路由重写规则，将所有请求重定向到 index.html**，然后由 Vue Router 来处理。否则刷新后因为服务器没有对应的资源会报404。
4. SEO（搜索引擎优化）:
  + hash 模式: 由于 URL 中的 # 符号，搜索引擎可能不会很好地索引这些页面，对 SEO 不太友好。
  + history 模式: 更符合传统网站的 URL 结构，对 SEO 更友好。

## Pinia
[https://pinia.vuejs.org/zh/core-concepts/](https://pinia.vuejs.org/zh/core-concepts/)

1. 支持vue2和vue3，即可以支持选项式和组合式（setup）两种写法和用法，但vue2需要额外的插件。
2. 对比Vuex，废除了冗余的mutation。
3. 没有module概念，可以说每个store都是一个模块，例如用户模块是一个store实例，菜单模块也是一个store实例。store之间可以互相访问。
4. 只有state、getter和action。对应vue组件中的data、computed和method，更容易上手。
5. getter和action都可以通过this来访问整个store实例、且action是可以异步的。
6. 在写法上setup方式（组合式）支持更多功能，可以使用vue3中的所有选项式API。而选项式写法则结构更加清晰。
7. 在用法上setup方式也更加方便，选项式在使用时需要额外的映射辅助函数（mapState、mapActions）!
8. state和action都拥有订阅函数来跟踪变化。可以通过 store 的 **$subscribe()** 方法侦听 state 及其变化。比起普通的 watch()，使用 $subscribe() 的好处是 subscriptions **在 patch 后只触发一次**。可以通过 store.**$onAction()** 来监听 action 和它们的结果。并且可以编写action调用前、 promise 解决之后、出现错误时的回调函数，有利于追踪问题。
9. 插件系统，可以对store进行扩展，例如为每个创建的 store 添加新的属性、把store持久化到localstorage等等。

### Vue3的全局ref和Pinia如何选择
标题的意思是，在Vue3中，一个简单的js文件，暴露出一个ref即可做到全局共享，那为什么还需要使用Pinia这些状态管理工具呢？

首先来看下如何实现全局共享ref，简单代码如下：
```js
import {ref} from 'vue';

export const theme = ref('blue');

export const changeTheme = (t) => {
  theme.value = t;
};
```
一开始看到这个可能你会想到自定义hook，具体可以看我另一篇文章[vue3组合式函数复用逻辑](/frontEnd/vue3组合式函数复用逻辑.html)。
但其实是不一样的，自定义hook每次返回的都是一个新的函数，一般变量定义在函数内的，相互不影响。
而这段代码在不同的组件调用，类似一个闭包，能够保持其状态的一致性和响应性，并且写起来也非常简单。

最近看到的一个观点我比较认同，总结了一下就是这两者最好都少用，轻度使用选择共享ref，而像Pinia这种状态管理工具应该作为兜底的选择。

为什么说要少用呢？不管是共享ref还是全局状态管理，随着项目的发展复杂度越来越高，会出现耦合度高和不知道在哪里修改了状态的情况，在出现问题的时候难以追踪。所以在设计的阶段就应该尽量保持变量的私有化，组件各自管理自己的变量，减少耦合度，在少量需要全局共享的情况下可以使用共享ref，如果有大量需要共享的需要考虑设计是否合理或者使用Pinia来进行管理。

当然这是从设计方面来讲的，在多人协作的项目中，最好还是使用Pinia来进行管理，全局状态一目了然，也有比较规范的写法，有利于不同的人理解代码。如果是个人的小项目，使用共享ref在大多数情况下也是够用了。

当然使用全局ref也会带来一些麻烦，比如在调试时无法获得热更新和状态追踪的能力等等，但也有解决方法（刷新和console大法好doge）。

此外，少用Pinia这类工具也有利于我们思考组件之间的关系，更容易设计出耦合度低的方案。