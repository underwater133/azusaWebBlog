---
title: ReactRouter v6
date: 2023-12-14
tags:
 - 前端
 - React
 - react-router
categories: 
 - React
sidebar: 'auto'
---
## 前言
之前稍微学过一次 react-router，但是之后因为工作比较忙很久没接触了，最近在系统过一遍 react，就当作复习，快速过一遍。

学过其他框架之后就会发现，很多地方都是共通的，但每个框架又有其独特的地方，所以此篇文章主要是记录这些差异，以便后面开发时可以快速查阅。

## 创建项目
```shell
# 创建项目 vite
npm create vite react-router --template react
# 进入目录
cd react-router
# 安装依赖
npm install
# 安装最新版路由 v6
npm install react-router-dom
# 启动项目
npm run dev
```

## 基础使用
先把默认的页面删掉，重新写一下和路由相关的页面吧，先来个经典的主页和关于页面。在此之前先创建好目录，就先建个 views 目录吧，有些项目是用 pages，都大差不差。

然后在 views 目录下再建立两个文件，分别是 Home 和 About，简单写写，最后在 App 中引入。
```js
// Home.jsx
const Home = () => {
    return (
        <p>Home</p>
    )
}

export default Home;

// About.jsx
const About = () => {
    return (
        <p>About</p>
    )
}

export default About;

// App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'

function App() {
  return (
    <>
        <BrowserRouter>
            <Link to="/">首页</Link>
            <Link to="/about">关于</Link>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
```
一个最简单的路由系统就完成了。

## 核心内置组件
### BrowserRouter
路由标配，BrowserRouter 和 HashRouter。
|  模式   | 实现方式  | 路由url表现  |
|  ---- | ---- | ---- |
| HashRouter  | 监听 url 的 hash 值实现 | http://localhost:3000/#/about  |
| BrowerRouter  | h5的 history API实现 | http://localhost:3000/about  |

BrowserRouter 和 HashRouter 的区别在于路由方式和适用场景。BrowserRouter 更接近于浏览器的默认行为，但需要后端配置支持；HashRouter 不需要后端配置支持，但会导致 URL 不美观。根据实际需求选择合适的组件即可。

BrowserRouter 说的后端支持，是需要配置当有人访问了前端没有配置的路由时要展示什么。如果是前端有的路由，那么会被匹配到相应的组件，否则会想后端请求相应的页面，如果没有配置则可能会报404。

### Link
声明式导航，用 to 属性进行跳转，Link 标签最终会被渲染成 a 标签。

与 NavLink 的区别：NavLink 一般用于导航，会自带一些特性，比如可以判断是组件是否还在加载，是否是当前选中的，可以根据情景自行选择。
```jsx
<NavLink to="/layout"   className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
}>Layout</NavLink>
```

### Routes
Routes 提供一个路由出口，组件内部会存在多个内置的 Route 组件，满足条件的路由会被渲染到组件内部。

### Route
路由规则，将路径与组件建立映射关系，当有人访问其路径时会渲染对应组件。

## 编程式导航
上面提到的 Link 是声明式导航，也有编程式导航来进行跳转，需要用到 useNavigate 这个 Hook：
```jsx
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
    return (
        <>
            <p>Home</p>
            <button onClick={() => navigate('/about')}>跳转到About</button>
        </>
    )
}

export default Home;
```
当然，也可以传递第二个参数对象，设置跳转方式为 replace，则会覆盖当前页，不留下历史记录。
```jsx
navigate('/about', { replace: true } )
```

## 路由传参
### searchParams传参
这个是最简单的传参方式，也就是在 url 路径后面添加参数。
下面用编程式导航演示，比较方便：
```jsx
navigate('/about?id=1')
```
接受参数：
```jsx
// About.jsx
import { useSearchParams } from "react-router-dom";

const About = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    return (
        <>
            <p>About</p>
            <p>id: {id}</p>
        </>

    )
}

export default About;
```

### params传参
这种方式是把参数添加到路径中，会使 url 更加简洁。
```jsx
navigate('/about/123')
```
别忘了新增路由规则来匹配这个参数：
```jsx
<Route path="/about/:id" element={<About />}></Route>
```
接受参数：
```jsx
import { useParams } from "react-router-dom";

const About = () => {
    const params = useParams();
    const id = params.id;
    return (
        <>
            <p>About</p>
            <p>id: {id}</p>
        </>

    )
}

export default About;
```
通过这种方式我们也能把不同 url 映射到同一个组件中，根据不同的参数显示不同的内容，比如不同的博客，他们的 id 不同，那么只需要在 url 路径中包含这个 id 就能展示对应的文章，相比于 searchParams 传参更加简洁，但是代价就是需要在路由规则里进行匹配。

