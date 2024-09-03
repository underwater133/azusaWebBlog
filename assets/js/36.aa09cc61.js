(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{496:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"前言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[s._v("#")]),s._v(" 前言")]),s._v(" "),t("p",[s._v("随着自己的博客网站内容更新越来越多（虽然没人看，只是记录知识方便自己查看），每次都要手动部署比较麻烦，虽然早就听说github可以自动部署，但还没试过，今天就来玩一下。")]),s._v(" "),t("h2",{attrs:{id:"准备"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#准备"}},[s._v("#")]),s._v(" 准备")]),s._v(" "),t("p",[s._v("首先需要到github的设置里面新建一个"),t("code",[s._v("Personal access tokens")]),s._v("，用来自动化部署，想让服务器自己帮你部署，总得有个密钥吧。")]),s._v(" "),t("p",[s._v("设置路径是 "),t("code",[s._v("点击你的头像->Settings->Developer Settings->Personal access tokens->Tokens (classic)")]),s._v("，然后点击右上角的 "),t("code",[s._v("Generate new token")]),s._v("生成，选"),t("code",[s._v("classic")]),s._v("。")]),s._v(" "),t("p",[s._v("然后进入生成界面，填写一些信息，如这个token是干什么的，token有效期是多久，建议选不会过期，不用折腾。")]),s._v(" "),t("p",[s._v("下面选择这个token的权限，一般勾选整个"),t("code",[s._v("repo")]),s._v("就够了，其他的看着选，后面也可以更新权限的。")]),s._v(" "),t("p",[s._v("最后点击生成，生成之后的token记得复制保存，下一步有用，最好存到本地。")]),s._v(" "),t("p",[s._v("然后去到你的项目源码仓库，去创建一个仓库的secrets，就需要用到上面的token。路径为："),t("code",[s._v("你的仓库页面->Settings->Secrets and variables->Actions->New repository secret")])]),s._v(" "),t("p",[s._v("然后填入名称和token即可。")]),s._v(" "),t("h2",{attrs:{id:"编写action"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#编写action"}},[s._v("#")]),s._v(" 编写Action")]),s._v(" "),t("p",[s._v("进入项目的"),t("code",[s._v("Actions")]),s._v("页面，找到"),t("code",[s._v("New workflow")]),s._v("按钮，然后直接选择"),t("code",[s._v("set up a workflow yourself")]),s._v("创建自己的工作流。")]),s._v(" "),t("p",[s._v("默认名称是"),t("code",[s._v("main.yml")]),s._v("，可以修改，而默认路径官方也给你设置好了。接下来就是编写这个文件了，工作流可以完成的内容很多，但我们本次部署按照下面的配置就能完成，有兴趣的可以去找相关的资料。")]),s._v(" "),t("div",{staticClass:"language-yaml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# name 可以自定义")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Deploy GitHub Pages\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在 push 到 main 分支后触发")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("on")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("push")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("branches")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" main\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 任务")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("jobs")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("build-and-deploy")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 服务器环境：最新版 Ubuntu")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("runs-on")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ubuntu"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("latest\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("steps")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 拉取代码")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Checkout\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" actions/checkout@v2\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("persist-credentials")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean important"}},[s._v("false")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装node16环境")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Set up Node\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" actions/setup"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("node@v3\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("node-version")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("16")]),s._v("\n          \n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 生成静态文件")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Build\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("run")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" npm install "),t("span",{pre:!0,attrs:{class:"token important"}},[s._v("&&")]),s._v(" npm run blogs"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("build\n\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 部署到 GitHub Pages")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Deploy\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("uses")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" JamesIves/github"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("pages"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("deploy"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("action@releases/v3\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("with")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ACCESS_TOKEN")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" $"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" secrets.ACCESS_TOKEN "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 也就是我们刚才生成的 secret")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("BRANCH")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" gh"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("pages "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 部署到 gh-pages 分支，因为 main 分支存放的一般是源码，而 gh-pages 分支则用来存放生成的静态文件")]),s._v("\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("FOLDER")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" public "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vuepress 生成的静态文件存放的地方")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br"),t("span",{staticClass:"line-number"},[s._v("34")]),t("br"),t("span",{staticClass:"line-number"},[s._v("35")]),t("br"),t("span",{staticClass:"line-number"},[s._v("36")]),t("br"),t("span",{staticClass:"line-number"},[s._v("37")]),t("br")])]),t("p",[s._v("注意修改配置来适配自己的项目，比如push触发的分支，node的版本，构建打包的语句和打包生成后的存放的文件夹等等。")]),s._v(" "),t("p",[s._v("在我这个配置中，push触发的分支为main，node版本为16，构建的语句为"),t("code",[s._v("npm run blogs:build")]),s._v("，打包生成后的存放的文件夹为在根目录下的"),t("code",[s._v("public")]),s._v("。")]),s._v(" "),t("p",[s._v("然后提交这个文件就会触发工作流了，可以在Actions中看到构建的情况。")]),s._v(" "),t("p",[s._v("通常第一次都会失败（doge），但是不要慌，看看报了什么错误，比如我一开始没设置node环境报错，然后打包生成后的存放的文件夹不存在报错，一般看提示就知道问题出在哪。")]),s._v(" "),t("p",[s._v("部署到"),t("code",[s._v("gh-pages")]),s._v("分支后还要等网站部署更新，一般提交后等个几分钟网站就更新好啦。")]),s._v(" "),t("h2",{attrs:{id:"结尾"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#结尾"}},[s._v("#")]),s._v(" 结尾")]),s._v(" "),t("p",[s._v("好了，本次分享就到这里，虽然没有图片（绝对不是因为我懒），但是文字描述得也很清晰呢~")]),s._v(" "),t("p",[s._v("如果对项目本身有什么疑惑的可以看我的"),t("RouterLink",{attrs:{to:"/frontEnd/VuePress搭建博客教程.html"}},[s._v("Vuepress博客搭建篇")]),s._v("~")],1)])}),[],!1,null,null,null);t.default=e.exports}}]);