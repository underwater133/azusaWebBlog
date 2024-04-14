---
title: Java项目笔记
date: 2024-04-14
tags:
 - 后端
 - Java项目
 - spring boot
categories: 
 - Java
sidebar: 'auto'
---
## 前言
本篇是我在做Java项目时记录的一些笔记，虽然都比较基础，但对于我一个前端来说，目前也够用了。

在做完苍穹外卖这个项目之后，不仅让我了解到后端是如何开发的，也对前后端开发的整体流程有了一个新的认识。

这些知识可以让我在和后端对接的时候，能够站在不同的角度思考问题，考虑也会更加全面，在遇到问题的时候，也能更加快速且清晰地定位问题。

## Swagger
用于生成接口文档，并且可以在线进行接口调试。

由于原版配置比较繁琐，建议使用Knife4j框架，其对Swagger进行了封装，简化了配置。

导入依赖
```
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version>
</dependency>
```

配置类
```java
/**
 * 配置类，注册web层相关组件
 */
@Configuration // 声明配置类
// @Configuration注解是Spring框架中用来标识一个类是配置类的注解。
// 使用@Configuration注解的类表示这个类是一个Spring的配置类，其中可能包含了@Bean注解用于定义Bean的实例化方式。
// 通过@Configuration注解，Spring框架可以识别并加载这个配置类，从而实现对应的配置信息。
@Slf4j
// `@Slf4j`是一个注解，它是在Java中一种用来简化日志输出的工具。它是基于简单日志门面（Simple  Logging  Facade  for  Java，SLF4J）的一种简写，可以让开发者在编写日志时不再需要调用特定的日志框架，而是通过简单的注解和变量，即可实现日志的输出。这样可以方便开发者在不同的日志框架之间切换，而不需要修改大量的代码。
public class WebMvcConfiguration extends WebMvcConfigurationSupport {
    /**
     * 通过knife4j生成接口文档
     * @return
     */
    @Bean  // 声明一个第三方bean（对象），由Spring来进行管理
    public Docket docket() {
        // 加入knife4j配置信息
        ApiInfo apiInfo = new ApiInfoBuilder()
                .title("苍穹外卖项目接口文档")
                .version("2.0")
                .description("苍穹外卖项目接口文档")
                .build();
        Docket docket = new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.sky.controller")) // 指定扫描的包
                .paths(PathSelectors.any())
                .build();
        return docket;
    }

    /**
     * 设置静态资源映射，否则无法访问
     * @param registry
     */
    // 重写父类方法
    // 如果没有设置静态资源映射，访问/doc.html则会被spring认为是在请求某个Controller而返回404
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 相当于静态资源放行
        registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
```

### swagger常用注解
1. @Api 用在类上，例如Controller，表示对类的说明；
2. @ApiModel 用在是实体类上，例如entity、DTO、VO
3. @ApiModelProperty 用在属性上，描述属性信息
4. @ApiOperation 用在方法上，例如Controller的方法，表明方法的作用

```java
@Api(tags = "员工相关接口")
public class EmployeeController {
    //...
    @ApiOperation(value = "员工登录") // values可以省略
    public Result<EmployeeLoginVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO) {
        //...
    }
}

@ApiModel(description = "员工登录返回的数据格式")
public class EmployeeLoginVO implements Serializable {

    @ApiModelProperty("主键值")
    private Long id;

    @ApiModelProperty("用户名")
    private String userName;

    @ApiModelProperty("姓名")
    private String name;

    @ApiModelProperty("jwt令牌")
    private String token;

}
```
## 常见注解

### @Bean
@Bean 注解用于在Java配置类的方法上，表明该方法将会返回一个对象实例，并且这个对象将被Spring IoC容器作为Bean进行管理。这意味着当你调用该方法时，Spring会调用它并将返回的对象注册为容器中的一个bean。
当项目启动时，Spring IoC容器会调用该方法，将返回的对象注册为Spring IoC容器中的一个bean。
```java
@Configuration
public class MyConfig {
    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```

### @Component
@Component注解在Java Spring框架中起到核心作用，它的主要功能和作用如下：
1. 定义Bean：@Component 是Spring框架提供的一个注解，用于标记在一个类上，表明这个类将会被Spring IoC（Inversion of Control，控制反转）容器作为Bean进行管理。这意味着当Spring应用启动时，Spring会扫描带有 @Component 注解的类，并将它们实例化并纳入到Spring容器中。
2. 自动扫描：为了实现自动化Bean的创建，通常会在Spring配置类中使用 @ComponentScan 注解来指定需要扫描的包路径，Spring会扫描这些路径下所有标注了 @Component、@Service、@Repository 或 @Controller 的类（这些注解都是 @Component 的特殊变体，拥有相同的功能，但增加了语义上的含义）。
3. 依赖注入：通过将类声明为组件，开发者可以利用Spring的依赖注入特性，即通过构造器注入、setter方法注入或字段注入的方式，在无需手动创建对象的情况下注入其他服务或资源。
4. 简化IoC：@Component 使得开发者能够更专注于业务逻辑的开发，而不需要关心对象的创建和依赖关系的管理，降低了代码之间的耦合度，遵循了IoC的设计原则。

总结来说，@Component 注解是Spring框架中用于标记候选bean（Component）的核心注解，它实现了应用程序组件与Spring IoC容器的无缝集成。

