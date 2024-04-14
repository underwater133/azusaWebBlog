---
title: Redis笔记
date: 2024-04-14
tags:
- 后端
- Redis
categories:
- Java
sidebar: 'auto'
---

# Redis
Redis是目前最流行的NoSQL数据库，它是一种高效的内存数据库，可以用来存储数据，也可以用来做缓存。

Redis存储的是key-value键值对，key是字符串类型的，value有五种常用的类型：string、list、set、zset(sorted set)、hash。
## 客户端常用命令
### string：
Redis 字符串类型常用命令：
1. SET key value			设置指定key的值
2. GET key			获取指定key的值
3. SETEX key seconds value	设置指定key的值，并将 key 的过期时间设为 seconds 秒
4. SETNX key value		只有在 key 不存在时设置 key 的值

### hash
Redis hash 是一个string类型的 field 和 value 的映射表，hash特别适合用于存储对象，常用命令：
1. HSET key field value 	将哈希表 key 中的字段 field 的值设为 value
2. HGET key field 	获取存储在哈希表中指定字段的值
3. HDEL key field		删除存储在哈希表中的指定字段
4. HKEYS key 		获取哈希表中所有字段
5. HVALS key 		获取哈希表中所有值

### list
Redis 列表是简单的字符串列表（双向列表），按照插入顺序排序，常用命令：
1. LPUSH key value1 [value2] 	将一个或多个值插入到列表头部(左边)
2. LRANGE key start stop 		获取列表指定范围内的元素(最后一个元素用-1表示)
3. RPOP key 			移除并获取列表最后一个元素(右边)
4. LLEN key 			获取列表长度

### set
set是string类型的无序集合。集合成员是唯一的，集合中不能出现重复的数据，常用命令：
1. SADD key member1 [member2] 	向集合添加一个或多个成员
2. SMEMBERS key 		返回集合中的所有成员
3. SCARD key 			获取集合的成员数
4. SINTER key1 [key2] 		返回给定所有集合的交集
5. SUNION key1 [key2] 		返回所有给定集合的并集
6. SREM key member1 [member2] 	删除集合中一个或多个成员

### zset
zset有序集合是string类型元素的集合，且不允许有重复成员。每个元素都会关联一个double类型的分数。常用命令：
1. ZADD key score1 member1 [score2 member2] 	向有序集合添加一个或多个成员
2. ZRANGE key start stop [WITHSCORES] 		通过索引区间返回有序集合中指定区间内的成员
3. ZINCRBY key increment member 			有序集合中对指定成员的分数加上增量 increment
4. ZREM key member [member ...] 			移除有序集合中的一个或多个成员

### 通用命令：
Redis的通用命令是不分数据类型的，都可以使用的命令
1. KEYS pattern 		查找所有符合给定模式( pattern)的 key
2. EXISTS key 		检查给定 key 是否存在
3. TYPE key 		返回 key 所储存的值的类型
4. DEL key 		该命令用于在 key 存在是删除 key

## 在Java中使用Redis
### Spring Data Redis
Spring Data Redis 是 Spring 的一部分，对 Redis 底层开发包进行了高度封装。

在 Spring 项目中，可以使用Spring Data Redis来简化操作。

