(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{515:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"前言"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[s._v("#")]),s._v(" 前言")]),s._v(" "),t("p",[s._v("书接上回，上次用 JMeter 这个工具复现了在高并发的情况下往数据库插入重复数据，那么现在就要寻找解决问题的方案了。")]),s._v(" "),t("p",[s._v("其实解决的方向也很明朗，就是加锁。但关于这方面的知识，在大学里只学了点皮毛，也没有实践过，所以有点不知从何下手。")]),s._v(" "),t("p",[s._v("好在现在有了 AI，真的是编程利器，即使不能完美解决你的问题，也能给出一个大概的方向。这不，在 AI 的帮助下，我了解到了"),t("code",[s._v("synchronized")]),s._v("这个 Java 关键字，并且知道了他是属于悲观锁的一种，顺势我们先来了解一下悲观锁。")]),s._v(" "),t("h2",{attrs:{id:"悲观锁"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#悲观锁"}},[s._v("#")]),s._v(" 悲观锁")]),s._v(" "),t("p",[s._v("悲观锁假设并发冲突较多，并且认为在操作期间，其他事务会对数据进行修改。悲观锁的方式通过数据库的行级锁或表级锁来实现，或者使用语言级别的锁机制（如Java中的synchronized关键字）。悲观锁适用于并发冲突较多的场景，可以确保数据的一致性，但可能降低并发性能。")]),s._v(" "),t("h2",{attrs:{id:"synchronized"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#synchronized"}},[s._v("#")]),s._v(" synchronized")]),s._v(" "),t("p",[s._v("从悲观锁的描述可以了解到，一般是通过行锁或者表锁来实现，但我对此也并不熟悉（后续可能再开一篇文章记录一下学习过程），所以我把目光放在了"),t("code",[s._v("synchronized")]),s._v("上。")]),s._v(" "),t("h3",{attrs:{id:"用法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#用法"}},[s._v("#")]),s._v(" 用法")]),s._v(" "),t("p",[s._v("经过了解，synchronized 的用法有以下 3 种：")]),s._v(" "),t("ol",[t("li",[s._v("加在普通方法上；")]),s._v(" "),t("li",[s._v("加在静态方法上；")]),s._v(" "),t("li",[s._v("加在代码块上。")])]),s._v(" "),t("p",[s._v("这三种用法是有区别的，但也很好理解，这里就不大费周章说明其中的原理了，因为网上有很多类似的说明，我直接进行总结。")]),s._v(" "),t("p",[s._v("如果加在普通方法上，则只有获得了锁的线程可以访问这个方法，其他线程只能够等待直到这个线程释放锁；\n如果是加在静态方法上，则锁的是整个类，也就是说，不止别的线程不能访问这个方法，并且不能访问这个类，需等待锁被释放；\n最后一种是加在代码块上，这个更好理解了，和普通方法类似，但是它的粒度更小，这一段被锁住的代码块，其他线程不能进行访问，会等待至锁被释放。")]),s._v(" "),t("p",[s._v("这三种其实就是锁的粒度不同，需要根据自己的业务需求选择不同粒度的锁。根据我的代码，AI 给出了加在代码块上和加在整个方法上这两种方案，经过实践与思考，只有加在整个方法上可以解决问题。")]),s._v(" "),t("p",[s._v("先来看加在代码块上的：")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CustPro")]),s._v(" cust"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("HttpServletRequest")]),s._v(" request"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("HttpServletResponse")]),s._v(" response"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@RequestParam")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("value "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"scriptName"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" required "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MultipartFile")]),s._v(" file"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CustPro")]),s._v(" selectCompPro"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("synchronized")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("this")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 将查询是否存在的代码变为同步的")]),s._v("\n        selectCompPro "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" custProService"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("selectCompPro")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cust"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("selectCompPro "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"项目名已存在"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" id "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" request"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getParameter")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"id"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("||")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("equals")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//新增")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ...")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 修改")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ...")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br")])]),t("p",[s._v("咋一看好像没问题，不同线程在查询项目名是否存在时需要排队，那么第一次插入之后后面查询出来的结果就都是已存在了，不会重复插入。但实际情况并不是这样，甚至说synchronized加在这里毫无意义。当第一个拿到锁的线程执行完查询后释放锁，在还没插入成功之前，就有若干个线程已经拿到锁并且查询和释放锁了，他们查询的结果同样都是库里不存在同名的项目名，然后他们就都可以毫无阻拦的把数据入库了。")]),s._v(" "),t("p",[s._v("这时候可能有人会想（包括我），那再加大代码块的范围，把插入语句都包裹进来不就好了，确实，但这不就和加在整个方法上一样了- -。")]),s._v(" "),t("p",[s._v("所以来看看加在方法上的写法：")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("synchronized")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CustPro")]),s._v(" cust"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("HttpServletRequest")]),s._v(" request"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("HttpServletResponse")]),s._v(" response"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@RequestParam")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("value "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"scriptName"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" required "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MultipartFile")]),s._v(" file"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CustPro")]),s._v(" selectCompPro "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" custProService"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("selectCompPro")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("cust"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("selectCompPro "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"项目名已存在"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" id "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" request"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("getParameter")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"id"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("||")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("equals")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//新增")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ...")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 修改")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ...")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br")])]),t("p",[s._v("经过测试，该方法确实管用，但是也存在一定问题，比如在性能方面可能会大打折扣，并且如果是在分布式系统上，synchronized 也不能起到很好的作用。但好在公司开发的这个系统（数据稽核系统），其实只有几个人在用，其实完全没有高并发的情况存在，但是系统的测试流程还是要走的，所以才有了本篇文章。。并且这个也不是分布式系统（虽然没了解过解决方案，但应该是得用数据库的行锁和表锁了），总之还是很适合使用 synchronized 的。")]),s._v(" "),t("h3",{attrs:{id:"浅谈原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浅谈原理"}},[s._v("#")]),s._v(" 浅谈原理")]),s._v(" "),t("p",[s._v("synchronized 关键字的原理是基于对象监视器（Monitor）的概念来实现线程同步。")]),s._v(" "),t("p",[s._v("当一个线程进入 synchronized 修饰的代码块或方法时，它会尝试获取被修饰对象的监视器（也称为锁），从而进入临界区。其他线程在此期间无法获取相同对象的监视器，因此无法同时进入临界区，而是被阻塞等待。")]),s._v(" "),t("p",[s._v("具体原理如下：")]),s._v(" "),t("p",[s._v("进入临界区：当线程尝试进入 synchronized 代码块或方法时，首先需要尝试获得所修饰对象的监视器。如果该监视器当前没有被其他线程所持有，则当前线程获取到了锁，进入临界区执行代码。")]),s._v(" "),t("p",[s._v("锁竞争与阻塞：如果其他线程已经持有了相同对象的监视器，那么当前线程就需要等待，直到锁被释放。当前线程会进入锁竞争状态，与其他等待锁的线程进行竞争。一旦持有锁的线程释放了锁，JVM会选择其中一个等待线程获取锁，并使其进入临界区。")]),s._v(" "),t("p",[s._v("释放锁：当线程执行完 synchronized 代码块或方法中的所有语句后，它会自动释放所持有的锁。这样，其他等待锁的线程将有机会获取锁并继续执行临界区内的代码。")]),s._v(" "),t("p",[s._v("需要注意的是，每个 Java 对象都有一个与之相关联的监视器。当使用 synchronized 关键字修饰非静态方法时，它使用的是该对象的监视器；当使用 synchronized 关键字修饰静态方法时，它使用的是类的 Class 对象的监视器。")]),s._v(" "),t("p",[s._v("synchronized 关键字在 Java 中提供了简单有效的线程同步机制，可以确保共享数据的安全性和一致性。然而，在使用 synchronized 时，需要注意锁的粒度、死锁问题以及性能影响等因素。")]),s._v(" "),t("h3",{attrs:{id:"锁优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#锁优化"}},[s._v("#")]),s._v(" 锁优化")]),s._v(" "),t("p",[s._v("Java团队从jdk1.6后对synchronized进行了多项优化，以提高性能和并发效率：\n1.锁粗化（Lock Coarsening）：Java虚拟机会将连续的多个synchronized块合并为一个更大的同步块，减少获取锁和释放锁的次数，从而减少线程切换的开销。\n2. 锁消除（Lock Elimination）：在某些情况下，虚拟机可以通过静态分析技术确定某些对象不会被其他线程访问到，因此可以消除这些对象上的同步操作。\n3. 偏向锁（Biased Locking）：当一个线程获取到锁后，如果没有竞争，Java虚拟机会偏向于这个线程，将锁标记为偏向锁，并不再检查锁的状态。这样可以降低无竞争情况下的锁操作的开销。\n4. 适应性自旋（Adaptive Spinning）：Java虚拟机会动态地调整自旋等待的时间，在无竞争情况下，允许线程进行一定的自旋等待，避免线程进入阻塞状态，从而提高性能。\n5. 轻量级锁：轻量级锁是为了避免多个线程之间的竞争，而针对单个线程进行优化的一种锁机制。当一个线程获取到锁时，JVM会将对象头中的一部分数据拷贝到线程栈帧的锁记录（Lock Record）中，并将对象头中的Mark Word替换为指向锁记录的指针。这样，在未发生竞争的情况下，线程只需要在自己的锁记录中修改Mark Word即可，无需进行互斥操作。如果发生竞争，即其他线程试图获取同一个锁时，轻量级锁会膨胀为重量级锁。\n6. 重量级锁：重量级锁是synchronized关键字的传统实现方式，基于操作系统提供的互斥原语（如mutex、semaphore等）。当多个线程争用同一个锁时，JVM会将对象转为重量级锁，将线程置于阻塞状态，进入操作系统级别的线程调度，直到锁被释放。")]),s._v(" "),t("p",[s._v("轻量级锁和重量级锁在JVM中的使用是动态的，根据实际竞争情况进行锁的升级和降级。在开始时，JVM会尝试使用轻量级锁来提高性能。如果发生竞争，锁会逐渐膨胀为重量级锁，以保证数据的一致性。")]),s._v(" "),t("h2",{attrs:{id:"结尾"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#结尾"}},[s._v("#")]),s._v(" 结尾")]),s._v(" "),t("p",[s._v("原理其实还很复杂，比如是如何自旋的，轻量级是怎么升级为重量级的，偏向锁是如何标记、底层代码是如何实现的等等，我虽然看了一遍，但本次目标主要是如何使用这个关键字，就不在这里大费周章了，学到这里感觉已经差不多了-v-。")])])}),[],!1,null,null,null);t.default=e.exports}}]);