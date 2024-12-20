### explain命令详解

expain出来的信息有10列，分别是id、select_type、table、type、possible_keys、key、key_len、ref、rows、Extra

**概要描述：**

id:选择标识符

select_type:表示查询的类型。

table:输出结果集的表

partitions:匹配的分区

type:表示表的连接类型

possible_keys:表示查询时，可能使用的索引

key:表示实际使用的索引

key_len:索引字段的长度

ref:列与索引的比较

rows:扫描出的行数(估算的行数)

filtered:按表条件过滤的行百分比

Extra:执行情况的描述和说明

**下面对这些字段出现的可能进行解释：**

一、 **id**

SELECT识别符。这是SELECT的查询序列号

**我的理解是SQL执行的顺序的标识，SQL从大到小的执行**

\1. id相同时，执行顺序由上至下

\2. 如果是子查询，id的序号会递增，id值越大优先级越高，越先被执行

\3. id如果相同，可以认为是一组，从上往下顺序执行；在所有组中，id值越大，优先级越高，越先执行

-- 查看在研发部并且名字以Jef开头的员工，经典查询 explain select e.no, e.name from emp e left join dept d on e.dept_no = d.no where e.name like 'Jef%' and d.name = '研发部';

​    ![0](https://note.youdao.com/yws/public/resource/7853ff1289f280eb8f8ae7d3aa379368/xmlnote/8A5E014038D4427F882BD5F5D9FF0B8B/6858)

 

**二、select_type**

   **示查询中每个select子句的类型**

(1) SIMPLE(简单SELECT，不使用UNION或子查询等)

(2) PRIMARY(子查询中最外层查询，查询中若包含任何复杂的子部分，最外层的select被标记为PRIMARY)

(3) UNION(UNION中的第二个或后面的SELECT语句)

(4) DEPENDENT UNION(UNION中的第二个或后面的SELECT语句，取决于外面的查询)

(5) UNION RESULT(UNION的结果，union语句中第二个select开始后面所有select)

(6) SUBQUERY(子查询中的第一个SELECT，结果不依赖于外部查询)

(7) DEPENDENT SUBQUERY(子查询中的第一个SELECT，依赖于外部查询)

(8) DERIVED(派生表的SELECT, FROM子句的子查询)

(9) UNCACHEABLE SUBQUERY(一个子查询的结果不能被缓存，必须重新评估外链接的第一行)

 

**三、table**

显示这一步所访问数据库中表名称（显示这一行的数据是关于哪张表的），有时不是真实的表名字，可能是简称，例如上面的e，d，也可能是第几步执行的结果的简称

 

**四、type**

对表访问方式，表示MySQL在表中找到所需行的方式，又称“访问类型”。

在 `EXPLAIN` 结果中，`type` 列描述了MySQL找到行的方式，也被称为访问类型（Access Type）。不同的 `type` 值表示查询优化器选择的不同的执行计划，访问类型的效率从好到坏大致如下：

1. **system**：表只有一行（系统表）。这是一个特殊的情况，通常不出现。
2. **const**：查询使用主键或唯一索引，且该索引字段的所有部分都使用常量值进行比较。对于单行查询非常快。
3. **eq_ref**：对于连接查询，每次从驱动表中读取一行数据，都会在被驱动表中通过主键或唯一索引查找一行数据。
4. **ref**：非唯一索引查找，返回符合条件的所有行。多用于带有索引的列上，且不唯一。
5. **range**：索引范围扫描，通常用于带有 `BETWEEN`、`<`、`>`、`IN` 等范围查询的索引列上。
6. **index**：全索引扫描，与全表扫描类似，但扫描的是索引树而不是数据行。
7. **ALL**：全表扫描，效率最差，通常需要避免。

##### 具体例子

#### 1. **system**

```
sql
复制代码
EXPLAIN SELECT * FROM single_row_table;
plaintext
复制代码
id  select_type  table            type     possible_keys  key     key_len  ref    rows  Extra
1   SIMPLE       single_row_table system  NULL           NULL    NULL     NULL   1     const row
```

`system` 类型通常用于只有一行数据的系统表。

#### 2. **const**

```
sql
复制代码
EXPLAIN SELECT * FROM users WHERE user_id = 1;
plaintext
复制代码
id  select_type  table  type   possible_keys  key       key_len  ref   rows  Extra
1   SIMPLE       users  const  PRIMARY        PRIMARY   4        const 1     const row not found
```

`const` 表示使用了主键或唯一索引，并且索引列使用常量值来查找。

#### 3. **eq_ref**

```
sql
复制代码
EXPLAIN SELECT * FROM orders INNER JOIN users ON orders.user_id = users.user_id;
plaintext
复制代码
id  select_type  table   type    possible_keys  key           key_len  ref           rows  Extra
1   SIMPLE       orders  ALL     PRIMARY        NULL          NULL     NULL          1000  Using where
1   SIMPLE       users   eq_ref  PRIMARY        PRIMARY       4        orders.user_id 1     Using index
```

`eq_ref` 表示连接操作中使用了主键或唯一索引，并且每次查找只返回一行。

#### 4. **ref**

```
sql
复制代码
EXPLAIN SELECT * FROM users WHERE name = 'John';
plaintext
复制代码
id  select_type  table  type  possible_keys  key      key_len  ref    rows  Extra
1   SIMPLE       users  ref   idx_name       idx_name 767      const  10    Using where
```

`ref` 表示使用非唯一索引查找所有符合条件的行。

#### 5. **range**

```
sql
复制代码
EXPLAIN SELECT * FROM users WHERE user_id BETWEEN 1 AND 10;
plaintext
复制代码
id  select_type  table  type   possible_keys  key      key_len  ref    rows  Extra
1   SIMPLE       users  range  PRIMARY        PRIMARY  4        NULL   10    Using where
```

`range` 表示索引范围扫描。

#### 6. **index**

```
sql
复制代码
EXPLAIN SELECT name FROM users;
plaintext
复制代码
id  select_type  table  type  possible_keys  key      key_len  ref    rows  Extra
1   SIMPLE       users  index NULL           idx_name 767      NULL   1000  Using index
```

`index` 表示全索引扫描。

#### 7. **ALL**

```
sql
复制代码
EXPLAIN SELECT * FROM users;
plaintext
复制代码
id  select_type  table  type  possible_keys  key  key_len  ref  rows  Extra
1   SIMPLE       users  ALL   NULL           NULL NULL     NULL 1000  Using where
```

`ALL` 表示全表扫描，是效率最低的访问类型。

### 总结

每种类型的访问方式都有不同的应用场景和性能特征。在实际开发中，尽量避免使用 `ALL` 类型的全表扫描，可以通过合理设计索引和优化查询来提升性能。

 

**五、possible_keys**

**指出MySQL能使用哪个索引在表中找到记录，查询涉及到的字段上若存在索引，则该索引将被列出，但不一定被查询使用（该查询可以利用的索引，如果没有任何索引显示 null）**

该列完全独立于EXPLAIN输出所示的表的次序。这意味着在possible_keys中的某些键实际上不能按生成的表次序使用。

如果该列是NULL，则没有相关的索引。在这种情况下，可以通过检查WHERE子句看是否它引用某些列或适合索引的列来提高你的查询性能。如果是这样，创造一个适当的索引并且再次用EXPLAIN检查查询

 

**六、Key**

**key列显示MySQL实际决定使用的键（索引），必然包含在possible_keys中**

如果没有选择索引，键是NULL。要想强制MySQL使用或忽视possible_keys列中的索引，在查询中使用FORCE INDEX、USE INDEX或者IGNORE INDEX。

 

**七、key_len**

**表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度（key_len显示的值为索引字段的最大可能长度，并非实际使用长度，即key_len是根据表定义计算而得，不是通过表内检索出的）**

不损失精确性的情况下，长度越短越好 

 

**八、ref**

**列与索引的比较，表示上述表的连接匹配条件，即哪些列或常量被用于查找索引列上的值**

 

**九、rows**

 **估算出结果集行数，表示MySQL根据表统计信息及索引选用情况，估算的找到所需的记录所需要读取的行数**

 

**十、Extra**

**该列包含MySQL解决查询的详细信息,有以下几种情况：**

Using where:不用读取表中所有信息，仅通过索引就可以获取所需数据，这发生在对表的全部的请求列都是同一个索引的部分的时候，表示mysql服务器将在存储引擎检索行后再进行过滤

Using temporary：表示MySQL需要使用临时表来存储结果集，常见于排序和分组查询，常见 group by ; order by

Using filesort：当Query中包含 order by 操作，而且无法利用索引完成的排序操作称为“文件排序”

-- 测试Extra的filesort explain select * from emp order by name;

Using join buffer：改值强调了在获取连接条件时没有使用索引，并且需要连接缓冲区来存储中间结果。如果出现了这个值，那应该注意，根据查询的具体情况可能需要添加索引来改进能。

Impossible where：这个值强调了where语句会导致没有符合条件的行（通过收集统计信息不可能存在结果）。

Select tables optimized away：这个值意味着仅通过使用索引，优化器可能仅从聚合函数结果中返回一行

No tables used：Query语句中使用from dual 或不含任何from子句

-- explain select now() from dual;

 

**总结：**

**• EXPLAIN不会告诉你关于触发器、存储过程的信息或用户自定义函数对查询的影响情况**

**• EXPLAIN不考虑各种Cache**

**• EXPLAIN不能显示MySQL在执行查询时所作的优化工作**

**• 部分统计信息是估算的，并非精确值**

**• EXPALIN只能解释SELECT操作，其他操作要重写为SELECT后查看执行计划。**





```sql
CREATE TABLE `ppospro_qrcode` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '序号',
  `business_id` int NOT NULL COMMENT '商户ID',
  `company_id` int NOT NULL DEFAULT '0' COMMENT '公司ID',
  `qrcode_id` int NOT NULL COMMENT '二维码ID',
  `equipment_id` int NOT NULL COMMENT '设备ID',
  `qrcode_no` varchar(255) NOT NULL DEFAULT '' COMMENT '二维码编号',
  `qrcode_url` varchar(255) NOT NULL DEFAULT '' COMMENT '二维码编号url',
  `content` varchar(255) NOT NULL DEFAULT '' COMMENT '内容',
  `bind_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '绑定状态：0未绑定，1已绑定,默认0',
  `bind_time` int NOT NULL DEFAULT '0' COMMENT '二维码绑定时间',
  `c_time` int NOT NULL DEFAULT '0' COMMENT '数据录入时间',
  `u_time` int NOT NULL DEFAULT '0' COMMENT '数据最后更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `qrcode_id` (`equipment_qrcode_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='二维码管理表';
```

```sql
//
CREATE TABLE `ppospro_qrcode_batch` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '序号',
  `business_id` int NOT NULL DEFAULT '0' COMMENT '商户ID',
  `company_id` int NOT NULL DEFAULT '0' COMMENT '公司ID',
  `qrcode_batch_id` int NOT NULL DEFAULT '0' COMMENT '二维码ID',
  `qrcode_batch_no` varchar(255) NOT NULL DEFAULT '' COMMENT '二维码批次号',
  `qrcode_batch_name` varchar(255) NOT NULL DEFAULT '' COMMENT '二维码批次名称',
  `bind_count` int NOT NULL DEFAULT '0' COMMENT '已绑定数量',
  `no_bind_count` int NOT NULL DEFAULT '0' COMMENT '未绑定数量',
  `qrcode_create_time` int NOT NULL DEFAULT '0' COMMENT '编码生成时间',
  `c_time` int NOT NULL DEFAULT '0' COMMENT '数据录入时间',
  `u_time` int NOT NULL DEFAULT '0' COMMENT '数据最后更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `qrcode_batch_id` (`qrcode_batch_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='设备资产管理-二维码批次表';
```

