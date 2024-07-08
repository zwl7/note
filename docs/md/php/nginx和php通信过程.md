### 1.nginx和php究竟是如何通信的？

首先要搞清楚什么是CGI，FASTCGI，PHP-FPM，PHP—CGI

**cgi**是通用网关协议。有什么用呢？是web server（nginx，apache等）和web application（php，java等）之间进行通信的协议。nginx通过CGI协议将数据，转化成php能理解的数据，php才能进行处理。

php的sapi编程。php和其他应用程序进行通信时，有4种方式。分别是cgi，fastcgi，cli，dll（模块方式，比如apaceh）



**fastcgi**是cgi的升级版，可以看作是一个常驻内存的cgi程序。

以前的cgi对于每一个链接请求都是fork一个cgi进程，进行处理，处理完后销毁进程。

缺点是：高并发情况下，cgi需要fork非常多的cgi进程，导致效率低下。fastcgi则可以解决这个问题。

fastcgi在处理完请求后，不会关闭，会留在内存中，继续处理下一个请求。



**php-fpm**全称是php-fastcgi process manageer（fastcgi 进程管理程序）

要了解PHP-FPM，就得先说说PHP-CGI。

Php-cgi就是PHP实现的自带的FastCGI管理器。 虽然是php官方出品，但是这丫的却一点也不给力，性能太差，而且也很麻烦不人性化，主要体现在：

1. php-cgi变更php.ini配置后，需重启php-cgi才能让新的php-ini生效，不可以平滑重启。
2. 直接杀死php-cgi进程，php就不能运行了。

上面2个问题，一直让很多人病垢了很久，所以很多人一直还是在用 Module 方式。 直到 2004年一个叫 Andrei Nigmatulin的屌丝发明了PHP-FPM ，这神器的出现就彻底打破了这种局面，这是一个PHP专用的 fastcgi 管理器，它很爽的克服了上面2个问题，而且，还表现在其他方面更表现强劲。

也就是说，PHP-FPM 是对于 FastCGI 协议的具体实现，他负责管理一个进程池，来处理来自Web服务器的请求。**目前，PHP5.3版本之后，PHP-FPM是内置于PHP的**。

因为PHP-CGI只是个CGI程序，他自己本身只能解析请求，返回结果，不会进程管理。所以就出现了一些能够调度 php-cgi 进程的程序，比如说由lighthttpd分离出来的spawn-fcgi。同样，PHP-FPM也是用于调度管理PHP解析器php-cgi的管理程序。

PHP-FPM通过生成新的子进程可以实现php.ini修改后的平滑重启。



![image-20210411183929679](../img/image-20210411183929679.png)



1.一个http请求过来，进入到nginx中。

2.如果是静态资源则nginx直接返回。如果是php文件,nginx则根据fastcgi_pass配置的方式将数据传输给php-fpm

fastcgi_pass配置有两种，分别是1.unix的socket方式和2.tcp方式

1.是通过文件流的方式，只能在本服务器上，传输。

2.用过tcp链接的方式，负载均衡的话，一定要用这个方式。

优缺点

1.socket方式在并发较高的情况下，会出现不稳定的情况。但在并发较低时，传输效率比tcp高，一般在并发1000QPS以上就不建议使用socket方式了。



3.

而是通过 Socket 与 FastCGI 响应器（FastCGI 进程管理器）进行交互，也正是由于 FastCGI 进程管理器是基于 Socket 通信的，所以也是分布式的，Web 服务器可以和 CGI 响应器服务器分开部署。

数据通过socket方式，将fastcgi格式信息传输给php-fpm后，php-fpm中的FastCGI触发器（wrapper）接收到调用对应的worker进程，也就是php-cig进程对请求进行对应的处理。	对应的进行处理完后，返回对应的数据，再将数据返回给nginx。此时数据格式依然是fastcgi格式。