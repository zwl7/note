package main

import (
	"learning/rpc/handler"
	"learning/rpc/server_proxy"
	"net"
	"net/rpc"
)

func main() {
	//1. 实例化一个server
	listen, err := net.Listen("tcp", ":8900")
	if err != nil {
		panic("error")
	}

	_ = server_proxy.RegisterHelloServiceName(handler.NewHelloService())

	//3. 启动服务
	conn, _ := listen.Accept()
	rpc.ServeConn(conn) // 会在这里监听
}
