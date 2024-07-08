### 1.生成全局唯一ID可以用推特的雪花算法

这是原理：https://www.jianshu.com/p/3b75c254a7c8

composr包：https://packagist.org/packages/godruoyi/php-snowflake

```
"godruoyi/php-snowflake": "^1.1"
```

github地址：https://github.com/godruoyi/php-snowflake



```php
//获取唯一id，根据机器码和时间戳生成。分布式下也会不一样。
function createOnlyID()
{
  $snowflake = new \Godruoyi\Snowflake\Snowflake;
  $snowflake->setStartTimeStamp(strtotime(date('y-m-d'))*1000);
  return $snowflake->id();
}

$uuid = createOnlyID();
```

