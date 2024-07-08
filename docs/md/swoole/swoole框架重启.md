### 1.双实例重启(服务不间断)

通过nginx的负载均衡配置





1.有一台hyperf服务在9501,此时代码更新了需要重启服务,就把9051的代码复制一份，然后拉取最新代码（如果有compose包的更新，记得composer install 或者compose dump-atuo -o一下），再启动在9502(新服务).

2.打开nginx配置中的9502注释，把请求转发到9502中，记得nginx -s relaod。

3.在停止掉9501端口的服务,用swoole的shutdown方法或者往swoole的master进程发送平滑停止信号。

Kill -15 master进程id //kill -15 500

swoole进程收到停止信号后，会处理完当前请求后，再停止服务.

4.然后nginx发现9501端口不能用后，会把请求全部转发到9502端口,此时就完成了

5.然后再关闭9501服务，就完成了一次不间断的重启。





//例子

\### 轮询配置（这里是重点） php是容器名称，走容器网络。

​    upstream hyperf {

​        server php:9501;

​        #server php:9502; 

​    }



server {

​    listen 8003;

​    charset utf-8;



​    location / {        

​        \# 将客户端的 Host 和 IP 信息一并转发到对应节点  

​        proxy_set_header Host $http_host;

​        proxy_set_header X-Real-IP $remote_addr;

​        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

​        

​        \# 转发Cookie，设置 SameSite

​        proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";

​        

​        \# 执行代理访问真实服务器

​        proxy_pass http://hyperf;

​    }

}



hyperf官方例子

## [配置 Http 代理](https://hyperf.wiki/3.0/#/zh-cn/tutorial/nginx?id=配置-http-代理)

```nginx
# 至少需要一个 Hyperf 节点，多个配置多行
upstream hyperf {
    # Hyperf HTTP Server 的 IP 及 端口
    server 127.0.0.1:9501;
    server 127.0.0.1:9502;
}

server {
    # 监听端口
    listen 80; 
    # 绑定的域名，填写您的域名
    server_name proxy.hyperf.io;

    location / {
        # 将客户端的 Host 和 IP 信息一并转发到对应节点  
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # 转发Cookie，设置 SameSite
        proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";
        
        # 执行代理访问真实服务器
        proxy_pass http://hyperf;
    }
}Copy to clipboardErrorCopied
```

## [配置 Websocket 代理](https://hyperf.wiki/3.0/#/zh-cn/tutorial/nginx?id=配置-websocket-代理)

```nginx
# 至少需要一个 Hyperf 节点，多个配置多行
upstream hyperf_websocket {
    # 设置负载均衡模式为 IP Hash 算法模式，这样不同的客户端每次请求都会与同一节点进行交互
    ip_hash;
    # Hyperf WebSocket Server 的 IP 及 端口
    server 127.0.0.1:9503;
    server 127.0.0.1:9504;
}

server {
    listen 80;
    server_name websocket.hyperf.io;
    
    location / {
        # WebSocket Header
        proxy_http_version 1.1;
        proxy_set_header Upgrade websocket;
        proxy_set_header Connection "Upgrade";
        
        # 将客户端的 Host 和 IP 信息一并转发到对应节点  
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
    
        # 客户端与服务端无交互 60s 后自动断开连接，请根据实际业务场景设置
        proxy_read_timeout 60s ;
        
        # 执行代理访问真实服务器
        proxy_pass http://hyperf_websocket;
    }
}
```