### 状态传递
还有另一种就是状态传递了，可以不把参数体现在 url 中：
```jsx
// 跳转
navigate('/about', {state: {name: '张三'}}) // 只能叫 state，其他名称没效果

// About.jsx  接收 state
import { useLocation } from "react-router-dom";
const About = () => {
    const { state } = useLocation();
    console.log(state, "state");
    return (
        <>
            <p>About</p>
            <p>name: {state.name}</p>
        </>

    )
}

export default About;
```

## 嵌套路由
在后台系统中，我们一般都会见到，最上面是一级菜单，而在一级菜单下的左边有个二级菜单，右边则是点击不同的二级菜单显示不同的内容，这里用到的就是嵌套路由。

回想一下在 Vue 中，是不是也很简单，直接再丢一个```<router-view />```就完事了，而 React 则不同，需要用到另外一个组件：OutLet。

这次新增一个一级菜单 Layout，然后在里面有两个二级菜单，分别对应两个组件 Dashboard 和 Article，下面是创建代码，比较简单：
```jsx
// Layout.jsx
import {Link, Outlet} from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <p>layout</p>
            { /* 注意不能以 / 开头，否则会跳转到错误的路径。这里会自动拼接上一级路由的路径 */ }
            <Link to="dashboard">dashboard</Link>
            <Link to="article">article</Link>
            { /* 二级路由出口 */ }
            <Outlet/>
        </div>
    )
}
export default Layout
// Dashboard 和 Article 比较简单就不展示了
```
然后我们在 App 中加一个路由跳转到 Layout，同时还要加上二级路由的匹配规则：
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Article from "./components/Article";

function App() {
  return (
    <>
        <BrowserRouter>
            <Link to="/">首页</Link>
            <Link to="/about/111">关于</Link>
            <Link to="/layout">Layout</Link>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about/:id" element={<About />}></Route>

                {/* Route 也可以包裹 Route */}
                <Route path="/layout"  element={<Layout/>}>
                    {/* 子路由都不需要带 / */}
                    <Route path="dashboard" element={ <Dashboard/> } />
                    <Route path="article" element={ <Article/> } />
                </Route>
            </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
```
好了，这样嵌套路由就完成了，多级路由也是相同的逻辑。

有时我们需要点击 Layout 路由时，默认展示 Dashboard 组件，做法如下：
```jsx
// App.jsx
// 修改路由规则
<Route path="/layout"  element={<Layout/>}>
    {/* 加上index属性，把path属性去掉 */}
    <Route index element={ <Dashboard/> } />
    <Route path="article" element={ <Article/> } />
</Route>
// Layout.jsx
// 把to属性的内容去掉，因为此时默认展示的组件没有自己的路径了
<Link to="">dashboard</Link>
```
这样就实现啦。

## 404路由配置
当访问不存在的路径时，需要展示自定义的 404 页面，那么需要用匹配规则来进行拦截。但在此之前我们也需要有一个展示404页面的组件：
```jsx
// NotFound.jsx
const NotFound = () => {
  return (
    <div>404</div>
  )
}

export default NotFound;

// App.jsx
  <Routes>
    {/* ... */}
    <Route path="*" element={<NotFound />}></Route>
  </Routes>
```

## 集中式路由配置
上面介绍的都属于声明式的路由，需要插在 JSX 里面，不易维护，因此 React 也提供了集中式的路由配置，把路由层级和对应组件用数组的形式写出来，然后再用 useRoutes 将数组转化为路由规则，并包装成一个组件，最后丢到 App 里面就可以了：
```jsx
// WrapRoutes.jsx
import { useRoutes } from 'react-router-dom'
import Home from '../views/Home'
import About from '../views/About'
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import Article from "../components/Article";
import NotFound from "../views/NotFound";
const WrapRoutes = () => {
    const element = useRoutes([
        {
            path: '/',
            element: <Home />,
            name: 'Home'
        },
        {
            path: '/about/:id',
            element: <About />,
            name: 'About'
        },
        {
            path: '/layout',
            element: <Layout />,
            name: 'Layout',
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                    name: 'Dashboard'
                },
                {
                    path: 'article',
                    element: <Article />,
                    name: 'Article'
                }
            ]
        },
        {
            path: '*',
            element: <NotFound />,
            name: 'NotFound'
        }
    ])
    return element
}

