---
title: VuePress搭建博客教程（含部署到github）
date: 2023-04-03
tags:
 - 前端 VuePress
categories: 
 - 前端随笔
sidebar: 'auto'
---

## 前言
本人也是第一次用这个框架，边学边搭建，过程中遇到许多问题，以此做个记录，希望能帮助到你。

普通的搭建过程就不再描述了，我自己跟着[这篇博客](https://blog.csdn.net/xiaoxianer321/article/details/119548202)敲了一遍，没啥大问题。

这里直接从安装主题开始，使用的主题是[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)。
## 安装主题
```
npm install @vuepress-reco/theme-cli -g
```
安装完成之后就可以创建项目了
```js
theme-cli init azusaWebBlog
// 填写一些项目相关的信息
// style选的是blog的1.x版本
```
创建完成之后进入项目文件夹，先把依赖都装好了
```
npm install
```
## 目录结构
安装，可以看到目录结构是这样的：
```
azusaWebBlog
- .vuepress
  + public
    ...
  + config.js
- blogs
  + category1
    ...
  + category2
    ...
  + other
    ...
- docs
  + theme-reco
    ...
- gitignore
- node_modules
- package.json
- README.md
```
仔细看我们会发现，他的目录结构和官方的不太一样，并且package.json中的启动项目的脚本也不一致：
```js
// package.json
// 本项目的
"scripts": {
  "dev": "vuepress dev . --open --host \"localhost\"",
  "build": "vuepress build ."
}

// 官方的
"scripts": {
  "dev": "vuepress dev docs",
  "build": "vuepress build docs"
}
```
后面的参数比较好理解，--open是启动项目后自动从浏览器打开，--host是指定主机。

那么主要的差别就是vuepress dev/build 后面的 . 和docs了。

通过分析项目结构不难发现，项目的主要配置在config.js里，也就是在.vuepress目录下。因为官方目录是把.vuepress和其他所有目录丢在docs里面的，所以他的脚本后面跟的是docs。而这个主题他的目录结构是吧docs里的抽离出来了，所以使用的是 .。

因为我打算只用来记录博客，docs的功能我不太需要，所以就把这个目录删了。

并且比较喜欢官方的目录结构，所以我把东西都移到了.blogs下，所以我的结构变成了这样子：
```
azusaWebBlog
- blogs
  + .vuepress
    + public
      ...
    + config.js
  + category1
    ...
  + category2
    ...
  + other
    ...
- gitignore
- node_modules
- package.json
- README.md
```
当然，如果这么修改的话也要修改对应的启动和编译项目脚本：
```js
// package.json
"scripts": {
  "blogs:dev": "vuepress dev blogs --open --host \"localhost\"",
  "blogs:build": "vuepress build blogs"
}
```
然后运行脚本就可以启动啦！
```
npm run blogs:dev
```

## 配置
关于博客信息、导航栏、侧边栏啥的一些配置前面提到的那篇博客里面都有，也有[官方文档](https://vuepress.vuejs.org/zh/guide/)可以参考，我就不再介绍了，这里介绍一下一点其他的。

### 配置中文
主题默认的语言是英语的，如果想要变成中文需要自己修改：
```js
// config.js
module.exports = {
  ...
  "locales": {
    '/': {
      "lang": "zh-CN"
    }
  }
}
```

### 热部署
由于本身没有实时更新，写文档的时候看不到效果，所以还是得自己配置：
```js
"scripts": {
  "blogs:dev": "vuepress dev blogs --open --host \"localhost\" --temp .temp",
  "blogs:build": "vuepress build blogs"
},
```
启动之后后生成目录.temp，如果不想引入到git上，在gitignore上把它忽略就好了。

## 部署
我们先把自己的代码提到github上。

在github上创建一个名称为azusaWebBlog的仓库，然后在本地初始化git，链接到远程仓库上，然后就可以提交项目了。
```
git init
git add .
git commit -m "初始化网站"
git branch -M main
git remote add origin https://github.com/underwater133/azusaWebBlog.git // 对应你自己的仓库地址
git push -u origin main
```
经过这一套连招，我们的项目就上传到github上了，接下来开始正式部署。

因为我打算发布到 https://\<USERNAME\>.github.io/\<REPO\>/，所以我需要修改.vuepress/config.js中的base：
```js
module.exports = {
  "base": "/azusaWebBlog/", // 仓库名称
  ...
}
```

然后在项目的根目录创建deploy.sh脚本：
```sh
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run blogs:build

# 进入生成的文件夹
cd blogs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:underwater133/azusaWebBlog.git master:gh-pages

cd -
```
然后在gitbash上运行这个脚本就OK啦。

去到github可以看到打包后的项目放在了gh-pages的分支了，也可以访问自己的博客网站了！