### @ConditionalOnMissingBean
@ConditionalOnMissingBean 是一个条件注解，它可以修饰另一个带有 @Bean 的方法或自动配置类。
当Spring容器启动并读取配置时，如果发现指定类型的bean尚未存在，则执行带有此注解的bean定义加载操作；
反之，如果已经存在相同类型的bean，那么被此注解标记的bean就不会被创建和注册到容器中，避免了重复注入或者冲突的问题。
```java
@Configuration
public class MyAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MyService myService() {
        return new DefaultMyServiceImpl();
    }
}
```

### @Data
@Data 注解是 Lombok 库提供的一个实用注解，它是一个复合注解，可以极大地简化Java类的编写工作。在使用了 @Data 注解的类上，Lombok会自动生成以下方法：
getter和setter：为所有字段生成对应的getter和setter方法。
equals() 和 hashCode()：根据类中所有非静态、非transient字段生成equals和hashCode方法，确保对象相等性的正确判断。
toString()：生成一个包含类名以及所有字段信息的toString方法，方便调试和日志输出。
构造器：如果类中没有定义任何构造器，Lombok将为所有非final字段生成一个默认构造器（无参构造器）和一个全参数构造器。
通过在Java类定义顶部添加 @Data 注解，开发者无需手动编写上述这些常见的样板代码，从而提高编码效率并减少出错的可能性。

### @ExceptionHandler
1. @ExceptionHandler 用在方法上，表示当抛出指定的异常时，由Spring框架自动调用该方法进行处理。
2. 一般通过重载exceptionHandler，根据参数类型的不同来处理不同的异常。
```java
/**
 * 全局异常处理器，处理项目中抛出的业务异常
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 捕获业务异常
     * @param ex
     * @return
     */
    @ExceptionHandler
    public Result exceptionHandler(BaseException ex){ //处理所有类型的异常，因为BaseException是基类
        log.error("异常信息：{}", ex.getMessage());
        return Result.error(ex.getMessage());
    }

    /**
     * 处理SQL异常
     * @param ex
     * @return
     */
    @ExceptionHandler
    public Result exceptionHandler(SQLIntegrityConstraintViolationException ex){ //处理特定类型异常
        String message = ex.getMessage();
        log.error("异常信息：{}", message);
        if (message.contains("Duplicate entry")) {
            String[] split = message.split(" ");
            String msg = "用户名" + split[2] + MessageConstant.ALREADY_EXIST;
            return Result.error(msg);
        } else {
            return Result.error(MessageConstant.UNKNOWN_ERROR);
        }
    }
}
```

### @JsonFormat
```java
//在entity中使用，加上该注解可以自动格式化日期
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
private LocalDateTime createTime;
```

### @Builder
在entity中使用，加上该注解可以自动生成builder方法，可以简化对象的创建过程
```java
//entity
@Builder
public class Employee {
    private String name;
    private Integer age;
    //...
}

//创建对象时
Employee employee = Employee.builder().name("张三").age(18).build();
```

### 常见接口参数注解
1. @PathVariable 主要用于获取和解析 URL 路径中的动态参数
   ```java
   @PostMapping("/status/{status}")
   @ApiOperation("员工账号状态修改")
   public Result startOrStop(@PathVariable("status") Integer status, long id) { //("status")也可以省略，变量名和路径参数名字一样可以自动识别
       log.info("启用禁用员工账号：{},{}", status, id);
       employeeService.startOrStop(status, id);
       return Result.success();
   }
   ```
2. @RequestParam 主要用于处理 URL 查询字符串参数或 POST 表单数据，例如可以将前端传过来的字符串参数自动映射到Java对象的属性上
   ```java
    public Result delete(@RequestParam List<Long> ids) { //该注解可以处理前端发过来的参数，自动处理成对应类型的数据，这里是将根据逗号分隔的id字符串映射到类型为Long的数组里
        log.info("删除菜品：{}", ids);
        dishService.deleteBatch(ids);
        return Result.success();
    }
   ```
3. @RequestBody
   1. 在Java中，尤其是在基于Spring MVC框架的RESTful API开发场景中，@RequestBody注解具有如下作用：
      数据绑定：@RequestBody注解可以将HTTP请求体（通常为JSON、XML或其他媒体类型）的内容自动映射到一个Java对象上。这意味着，当客户端以POST、PUT或PATCH等方法发送请求时，如果请求体包含JSON格式的数据，Spring MVC会利用HttpMessageConverter（如MappingJackson2HttpMessageConverter）将JSON字符串转换成对应的Java实体类实例。
   2. 内容协商：@RequestBody支持内容协商机制，可以根据Content-Type头来确定如何解析请求体。对于JSON数据，常见的Content-Type是application/json；对于XML数据，则可能是application/xml。
   3. 非表单数据处理：对于非默认的application/x-www-form-urlencoded编码类型的数据，@RequestBody能够有效地处理这些请求体内容，将其转化为可操作的对象或数据结构。
   总之，@RequestBody注解使得开发者无需手动解析HTTP请求体内容，而是通过自动化的机制将请求体数据与服务端方法的参数进行绑定，简化了RESTful API的数据接收和处理过程。

