# 1. 什么是服务注册和发现

 1. **什么是服务注册和发现** 

假如这个产品已经在线上运行，有一天运营想搞一场促销活动，那么我们相对应的【用户服务】可能就要新开启三个微服务实例来支撑这场促销活动。而与此同时，作为苦逼程序员的你就只有手动去 API gateway 中添加新增的这三个微服务实例的 ip 与port ，一个真正在线的微服务系统可能有成百上千微服务，难道也要一个一个去手动添加吗？有没有让系统自动去实现这些操作的方法呢？答案当然是有的。

当我们新添加一个微服务实例的时候，微服务就会将自己的 ip 与 port 发送到注册中心，在注册中心里面记录起来。当 API gateway 需要访问某些微服务的时候，就会去注册中心取到相应的 ip 与 port。从而实现自动化操作。

 2. 技术选型 

Consul 与其他常见服务发现框架对比

| 名称      | 优点                                                         | 缺点                                                         | 接口     | 一致性算法 |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------- | ---------- |
| zookeeper | 1.功能强大，不仅仅只是服务发现 2.提供 watcher 机制能实时获取服务提供者的状态 3.dubbo 等框架支持 | 1.没有健康检查 2.需在服务中集成 sdk，复杂度高 3.不支持多数据中心 | sdk      | Paxos      |
| consul    | 1.简单易用，不需要集成 sdk 2.自带健康检查 3.支持多数据中心 4.提供 web 管理界面 | 1.不能实时获取服务信息的变化通知                             | http/dns | Raft       |
| etcd      | 1.简单易用，不需要集成 sdk 2.可配置性强                      | 1.没有健康检查 2.需配合第三方工具一起完成服务发现 3.不支持多数据中心 | http     | Raft       |



# 2. consul的安装和配置

 1. 安装 





Shell

运行代码复制代码

docker run -d -p 8500:8500 -p 8300:8300 -p 8301:8301 -p 8302:8302 -p 8600:8600/udp  hashicorp/consul consul agent  -dev -client=0.0.0.0

docker container update --restart=always 容器名字



 2. 访问 

浏览器访问 127.0.0.1:8500





 3. 访问dns 

consul提供dns功能，可以让我们通过， 可以通过dig命令行来测试，consul默认的dns端口是8600， 命令行：

linux下的dig命令安装：

yum install bind-utils





Shell

运行代码复制代码

dig @192.168.1.103 -p 8600 consul.service.consul SRV

windows下载dig命令 :https://www.yuque.com/bobby-zpcyu/bq1fxp/il42n7



# 3. consul的api接口

 1. 添加服务 

https://www.consul.io/api-docs/agent/service#register-service

 2. 删除服务 

https://www.consul.io/api-docs/agent/service#deregister-service

 3. 设置健康检查 

https://www.consul.io/api-docs/agent/check

 4. 同一个服务注册多个实例 



 5. 获取服务 

https://www.consul.io/api-docs/agent/service#list-services





# **5. go操作consul**



```go
package main

import (
	"fmt"

	"github.com/hashicorp/consul/api"
	)

func Register(address string, port int, name string, tags []string, id string) error {
	cfg := api.DefaultConfig()
	cfg.Address = "192.168.1.103:8500"

	client, err := api.NewClient(cfg)
	if err != nil {
		panic(err)
	}
	//生成对应的检查对象
	check := &api.AgentServiceCheck{
		HTTP: "http://192.168.1.102:8021/health",
		Timeout: "5s",
		Interval: "5s",
		DeregisterCriticalServiceAfter: "10s",
	}

	//生成注册对象
	registration := new(api.AgentServiceRegistration)
	registration.Name = name
	registration.ID = id
	registration.Port = port
	registration.Tags = tags
	registration.Address = address
	registration.Check = check

	err = client.Agent().ServiceRegister(registration)
	if err != nil {
		panic(err)
	}
	return nil
}

func AllServices(){
	cfg := api.DefaultConfig()
	cfg.Address = "192.168.1.103:8500"

	client, err := api.NewClient(cfg)
	if err != nil {
		panic(err)
	}

	data, err := client.Agent().Services()
	if err != nil {
		panic(err)
	}
	for key, _ := range data{
		fmt.Println(key)
	}
}
func FilterSerivice(){
	cfg := api.DefaultConfig()
	cfg.Address = "192.168.1.103:8500"

	client, err := api.NewClient(cfg)
	if err != nil {
		panic(err)
	}

	data, err := client.Agent().ServicesWithFilter(`Service == "user-web"`)
	if err != nil {
		panic(err)
	}
	for key, _ := range data{
		fmt.Println(key)
	}
}


func main(){
	//_ = Register("192.168.1.102", 8021, "user-web", []string{"mxshop", "bobby"}, "user-web")
	//AllServices()
	FilterSerivice()
}
```