export default WrapRoutes

// App.jsx
<BrowserRouter>
    <Link to="/">首页</Link>
    <Link to="/about/111">关于</Link>
    <Link to="/layout">Layout</Link>
    {/* 把 Routes 内容替换 */}
    <WrapRoutes />
</BrowserRouter>
```
这里有两个需要注意的点，坑死我了。第一点是路由规则里面，组件的字段是 element 而不是 component！！！至于我为什么会打成 component，是因为我用的 AI 自动补全代码！我检查了好久才发现，AI 背大锅，以为这是 Vue 呢！第二点也同样，组件必须包在标签里面，比如 Home 组件必须写成```<Home />```，否则也会报错。

## 路由懒加载
懒加载需要用到 lazy 这个 API，但还不够，因为是懒加载，如果网络不好会出现长时间白屏的情况，用户体验会大打折扣，所以需要展示加载组件，使得跳转更加平滑。

这里简单写一下 About 组件的懒加载，其他同理：
```jsx
// App.jsx
import {lazy, Suspense} from "react";

const About = lazy(() => import("./views/About"))
{/* ... */}
<Routes>
    {/* ... */}
    <Route path="/about/:id" element={<Suspense fallback={<h3>Loading.....</h3>}>
        <About />
    </Suspense>}></Route>
    {/* ... */}
</Routes>
{/* ... */}
```

集中式的写法也类似：
```jsx
import {lazy, Suspense} from "react";
const About = lazy(() => import('../views/About'))
{/* ... */}
{
    path: '/about/:id',
    element: (
        <Suspense fallback={<h3>Loading.....</h3>}>
            <About />
        </Suspense>
    ),
    name: 'About'
},
{/* ... */}
```

## 拓展
### 路由守卫
路由守卫一般是为了鉴权或者做一些判断之后决定要跳转到哪个页面，在 vue-router 中是直接提供了几种路由守卫的，比如前置、后置，甚至可以区分全局和单独的路由。而 React 就没有这么方便了，如果想要实现同样的功能，需要自己来完成。这里只进行对登录状态的鉴权，实际业务需要自行调整。

最简单的实现方法无非是在需要鉴权的页面上，在 useEffect 上进行鉴权后，如果不满足则跳转，比如校验是否是登录态。
```jsx
import {Link, Outlet, useNavigate} from 'react-router-dom'
import { useEffect } from "react";

const Layout = () => {
    const navigate = useNavigate()
    console.log(data, "useLoaderData")
    useEffect(() => {
        // 模拟鉴权逻辑
        const isLogin = localStorage.getItem('isLogin') === 'true'
        if(!isLogin){
            alert('请先登录再访问')
            navigate('/')
        }
        }, [])// 第二个参数为一个空数组，相当于 vue 的 beforeMount 钩子
    return (
        <div>
            <p>layout</p>
            { /* 二级路由的path等于 一级path + 二级path  */ }
            <Link to="">dashboard</Link>
            <Link to="article">article</Link>
            { /* 二级路由出口 */ }
            <Outlet/>
        </div>
    )
}
export default Layout
```
这种方法虽然简单，但相应的也有局限性，如果在一些后台系统中，大部分页面都需要鉴权，那么逐一写的话也太麻烦了。在此之上也有更加方便的方法，就是把鉴权的逻辑都抽出来，实现的方式有两种，第一种是自定义 Hooks，第二种是高阶组件。

**自定义Hooks**
```jsx
// auth/index.js  自定义Hooks
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function useLoginAuth() {
    const isLogin = localStorage.getItem('isLogin') === 'true'
    const navigate = useNavigate()
    useEffect(() => {
        if(!isLogin){
            alert('请先登录再访问')
            navigate('/', { replace:true })
        }
    })
}
// Layout.jsx 使用
import {Link, Outlet} from 'react-router-dom'
import {useLoginAuth} from "../auth";
const Layout = () => {
    useLoginAuth()
    return (
        <div>
            <p>layout</p>
            { /* 二级路由的path等于 一级path + 二级path  */ }
            <Link to="">dashboard</Link>
            <Link to="article">article</Link>
            { /* 二级路由出口 */ }
            <Outlet/>
        </div>
    )
}
export default Layout
```
**高阶组件**
```jsx
// WithAuthComponent.jsx
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

