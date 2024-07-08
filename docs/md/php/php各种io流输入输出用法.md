# **php的各种 I/O流 以及用法**

## php://协议

首先,我们来说一下一个php提供的协议:"php://"

或许有人看到这个会懵逼,这是什么东东?这有啥用?这咋用?我是谁?我在哪?我要去往何处?

恩,大家可以翻开php手册,搜索一下

php://是php内置的一个类url操作的协议,它运行我们访问php各种I/O流,至于什么是I/O流,举个例子:

echo "hello world"; 这个字符串会经过php的处理,最后输出到用户端/控制台,而这个就是"hello world"就是 输出的 流,程序把这个字符串处理成一串串的二进制,输出到了用户端/控制台,这样的字符串就叫做输出流

同理,用户发起一个post请求,将数据传给服务器,服务器接收,这样的字符串就叫做输入流

好了,该协议的用法先放着,我们来看看php的各种I/O流



## STDIN 输入流

STDIN输入流为 php的标准输入流,一般是指键盘输入到程序缓冲区的数据
在php中,主要是指在php-cli运行模式下,用户使用键盘输入到控制台的数据,例如:(注意,需要使用php-cli模式)

```php
<?php
/**
 * Created by PhpStorm.
 * User: tioncico
 * Date: 18-10-20
 * Time: 下午5:20
 */
echo "请输入你的名字:\\n";
$stdin = fopen("php://stdin",'r');
$data = fgets($stdin);
echo "{$data}大哥,你好啊!";
```