4. @DateTimeFormat
   ```java
   @GetMapping("/turnoverStatistics") //get请求
   @ApiOperation("营业额统计")
   //@DateTimeFormat(pattern = "yyyy-MM-dd")可以用于指定接受参数的格式
   public Result<TurnoverReportVO> turnoverStatistics(@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate begin, @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate end) {
     log.info("营业额统计:{}-{}", begin, end);
     return null;
   }
   ```
## 一些常用的Java方法
```java
DigestUtils.md5DigestAsHex(password.getBytes()); //md5加密，需要传入byte[]类型

BeanUtils.copyProperties(employeeDTO, employee); //复制对象属性到另一个对象中，这里是将DTO中的属性复制到实体类对象中

List<ShoppingCart> shoppingCartList = orderDetailList.stream().map(x -> {
   ShoppingCart shoppingCart = new ShoppingCart();

   // 将原订单详情里面的菜品信息重新复制到购物车对象中
   BeanUtils.copyProperties(x, shoppingCart, "id");
   shoppingCart.setUserId(userId);
   shoppingCart.setCreateTime(LocalDateTime.now());

   return shoppingCart;
}).collect(Collectors.toList());
.stream()：这是一个方法调用，它将一个集合转换为一个流(Stream)，使得我们可以对集合中的元素进行连续、高效的流式处理。
.map()：这是Stream API中的一个中间操作，它接收一个函数作为参数（在这个例子中是Lambda表达式）。这个函数会被应用到流中的每一个元素上，产生一个新的流，其中的元素是原始元素经过函数变换后得到的结果。
.collect(Collectors.toList())：这是Stream API中的一个终端操作，它将流中的元素收集到一个列表(List)中。
这个方法通过遍历一个orderDetail类型的列表，将每个orderDetail对象转换为一个新的ShoppingCart对象，并设置一些属性，最后将这些ShoppingCart对象收集到一个列表中。

//构造一个json字符串
Map map = new HashMap();
        map.put("type", 1);
        map.put("orderId", ordersDB.getId());
        map.put("content", "订单号：" + outTradeNo);

String jsonString = JSON.toJSONString(map);

//求一个数组的和
Integer totalOrderCount = orderCountList.stream().reduce(Integer::sum).get();
```

## JWT流程
1. 客户端发送请求携带用户名和密码到服务端；
2. 服务端对用户名和密码进行验证，如果验证通过，生成一个JWT令牌，并返回给客户端；
   ```java
    /**
     * 微信登录
     * @param userLoginDTO
     * @return
     */
    @PostMapping("/login")
    @ApiOperation(value = "微信登录")
    public Result<UserLoginVO> login(@RequestBody UserLoginDTO userLoginDTO) {
        log.info("微信登录：{}", userLoginDTO.getCode());
        //根据wx登录拿到的授权码，调用微信接口获取用户信息
        User user = userService.wxLogin(userLoginDTO);

        //把用户信息存入jwt，生成jwt令牌
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtClaimsConstant.USER_ID, user.getId());
        String token = JwtUtil.createJWT(jwtProperties.getUserSecretKey(), jwtProperties.getUserTtl(), claims);

        //把信息封装到VO
        UserLoginVO userLoginVO = UserLoginVO.builder()
                .token(token)
                .id(user.getId())
                .openid(user.getOpenid())
                .build();
        return Result.success(userLoginVO);
    }
   ```
3. 客户端讲获取到的令牌存到本地，以后每次请求都带上这个令牌；
4. 服务端接收到请求时，会从请求头中取出令牌，然后对令牌进行解密，获取用户信息；
5. 如果解密成功，说明令牌是合法的，可以进行下一步操作，否则，说明令牌不合法，返回401错误。
   ```java
   /**
    * jwt令牌校验的拦截器
    */
   @Component
   @Slf4j
   public class JwtTokenUserInterceptor implements HandlerInterceptor {
   
       @Autowired
       private JwtProperties jwtProperties; //注入jwt配置
   
       /**
        * 校验jwt
        *
        * @param request
        * @param response
        * @param handler
        * @return
        * @throws Exception
        */
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
           //判断当前拦截到的是Controller的方法还是其他资源
           if (!(handler instanceof HandlerMethod)) {
               //当前拦截到的不是动态方法，直接放行
               return true;
           }
   
           //1、从请求头中获取令牌
           String token = request.getHeader(jwtProperties.getUserTokenName());
   
           //2、校验令牌
           try {
               log.info("jwt校验:{}", token);
               Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token); //用密钥解析令牌
               Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
               log.info("当前用户id：", userId);
               // 把员工id注入到ThreadLocal中，以便下游获取
               BaseContext.setCurrentId(userId);
               //3、通过，放行
               return true;
           } catch (Exception ex) {
               //4、不通过，响应401状态码
               response.setStatus(401);
               return false;
           }
       }
   }
   
   //还需要在配置类中注册该拦截器
   public class WebMvcConfiguration extends WebMvcConfigurationSupport {
       
       private JwtTokenUserInterceptor jwtTokenUserInterceptor;
   
       /**
        * 注册自定义拦截器
        *
        * @param registry
        */
       protected void addInterceptors(InterceptorRegistry registry) {
           log.info("开始注册自定义拦截器...");
           registry.addInterceptor(jwtTokenUserInterceptor)
                   .addPathPatterns("/user/**")
                   .excludePathPatterns("/user/user/login")
                   .excludePathPatterns("/user/shop/status");
       }
   }
   ```

