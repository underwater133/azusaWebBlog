---
title: context用法
date: 2023-11-13
tags:
 - 前端
 - React
categories: 
 - React
---

最近开始学React，虽然之前做项目的时候有稍微了解过（在低代码平台用 React 开发），当时使用的版本还是 React16 以前的，没有 Hooks，使用起来也比较繁琐，并且当时每个页面基本都是独立的，没有涉及组件之间的通信，也没有仔细学习，故最近利用空闲时间重新学习 React。

回到正题，context指的上下文，可以帮助我们在组件之间传递信息，并且可以跨越层级传递，弥补了props只能传递给子组件的不足。


context 有点像隔壁 Vue 的 provide/inject，也是在上游提供在下游接收，context 也是如此。

那么context的用法目前主要有两种，第一种是最常用也是官方推荐的写法，就是用 useContext 这个hook来读取订阅上下文，很明显这个方法也只能在函数组件中使用；第二种就是比较老的写法，函数组件和类组件都能够使用的，使用 Consumer 来读取订阅上下文。

在此之前，我们需要先创建一个 context，为了更加清晰理解和使得根组件更加精简，我们可以把创建 context 的部分抽离出来（当然放在根组件中也是可以的），代码如下：
```js
// ThemeContext.js
import { createContext} from "react";
const ThemeContext = createContext(null)
export default ThemeContext;
```
是不是非常简单，然后我们就可以在上游组件中引入这个 context 了，上游注入 Provider 的方式只有一种，而下游接收订阅 context 的方法就有如上说的两种：
```js
// App.js
function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <SonCF />
    </ThemeContext.Provider>
  )
}

// Son.js
export default function Son() {
    return (
        <div>
            Son Function
            <GSon></GSon>
        </div>
    )
}

//GSon.js
export default function GSon() {
    const [theme, setTheme] = useContext(ThemeContext);
    return (
        <div>
            孙子组件接收上层的context
            <p>hook写法，{theme}</p>
            <ThemeContext.Consumer>
                {(value) => {
                    return <p>旧式写法，{value[0]}</p>
                }}
            </ThemeContext.Consumer>
            <button onClick={() => setTheme("dark")}>change Theme</button>
        </div>
    )
}
```
当点击孙子组件中的按钮后，将会修改 theme 的值，视图也会更新，说明这个数据是响应式的。

其实还有另一种写法，也是早期在类组件中使用的，这种方法看看就好：
```js
class GSon extends Component {
  static contextType = context;
  render() {
    const [theme, setTheme] = this.context;
    return <div>{theme}</div>;
  }
}
```

这样子就可以在跨级，甚至兄弟组件中进行通信了，比一层一层 props 进行传递方便了很多，也不用引入 mobx 和 redux 等这种全局状态管理工具（要视具体业务来决定）。

需要注意的地方：
1. 组件中的 useContext() 调用不受 同一 组件返回的 provider 的影响。相应的 <Context.Provider> 需要位于调用 useContext() 的组件 之上。
2. useContext() 总是在调用它的组件 上面 寻找最近的 provider。它向上搜索， 不考虑 调用 useContext() 的组件中的 provider。
  
这两点看起来虽然相似，但他们的侧重点不同，第一点强调的是 接收的 context 值只能位于组件的上游，而第二点还有个侧重点就是 最近 的 provider，也就是说我们可以在中间组件修改向下传递的值，来渲染不同的内容。
```js
// Son.js
export default function SonCF() {
    const [theme, setTheme] = useState('pink')
    const fatherContext = useContext(ThemeContext) 
    return (
        <div>
            Son Function
            {/* 重新开一个 provider */}
            <ThemeContext.Provider value={[theme, setTheme]}>
                {/* 结果是 pink */}
                <GSon></GSon>
            </ThemeContext.Provider>

            {/* 结果是 light */}
            <p>子组件接收context，{fatherContext[0]}</p>
        </div>
    )
}
```
可以看到结果印证了上面所提的两点，provider 不受 同一 组件影响，而订阅获取 context 的值也是取上游中离得 最近 的一个。