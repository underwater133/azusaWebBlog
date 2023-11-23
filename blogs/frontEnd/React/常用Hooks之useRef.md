---
title: 常用Hooks之useRef
date: 2023-11-23
tags:
 - 前端
 - React
 - Hooks
categories: 
 - React
sidebar: 'auto'
---

# useRef(initialValue)
这个 ref 是不是老熟悉了，没错，我们经常能在各种框架中看到这个字眼，这就不得不提一个 V 开头的框架了。当然，虽然都叫这个名字，但是他们之间却存在差别，甚至说由于框架的不同，他们的特性也大不相同，接下来我们慢慢了解。先来看最基础的用法：

```js
const input = useRef(0);
const name = useRef('张三');
const person = useRef(new Person('张三'))

console.log(input.current) // 0
input.current = 1
console.log(input.current) // 1
```

useRef 接收一个参数作为初始值，这个值可以是任意类型的，在后续渲染之后将忽视这个初始值。而返回值则是一个 ref 对象，包含单个 current 属性，便于我们读取和修改值，需要注意的是，即使修改 person.current，也不会触发重新渲染。

和 useState 一致，如果初始值是一个函数的话，还是会被执行的，只是不会修改 ref 的值，但会带来不必要的消耗。为了避免问题，可以在初始时将 ref 置为 null，再对当前 ref 的值进行判断，如果是 null 则对其赋值，在后续渲染中则会忽视初始值 null，也不会调用初始化函数了。
```js
const person = useRef(null)
if (person.current === null) {
  person.current = new Person('张三')
}
```

看到这里就开始疑惑了，那这个 useRef 到底有什么用，还不如直接用 useState 呢！咋一想好像如此，其实不然，useRef 也是有独特的用处的。

## 用法：
1. 用来包装一个值；
2. 用来操作 DOM。


先来看第一点，要知道，在一个函数组件里面，所有的代码在重新渲染的时候都是会跟着执行一遍的，不像是 Vue3 那样写在 setup 函数里，只在初始时执行。那么当我们需要记录一些状态，又不需要对其进行渲染该怎么办，用 useState 吗？还是干脆直接什么钩子都不用？答案就是用 useRef 来进行包装。

例如很常见的，创建定时器和清除定时器。我们都知道创建定时器的时候会返回一个 id，用于清除定时器，这个 id 我们并不需要渲染到界面上，也就不需要用到 useState 了。但是如果不使用 useRef 的话，在每一次渲染中都会生成不同的定时器和 id，这并不是我们预期的效果。在这种或者类似情景下，useRef 是十分有用的，代码如下：
```js
const timer = useRef(null)
if (timer.current === null) {
    timer.current = setInterval(() => {
        console.log("定时器");
    }, 1000);
}

// 清除定时器
function handleClear() {
    if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
    }
}
```
通过 useRef 我们就可以在重新渲染的同时保留了定时器的 id，以便在需要的时候清除定时器。

第二点操作 DOM，这个也是很常见的功能了，通过 ref 就不需要用 document 去查找我们需要的 DOM 了，例如我们需要通过一个按钮来控制视频的播放和暂停，就可以通过 ref 来获取 viedo 这个 DOM，并调用其身上的方法，这里引用官方的例子：
```js
export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false); // 记录状态
  const ref = useRef(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? '暂停' : '播放'}
      </button>
      <video
        width="250"
        ref={ref}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  )
}
```

除此之外也可以操作子组件中的 DOM，但是用法也与 Vue 有很大的不同。先看例子：
```js
// App.js
function App(){
    const myInput = useRef(null);
    function handleClick() {
        myInput.current.focus(); // myInput.current 代表 DOM 节点
    }
    return (
        <div className="App">
            <MyInput ref={myInput}></MyInput>
            <button onClick={handleClick}>
                聚焦输入框
            </button>
        </div>
    )
}

// MyInput.js
const MyInput = forwardRef((props, ref) => {
    const [inputValue, setInputValue] = useState('');
    const resetInputValue = () => {
        setInputValue('');
    }
    return (
        <>
            <input value={inputValue} ref={ref} onChange={(e) => setInputValue(e.target.value)}></input>
            <button onClick={() => resetInputValue()}>reset</button>
        </>
    )
})
```
父组件中使用封装了输入框的子组件，并在父组件中能控制子组件中输入框的聚焦。相信到这里已经你知道如何使用：
1. 子组件需要调用 forwardRef 这个函数，并把组件的主体部分作为参数传递给 forwardRef；
2. 需要在函数组件中**接收 ref 参数**；
3. 在需要被父组件操控的 DOM 上，绑定 ref。

