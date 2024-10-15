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



```
"require": {
    "godruoyi/php-snowflake": "2.2.4"
}
```

```php
require "./vendor/autoload.php";


$array = [];
var_dump(microtime(true));
for ($i = 0; $i <1000; $i++) {
    $SnowflakeId = (new \Godruoyi\Snowflake\Snowflake())->setStartTimeStamp(1443369600000)->id();
    $array[] = $SnowflakeId;
    usleep(200);
}
var_dump(microtime(true));
var_dump(count(array_unique($array)));
var_dump($array);
```

float(1727675447.4757)
float(1727675447.7341)
int(1000)
array(1000) {
  [0]=>
  string(19) "1192465153287784833"