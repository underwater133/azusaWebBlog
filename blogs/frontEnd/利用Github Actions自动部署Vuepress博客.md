---
title: 利用Github Actions自动部署Vuepress博客
date: 2024-09-03
tags:
 - 前端
 - VuePress
categories: 
 - 前端随笔
sidebar: 'auto'
---
## 前言
随着自己的博客网站内容更新越来越多（虽然没人看，只是记录知识方便自己查看），每次都要手动部署比较麻烦，虽然早就听说github可以自动部署，但还没试过，今天就来玩一下。

## 准备
首先需要到github的设置里面新建一个`Personal access tokens`，用来自动化部署，想让服务器自己帮你部署，总得有个密钥吧。

设置路径是 `点击你的头像->Settings->Developer Settings->Personal access tokens->Tokens (classic)`，然后点击右上角的 `Generate new token`生成，选`classic`。

然后进入生成界面，填写一些信息，如这个token是干什么的，token有效期是多久，建议选不会过期，不用折腾。

下面选择这个token的权限，一般勾选整个`repo`就够了，其他的看着选，后面也可以更新权限的。

最后点击生成，生成之后的token记得复制保存，下一步有用，最好存到本地。

然后去到你的项目源码仓库，去创建一个仓库的secrets，就需要用到上面的token。路径为：`你的仓库页面->Settings->Secrets and variables->Actions->New repository secret`

然后填入名称和token即可。

## 编写Action
进入项目的`Actions`页面，找到`New workflow`按钮，然后直接选择`set up a workflow yourself`创建自己的工作流。

默认名称是`main.yml`，可以修改，而默认路径官方也给你设置好了。接下来就是编写这个文件了，工作流可以完成的内容很多，但我们本次部署按照下面的配置就能完成，有兴趣的可以去找相关的资料。
```yaml
# name 可以自定义
name: Deploy GitHub Pages

# 在 push 到 main 分支后触发
on:
  push:
    branches:
      - main

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 Ubuntu
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false
      # 安装node16环境
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 16
          
      # 生成静态文件
      - name: Build
        run: npm install && npm run blogs:build

      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }} # 也就是我们刚才生成的 secret
          BRANCH: gh-pages # 部署到 gh-pages 分支，因为 main 分支存放的一般是源码，而 gh-pages 分支则用来存放生成的静态文件
          FOLDER: public # vuepress 生成的静态文件存放的地方
```
注意修改配置来适配自己的项目，比如push触发的分支，node的版本，构建打包的语句和打包生成后的存放的文件夹等等。

在我这个配置中，push触发的分支为main，node版本为16，构建的语句为`npm run blogs:build`，打包生成后的存放的文件夹为在根目录下的`public`。

然后提交这个文件就会触发工作流了，可以在Actions中看到构建的情况。

通常第一次都会失败（doge），但是不要慌，看看报了什么错误，比如我一开始没设置node环境报错，然后打包生成后的存放的文件夹不存在报错，一般看提示就知道问题出在哪。

部署到`gh-pages`分支后还要等网站部署更新，一般提交后等个几分钟网站就更新好啦。

## 结尾
好了，本次分享就到这里，虽然没有图片（绝对不是因为我懒），但是文字描述得也很清晰呢~

如果对项目本身有什么疑惑的可以看我的[Vuepress博客搭建篇](/frontEnd/VuePress搭建博客教程.html)~