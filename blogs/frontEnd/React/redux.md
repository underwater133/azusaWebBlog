---
title: Redux
date: 2023-12-07
tags:
 - 前端
 - React
 - Redux
categories: 
 - React
sidebar: 'auto'
---

## 什么是Redux
Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

## 为什么要用Redux
1. 集中式存储和管理应用的状态；
2. 处理组件通讯问题时，无视组件之间的层级关系；
3. 简化大型复杂应用中组件之间的通讯问题；
4. 数据流清晰，容易定位bug。

## 核心概念

### store
**仓库，Redux 的核心，整合 action 和 reducer。**

特性：
1. 一个应用只有一个 store
2. 维护应用的状态，获取状态：store.getState()
3. 创建 store 时接收 reducer 作为参数：const store = createStore(reducer)
4. 发起状态更新时，需要分发 action：store.dispatch(action)

其他 API， — 订阅(监听)状态变化：const unSubscribe = store.subscribe(() => {}) — 取消订阅状态变化： unSubscribe()

### action

**动作，描述了有事情发生了这一事实，并没有描述应用如何更新 state。**
特性：
1. 只描述做什么
2. JS 对象，必须带有 type 属性，用于区分动作的类型
3. 根据功能的不同，可以携带额外的数据，配合该数据来完成相应功能
```js
{ type：'increment' }
{ type：'decrement', count： 2 }
{ type: 'addN', payload: {name:'吃饭',age:18} }
// 一般通过一个函数来返回一个 action，这个函数也就是 action 构建器
```


**异步action**
```js
// 来看一下我们写的第一个 thunk action 创建函数！
// 虽然内部操作不同，你可以像其它 action 创建函数 一样使用它：
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {

  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。

  return function (dispatch) {

    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。

    dispatch(requestPosts(subreddit)) // 下发开始请求的action

    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。

    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。

    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(
        response => response.json(),
        // 不要使用 catch，因为会捕获
        // 在 dispatch 和渲染中出现的任何错误，
        // 导致 'Unexpected batch number' 错误。
        // https://github.com/facebook/react/issues/6895
         error => console.log('An error occurred.', error)
      )
      .then(json =>
        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。

        dispatch(receivePosts(subreddit, json)) // 下发接受到数据的action
      )
  }
}
```


### reducer

**一个函数，用于初始化状态、修改状态，根据传入的旧状态和action，返回新状态。**

公式：(previousState, action) => newState
```js
const reducer = (state = 0, action) => {
 switch (action.type) {
  case 'add':
   // 返回新的state
   return state + 1
  case 'addN':
   // 返回新的state
   return state + action.payload
  default:
   return state
 }
}
```

## 三大原则
### 单一数据源
整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

### State 是只读的

唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。

### 使用纯函数来执行修改

为了描述 action 如何改变 state tree ，你需要编写 reducers。

## 数据流

1. 调用 store.dispatch(action)。
2. Redux store 调用传入的 reducer 函数。

3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
    ```js
    // Redux 原生提供combineReducers()辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。
    function todos(state = [], action) {
      // 省略处理逻辑...
      return nextState
    }

    function visibleTodoFilter(state = 'SHOW_ALL', action) {
      // 省略处理逻辑...
      return nextState
    }

    let todoApp = combineReducers({
      todos,
      visibleTodoFilter
    })
    ```
4. Redux store 保存了根 reducer 返回的完整 state 树。

代码示例：
```js
import { createStore } from 'redux'

initState = 0
function reducer(state = initState, action) {
 return state
}
// 创建 store，传入reducer
const store = createStore(reducer)

// store获取状态
console.log(store.getState())

// 更新状态
//  1. dispatch 派遣，派出。表示：分发一个 action，也就是发起状态更新
//  2. store.dispatch会 调用reducer函数，并将action传递给reducer
const action1 = { type:'addN', payload: 12 }
store.dispatch(action1)

const action2 = { type:'add', payload: 1 }
store.dispatch(action2)

// store 添加订阅者
// store.subscribe
// 订阅者：就是一个函数，当state值变化时，store会执行它
const unSubscribe = store.subscribe(() =>; {
 // 状态改变时，执行相应操作
 console.log('数据变化了....')
})

// 取消监听状态变化
unSubscribe()
```

## 搭配React

### 代码结构
```js
+src
 +actions // 存储分发的事件
	index.js
 +components // 展示组件
	App.js
	Footer.js
	Link.js
	Todo.js
	TodoList.js
 +containers // 容器组件 将redux和react展示组件结合在一起
	AddTodo.js // 在App.js直接用
	FilterLink.js
	VisibleTodoList.js // 在App.js直接用
 +reducers // 事件处理过程
	index.js // 合并所有reducer
	todo.js
	visibilityFilter.js
 index.js // 引入 reducer 来创建 store，再用 Provider 注入到 App 中
```

### 展示组件

这些组件只定义外观并不关心数据来源和如何改变。传入什么就渲染什么。如果你把代码从 Redux 迁移到别的架构，这些组件可以不做任何改动直接使用。它们并不依赖于 Redux。

### 容器组件
描述如何运行，直接使用redux，数据来源于redux（监听redux  state），通过向redux分发actions来修改数据

**connect**
技术上讲，容器组件就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。你可以手工来开发容器组件，但建议使用 React Redux 库的 connect() 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。



1. mapStateToProps
```js
// 使用 connect() 前，需要先定义 mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中。例如，VisibleTodoList 需要计算传到 TodoList 中的 todos，所以定义了根据 state.visibilityFilter 来过滤 state.todos 的方法，并在 mapStateToProps 中使用。
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```

2. mapDispatchToProps
```js
// 除了读取 state，容器组件还能分发 action。类似的方式，可以定义 mapDispatchToProps() 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法。例如，我们希望 VisibleTodoList 向 TodoList 组件中注入一个叫 onTodoClick 的 props ，还希望 onTodoClick 能分发 TOGGLE_TODO 这个 action：
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}
```