## ThreadLocal
ThreadLocal是一个线程绑定的局部变量，ThreadLocal为每个使用该变量的线程都提供了一个独立的变量副本，每个线程都可以对这个副本进行读写而不会影响其它线程的副本。
使用方法与前端的localStorage类似，通过set、get和remove来设置该局部变量的值。
```java
public class ThreadLocalDemo {
    public static void main(String[] args) {
        ThreadLocal<String> threadLocal = new ThreadLocal<>();
        threadLocal.set("hello");
        System.out.println(threadLocal.get());
        threadLocal.remove();
    }
}
```

## 扩展Spring MVC消息转换器
如果想要集中配置转换数据的类型格式，可以通过在配置类中注册一个MessageConverters配置类来实现。
例如将LocalDate类型的数据转换成YYYY-MM-DD HH:mm格式的字符串，可以使用如下配置：
```java
//WebMvcConfiguration.java
/**
 * 扩展MVC框架的消息转换器，重写默认的消息转换器
 * @param converters
 */
protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
    //创建一个消息转换器对象
    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
    //需要为消息转换器设置一个对象转换器，对象转换器可以将java对象序列化为json数据，也可以反过来
    converter.setObjectMapper(new JacksonObjectMapper());//自定义ObjectMapper
    converters.add(0, converter); //将自定义消息转换器添加到消息转换器列表的最前面，优先级最高
}

//JacksonObjectMapper.java
/**
 * 对象映射器:基于jackson将Java对象转为json，或者将json转为Java对象
 * 将JSON解析为Java对象的过程称为 [从JSON反序列化Java对象]
 * 从Java对象生成JSON的过程称为 [序列化Java对象到JSON]
 */
public class JacksonObjectMapper extends ObjectMapper {

    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    //public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";
    public static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";

    public JacksonObjectMapper() {
        super();
        //收到未知属性时不报异常
        this.configure(FAIL_ON_UNKNOWN_PROPERTIES, false);

        //反序列化时，属性不存在的兼容处理
        this.getDeserializationConfig().withoutFeatures(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        SimpleModule simpleModule = new SimpleModule()
                .addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT)))
                .addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)))
                .addDeserializer(LocalTime.class, new LocalTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT))) //反序列化时转换
                .addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT)))
                .addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)))
                .addSerializer(LocalTime.class, new LocalTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT))); //序列化时转换

        //注册功能模块 例如，可以添加自定义序列化器和反序列化器
        this.registerModule(simpleModule);
    }
}
```

## 自定义注解
annotation：注解
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AutoFill {
    //数据库操作类型：update、insert
    OperationType value();
}

```
1. @Target(ElementType.METHOD):
@Target 注解用于指定自定义注解 AutoFill 可以应用于哪些程序元素（即它的使用范围）。
在这个例子中，ElementType.METHOD 表示 AutoFill 这个注解只能用于方法级别的声明上。这意味着你可以在任何方法定义前使用此注解，但不能将其应用于类、字段、参数等其他程序元素。
2. @Retention(RetentionPolicy.RUNTIME):
@Retention 注解用于设置自定义注解的生命周期或者说它在何时是可见的。
RetentionPolicy.RUNTIME 指定 AutoFill 注解不仅在编译时可见，而且在运行时也可以通过反射 API 获取到。这意味着你可以编写运行时代码来检查或处理带有 AutoFill 注解的方法。
另外两种策略是 SOURCE（注解只保留在源码阶段，编译器编译后会丢弃该注解信息）和 CLASS（注解保留在字节码文件中，但在运行时无法通过反射访问到）。
3. 这里的 value() 是 AutoFill 注解的一个属性（成员变量），其类型是前面定义的 OperationType 枚举。这意味着当你在使用 AutoFill 注解时，需要为 value 属性提供一个 OperationType 枚举类型的值。例如：
    ```java
    public class SomeClass {
        @AutoFill(value = OperationType.UPDATE)
        public void updateSomething() {
            // ...
        }

        @AutoFill(value = OperationType.INSERT)
        public void insertSomething() {
            // ...
        }
   }
   ```
## AOP面向切面编程
自定义切面
```java
@Aspect
@Component
@Slf4j
public class AutoFillAspect {

    /**
     * 切入点
     */
    @Pointcut("execution (* com.sky.mapper.*.*(..)) && @annotation(com.sky.annotation.AutoFill)")
    public void autoFillPointCut() {}
    /*
        * com.sky.mapper.*.*(..) 从前往后代表的意义分别是：
        * 1. * 代表返回值是任意的
        * 2. com.sky.mapper 代表要拦截的包路径
        * 3. * 代表包下面所有的类
        * 4. * 代表类中所有的方法
        * 5. .. 代表匹配所有参数类型
        因为只需要拦截insert和update方法，所以后面需要跟上自定义注解@annotation(com.sky.annotation.AutoFill)
    */

