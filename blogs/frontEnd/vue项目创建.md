---
title: vue项目创建
date: 2024-04-24
tags:
 - 前端
categories: 
 - 前端随笔
sidebar: 'auto'
---
## vue-cli
首先安装脚手架
```
npm install -g @vue/cli
```
安装后在cmd按vue -V能看到版本则安装成功。
```
vue create vue-project
```
默认可选带有babel和eslint的vue2或者vue3版本。

也可以自选需要自带哪些库，里面有vuex、router、typescript等，按空格选择，选完按回车，就可以选择vue的版本和配置你所选择的库。

具体可以参考[https://blog.csdn.net/H524268015wsw/article/details/127918130](https://blog.csdn.net/H524268015wsw/article/details/127918130)

## vite
```
npm create vite@latest
```
首次创建会提示安装```create-vite@5.2.3```，直接按y即可。

然后可以选择创建各种框架的项目，这里选择vue，然后可以选择使用语言JavaScript或者Typescript，也可以自定义选择其他配置。
首次选择会提示安装```create-vue@3.10.3```，按y安装后根据需求选择配置后即可完成创建。


## 为项目安装css预处理器
像是用vite创建的项目中就不能预选css预处理器，所以需要手动安装，一般就是选用sass或者less，这里以安装sass为例子。

需要安装node-sass和sass-loader，最好按顺序安装，并且需要根据自己的nodejs版本来选择安装这两个库的版本，可以参考[https://blog.csdn.net/weixin_47908090/article/details/137912435](https://blog.csdn.net/weixin_47908090/article/details/137912435)

因为此电脑node版本为16+，故安装命令如下：
```
npm i node-sass@6.0.1 sass-loader@10.2.0 --save-dev
```
然后直接在vue文件中，给style标签加上lang="scss"即可。

然后就报错```Internal server error: Preprocessor dependency "sass" not found. Did you install it? Try npm install -D sass```

根据提示安装：
```
npm install -D sass
```
安装之后scss的样式就能正常生效了，并且把node-sass卸载了也可以正常运行。

除了将样式直接写在组件还可以通过引入外部scss文件，引入方式可以分为局部引入和全局引入。
1. 局部引入
    ```vue
    <template>
      <div class="about">
        <h1 class="info fc">This is an about page</h1>
      </div>
    </template>
    <style scoped lang="scss">
    @import "@/assets/mixin.scss";
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
      .info {
        font-size: 40px;
      }
    }
    </style>
    <script setup lang="ts">
    </script>
    ```
2. 全局引入
    ```ts
    // vite.config.ts
    export default defineConfig({
      plugins: [
        vue(),
        VueDevTools(),
      ],
      resolve: {
        alias: { // 配置@
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      css: {
        // CSS 预处理器
        preprocessorOptions: {
          scss: {
            additionalData: `@import '@/assets/mixin.scss';`,
          }
        }
      },
    })
    ```
    然后就可以在各个组件中使用全局样式了，但需要在style标签加上 lang="scss"。

后来测试了用vue-cli3创建的node14版本的项目，可以使用node-sass和sass-loader，且全局引入的配置方式有所差异。

安装命令：
```
npm i node-sass@4.14.1 sass-loader@7.3.1 --save-dev
```
全局配置：
```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
   transpileDependencies: true,
   css: {
      loaderOptions: {
         scss: {
            // prependData: `@import "./src/assets/mixin.scss";`,
            data: `@import "@/assets/mixin.scss";`,
         }
      }
   },
   chainWebpack: config => {
      // 设置别名
      config.resolve.alias
              .set('@', require('path').resolve(__dirname, 'src'))
   }
})
```
如果缺少path模块需要按提示安装。可以看到cli和vite配置方式有点不同，如这个设置别名和全局引入scss，这些差异有时候也是挺搞的，网上许多方法也不适合自己，还是得多试试。

