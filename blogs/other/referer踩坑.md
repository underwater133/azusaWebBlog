---
title: referer踩坑
date: 2023-11-29
tags:
 - 请求头
 - java
 - 前端
categories: 
 - 其他
sidebar: 'auto'
---

## 发现问题
公司系统出现了一个bug，就是在单点登陆的时候，跳转到系统会展示页面不存在，这虽然是我们自己的页面，但是奇怪的事情发生了。如果是在IE浏览器（3202年了还真有人在用IE啊），再次刷新一下就可以进入系统，而如果是谷歌或者火狐等热门的浏览器，无论怎么刷新都还是一样，显示页面不存在。

最蛋疼的还是我们这边运维还得用云桌面去登陆系统，那个云桌面上还没有IE浏览器。先吐槽一下，公司这系统我没来之前都运行好几年了，没人解决这个问题啊，离谱！

好了，言归正传，既然浏览器之间有差异，而且还和IE浏览器有关，那大概率就是它的问题！但是现在还不知道是什么原因导致的，只能从代码入手，看看是哪里出了问题。

## 解决问题
由于我想登陆4A系统有诸多障碍，不能实现单点登陆，只能在本地模拟单点登录跳转。经过一段时间的追踪，终于让我在以下代码中发现了端倪：
```java
public class RefererFilter extends HttpServlet implements Filter {
    private FilterConfig filterConfig;

    public void init(FilterConfig config) {
        this.filterConfig = config;
    }

    public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        // 链接来源地址
        String referer = request.getHeader("referer");
        if ( StringUtils.isEmpty( referer ) || referer.contains(request.getServerName())) {
            chain.doFilter(request, response);
        } else {
            //链接地址来自其他网站，则返回错误页面
            req.getRequestDispatcher("/WEB-INF/views/error/404.jsp").forward(request, response);
        }
    }

    public void destroy() {
        this.filterConfig = null;
    }

}
```
很明显，就是因为单点登录的来源是其他网站，导致判断进入了 else 分支，返回了错误页面，但神奇的是IE浏览器重新刷新之后就能进入系统了（这也是这个bug能藏这么久的原因，大家都懒得改，反正在IE上能用，后面使用云桌面没有IE才不得已来解决这个问题）。

根据判断条件，矛头指向了 referer 这个请求头上。第一个判断条件是 referer 是否为空，而第二个判断条件则是 referer 是否包含了系统服务器的名称，该名称可以是服务器的主机名或IP地址，具体取决于服务器的配置。

总之，如果 referer 为空或者是同站就能正常跳转，否则显示 404 页面。既然知道了问题出在了 referer 上，那就在不同浏览器打断点测试以下，结果表明：**IE浏览器在刷新时，会清除 referer 请求头，而谷歌、火狐等浏览器则不会**，真的坑啊。

既然找到了问题的原因也就好解决了，把4A页面的地址加入白名单即可，问题完美解决。

从结果来看挺简单的，但解决的流程十分麻烦，一开始以为是登陆认证的问题，后面虽然知道是不同浏览器之间的差异，但也没有想到是 referer 头，直到从 404 页面往回找才发现了其实是 referer 和IE浏览器在作祟。总之还是年轻了，其实应该可以想到的，从结果往回找，而不是自己去猜测浪费时间。

虽然问题解决了，但还是顺便学习一下 referer 这个请求头吧。

## Referer
referer 是请求头的一部分，当浏览器向web服务器发送请求的时候，一般会带上 referer，告诉服务器该网页是从哪个页面链接过来的，服务器因此可以获得一些信息用于处理。

referer 的正确英语拼法是 referrer。由于早期 HTTP 规范的拼写错误，为了保持向后兼容就将错就错了。其它网络技术的规范企图修正此问题，使用正确拼法，所以拼法不统一。

referer 的作用也很多，可以统计网站流量，也可以做防盗链和阻止恶意请求，如果来源不明就可以做出防范。

## Referer-policy
既然提到了 referer，那也不得不提 Referer-policy，因为这个字段可以规定 referer 的使用规则：
1. no-referrer
  不发送Referer字段。
2. no-referrer-when-downgrade
  如果从 HTTPS 网址链接到 HTTP 网址，不发送Referer字段，其他情况发送（包括 HTTP 网址链接到 HTTP 网址）。这是浏览器的默认行为。
3. same-origin
  链接到同源网址（协议+域名+端口 都相同）时发送，否则不发送。注意，https://foo.com链接到http://foo.com也属于跨域。
4. origin
  Referer字段一律只发送源信息（协议+域名+端口），不管是否跨域。
5. strict-origin
  如果从 HTTPS 网址链接到 HTTP 网址，不发送Referer字段，其他情况只发送源信息。
6. origin-when-cross-origin
  同源时，发送完整的Referer字段，跨域时发送源信息。
7. strict-origin-when-cross-origin
  同源时，发送完整的Referer字段；跨域时，如果 HTTPS 网址链接到 HTTP 网址，不发送Referer字段，否则发送源信息。
8. unsafe-url
  Referer字段包含源信息、路径和查询字符串，不包含锚点、用户名和密码。

如果不设置的话，则默认是选择第七条策略，也就是 strict-origin-when-cross-origin。

设置的方法也很简单，前端后端都可以设置，以下是前端的设置方法：
```html
<!DOCTYPE html>
<html>
<head>
    <title>Referer Policy Example</title>
    <meta http-equiv="Referer-Policy" content="no-referrer">
</head>
<body>
    <h1>Referer Policy Example</h1>
    <p>This page has a no-referrer policy, so the previous page cannot know which page you came from.</p>
</body>
</html>
```
后端也可以在过滤器中添加：
```java
public class HeaderFilter extends HttpServlet implements Filter {
    public void init(FilterConfig config) {

    }

    public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain) throws ServletException, IOException {
        HttpServletResponse response = (HttpServletResponse) res;
        res.setHeader("Referrer-Policy", "no-referrer");
        chain.doFilter(request, response);
    }

    public void destroy() {

    }
}
```

当然，虽然这些策略加强了安全性，但有些也是可以绕过的。比如我们在浏览器地址栏直接进入网站的时候，referer 是为空的，但是其实是可以请求到资源的，那么我们就可以利用这一点，比如在请求图片时使用```<img src="https://example.com/image.jpg" referrer="no-referrer">```这将使你的网站在请求图片时不发送Referrer信息，从而避免防盗链措施的触发。当然想让你的图片防止被盗用，也可以使用```<img src="yourimage.jpg" referrerPolicy="same-origin">```来实现，这样就只有同源的网站能引用了。

好了，本次的 bug 修复和 referer 学习分享就到这里啦。