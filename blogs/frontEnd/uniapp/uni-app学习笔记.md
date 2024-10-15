---
title: uni-app学习笔记
date: 2024-10-14
tags:
 - 前端
 - uni-app
categories: 
 - 前端随笔
sidebar: 'auto'
---

## 生命周期
分为页面生命周期和组件生命周期。

uni-app中的页面，默认保存在工程根目录下的pages目录下。 每次新建页面，均需在pages.json中配置pages列表；未在pages.json -> pages 中注册的页面，uni-app会在编译阶段进行忽略。

通俗的将页面就是我们所看到的一整个页面，里面可能包含了许多组件，页面需要在pages.json中进行注册。

**页面生命周期**除了支持Vue2和Vue3的生命周期，还有自己的一些生命周期，如onInit、onLoad、onShow、onReady、onHide等等，这些生命周期在不同平台的终端下可能存在兼容性问题，需要注意，使用方法如下：
```vue
<script setup>
import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'
const title = ref('Hello')
onReady(() => {
  console.log('onReady')
})
</script>
```

而**组件生命周期**基本于Vue3的生命周期一致，调用页面特有的生命周期不生效。

### 页面与组件生命周期的执行顺序


## 页面调用接口
### getApp
getApp() 函数用于获取当前应用实例，一般用于获取globalData。也可通过应用实例调用 App.vue methods 中定义的方法。
```vue
// App.vue
<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },
    globalData: {
      // ...你的全局数据
      name: 'zhangsan'
    },
    methods: {
      myGlobalMethod: function(params) {
        // ...你的方法逻辑
        console.log('globalConsole', params)
      }
    }
  }
</script>

// 页面or组件
const app = getApp()
app.myGlobalMethod('123')
console.log(app.globalData.name);
```

### getCurrentPages
getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，数组中的元素为页面实例，第一个元素为首页，最后一个元素为当前页面。

## 页面通讯
比较简单，类似Vue2的全局bus事件，就4个方法：`uni.$emit`、`uni.$on`、`uni.$off`、`uni.$once`。

用on注册监听后需要注意用off销毁，如果**只是监听一次**，则直接使用once方法，无需再用off销毁。

## 路由
uni-app有自己的一套路由，需要在page.json中配置页面路径以及页面样式，类似小程序。如果想用vue-router需要在插件市场搜索使用。
其中pages数组中第一项表示应用启动页。
```json
{
	"pages": [
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "uni-app",
				"navigationStyle": "custom"
			}
		},
		{
			"path" : "pages/classify/classify",
			"style" : 
			{
				"navigationBarTitleText" : "分类",
				"enablePullDownRefresh" : false,
				"navigationStyle": "custom"
			}
		},
		{
			"path" : "pages/user/user",
			"style" : 
			{
				"navigationBarTitleText" : "我的",
				"enablePullDownRefresh" : false,
				"navigationStyle": "custom"
			}
		},
		{
			"path" : "pages/classlist/classlist",
			"style" : 
			{
				"navigationBarTitleText" : "分类列表",
				"enablePullDownRefresh" : false
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "咸虾米壁纸",
		"navigationBarBackgroundColor": "#fff",
		"backgroundColor": "#F8F8F8"
	},
	"tabBar": {
		"color": "#9799a5",
		"selectedColor": "#28B389",
		"list": [
			{
				"text": "推荐",
				"pagePath": "pages/index/index",
				"iconPath": "static/images/tabBar/home.png",
				"selectedIconPath": "static/images/tabBar/home-h.png"
			},{
				"text": "分类",
				"pagePath": "pages/classify/classify",
				"iconPath": "static/images/tabBar/classify.png",
				"selectedIconPath": "static/images/tabBar/classify-h.png"
			},{
				"text": "我的",
				"pagePath": "pages/user/user",
				"iconPath": "static/images/tabBar/user.png",
				"selectedIconPath": "static/images/tabBar/user-h.png"
			}
		]
	},
	"uniIdRouter": {}
}
```

### 路由跳转
uni-app 有两种页面路由跳转方式：使用navigator组件跳转、调用API跳转。

navigator组件与API对应方式如下：

|  navigator   | API |
|  ----  |-----|
| `<navigator open-type="navigate"/> ` | `uni.navigateTo` |
| `<navigator open-type="redirectTo"/> ` | `uni.redirectTo ` |
| `<navigator open-type="navigateBack"/> ` | `uni.navigateBack` |
| `<navigator open-type="switchTab"/> ` | `uni.switchTab` |
| `<navigator open-type="reLaunch"/> ` | `uni.reLaunch` |

注意：

页面返回时会自动关闭 loading 及 toast, modal 及 actionSheet 不会自动关闭。

页面关闭时，只是销毁了页面实例，**未完成的网络请求、计时器等副作用需开发者自行处理**。

### 预加载页面
预加载页面，是一种性能优化技术。被预载的页面，在打开时速度更快，本质是先向服务器请求下载将要去往的页面所需的文件，但不渲染。
```js
uni.preloadPage({url: "/pages/test/test"}); // 预加载 /pages/test/test 页面（仅触发onLoad，onReady)
uni.navigateTo({url: "/pages/test/test"}); // url匹配，跳转预加载页面（仅触发onShow)
uni.navigateTo({url: "/pages/test/test?a=b"}); // url不匹配，正常打开新页面
```


## 条件编译
条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

使用方法：

以 #ifdef 或 #ifndef 加 %PLATFORM% 开头，以 #endif 结尾。

+ #ifdef：if defined 仅在某平台存在
+ #ifndef：if not defined 除了某平台均存在
+ %PLATFORM%：平台名称

常见的PLATFORM有H5、APP、MP等等，具体可见[官网](https://uniapp.dcloud.net.cn/tutorial/platform.html)。

注意条件编译在不同语法里注释写法不一样，js/uts使用 `//` 注释、css 使用 `/* 注释 */`、vue/nvue/uvue 模板里使用 `<!-- 注释 -->`；

## 环境变量
与vue2、vue3方式一致，可以在根目录下创建.env.[mode]文件来存储环境变量，然后通过对应的方式去访问，例如vite创建的项目是使用`import.meta.env.VITE_APP_XXX`来访问环境变量。