操作步骤：
1. 导入Spring Data Redis 的maven坐标
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-redis</artifactId>
   </dependency>
   ```
2. 配置Redis数据源
   ```
   spring:
     redis:
       host: localhost
       port: 6379
       password: 123456
       database: 0 #不设置默认0号数据库
   ```
3. 编写配置类，创建RedisTemplate对象
    ```java
    @Configuration
    @Slf4j
    public class RedisConfiguration {
        @Bean
        public RedisTemplate redisTemplate(RedisConnectionFactory redisConnectionFactory) { //通过参数形式注入连接工厂对象（因为有对应的依赖）
            log.info("开始创建redis对象...");
            RedisTemplate redisTemplate = new RedisTemplate();
            //设置redis连接工厂对象
            redisTemplate.setConnectionFactory(redisConnectionFactory);
            //设置key的序列化规则 方便查看值，否则会以默认的序列化器，比较难看懂（类似乱码）
            redisTemplate.setKeySerializer(new StringRedisSerializer());
            return redisTemplate;
        }
    }
    ```
4. 通过RedisTemplate对象操作Redis
    ```java
    @SpringBootTest
    public class SpringDataRedisTest {
    
        @Autowired
        private RedisTemplate redisTemplate;
    
        @Test
        public void testRedis() {
            System.out.println(redisTemplate);
            ValueOperations valueOperations = redisTemplate.opsForValue(); //得到一个可以操作String类型数据的对象
            HashOperations hashOperations = redisTemplate.opsForHash(); //得到一个可以操作Hash类型数据的对象
            ListOperations listOperations = redisTemplate.opsForList();
            SetOperations setOperations = redisTemplate.opsForSet();
            ZSetOperations zSetOperations = redisTemplate.opsForZSet();
        }
    }
    ```
### String类型
```java
 @Test
 public void testString() {
     ValueOperations valueOperations = redisTemplate.opsForValue();
     valueOperations.set("city", "广州");
     valueOperations.set("code", "1234", 10000, TimeUnit.SECONDS); // 设置10000秒后过期
     valueOperations.setIfAbsent("country", "中国"); // 如果不存在则设置
     valueOperations.setIfAbsent("country", "美国");
 }
```
### Hash类型
```java
 @Test
 public void testHash() {
     //hset hget hdel hkeys hvals
     HashOperations hashOperations = redisTemplate.opsForHash();

     hashOperations.put("person", "name", "张三");
     hashOperations.put("person", "age", "18");

     String age = (String)hashOperations.get("person", "age");
     System.out.println(age);
     Set personKey = hashOperations.keys("person");
     List personValue = hashOperations.values("person");

     hashOperations.delete("person", "name");
 }
```
### List类型
```java
 @Test
 public void testList() {
     //lpush lrange rpop llen
     ListOperations listOperations = redisTemplate.opsForList();
     listOperations.leftPushAll("numlist", "1", "2", "3", "4", "5"); // 逐个从左边添加
     listOperations.leftPush("numlist", "6");

     List numlist = listOperations.range("numlist", 0, -1);
     System.out.println(numlist);

     listOperations.rightPop("numlist");

     Long numlistSize = listOperations.size("numlist");
     System.out.println(numlistSize);
 }
```
### Set类型
```java
 @Test
 public void testSet() {
     //sadd smembers scard sinter sunion srem
     SetOperations setOperations = redisTemplate.opsForSet();
     setOperations.add("numset1", "1", "2", "3", "4", "5");
     setOperations.add("numset2", "9", "8", "7", "6", "5");

     Set numset1 = setOperations.members("numset1");
     System.out.println(numset1);

     Long size = setOperations.size("numset1");
     System.out.println(size);

     Set intersect = setOperations.intersect("numset1", "numset2"); //交集
     System.out.println(intersect);

     Set union = setOperations.union("numset1", "numset2"); //并集
     System.out.println(union);

     setOperations.remove("numset1", "1", "2");
 }
```

### ZSet类型
```java
 @Test
 public void testZSet() {
     //zadd zrange zincrby zrem
     ZSetOperations zSetOperations = redisTemplate.opsForZSet();
     zSetOperations.add("zset", "a", 10);
     zSetOperations.add("zset", "b", 12);
     zSetOperations.add("zset", "c", 14);

     Set zset = zSetOperations.range("zset", 0, -1);
     System.out.println(zset);

     zSetOperations.incrementScore("zset", "a", 5);
     System.out.println(zset);

     zSetOperations.remove("zset", "a");
 }
```

### 通用操作
```java
 @Test
 public void testCommon() {
     //keys exist type del
     Set keys = redisTemplate.keys("*"); //查询所有key
     System.out.println(keys);

     System.out.println(redisTemplate.hasKey("set1"));

     for (Object key : keys) {
         DataType type = redisTemplate.type(key); //获取类型
         System.out.println(type.name());
     }
     redisTemplate.delete("set1");
 }
```

