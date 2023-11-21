---
title: 常用Hooks之useEffect
date: 2023-11-17
tags:
 - 前端
 - React
 - Hooks
categories: 
 - React
sidebar: 'auto'
---

# useEffect(setup, dependencies?)
## 用法：

**setup** 函数就是处理副作用的函数，该函数可以有一个返回值函数，也就是 cleanup 函数，可以用来处理一些善后工作。

**dependencies** 则是依赖项，一般是一个数组，但是是可选的，可以不传。这里需要注意一下，依赖项必须是响应式的（可以是用 useState 创建的，也可以是从父组件接收的，或者是从 context、store 获取的），也就是不能是普通的变量，否则就算修改了也不会触发 setup 函数。

## 执行时机
这个 Hook 最重要的就是理解执行的时机，当传入的 dependencies 不同时，执行的时机也不同。
1. dependencies 为空数组时，执行时机为初次渲染；
2. dependencies 中包含依赖项时，执行时机为初次渲染以及依赖项发生改变之后；
3. 不传递 dependencies 参数时，只要组件重新渲染都会执行，在初次渲染也同样会执行。

刚刚提到了 setup 函数的返回值 cleanup 函数，那么这个函数是在什么时候执行呢？答案是 在上面三点的前提下 **在下一次执行 setup 函数之前** 以及 **组件卸载之前** 执行，并且使用的是 **旧的 props 和 state**。有点类似于生命周期中的 didUpdate 和 unMounted 的结合体。

为什么要强调是在上面三点的前提下呢？其实也很好理解，在第一点的情况下，cleanup 函数将永远不会被执行（除了卸载组件时），在第二点情况下，只有依赖项发生改变之后才会执行。而卸载组件时，不论有无添加相关的依赖项，cleanup 函数一定会执行。

```js
function Counter() {
    const [counter, setCounter] = useState(0)
    const [name, setName] = useState('Tom')
    useEffect(() => {
        setName('Jackson')
        return function() {
          console.log('clear up')
        }
    }, [counter])
    return (
        <>
            <button onClick={() => setCounter(counter + 1)}>
                {counter}
            </button>
            {name}
        </>
    )
}

function App() {
  const [showCounter, setShowCounter] = useState(true)
  return (
      <>
          {showCounter ? <Counter /> : null }
          <button onClick={() => setShowCounter(!showCounter)}>卸载Counter</button>
      </>
  )
}
```

## 使用时机
按照官方的说法，当我们使用这个 useEffect 的时候，一般是用来和外部系统进行连接的，而 cleanup 函数也就是来断开连接的，那么什么是外部系统呢，React解释是，外部系统是指任何不受 React 控制的代码。以下几种情况可以视为外部系统：
1. 由 setInterval() 和 clearInterval() 管理的定时器；
2. 使用 window.addEventListener() 和 window.removeEventListener() 的事件订阅；
3. DOM 操作；
4. 网络请求。

## 在 Effect 中根据先前 state 更新 state
上面几点都比较好理解，但是有个需要注意的点：如果在 setup 函数中修改了 dependencies 中的变量，那可能会导致 setup 和 cleanup 函数不断重复执行，例如下面例子：
```js
function Counter() {
    // 每秒计数加一
    const [count, setCount] = useState(0)
    useEffect(() => {
        const timer = setInterval(() => {
            setCount(count + 1)
        }, 1000)
        return () => {
            console.log('清除')
            clearInterval(timer)
        }
    }, [count])
    return (
        <div>
            <h1>计数器</h1>
            <p>当前计数：{count}</p>
        </div>
    )
}

function App() {
    const [showCounter, setShowCounter] = useState(true)
    return (
        <div>
            { showCounter && <Counter /> }
            <button onClick={() => setShowCounter(!showCounter)}>{showCounter ? '隐藏' : '显示'}计时器</button>
        </div>
    )
}
```
虽然可以达到我们计数器的效果，每秒计数 +1，但却一直在重复运行 setup 与 cleanup 函数来不断重置计数器，这并不是我们想要的，我们只需要初始化和销毁一次定时器就足够了。

想要达到这个效果，setup 函数就只能运行一次，那么根据上面的执行时机来看，只有传递一个空数组才能达到这种效果，那么修改后的 Counter 代码如下：
```js
useEffect(() => {
    const timer = setInterval(() => {
        setCount(count + 1)
    }, 1000)
    return () => {
        console.log('清除')
        clearInterval(timer)
    }
}, []) // 传递一个空数组
```
您猜怎么着？计数器只加了 1 之后就不再继续递增了。这是为什么呢？定时器的回调函数也一直在执行，怎么卡在 1 不动了。