    /**
     * 前置通知，在通知中进行公共字段填充
     */
    @Before("autoFillPointCut()")
    public void before(JoinPoint joinPoint) {
        log.info("执行前置通知，开始进行公共字段自动填充");

        //获取注解上的类型，区分是更新还是插入
        MethodSignature signature = (MethodSignature)joinPoint.getSignature(); //方法签名对象
        AutoFill annotation = signature.getMethod().getAnnotation(AutoFill.class); //获取注解对象
        OperationType operationType = annotation.value(); //获取操作类型

        //获取方法上的参数实体
        Object[] args = joinPoint.getArgs();
        if(args == null || args.length == 0) {
            return;
        }
        Object entity = args[0]; //约定将实体作为第一个参数
        //因为不知道会拿到什么类型的实体，统一用Object类型接收，因此也不能调用对应实体上的方法了，所以需要通过反射来调用
       
        //准备赋值的数据
        LocalDateTime now = LocalDateTime.now();//当前时间
        Long currentId = BaseContext.getCurrentId();//当前用户id

        //通过反射设置参数中的公共字段
        try {
            if (operationType == OperationType.INSERT) {
                //获取实体上的更新公共字段方法
                Method setCreateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_CREATE_TIME, LocalDateTime.class);// 方法名，参数类型
                Method setUpdateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_TIME, LocalDateTime.class);
                Method setCreateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_CREATE_USER, Long.class);
                Method setUpdateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_USER, Long.class);

                //通过反射调用方法，设置公共字段的值
                setCreateTime.invoke(entity, now);
                setUpdateTime.invoke(entity, now);
                setCreateUser.invoke(entity, currentId);
                setUpdateUser.invoke(entity, currentId);
            } else if (operationType == OperationType.UPDATE) {
                //获取实体上的更新公共字段方法
                Method setUpdateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_TIME, LocalDateTime.class);
                Method setUpdateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_USER, Long.class);
                
                //通过反射调用方法，设置公共字段的值
                setUpdateTime.invoke(entity, now);
                setUpdateUser.invoke(entity, currentId);
            }
        } catch (Exception e) { //这里把NoSuchMethodException换成了Exception，方便接受invoke方法可能抛出的异常，因为两种异常的类型不同，用基类可以一起接受
            throw new RuntimeException(e);
        }
    }
    /*
        除了前置通知，还有了后置通知、环绕通知、异常通知、返回通知等通知，具体使用方法请查看官方文档
     */
}
```
## 反射
Java中的反射（Reflection）是一种强大的运行时元编程机制，它允许程序在运行时对自身进行检查，并且能够动态地获取类、接口、字段和方法等的详细信息。具体来说：
1. 动态获取类信息：通过Class对象，可以在运行时加载并分析任何类的信息，包括类名、属性、方法列表及其修饰符（public、private等）、构造函数以及实现的接口等。
2. 创建对象实例：即使构造函数是私有的，也可以通过反射API调用Constructor对象来创建一个类的新实例。
3. 访问私有成员：反射可以绕过访问控制检查，让开发者能够在运行时修改或操作私有变量、调用私有方法。
4. 动态调用方法：可以根据字符串参数确定要执行的方法名，并使用Method对象来调用该方法，无需在编译期知道所有方法的具体名称。
5. 生成代理对象：反射结合Java的动态代理机制，可以实现代理设计模式，动态创建代理类并在运行时处理方法调用。
Java反射机制使得代码具备了更强的灵活性与适应性，但同时也需要注意，过度使用反射可能会导致性能下降、破坏封装性和安全性等问题，因此在实际开发中应谨慎使用。

## 配置类变量的使用方法
以七牛云oss为例子，创建一个包含配置信息的类：
```java
//QiNiuProperties.java
@Component
@Data
@ConfigurationProperties(prefix = "sky.qiniuoss") // 读取application.yml中的配置，将值注入到这个类中
public class QiNiuProperties {

    private String accessKey;
    private String secretKey;
    private String bucketName;

}
```
在配置文件中配好值：
```
//application.yml
//...
spring:
  profiles:
    active: dev
    
sky:
   qiniuoss:
      access-key: ${sky.qiniuoss.access-key}
      secret-key: ${sky.qiniuoss.secret-key}
      bucket-name: ${sky.qiniuoss.bucket-name}

//application-dev.yml
sky:
  qiniuoss:
    access-key: A-8g8RpS7PbluxVhhKTRCWh-IV1XNn_clXrUQc_b
    secret-key: HJ7n__0ytkds__DgU5RZtlaz4InQWSVdvskkzdR3
    bucket-name: azusa510
```
然后在配置类中，配置在程序启动时，将这些配置属性注入到一个类中，再把该类注入到容器中：
```java
@Configuration
@Slf4j
public class QiNiuOssConfiguration {

    @Bean
    @ConditionalOnMissingBean // 当没有这个类的时候，自动注入，否则不注入
    public QiNiuOssUtil qiNiuOssUtil(QiNiuProperties qiNiuProperties) {//直接用参数注入
        log.info("开始创建七牛云文件上传工具类对象: {}", qiNiuProperties);
        return new QiNiuOssUtil( //创建一个七牛云文件上传工具类对象，注入到容器
                qiNiuProperties.getAccessKey(),
                qiNiuProperties.getSecretKey(),
                qiNiuProperties.getBucketName(),
                qiNiuProperties.getEndpoint()
        );
    }
}
```
在需要使用的地方直接@Autowired注入即可：
```java
@Autowired
private QiNiuOssUtil qiNiuOssUtil;
```

当然，还有一种更加简便的方式，不注入容器中，也不需要创建对应的属性类，只要在yml配置文件中配置好值之后，直接在需要的地方使用即可，注意Value注解不要引用错就OK：
```java
import org.springframework.beans.factory.annotation.Value;
   @Value("${tempFilePath}")
   private String uploadPath;