// 高阶组件-返回一个组件
const withAuthComponent = WrappedComponent => {
    const WithAuthComponent = () => {
        const isLogin = localStorage.getItem('isLogin') === 'true'
        const navigate = useNavigate()
        useEffect(() => {
            if(!isLogin){
                alert('请先登录再访问')
                navigate('/', { replace:true })
            }
        })
        return <WrappedComponent />
    }
    return WithAuthComponent
}

export default withAuthComponent

// 然后在路由组件中包装需要鉴权的路由
const WithAuthLayout = withAuthComponent(Layout)
const router = createBrowserRouter([
    // ...
    {
        path: '/layout',
        element: <WithAuthLayout />,
        name: 'Layout',
        children: [
            // ...
        ]
    },
    // ...
])
```
通过抽离出共同的逻辑，就不用写多遍了（虽然相比于 vue 的路由守卫还是略显麻烦）。

除此之外，也可以在整个路由组件外面包一层，所有路由都需要通过校验，相当于全局的路由守卫。
```jsx
// main.jsx 入口文件
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./components/AppRouter";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
  </React.StrictMode>,
)


// AppRouter.jxs
import Home from "../views/Home";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import Article from "./Article";
import NotFound from "../views/NotFound";
import {lazy, Suspense} from "react";
const About = lazy(() => import('../views/About'))
import {Routes, Route, useLocation, Navigate} from "react-router-dom";

const routes = [
    {
        path: '/',
        element: <Home />,
        name: 'Home'
    },
    {
        path: '/about/:id',
        element: (
            <Suspense fallback={<h3>Loading.....</h3>}>
                <About />
            </Suspense>
        ),
        name: 'About'
    },
    {
        path: '/layout',
        element: <Layout />,
        name: 'Layout',
        children: [
            {
                index: true,
                element: <Dashboard />,
                name: 'Dashboard'
            },
            {
                path: 'article',
                element: <Article />,
                name: 'Article'
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />,
        name: 'NotFound'
    }
]
const AppRouter = () => {
    const isLogin = localStorage.getItem('isLogin') === 'true'
    const {pathname} = useLocation()
    const AuthRoute = (props) => {
        return (
            props.map((item, index) => {
                return (
                    // 这里的key不知道为什么只指定path不加index会报错，说需要唯一的key，加上index则不报错了。
                    <Route
                        key={item.path + index}
                        path={item.path}
                        element={(item.path === pathname && !isLogin) ? <Navigate to='/' replace={true} /> : item.element} >
                        {
                            item.children && AuthRoute(item.children)
                        }
                    </Route>
                )
            })
        )
    }
    return <Routes>{AuthRoute(routes)}</Routes>
}

export default AppRouter
```
现在所有页面都需要经过校验了，但是也因此反而出了问题，比如第一次进入系统没有登录的时候，永远都是导向空白页，所以我们可以多加一些判断条件，在路由数组中多加一个字段，在渲染时再判断即可，控制起来也很方便：
```jsx
const routes = [
    // ...
    {
        path: '/layout',
        element: <Layout />,
        name: 'Layout',
        auth: true, // 在需要鉴权的页面加上auth字段
        children: [
            // ...
        ]
    },
    // ...
]

// 在选择渲染组件时判断auth字段
<Route
    key={item.path + index}
    path={item.path}
    element={(item.path === pathname && item.auth && !isLogin) ? <Navigate to='/' replace={true} /> : item.element} >
    {
        item.children && AuthRoute(item.children)
    }
</Route>
```
好了，一个简单的全局路由守卫完成了。虽然介绍了几种路由守卫的实现方式，但涉及的逻辑也比较简单，在逻辑比较复杂时可以根据自己的业务来选择和进行扩展，应该可以应付大多数场面了。

其实在 v6 版本中，路由新增了个 loader 属性，可以在页面加载前请求数据，但我实际试了一下，在 loader 函数里写重定向也是先渲染完原本的页面才去重定向的，体验不是很好，可能是我的方式搞错了，后面再研究研究。

### 路由缓存
在 Vue 中，可以通过 keep-alive 包裹住 router-view 来缓存路由，而 React 是没有的，需要依赖第三方库或者自己手动实现。而比较方便使用的 react-router-cache-route，也不兼容 v6 版本，但此外也发现了另外一个库：react-activation。还有手动实现的：https://juejin.cn/post/7273434821807636515。

总之，还是希望官方早日支持吧，降低一下学习的成本（doge），这里我就不实现了。