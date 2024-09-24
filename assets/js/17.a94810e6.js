(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{448:function(s,t,a){s.exports=a.p+"assets/img/1712817924064.472877a0.png"},498:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"前言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[s._v("#")]),s._v(" 前言")]),s._v(" "),t("p",[s._v("光阴似箭，过了个年一晃就四月份了，工作之后时间真的过的飞快。从去年年底到现在都挺忙的，没什么时间更新（绝对不是因为我懒），最近趁着空闲时间，记录下一些比较常见和重要的问题，例如本次的按钮级权限控制，这里面涉及到挺多的，也让我受益匪浅。")]),s._v(" "),t("h2",{attrs:{id:"角色"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#角色"}},[s._v("#")]),s._v(" 角色")]),s._v(" "),t("p",[s._v("既然谈到了权限控制，那么肯定离不开角色，因为不同的角色拥有不同的权限，抛离了角色这个概念，那么权限控制也没有多大意义了。")]),s._v(" "),t("p",[s._v("所以我们这里假定是系统有了这个为用户配置角色的功能，例如管理员、测试、前端开发等等。")]),s._v(" "),t("h2",{attrs:{id:"菜单"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#菜单"}},[s._v("#")]),s._v(" 菜单")]),s._v(" "),t("p",[s._v("在按钮级的权限控制实现之前，也需要先实现菜单权限的分配。这个功能一般和角色分配是绑定在一起的，情景是管理员可以为不同的角色分配不同的菜单，当用户登录后，请求的菜单列表就是用户的角色所被分配的菜单。")]),s._v(" "),t("p",[s._v("当然，菜单权限配置的功能是可以细化到按钮级别的，在给角色分配某个菜单时，可以针对这个菜单分配一些功能权限，例如新增、修改、删除、导入导出等权限，那么页面上的按钮就会受到这些权限的限制，若没有权限则不能点击或者干脆隐藏起来了。")]),s._v(" "),t("p",[s._v("那么这里要讲的就是在前端如何通过结合自定义指令、vuex来控制按钮权限。")]),s._v(" "),t("h2",{attrs:{id:"按钮级权限控制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#按钮级权限控制"}},[s._v("#")]),s._v(" 按钮级权限控制")]),s._v(" "),t("p",[s._v("整体的思路就是在登录后，将用户信息保存到vuex中，里面就包含了用户的角色。当我们进入到页面组件时，里面的按钮就可以通过自定义指令来检查当前用户是否拥有权限，例如：")]),s._v(" "),t("div",{staticClass:"language-vue line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-vue"}},[t("code",[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("el-button")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("v-permission")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("permission.add"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("size")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("mini"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("type")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("primary"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("icon")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("el-icon-plus"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("@click")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("xxx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n  新增\n"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("el-button")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n\npermission: {\n  add: ['admin', 'roles:add'],\n  edit: ['admin', 'roles:edit'],\n  del: ['admin', 'roles:del']\n},\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br")])]),t("p",[s._v("其中，v-permission就是用来鉴权的自定义指令，具体如何实现的稍后再说，先解释一下permission这个对象的含义。")]),s._v(" "),t("p",[s._v("key值应该很明显，就是指具体哪一个功能，如新增、编辑、修改。而value这个数组指的是，这个操作所需要的权限标识，其中admin作为超级管理员，可以无视权限标识，而后面的roles:add则代表新增操作需要用户持有此权限标识。")]),s._v(" "),t("p",[s._v("那么这个权限标识是哪里来的呢，其实是在配置菜单权限时配置的，上图：\n"),t("img",{attrs:{src:a(448)}}),s._v("\n如图，我们为部门管理这个页面配置了3个按钮权限，那么用户就需要持有这些权限才可执行对应操作。在为角色配置菜单时，也就相当于将授权给角色，后端需要把这些标识信息与角色绑定。")]),s._v(" "),t("p",[s._v("接下来就是自定义指令了，在渲染按钮时就需要鉴权，如果权限不足则不渲染。")]),s._v(" "),t("div",{staticClass:"language-vue line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-vue"}},[t("code",[s._v("inserted(el, binding) {\n  // value就是通过指令传来的值，例如['admin', 'roles:add']\n  const { value } = binding\n  // 通过store拿到用户角色拥有的权限\n  const roles = store.getters && store.getters.roles\n  if (value && value instanceof Array) {\n    if (value.length > 0) {\n      const permissionRoles = value\n      // 只要角色拥有所需权限中的其中一个，则可以通过认证\n      const hasPermission = roles.some(role => {\n        return permissionRoles.includes(role)\n      })\n      // 若没有权限则将对应的按钮删除\n      if (!hasPermission) {\n        el.parentNode && el.parentNode.removeChild(el)\n      }\n    }\n  } else {\n    throw new Error(`使用方式： v-permission=\"['admin','editor']\"`)\n  }\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br")])]),t("p",[s._v("这里用的是自定义指令生命周期中的inserted，也就是被绑定元素插入父节点时调用，有了该指令，就能够愉快地对各个按钮进行鉴权了。")]),s._v(" "),t("p",[s._v("但是这里其实有一个坑，当你使用第三方ui库的时候，给某些组件配置属性时，组件内部的实现可能没有那么直接，你配置的属性也不一定在你想要的地方生效，说起来可能有点抽象，举个例子：")]),s._v(" "),t("div",{staticClass:"language-vue line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-vue"}},[t("code",[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("el-table")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("xxx")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("el-table-column")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("prop")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("xxx1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("label")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("xxx1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("el-table-column")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("prop")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("xxx2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("label")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("xxx2"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("el-table-column")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("prop")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("xxx3"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("label")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("xxx3"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("el-table-column")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("label")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("操作"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("width")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("100px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("template")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("slot-scope")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("scope"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("el-button")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("v-permission")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("permission.edit"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("size")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("mini"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("type")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("primary"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("@click")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("xxx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n        修改\n      "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("el-button")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("el-button")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("v-permission")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("permission.edit"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("size")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("mini"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("type")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("danger"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("@click")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("xxx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n        删除\n      "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("el-button")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("template")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("el-table-column")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("el-table")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br")])]),t("p",[s._v("这是个很常见的表格，操作列有编辑和删除，咋一看好像没啥问题，但是实际上，如果没有权限的话，这两个按钮将会被删除。")]),s._v(" "),t("p",[s._v("那么在这一列上除了表头就啥也没有了，看起来空空的很怪异，那么能不能把整一列都给删掉呢？比如把v-permission加在el-table-column上？")]),s._v(" "),t("p",[s._v("一开始我也是这么想的，但实际操作后发现根本不管用，在页面检查元素的时候才发现，这里配置的这些列都不是实际渲染的列，而是被隐藏起来了，如果想要删掉最后一列，应该在渲染之前就把el-table-column给干掉。")]),s._v(" "),t("p",[s._v("这时候v-permission的确起不了作用了，即使删掉了被隐藏的那一列也无济于事，这时就只能用自带的v-if来解决了，写一个功能类似的函数，挂在Vue实例上，然后就可以全局通用了：")]),s._v(" "),t("div",{staticClass:"language-vue line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-vue"}},[t("code",[s._v("Vue.prototype.checkPer = (value) => {\n  if (value && value instanceof Array && value.length > 0) {\n    const roles = store.getters && store.getters.roles\n    const permissionRoles = value\n    return roles.some(role => {\n      return permissionRoles.includes(role)\n    })\n  } else {\n    console.error(`need roles! Like v-permission=\"['admin','editor']\"`)\n    return false\n  }\n}\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br")])]),t("p",[s._v("虽然逻辑差不多，但这里返回的是true或false，就可以通过v-if来鉴权了，例如：")]),s._v(" "),t("div",{staticClass:"language-vue line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-vue"}},[t("code",[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("el-table-column")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("v-if")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("checkPer(['admin','roles:edit','roles:del'])"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("label")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("操作"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),s._v(" "),t("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("width")]),t("span",{pre:!0,attrs:{class:"token attr-value"}},[t("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("130px"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("el-table-column")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("如果都不具备这些权限的话，则这一整列都不会被渲染了，这个弥补了v-permission的缺陷，可以根据需要来选择使用哪种方法。")]),s._v(" "),t("h2",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),t("p",[s._v("这里的按钮级权限就是在菜单权限得基础上再做细化，连同菜单里的按钮权限一同配置了，而这些权限是针对角色的，而非用户，因为可以将用户划分为不同的角色。在配置按钮权限时需要配置权限标识，代表是哪个模块什么功能的，一般是增删改查。")]),s._v(" "),t("p",[s._v("后端通过框架+注解就能进行鉴权了，而在前端控制按钮权限（显隐）可以通过自定义指令来实现，对必要的权限进行检查，在自定义指令不满足业务要求的情况下，可以使用v-if和全局方法来起到类似的结果。")])])}),[],!1,null,null,null);t.default=e.exports}}]);