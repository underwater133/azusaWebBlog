---
title: 常用Hooks之useMemo
date: 2023-12-04
tags:
 - 前端
 - React
 - Hooks
categories: 
 - React
sidebar: 'auto'
---

# useMemo(calculateValue, dependencies)
学过 Vue 的应该能够很快上手这个 Hook，因为他和 Vue 的 computed（计算属性）之间相似度很高，就是用来缓存经过复杂计算的值。

useMemo 第一个参数需要传入的就是一个计算函数，而第二个参数是依赖项。到这里大家也能明显感觉到 React 和 Vue 之间风格的不同了。不过不得不说，Vue 在优化方面做的很好，我们不需要手动声明依赖项，他会自动帮我们收集，自然也会避免了许多会遇到的问题。

那么 React 是怎么确定依赖项是否变化的呢？其实他们使用了一个方法，就是 Object.is，除了在这个 Hook 中，在 useEffect 或者在 memo 中判断 props 是否有变化等，都是使用了这个方法来判断，既然说到这里了也顺带讲一下 Object.is。

Object.is() 方法用于判断两个参数是否相等。它会比较两个值的类型和值，只有当两个值的类型和值都相等时，才返回 true，否则返回 false。

别看他很简单，有时也会带来你意想不到的结果，至于为什么我们待会再说~


## 用法
1. 跳过代价昂贵的重新计算
2. 跳过组件的重新渲染
3. 记忆另一个 Hook 的依赖
4. 记忆一个函数

### 跳过代价昂贵的重新计算
这个通过字面意思就很好理解，其实就相当于你之前都需要调用一个函数来计算一个值，但是有了 useMemo，你就可以把这个函数作为参数传给 useMemo，再确定好依赖项，就能够在依赖项发生变化时，自动调用函数来更新，否则每次使用上次计算得到的值，可以跳过代价昂贵的重新计算。

我们来个例子，你就能明白它的好处了，首先是不使用 useMemo 的：
```js
function TestMemo(props) {
    const [keyword, setKeyword] = useState('')
    const [dialogVisible, setDialogVisible] = useState(false)

    const getShowList = () => {
        console.log('noUseMemo')
        if (!keyword) {
            return props.dataList
        }
        return props.dataList.filter(item => item.name.includes(keyword))
    }
    return (
        <>
            <input value={keyword} onInput={(e) => setKeyword(e.target.value)}></input>
            <div>
                {getShowList().map(item => <div key={item.id}>{item.name} <button onClick={() => setDialogVisible(true)}>操作</button></div>)}
            </div>
            {dialogVisible ? <div>dialog <button onClick={() => setDialogVisible(false)}>关闭dialog</button></div> : null}
        </>
    )
}

function App() {
    const [list, setList] = useState([{id: 1, name: 'test1'}, {id: 2, name: 'test2'}, {id: 3, name: 'test3'}, {id: 4, name: 'test4'}])
    return (
        <>
            <TestMemo dataList={list}/>
        </>
    )
}
```
一个很常见的表单操作流程，支持通过 keyword 过滤，然后渲染出来的每一行都带有操作按钮，点击按钮可以打开对话框。

现在问题来了，如果你不使用 useMemo，而是通过一个函数去过滤 keyword，那么当组件触发重新渲染时，即使 keyword 没有修改，也会去重新进行过滤。比如当你打开或者关闭对话框时，dialogVisible 一修改，整个组件重新渲染，也就需要重新去过滤了。

当然，并不是说这么做是错的，而是可以有更好的办法，如果说你不用 useMemo 功能就无法实现了，那应该是本身设计有问题，官方也说了 useMomo 是作为一个优化的手段来的，而不是必须的。

那么接下来就来看使用了 useMemo 的效果吧：
```js
function TestMemo(props) {
    const [keyword, setKeyword] = useState('')
    const [dialogVisible, setDialogVisible] = useState(false)
    const showList = useMemo(() => { // 记忆化 将计算部分丢进来
        console.log('useMemo')
        if (!keyword) {
            return props.dataList
        }
        return props.dataList.filter(item => item.name.includes(keyword))
    }, [keyword, props.dataList])

    return (
        <>
            <input value={keyword} onInput={(e) => setKeyword(e.target.value)}></input>
            <div>
                {showList.map(item => <div key={item.id}>{item.name} <button onClick={() => setDialogVisible(true)}>操作</button></div>)}
            </div>
            {dialogVisible ? <div>dialog <button onClick={() => setDialogVisible(false)}>关闭dialog</button></div> : null}
        </>
    )
}
```
通过 useMemo，只有在依赖项发生改变时，才会重新渲染列表，其他无关的操作都不会影响，在这个例子中即使打开和关闭对话框，都不会重新渲染列表。在数据量小的时候可能效果不明显，如果数据量大加上过滤过程复杂，那么这个优化是非常有必要的。


