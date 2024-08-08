---
title: 前端通过STS方式直传至阿里云OSS（包含文件上传、下载和自动刷新stsToken）
date: 2023-07-31
tags:
 - 前端
 - 阿里云OSS
categories: 
 - 前端随笔
sidebar: 'auto'
---

## 前言
最近项目业务需要实现一个资源管理的功能，就简单学习了一下前端怎么使用阿里云OSS。

原本这些事情都是后端实现的，但这样子有许多缺点，比如文件上传需要走两次，先上传到后端，再由后端上传至阿里云OSS，既占用带宽也浪费时间；此外，前端还不能获取到真正的上传进度，只能知道上传到后端的进度，导致文件上传之后需要过一段时间才能看到，特别是文件比较大的时候。

如果能够在前端直接将文件上传到阿里云OSS上，那么上面的问题都迎刃而解。但此时又有一个安全性的问题，上传的时候是需要用到 accessKeyId 和 accessKeySecret 的，如果将其放在前端代码中，则很容易泄露遭人窃取。很显然官方也清楚存在这个问题，所以提供了另外一种方式，使用STS进行临时授权，优势如下：
1. 您无需透露您的长期密钥（AccessKey）给第三方应用，只需生成一个访问令牌并将令牌交给第三方应用。您可以自定义这个令牌的访问权限及有效期限。
2. 您无需关心权限撤销问题，访问令牌过期后自动失效。

这样子就无需把重要的密钥放在前端了，而后端的工作就是返回这些令牌供前端使用，就算暴露了也是存在有效期的，安全系数大大提高。后端的部分不是我负责的我就不讲了(好吧我也不会后端)，具体可以看[官方文档](https://help.aliyun.com/zh/oss/developer-reference/authorize-access-1)。阿里云创建用户角色和授权策略这些也能在官方文档找到，这里就不展开介绍了。

## 下载
首先需要下载阿里云OSS的sdk：
```
npm install ali-oss
```
## 封装
```js
import OSS from 'ali-oss' // 引入依赖
import { getOSSToken } from '@/api/app/xxx' // 后端接口，获取临时凭证

// 生成client
export async function getAliOssClient() {
  const data = await getOSSToken()// 获取凭证
  const parseMast = {
    bucket: data.bucketName, // bucket名称
    region: data.endpoint.split('.')[0], // 地域
    accessKeyId: data.accessKeyId, // 后端生成的临时accessKeyId，非阿里云账号的accessKeyId
    accessKeySecret: data.accessKeySecret, // 后端生成的临时accessKeySecret，非阿里云账号的accessKeySecret
    stsToken: data.securityToken,
    expiration: data.expiration, // 有效期
    refreshSTSToken: async() => { // 刷新临时访问凭证的回调，在上传大文件的时候会用到
      const info = await getOSSToken()
      return {
        accessKeyId: info.accessKeyId,
        accessKeySecret: info.accessKeySecret,
        stsToken: info.securityToken
      }
    },
    // 刷新临时访问凭证的时间间隔，单位为毫秒，在过期前一分钟刷新
    refreshSTSTokenInterval: new Date(data.expiration) - new Date() - 1000 * 60
  }
  return new OSS(parseMast) // 调用OSS依赖
}

// 下载文件
export async function downloadFromAliOss(fileName) {
  const client = await getAliOssClient()
  const response = {
    'content-disposition': `attachment; filename=${encodeURIComponent(fileName)}`
  }
  const url = client.signatureUrl(fileName, { response })
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

```
其实上传文件的部分也可以封装的，但由于上传文件的扯到其他变量，封装的话传递的参数太多了，就懒得封装了- -
## 使用
```js
// 将文件流上传oss
async onSubmit() {
  for (const item of this.fileList) {
    item.client = await getAliOssClient(this.appId)
    this.$set(item, 'percentage', 0)
    // 自定义文件名路径，如果要上传到特定的目录，需要将前缀也带上
    // 例如 fileName 为 '/a/b/c/test.txt'，会将 test.txt 上传到对应目录下
    const fileName = this.uploadPath + item.name
    // 请求oss接口上传
    // 分片上传
    item.client.multipartUpload(fileName, item.raw, {
      parallel: this.parallel, // 并发数量，一般是 4
      partSize: this.partSize, // 分片大小，一般是 1M，也就是 1024 * 1024
      progress: async(p, checkpoint) => { // 监听上传事件
        await this.onUploadProgress(item, p, checkpoint)
      },
      timeout: 120000 // 2分钟超时
    }).then((response) => {
      // console.log(response);
    }).catch((error) => {
      this.$set(item, 'myStatus', 'failed')
      console.log(error)
    })
  }
},
// 上传事件
async onUploadProgress(item, p, checkpoint) {
  if (checkpoint) {
    this.checkpoints[checkpoint.uploadId] = checkpoint // 保留分片，可以做断点续传，这部分暂时没有实现，可以参照网上的做法，或者官方文档
    item.upload = checkpoint.uploadId
  }
  // 上传进度
  item.percentage = Number((p * 100).toFixed(2))
},
// 取消上传
onCancelUpload(item, index) {
  item.client.cancel()
  this.fileList.splice(index, 1)
}
```
在这个过程中，可能会出现各种问题，但基本都能在官方文档的[常见问题](https://help.aliyun.com/zh/oss/developer-reference/faq)找到解决方法，遇到的基本都是跨域和授权策略的问题，配置一下就好了。
参考：
[阿里云OSS官方文档](https://help.aliyun.com/zh/oss/developer-reference/browser-js)
[Vue前端直传至阿里云OSS（支持断点续传，分片上传，批量上传）](https://juejin.cn/post/7077751294223450143)
有什么问题欢迎一起讨论~