补充一下第一点，React 默认是不会暴露出组件的 DOM 节点的，需要用 forwardRef 才能使其暴露。

## 思考
是不是感觉有一种熟悉又有点异样，在 Vue 中，绑定了 ref 是针对整个子组件而言的，而在这里是针对子组件的某个 DOM 的，那么就有以下问题：
1. 如果父组件需要控制子组件的多个 DOM 该如何操作？
2. 父组件怎么像 Vue 一样调用子组件中的方法？
   
先来讨论第一个问题，虽然在网上找了一番，但却没有找到类似的说法，其实这么做也确实是不合适的。如果出现了这种情况，应该考虑下是否再细化子组件，将需要被操作的 DOM 独立开来。

然后是第二点，答案是可以实现的。经过查阅官方的文档，发现了另外一个 API：**useImperativeHandle**。这个 API 可以暴露组件中的方法供父组件调用，例子如下：
```js
// App.js
function App(){
    const myInput = useRef(null);
    function handleClick() {
        myInput.current.reset()
    }
    return (
        <div className="App">
            <MyInput ref={myInput}></MyInput>
            <button onClick={() => handleClick()}>reset</button>
        </div>
    )
}

// MyInput.js
const MyInput = forwardRef((props, ref) => {
    const [inputValue, setInputValue] = useState('');
    const resetInputValue = () => {
        setInputValue('');
    }

    useImperativeHandle(ref, () => ({ 
        reset() {
            resetInputValue();
        }
        // ...other methods
    }))

    return (
        <>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
        </>
    )
})
```
在这个例子中，我将重置的按钮放到了父组件中（尽管这么做并不合理），在子组件中，无需将 ref 绑定在 input 身上，只需要通过 useImperativeHandle 将重置的方法暴露出来，父组件即可调用。

当我们的关注点不在子组件的 DOM 身上，而是在调用其方法上时，就可以使用此方法，例如在父组件中需要打开子组件中的弹窗。

如果是类组件的话就不用那么麻烦了，父组件的 ref.current 可以获取整个子组件，很方便获取 state 中的数据和调用子组件的方法，就和 Vue 一样了。

### 注意
在这两点中，需要注意的是，最好不要在渲染期间读取（初始化除外）或者写入 ref.current。这是因为 React 期望保持函数组件的[纯粹性](https://react.docschina.org/learn/keeping-components-pure#where-you-_can_-cause-side-effects)。当我们的 ref 的来源不确定或者是一个 DOM 时，在渲染期间进行读写可能会破坏组件的纯粹性，我们可以将读写的部分放在函数里，或者是放在 useEffect 中来保证这一点。

## 使用时机
最后引用官方文档的摘要说明一下何时才使用 refs，根据业务选择是否需要使用：
1. Refs 是一个通用概念，但大多数情况下你会使用它们来保存 DOM 元素。
2. 你通过传递```div ref={myRef}```指示 React 将 DOM 节点放入 myRef.current。
3. 通常，你会将 refs 用于非破坏性操作，例如聚焦、滚动或测量 DOM 元素。
4. 默认情况下，组件不暴露其 DOM 节点。 您可以通过使用 forwardRef 并将第二个 ref 参数传递给特定节点来暴露 DOM 节点。
5. 避免更改由 React 管理的 DOM 节点。
6. 如果你确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分。

好了，今天的 useRef 就学习到这里，想了解更多请到[官网](https://react.docschina.org/reference/react/useRef)查阅。