回想在学习 useState 的时候，有一条需要注意的事项，调用 set 函数 不会 改变已经执行的代码中当前的 state，那答案就很明显了，因为定时器拿到的 count 是 0，就算每秒调用一次，结果也都是一样的。

这这这，这可咋办？别急，再好好回想 useState 的用法，是不是有一个能获取最新 state 的方法，就是 **传递更新函数** 给 set 函数，这样定时器就能拿到最新的 count 去 +1 了，也能达到我们想要的效果了，修改如下：
```js
useEffect(() => {
    const timer = setInterval(() => {
        setCount(c => c + 1) // 传递一个更新函数
    }, 1000)
    return () => {
        console.log('清除')
        clearInterval(timer)
    }
}, []) // 传递一个空数组
```

## 网络请求
当依赖项发生改变的时候，我们需要重新发起网络请求，很常见的一个需求，刚开始可能会写出以下代码：
```js
function Request({id}) {
    // 使用useEffect来进行异步请求
    useEffect(async() => {
        const res = await fetch(`http://geek.itheima.net/v1_0/channels?id=${id}`)
        console.log(res)
        return () => {
            console.log('清除Request')
        }
    }, [id])
    return (
        <div>
            <h1>请求</h1>
        </div>
    )
}
```
请求的功能看起来一切正常，但是 cleanup 函数却没有被执行。这是因为 React 不希望传入的是一个异步函数，因为副作用函数就是当依赖项修改时做出相应变化的，如果这是一个异步函数，那么执行的顺序都会乱掉，也难以定位 bug，虽然不太清楚为什么 cleanup 没有执行的具体原因，但肯定是和副作用函数是异步函数有关。

所以只要把异步的请求包装成同步就可以了，代码如下：
```js
useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`http://geek.itheima.net/v1_0/channels?id=${id}`)
        
        const json = await response.json()
        console.log(json)
    }
    fetchData()
    return () => {
        console.log('清除Request')
    }
}, [id])

```
通过把异步的部分包装成同步的，就能够成功调用 cleanup 函数了。

除此之外，由于网络响应可能会以与你发送的不同的顺序到达，可能会带来不好的影响。比如在上一次副作用函数还没执行完成时，新的副作用函数已经执行完成了，那么我们需要清除掉上一次副作用函数的影响。这里直接使用官方的例子：
```js
useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
    if (!ignore) {
        setBio(result);
    }
    });
    return () => {
    ignore = true;
    }
}, [person]);
```
这里就涉及到 cleanup 函数执行的时机：在下一次执行副作用前和组件卸载之前。那么下一次执行副作用函数时，就会触发上一次的 cleanup 函数，将上一次的 ignore 置为 true，那就算当上次的请求完成之后，也不会对本次副作用函数造成影响了。


## 自定义 Hook
除此之外，useEffect 还可以帮助我们封装 自定义Hook，例如我们可以做一个将 state 同步到 localStorage 中的 Hook，代码如下：
```js
// useLocalStorage.js
export function useLocalStorage (key, value) {
    const [storedValue, setStoredValue] = useState(value)
    useEffect(() => {
        localStorage.setItem(key, storedValue)
    }, [storedValue])
    return [storedValue, setStoredValue]
}

// Counter.js
function Counter() {
    // 每秒计数加一
    const [count, setCount] = useLocalStorage('count', 0) // 自定义 Hook
    useEffect(() => {
        const timer = setInterval(() => {
            setCount(c => c + 1)
        }, 1000)
        return () => {
            console.log('清除')
            clearInterval(timer)
        }
    }, [])
    return (
        <div>
            <h1>计数器</h1>
            <p>当前计数：{count}</p>
        </div>
    )
}
```
该计数器效果和前面的是一样的，但是它能把计数同步到localStorage中，是不是非常方便？在其他组件中也能够轻松获取到了，在某些情境下也可用该方法来全局共享状态。

## 结尾
好了，到这里差不多已经学完了 useEffect 的常用用法以及一些需要注意的事项了。学完有种熟悉的感觉，就像是 Vue 中的 watch 和 watchEffect，但是这三者又都有所不同，例如 useEffect 不能像 watch 一样知道是哪一个依赖项发生了变化，也不能获取变化前的值等，总体和 watchEffect 比较相似吧，都可以清除副作用，但是 watchEffect 还可以选择副作用函数执行的时机，是在下一次渲染前、后或者当依赖项一修改立马执行，不过我们平时也用不到就是了。

此外想更详细了解也可以在[官网](https://react.docschina.org/reference/react/useEffect)查阅噢。