![仙士可博客](https://www.php20.cn/Upload/image/ueditor/20181027/1540649734731288.png)

可看到,上面使用了php://stdin 协议,打开了一个标准输入的操作句柄,然后可读取用户在控制台输入的数据

上面的代码也可写成:

```php
<?php
/**
 * Created by PhpStorm.
 * User: tioncico
 * Date: 18-10-20
 * Time: 下午5:20
 */
echo "请输入你的名字:\\n";
$data = trim(fgets(STDIN));
echo "{$data}大哥,你好啊!";
```

STDIN常量是一个已经打开的stdin流,可节省几行代码,也可节省小部分打开stdin的性能

当然,值得注意的点是:

1:php://stdin打开的其实是STDIN常量已经打开的复制,所以就算关闭了php://stdin,也是关闭的复制,STDIN已打开的不会被关闭

2:php://stdin是只读的

3:请直接使用STDIN常量,而不使用php://stdin

4:使用fgets读取,只能读取一行数据(检测到回车就返回),可以使用stream_get_contents 控制读取数量,用于一次性读取包含换行的输入数据



## STDOUT输出流

STDOUT和STDIN正好相反,是标准输出流,它将运行php将字符串默认输出到控制台(可使用freopen重定向到文件),例如:(注意,使用php-cli模式运行)

```php
<?php
/**
 * Created by PhpStorm.
 * User: tioncico
 * Date: 18-10-20
 * Time: 下午5:20
 */
$stdout = fopen("php://stdout",'w');
fwrite($stdout,"这是输出1\\n");
echo "这是输出2\\n";
fwrite(STDOUT,"这是输出3\\n");
```

![仙士可博客](https://www.php20.cn/Upload/image/ueditor/20181027/1540650405282681.png)

和stdin注意点一样,这里不复制了,但需要加上一条:

在php-cli模式中,作用和echo相同,但是实现方式不一样



## STDERR 标准错误

STRERR 标准错误和STDOUT差不多,都是将字符串默认打印到控制台(可使用freopen重定向到文件),但是这个是打印错误用的,区分就是STDERR会将打印的字符串变成红色(需要终端支持)例如:(注意,使用php-cli模式运行)

```php
<?php
/**
 * Created by PhpStorm.
 * User: tioncico
 * Date: 18-10-20
 * Time: 下午5:20
 */
$stderr = fopen("php://stderr",'w');
fwrite($stderr,"这是输出1\\n");
echo "这是输出2\\n";
fwrite(STDERR,"这是输出3\\n");
$a=$b;
```

![仙士可博客](https://www.php20.cn/Upload/image/ueditor/20181027/1540651185783860.png)

从上面的STDOUT注意点到这里可以发现,STDERR和echo语句的输出顺序是不相同的,个人猜测是echo的缓冲区和STDERR不相同



## php://input

从这里开始,就和上面的3个程序标准I/O流关系不大啦,咱们继续往下看,该部分参考:http://www.nowamagic.net/academy/detail/12220520,有时间可详细阅读,本文只做功能简单介绍

php://input 是个可以访问请求的原始数据的只读流。

通俗来讲:php://input可接收用户请求过来的原始数据流(大多数时候作用于POST请求),例如:(需要使用web方式请求)

服务端代码:

```php
<?php
$data = file\_get\_contents("php://input",'r');
echo "下面是php://input\\n";
var_dump($data);
echo 1;
echo "下面是 POST:\\n";
var\_dump($\_POST);
```

客户端请求代码:

```php
<?php
/**
 * Created by PhpStorm.
 * User: tioncico
 * Date: 18-10-27
 * Time: 下午11:06
 */

function send\_post($url, $post\_data) {

    $postdata = http\_build\_query($post_data);
    $options = array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-type:application/x-www-form-urlencoded',
            'content' => $postdata,
            'timeout' => 15 * 60 // 超时时间（单位:s）
        )
    );
    $context = stream\_context\_create($options);
    $result = file\_get\_contents($url, false, $context);
    return $result;
}

//使用方法
$post_data = array(
    'username' => 'tioncico',
    'password' => '123456'
);
$data = send\_post('http://test.cn', $post\_data);
var_dump($data);
```

输出:

![仙士可博客](https://www.php20.cn/Upload/image/ueditor/20181027/1540653019244028.png)



## php://output

php://output 是一个只写的数据流， 允许你以 print 和 echo 一样的方式 写入到输出缓冲区。可以说功能和echo 一样(可以在web和php-cli使用)

```php
<?php
file\_put\_contents("php://output","仙士可最帅");
```

![仙士可博客](https://www.php20.cn/Upload/image/ueditor/20181027/1540653412123935.png)

![仙士可博客](https://www.php20.cn/Upload/image/ueditor/20181027/1540653179449257.png)



## php://fd

php://fd 允许直接访问指定的文件描述符。 例如 php://fd/3 引用了文件描述符 3。用法:

在linux中,一切皆文件,当启动系统时,先会启动STDIN标准输入(文件描述符0),之后是STDOUT文件描述符1,STDERR文件描述符2
使用php://fd,可直接调用该文件:

```php
<?php
$stdin = fopen("php://fd/0",'r');
$data = fgets($stdin);
echo "这是STDIN输入的:{$data}\\n";
file\_put\_contents("php://fd/2","这是STDERR\\n");
file\_put\_contents("php://fd/1","这是STDOUT\\n");
```

![仙士可博客](https://www.php20.cn/Upload/image/ueditor/20181027/1540654551962083.png)



## php://memory 和 php://temp

php://memory 和 php://temp 是一个类似文件 包装器的数据流，允许读写临时数据。 两者的唯一区别是 php://memory 总是把数据储存在内存中， 而 php://temp 会在内存量达到预定义的限制后（默认是 2MB）存入临时文件中。 临时文件位置的决定和 sys_get_temp_dir() 的方式一致。 php://temp 的内存限制可通过添加 /maxmemory:NN 来控制，NN 是以字节为单位、保留在内存的最大数据量，超过则使用临时文件。例如:

```php
<?php
// Set the limit to 5 MB.
$fiveMBs = 5 * 1024 * 1024;
$temp_f = fopen("php://temp/maxmemory:$fiveMBs", 'r+');//maxmemory可以调整存储空间大小
fputs($temp_f, "hello,仙士可,我是temp的数据\\n");
rewind($temp_f);//由于写入数据时,指针已经到了末尾,需要重置指针才能读取到数据
echo stream\_get\_contents($temp_f);
$fiveMBs = 5 * 1024 * 1024;
$memory_f = fopen("php://memory", 'r+');//maxmemory可以调整存储空间大小
fputs($memory_f, "hello,仙士可,我是memory的数据\\n\\n");
rewind($memory_f);//由于写入数据时,指针已经到了末尾,需要重置指针才能读取到数据
echo stream\_get\_contents($memory_f);
```

![仙士可博客](https://www.php20.cn/Upload/image/ueditor/20181027/1540654803596705.png)

注意:关闭文件之后数据将无法读取



## php://filter

php://filter 是一种元封装器， 设计用于数据流打开时的筛选过滤应用。 这对于一体式（all-in-one）的文件函数非常有用，类似 readfile()、 file() 和 file_get_contents()， 在数据流内容读取之前没有机会应用其他过滤器。

php://filter 目标使用以下的参数作为它路径的一部分。 复合过滤链能够在一个路径上指定。详细使用这些参数可以参考具体范例。

php://filter 参数

名称

描述

*resource=<要过滤的数据流>*

这个参数是必须的。它指定了你要筛选过滤的数据流。

*read=<读链的筛选列表>*

该参数可选。可以设定一个或多个过滤器名称，以管道符（*|*）分隔。

*write=<写链的筛选列表>*

该参数可选。可以设定一个或多个过滤器名称，以管道符（*|*）分隔。

*<；两个链的筛选列表>*

任何没有以 *read=* 或 *write=* 作前缀 的筛选器列表会视情况应用于读或写链。



### 可选项

封装协议摘要（针对 *php://filter*，参考被筛选的封装器。）

属性

支持

受限于 [allow_url_fopen](http://php.net/manual/zh/filesystem.configuration.php#ini.allow-url-fopen)

No

受限于 [allow_url_include](http://php.net/manual/zh/filesystem.configuration.php#ini.allow-url-include)

仅 *php://input*、 *php://stdin*、 *php://memory* 和 *php://temp*。

允许读取

仅 *php://stdin*、 *php://input*、 *php://fd*、 *php://memory* 和 *php://temp*。

允许写入

仅 *php://stdout*、 *php://stderr*、 *php://output*、 *php://fd*、 *php://memory* 和 *php://temp*。

允许追加

仅 *php://stdout*、 *php://stderr*、 *php://output*、 *php://fd*、 *php://memory* 和 *php://temp*（等于写入）

允许同时读写

仅 *php://fd*、 *php://memory* 和 *php://temp*。

支持 [stat()](http://php.net/manual/zh/function.stat.php)

仅 *php://memory* 和 *php://temp*。

支持 [unlink()](http://php.net/manual/zh/function.unlink.php)

No

支持 [rename()](http://php.net/manual/zh/function.rename.php)

No

支持 [mkdir()](http://php.net/manual/zh/function.mkdir.php)

No

支持 [rmdir()](http://php.net/manual/zh/function.rmdir.php)

No

仅仅支持 [stream_select()](http://php.net/manual/zh/function.stream-select.php)

*php://stdin*、 *php://stdout*、 *php://stderr*、 *php://fd* 和 *php://temp*。

该协议个人不是很会用,并且个人觉得没啥必要学习,所以直接复制php手册的例子吧

```php
<?php
/* 这会以大写字母输出 www.example.com 的全部内容 */
readfile("php://filter/read=string.toupper/resource=http://www.example.com");

/* 这会和以上所做的一样，但还会用 ROT13 加密。 */
readfile("php://filter/read=string.toupper|string.rot13/resource=http://www.example.com");
```