```

## 事务
事务是数据库操作的一个重要概念，它代表了一次操作中的一组数据库操作，要么全部成功，要么全部失败。
在使用Spring事务时，需要在事务方法上添加@Transactional注解，同时需要在Spring容器中配置事务管理器。
```java
@Transactional //开启事务
public void saveWithFlavors(DishDTO dishDTO) {
   Dish dish = new Dish();
   BeanUtils.copyProperties(dishDTO,dish);
   dishMapper.save(dish);
}

//同时需要在启动类中配置事务管理器
@SpringBootApplication
@EnableTransactionManagement //开启注解方式的事务管理
@Slf4j
public class SkyApplication {
   public static void main(String[] args) {
      SpringApplication.run(SkyApplication.class, args);
      log.info("server started");
   }
}

```

## xml中sql语句一些语法
```xml
<!--    useGeneratedKeys代表使用到数据库自动生成的主键，keyProperty="id"代表使用到的主键属性名，加了这些之后，传进该方法的实体类中的id会被赋值主键值-->
<insert id="insert" useGeneratedKeys="true" keyProperty="id">
   insert into dish(name, price, image, description, update_time, update_user, category_id, status, create_time, create_user)
   values(#{name}, #{price}, #{image}, #{description}, #{updateTime}, #{updateUser}, #{categoryId}, #{status}, #{createTime}, #{createUser})
</insert>


<!--参数为list的遍历写法-->
<insert id="insertBatch">
   insert into dish_flavor (dish_id, name, value)
   values
<!--   flavors是传进来的列表参数名称，每个语句之间用逗号分隔-->
   <foreach collection="flavors" item="item" separator=",">
      (#{item.dishId}, #{item.name}, #{item.value})
   </foreach>
</insert>
```


## HttpClient
HttpClient是Apache的一个子项目，是高效的、功能丰富的支持HTTP协议的客户端编程工具包，在调用第三方接口时可以用到。

HttpClient作用：
1. 发送HTTP请求
2. 接收响应数据

### 发送Get请求
```java
 @Test
 public void getTest() throws Exception{
     //创建httpclient对象
     CloseableHttpClient httpClient = HttpClients.createDefault();

     //创建请求对象
     HttpGet httpGet = new HttpGet("http://localhost:8080/user/shop/status");

     //发送请求，接受响应结果
     CloseableHttpResponse response = httpClient.execute(httpGet);

     //解析响应结果
     int statusCode = response.getStatusLine().getStatusCode(); //状态码
     System.out.println("响应状态码：" + statusCode);

     HttpEntity entity = response.getEntity();
     String body = EntityUtils.toString(entity);
     System.out.println("服务端返回的数据:" + body);

     //关闭资源
     response.close();
     httpClient.close();
 }
```

### 发送Post请求
```java
 @Test
 public void postTest() throws Exception{
     //创建httpclient对象
     CloseableHttpClient httpClient = HttpClients.createDefault();

     //创建请求对象
     HttpPost httpPost = new HttpPost("http://localhost:8080/admin/employee/login");

     //构造请求体
     JSONObject jsonObject = new JSONObject();
     jsonObject.put("username", "admin");
     jsonObject.put("password", "123456");
     StringEntity entity = new StringEntity(jsonObject.toString());

     //指定请求编码方式
     entity.setContentEncoding("UTF-8");
     //数据格式
     entity.setContentType("application/json");
     
     //设置请求体
     httpPost.setEntity(entity);


     //发送请求，接受响应结果
     CloseableHttpResponse response = httpClient.execute(httpPost);

     //解析响应结果
     int statusCode = response.getStatusLine().getStatusCode(); //状态码
     System.out.println("响应状态码：" + statusCode);

     HttpEntity entity1 = response.getEntity();
     String body = EntityUtils.toString(entity1);
     System.out.println("服务端返回的数据:" + body);

     //关闭资源
     response.close();
     httpClient.close();
 }
```


## Spring Cache
Spring Cache 是一个框架，实现了基于注解的缓存功能，只需要简单地加一个注解，就能实现缓存功能。

Spring Cache 提供了一层抽象，底层可以切换不同的缓存实现，例如： EHCache、Caffeine、Redis

只需要导入maven坐标，使用注解即可：
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-cache</artifactId>
	<version>2.7.3</version>
</dependency>
```
常用注解：
```
@EnableCaching 开启缓存注解功能，通常加在启动类上 
@Cacheable 在方法执行前先查询缓存中是否有数据，如果有数据，则直接返回缓存数据；如果没有缓存数据，调用方法并将方法返回值放到缓存中（可存可取）
@CachePut 将方法的返回值放到缓存中（只能存）
@CacheEvict 将一条或多条数据从缓存中删除 
```
### 用法
```java
//启动类
@Slf4j
@SpringBootApplication
@EnableCaching //开启缓存注解功能
public class CacheDemoApplication {
   public static void main(String[] args) {
      SpringApplication.run(CacheDemoApplication.class,args);
      log.info("项目启动成功...");
   }
}

//控制层
@PostMapping
//key的生成 使用SpEL（spring expression language）表达式，生成之后的key为userCache::(动态id)，这里的两个冒号代表层级关系，即userCache与id之间还隔了一层（空）
@CachePut(cacheNames = "userCache", key = "#user.id")  //这里的user是形参中的user，名字需要保持一致
//@CachePut(cacheNames = "userCache", key = "#result.id") //result代表返回值
//@CachePut(cacheNames = "userCache", key = "#p0.id") //以下3都代表第一个参数，如果后面还有其他参数，p1、p2依此类推
//@CachePut(cacheNames = "userCache", key = "#a0.id")
//@CachePut(cacheNames = "userCache", key = "#root.args[0].id")
public User save(@RequestBody User user){
   userMapper.insert(user);
   return user;
}

@GetMapping
@Cacheable(cacheNames = "userCache", key = "#id") //与形参一致  注意这个注解不能用#result了，因为一般获取是没有返回值的，所以注解也没有实现
public User getById(Long id){
   User user = userMapper.getById(id);
   return user;
}

@DeleteMapping
@CacheEvict(cacheNames = "userCache", key = "#id")
public void deleteById(Long id){
   userMapper.deleteById(id);
}

@DeleteMapping("/delAll")
@CacheEvict(cacheNames = "userCache", allEntries = true) //清除所有的键值对
public void deleteAll(){
   userMapper.deleteAll();
}
```

## Spring Task
Spring Task 是一个框架，用于在 Spring 应用程序中执行定时任务。

Spring Task使用步骤：
1. 导入maven坐标 spring-context（已存在于Spring Boot Starter中）
2. 启动类添加注解 @EnableScheduling 开启任务调度
3. 自定义定时任务类

cron表达式在线生成器：https://cron.qqe2.com/
```java
//启动类
//...
@EnableScheduling //开启定时任务
public class SkyApplication {
   public static void main(String[] args) {
      SpringApplication.run(SkyApplication.class, args);
      log.info("server started");
   }
}

//定时任务类
@Component // 注入到spring容器中
@Slf4j
public class OrderTask {

    @Autowired
    OrderMapper orderMapper;

    /**
     * 检查超时未付款订单
     */
    @Scheduled(cron = "0 * * * * ?") // cron表达式 秒 分 时 日 月 周 （年）  每分钟执行一次
    public void orderTimeoutCheck(){
        log.info("检查超时订单：{}", LocalDateTime.now());

        //下单超过十五分钟未付款
        List<Orders> ordersList = orderMapper.getByStatusAndOrderTimeLT(Orders.PENDING_PAYMENT, LocalDateTime.now().minusMinutes(15));

        if(ordersList != null && ordersList.size() > 0) {
            for (Orders orders : ordersList) {
                orders.setStatus(Orders.CANCELLED);
                orders.setCancelReason("订单超时，自动取消");
                orders.setCancelTime(LocalDateTime.now());
                orderMapper.update(orders);
            }
        }
    }
}
```

## WebSocket
WebSocket是一种用于创建持久化的客户端-服务器通信的协议，它允许客户端和服务器之间进行实时的、双向的通信。

使用步骤：
1. 导入maven坐标
   ```xml
   <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-websocket</artifactId>
   </dependency>
   ```
2. 编写WebSocket服务类
   ```java
   @Component
   @ServerEndpoint("/ws/{sid}") // @ServerEndpoint注解用于标识WebSocket服务类，注意和Controller的区别
   public class WebSocketServer {
   
       //以哈希形式存放会话对象（一个连接就是一个会话）
       private static Map<String, Session> sessionMap = new HashMap();
   
       /**
        * 连接建立成功调用的方法
        */
       @OnOpen //监听连接
       public void onOpen(Session session, @PathParam("sid") String sid) {
           System.out.println("客户端：" + sid + "建立连接");
           sessionMap.put(sid, session);
       }
   
       /**
        * 收到客户端消息后调用的方法
        *
        * @param message 客户端发送过来的消息
        */
       @OnMessage //监听消息
       public void onMessage(String message, @PathParam("sid") String sid) {
           System.out.println("收到来自客户端：" + sid + "的信息:" + message);
       }
   
       /**
        * 连接关闭调用的方法
        *
        * @param sid
        */
       @OnClose //监听断开
       public void onClose(@PathParam("sid") String sid) {
           System.out.println("连接断开:" + sid);
           sessionMap.remove(sid);
       }
   
       /**
        * 群发
        *
        * @param message
        */
       public void sendToAllClient(String message) {
           Collection<Session> sessions = sessionMap.values();
           for (Session session : sessions) {
               try {
                   //服务器向客户端发送消息
                   session.getBasicRemote().sendText(message);
               } catch (Exception e) {
                   e.printStackTrace();
               }
           }
       }
   
   }
   ```
3. 编写配置类
   ```java
   @Configuration
   public class WebSocketConfiguration {
       @Bean //注入到spring容器中
       public ServerEndpointExporter serverEndpointExporter() {
           return new ServerEndpointExporter();
       }
   }
   ```


## Apache POI
Apache POI 是一个开源的 Java 库，用于创建和操作 Microsoft Office 文件。

maven坐标：
```xml
<dependency>
	<groupId>org.apache.poi</groupId>
	<artifactId>poi</artifactId>
    <version>3.16</version>
</dependency>
<dependency>
	<groupId>org.apache.poi</groupId>
	<artifactId>poi-ooxml</artifactId>
	<version>3.16</version>
</dependency>
```
```java
//写excel文件
//在内存中创建一个Excel文件对象
XSSFWorkbook excel = new XSSFWorkbook();
//创建Sheet页
XSSFSheet sheet = excel.createSheet("itcast");
//在Sheet页中创建行，0表示第1行
XSSFRow row1 = sheet.createRow(0);
//创建单元格并在单元格中设置值，单元格编号也是从0开始，1表示第2个单元格
row1.createCell(1).setCellValue("姓名");
row1.createCell(2).setCellValue("城市");

XSSFRow row2 = sheet.createRow(1);
row2.createCell(1).setCellValue("张三");
row2.createCell(2).setCellValue("北京");

XSSFRow row3 = sheet.createRow(2);
row3.createCell(1).setCellValue("李四");
row3.createCell(2).setCellValue("上海");

FileOutputStream out = new FileOutputStream(new File("D:\\itcast.xlsx"));
//通过输出流将内存中的Excel文件写入到磁盘上\nexcel.write(out);

//关闭资源\nout.flush();
out.close();
excel.close();

//读excel文件
FileInputStream in = new FileInputStream(new File("D:\\itcast.xlsx"));
//通过输入流读取指定的Excel文件
XSSFWorkbook excel = new XSSFWorkbook(in);
//获取Excel文件的第1个Sheet页
XSSFSheet sheet = excel.getSheetAt(0);
//获取Sheet页中的最后一行的行号
int lastRowNum = sheet.getLastRowNum();
for (int i = 0; i <= lastRowNum; i++) {
//获取Sheet页中的行
XSSFRow titleRow = sheet.getRow(i);
//获取行的第2个单元格
XSSFCell cell1 = titleRow.getCell(1);
//获取单元格中的文本内容
String cellValue1 = cell1.getStringCellValue();
//获取行的第3个单元格
XSSFCell cell2 = titleRow.getCell(2);
//获取单元格中的文本内容
String cellValue2 = cell2.getStringCellValue();
	System.out.println(cellValue1 + " " +cellValue2);
}
//关闭资源
in.close();
excel.close();
```
想要让浏览器可以直接下载后端返回的文件流，可以按照如下方法：
```java
    /**
 * 导出运营数据报表
 * @param response
 */
public void exportBusinessData(HttpServletResponse response) { //需要用到HttpServletResponse
   //1. 查询数据库，获取营业数据---查询最近30天的运营数据
   LocalDate dateBegin = LocalDate.now().minusDays(30);
   LocalDate dateEnd = LocalDate.now().minusDays(1);

   //查询概览数据
   BusinessDataVO businessDataVO = workspaceService.getBusinessData(LocalDateTime.of(dateBegin, LocalTime.MIN), LocalDateTime.of(dateEnd, LocalTime.MAX));

   //2. 通过POI将数据写入到Excel文件中
   InputStream in = this.getClass().getClassLoader().getResourceAsStream("template/运营数据报表模板.xlsx");

   try {
      //基于模板文件创建一个新的Excel文件
      XSSFWorkbook excel = new XSSFWorkbook(in);
      //...
      //3. 通过输出流将Excel文件下载到客户端浏览器
      ServletOutputStream out = response.getOutputStream(); //获取输出流
      excel.write(out); //写入到response的输出流

      //关闭资源
      out.close();
      excel.close();
   } catch (IOException e) {
      e.printStackTrace();
   }

}
```
InputStream in = this.getClass().getClassLoader().getResourceAsStream("template/运营数据报表模板.xlsx"); 

这条语句的详细解析：
1. this.getClass()：
   1. this 是当前对象的引用。在面向对象编程中，它代表调用该方法或访问该属性的实例。
   2. getClass() 是 Java 中所有对象都继承自 Object 类的一个方法，它返回一个 Class 对象，该对象表示 this 引用所指向的对象的实际类型。在这里，它获取当前类的 Class 对象。
2. getClassLoader()： 
   1. 调用 getClass() 返回的 Class 对象的 getClassLoader() 方法，获取当前类的类加载器 (ClassLoader)。
   2. 类加载器负责在运行时查找并加载类文件（.class 文件）到 JVM 中。在这个上下文中，我们使用类加载器来访问与类相关的资源文件，如配置文件、图片、音频等，以及本例中的 Excel 文件。
   .getResourceAsStream("template/运营数据报表模板.xlsx")：
   3. 调用类加载器的 getResourceAsStream(String name) 方法，该方法以给定的相对路径 name 作为参数，尝试从类路径 (classpath) 中查找对应的资源文件，并返回一个 InputStream 对象。
   参数 "template/运营数据报表模板.xlsx" 表示资源文件的路径。路径中的 / 表示目录层级，template 是目录名，运营数据报表模板.xlsx 是目标资源文件名（一个 Excel 文件）。
   通常，这个路径是相对于当前类所在的包（如果是在类路径的根目录下，则无需指定包名）。这意味着该 Excel 文件应位于项目的 classpath 下，与当前类处于同一层级或其子层级的 template 目录内。

综上所述，这条语句的意思是：
获取当前类的 Class 对象。
通过 Class 对象获取当前类的类加载器。
使用类加载器从类路径中查找名为 "template/运营数据报表模板.xlsx" 的资源文件（一个 Excel 文件），并以 InputStream 形式返回。
最终，将打开的资源文件输入流赋值给变量 in，以便后续代码通过此流来读取和处理 Excel 文件内容。