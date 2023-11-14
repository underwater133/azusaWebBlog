---
title: 常用Hooks之useState
date: 2023-11-14
tags:
 - 前端
 - React
 - Hooks
categories: 
 - React
---
# 前言
最近在学习 React 中常用 Hooks 的一些用法。学习下来感觉和隔壁 Vue3 的 Composition API 风格类似，只在需要的时候使用，可以更加灵活的组织代码和减少打包体积。
在阅读 Vue3 官网相关信息后，发现 Vue3 也确实是借鉴了 React Hooks，并且设计出了使用更加方便的组合式API，比如 setup 中的代码只执行一遍，不像 React 一样每次依赖更新都会重新跑一遍代码，还有 Vue3 会自动收集依赖等，更多差别可以在[Vue官网](https://cn.vuejs.org/guide/extras/composition-api-faq.html#comparison-with-react-hooks)详细了解。

# useState(initialState)
用法：
```js
function Counter() {
  const [counter, setCounter] = useState(0)
  return (
    <button onClick={() => setCounter(counter + 1)}>
      {counter}
    </button>
  )
}
```
用法看起来非常简单，传入一个任意类型的初始状态值，useState 会返回一个数组，分别是变量变量的修改（set）函数。
但是，其中也有许多值得注意的点：
1. 初始状态值为函数；
2. 调用 set 函数 不会 改变已经执行的代码中当前的 state；
3. 传递更新函数和直接传递下一个状态之间的区别；
4. 更新状态中的对象和数组
5. 重置状态
  
我们一点一点来讲，首先是第一点，**初始状态值为函数**，那么这个函数必须是纯函数（也就是没有副作用），该函数的返回值作为变量的初始状态。而这个函数也只在第一次渲染的时候调用，后续渲染变量将会取上一个状态的值，而无视该函数。
这里也要额外注意一下，上面说的只在第一次渲染的时候调用，是我们传入了一个函数，而不是将 函数执行后的结果 作为参数传递进去，例如：
```js
function initialCounter() {
    console.log('调用初始化函数了')
    return 0
}
// const [counter, setCounter] = useState(initialCounter()) // 每次渲染都会调用，但不影响 counter 的值
const [counter, setCounter] = useState(initialCounter) // 只有在初始渲染时调用
```
看起来就算将 函数执行后的结果 作为参数传递进去也无伤大雅，结果都是一样的，但如果初始化函数非常复杂呢？在每次渲染时都调用无疑是浪费时间浪费资源也起不到任何作用。

第二点也是比较坑的一点，如果你在修改状态之后立马打印该变量，打印的结果仍然是未修改之前的状态，也就是说，**在下一次渲染之前，该变量的状态是永远不会改变的**，这一点也和第三点密切相关。
```js
function Counter() {
    const [counter, setCounter] = useState(0)
    function handleClick() {
        setCounter(counter + 1)
        console.log(counter) // 打印的是上一个状态而不是修改后的
    }
    return (
        <button onClick={handleClick}>
            {counter}
        </button>
    )
}
```

在讲第三点之前，我们先来看个例子：
```js
function Counter() {
    const [counter, setCounter] = useState(0)
    function handleClick() {
        setCounter(counter + 1)
        setCounter(counter + 1)
        setCounter(counter + 1)
    }
    return (
        <button onClick={handleClick}>
            {counter}
        </button>
    )
}
```
直观的意思是每次点击按钮，计数器的值 +3，但实际上每次点击之后，计数器的值仅仅是 +1，这就是刚刚讲到的第二点所导致的原因，这 3 个 set 函数中，取到的 counter 的值都是同一个，那么修改之后的值自然也是想同的。

这就有点棘手了，好在官方也给出了解决方法，那就是 **传递更新函数**，就像这样：
```js
function handleClick() {
    setCounter(counter => counter + 1)
    setCounter(counter => counter + 1)
    setCounter(counter => counter + 1)
}
```
看起来也很好理解，就是教它怎么更新，虽然函数体的内容和之前修改 下一个状态 的内容相同，但由于传入的是一个函数，React 会特殊对待这个函数。
React 将更新函数放入 队列 中，然后，在下一次渲染期间，它将按照相同的顺序调用它们。
这样结果就很清晰明了了，因为在渲染期间会调用更新函数，使得 counter 的状态发生改变，下一次取到的也是最新的状态值，而不是 过时 的。

那么是否一定要使用传递更新函数的写法呢？不一定，在了解了 传递更新函数 和 传递下一个状态 之间的区别之后，我们可以判断，在点击按钮（或是在需要更新一些状态时），如果每次获取都需要最新的状态，那么使用传递更新函数的方式，否则可以使用传递下一个状态的方式。

第四点也不难理解，**React 认为状态是只读的，就是不能对他直接进行修改，而是以一个新的状态去替换它**，这里和 Vue 的设计理念就有所不同了，拿 Vue3 的组合式 API来说，我们是不能直接拿新的对象和数组去替换原来的值的，这样会导致其失去响应式。回到 React 上，用新的状态去替换，我们也要用到旧的状态得到新的再进行替换：
```js
// 官网的例子
const [form, setForm] = useState({
  firstName: 'Barbara',
  lastName: 'Hepworth',
  email: 'bhepworth@sculpture.com',
});
// 修改 email
setForm({
  ...form,
  email: '123@qq.com'
})
```
清楚这一理念之后也就知道怎么修改了，对于数组也是同样的做法，不修改原状态，而是利用原状态得到一个新的状态之后再整体替换。

第五点重置状态，和数组元素拥有 key 一样，组件也可以拥有，并且当 key 值发生变化时，组件内的状态都会重置，这一点需要注意，一般都是结合业务需求才会用上吧。
```js
<Counter key={key} />
```

useState 就学到这里了，本来想把常用的都整合在同一篇文章中，没想到一个 useState 需要注意的点这么多，还是分篇记录吧。还有一些比较不常见的问题，可以在[官网](https://react.docschina.org/reference/react/useState)详细阅读。