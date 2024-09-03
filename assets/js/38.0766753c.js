(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{499:function(s,n,a){"use strict";a.r(n);var e=a(2),t=Object(e.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"前言"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[s._v("#")]),s._v(" 前言")]),s._v(" "),n("p",[s._v("由于项目的依赖包一般是不会随便升级的，所以可能这些直接或间接的依赖包由于版本比较低存在漏洞（没错就是被检测出来漏洞了），也不能及时被修复，这时候就需要手动去升级对应的依赖包了。")]),s._v(" "),n("p",[s._v("如果是直接依赖（即可以直接在package.json中找到的）解决起来还比较简单，直接使用"),n("code",[s._v("npm i xxx@x.x.x")]),s._v("安装指定版本即可。")]),s._v(" "),n("p",[s._v("但是某些比较通用的包（例如lodash、webpack等）可能除了在直接依赖中有用到，大部分时间是作为间接依赖（即直接依赖包中的依赖包，可能还含有更多层级）出现的，可以使用"),n("code",[s._v("npm list xxx")]),s._v("来看有哪些地方使用了这个依赖包以及查看对应的版本。")]),s._v(" "),n("p",[s._v("那么在各个依赖包版本都不同的情况下，如何指定它们的版本来达到统一呢？")]),s._v(" "),n("h2",{attrs:{id:"解决"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#解决"}},[s._v("#")]),s._v(" 解决")]),s._v(" "),n("p",[s._v("在解决这个问题之前，或许可以通过删除 node_modules 和 package-lock.json，然后重新安装依赖来解决部分漏洞。因为在package.json中配置的依赖一般都是允许更新到与指定版本兼容的最新版本的（如^1.2.3允许更新到1.2.x或1.x.x，但不能更新到2.x.x或更高版本），或许你重新安装依赖时官方已经解决了这个漏洞，自己就不用再手动去升级了。")]),s._v(" "),n("p",[s._v("但如果很不巧官方也还没更新，那么只能我们自己解决了。回到刚刚的问题，如何指定某个依赖包的版本呢？答案是通过配置"),n("code",[s._v("package.json")]),s._v("来指定，网上大致有两种方式。")]),s._v(" "),n("p",[s._v("注：以下两种方式执行之前需要先删除 node_modules 和 package-lock.json。")]),s._v(" "),n("h3",{attrs:{id:"方式一"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#方式一"}},[s._v("#")]),s._v(" 方式一：")]),s._v(" "),n("p",[s._v("当你的项目依赖多个包，而这些包又依赖于同一个底层包的不同版本时，可能会发生版本冲突。resolutions字段允许你指定所有依赖项应该使用的特定版本，从而避免这种情况。")]),s._v(" "),n("p",[s._v("首先需要在 script 中加上 "),n("code",[s._v('"preinstall": "npx force-resolutions"')]),s._v("，npx 是 npm 的一个包执行器，它允许你执行不在本地安装的包。force-resolutions 是一个 npm 包，它可以用来强制解决 npm 依赖版本冲突的问题。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('{\n  "scripts": {\n    xxx\n    "preinstall": "npx force-resolutions"\n  },\n  "resolutions": {\n    "postcss": "8.4.31",\n    "webpack-bundle-analyzer": "3.3.2",\n    "karma": "6.3.16",\n    "codemirror": "^5.58.2",\n    "minimist": "1.2.6",\n    "semver": "7.5.2",\n    "lodash": "4.17.21"\n  },\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br")])]),n("p",[s._v("最后执行"),n("code",[s._v("npm install")]),s._v("即可。但是呢该方法我使用了之后发现不生效，指定的间接依赖的版本还是不变，可能是哪里配置错了还是npm版本不兼容？")]),s._v(" "),n("h3",{attrs:{id:"方式二-推荐"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#方式二-推荐"}},[s._v("#")]),s._v(" 方式二（推荐）：")]),s._v(" "),n("p",[s._v("overrides字段是一个相对较新的功能（需要npm版本为8或以上），它允许开发者覆盖特定依赖的版本，即使这些依赖是由其他包引入的。这可以用于解决依赖冲突或确保特定依赖项使用特定的版本。")]),s._v(" "),n("p",[s._v("该方式可以生效，直接在配置文件加上 overrides 字段指定版本即可，与 resolutions 类似。")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v('{\n  "xxx": "xxx",\n  "overrides": {\n    "postcss": "8.4.31",\n    "webpack-bundle-analyzer": "3.3.2",\n    "karma": "6.3.16",\n    "codemirror": "^5.58.2",\n    "minimist": "1.2.6",\n    "semver": "7.5.2",\n    "lodash": "4.17.21"\n  }\n}\n')])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("p",[s._v("然后执行"),n("code",[s._v("npm install")]),s._v("，安装完之后使用"),n("code",[s._v("npm list xxx")]),s._v("检查依赖包的版本，发现都变成指定的版本了。")]),s._v(" "),n("p",[s._v("虽然版本升级了，漏洞也解决了，但是项目却不一定能跑起来（doge），所以这种方法治标不治本，想要真正解决的话还得一个依赖一个依赖慢慢解决，但是其中牵扯到的依赖冲突太多了。。。")]),s._v(" "),n("p",[s._v("如果文章有什么问题欢迎留言，共同探讨~")])])}),[],!1,null,null,null);n.default=t.exports}}]);