### 跳过组件的重新渲染
学习这一点之前，我们需要先了解一个知识点：**默认情况下，当一个组件重新渲染时，React 会递归地重新渲染它的所有子组件。**

也就是说，即使传给子组件的参数没有任何变化，只要父组件重新渲染了，那么子组件也会重新渲染，这一点并不是必要的，也是可以优化的。通常需要搭配**memo**这个 API 来实现。这里简单介绍一下，就是包装在这个方法中的组件，通常情况下，只要该组件的 props 没有改变，这个记忆化版本就不会在其父组件重新渲染时重新渲染。

通过这一点我们可以再次对列表渲染进行优化：
```js
const TestMemo = memo(function TestMemo(props) {
    // ...
})
```
非常简单，这样子当父组件重新渲染而 props 没有变化时，子组件就不会重新渲染。
官方给的例子是将一个 每次重新渲染都会发生改变的值 作为参数传递给子组件来作为例子，这样子，即使你子组件外面包装了 memo，但是每次父组件重新渲染时，props 都会改变，那么这个记忆化是无效的。

所以需要给 props 使用上 useMemo（官方给的例子中，这个 prop 也是通过一个函数计算得到的），**通过 useMemo 和 memo 的组合，就能够跳过组件的重新渲染**（官方应该就是想突出这一点）。

到这里你可能会想到，函数组件也类似一个计算函数，并且返回 jsx，那么可不可以在函数组件上使用 useMemo 呢？

答案是可以的，直接在父组件中，将子组件的 JSX 丢到 useMemo 中，同时将传入的 props 作为依赖项：
```js
function App() {
    const [list, setList] = useState([{id: 1, name: 'test1'}, {id: 2, name: 'test2'}, {id: 3, name: 'test3'}, {id: 4, name: 'test4'}])
    const children = useMemo(() => <TestMemo dataList={list} />, [list])
    return (
        <>
            {/* <TestMemo dataList={list}/> */}
            {children}
        </>
    )
}
```

这个效果和上面使用 memo 包装函数组件是完全一样的，但手动将 JSX 节点包装到 useMemo 中并不方便，比如你不能在条件语句中这样做。这就是为什么通常会选择使用 memo 包装组件而不是使用 useMemo 包装 JSX 节点。

### 记忆另一个 Hook 的依赖
这个直接用官方给的例子吧，比较简单，但是容易被忽略。
```js
function Dropdown({ allItems, text }) {
  const searchOptions = { matchMode: 'whole-word', text };

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // 🚩 提醒：依赖于在组件主体中创建的对象
  // ...
}
```
相信大家很快就发现了问题，searchOptions 在每次渲染后都是不同的，因为对象存的其实是引用的地址，对应地址存的才是具体的内容。还记得上面说的 Object.is 么，在这种情况下每次判断的结果都是 false，那么 visibleItems 这个记忆化就是无效的。

那么解决方法也很简单，因为 searchOptions 依赖于 text，那么把 searchOptions 也记忆化也就解决问题了。

但是仔细观察后我们发现，其实可以把 searchOptions 这一部分放到 visibleItems 中，就不用使用两次 useMemo 了：
```js
function Dropdown({ allItems, text }) {
  const visibleItems = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ 只有当 allItems 或者 text 改变的时候才会重新计算
  // ...
}
```

### 记忆一个函数
函数其实本质也是对象，所以如果当你想把一个函数传递给子组件时，也需要用 useMemo 进行包装，否则每次创建新的函数导致子组件记忆化失效，下面看一个例子：
```js
export default function Page({ productId, referrer }) {
  const handleSubmit = useMemo(() => {
    return (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails
      });
    };
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```
把提交表单的函数传递给 Form 组件，通过记忆化，可以在依赖项不发生改变时，Form 组件无需重复渲染，这里需要注意的一点是，useMemo 第一个参数的返回值应该也是一个函数。

这看起来很笨拙！记忆函数很常见，React 有一个专门用于此的内置 Hook。将你的函数包装到 useCallback 而不是 useMemo 中，以避免编写额外的嵌套函数：
```js
export default function Page({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```
嗯嗯，看起来简便了许多。从中我们也可以窥见 useCallback 的大致作用，就是用来记忆函数，像是一个语法糖，让我们使用更加简便。

此外再提两个容易忽略的点，第一个是如果使用 useMemo 没有填写第二参数的依赖项，那么在每次重新渲染时都将调用第一个参数的函数进行重新计算；第二个则是只能在组件的顶层 或者自定义 Hook 中调用它。你不能在循环语句或条件语句中调用它。如有需要，将其提取为一个新组件并使用 state。这两个比较好理解我也不多说了，一般不会这么写。

好了，本次 useMemo 就学习到这里啦~想了解更多请参考[官网](https://react.docschina.org/reference/react/useMemo)。