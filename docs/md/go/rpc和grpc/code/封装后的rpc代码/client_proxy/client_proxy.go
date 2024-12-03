package client_proxy

import (
	"learning/rpc/handler"
	"net/rpc"
)

type HelloServiceStub struct {
	Client *rpc.Client
}

func NewHelloServiceStub() (service *HelloServiceStub) {
	//建立一个tcp链接  发送一个请求给链接 内容是zwl
	client, err := rpc.Dial("tcp", "localhost:8900")
	if err != nil {
		panic("error")
	}
	return &HelloServiceStub{client}
}

func (c *HelloServiceStub) Hello(serviceMethodName, request string, response *string) error {
	//
	err := c.Client.Call(handler.HelloServiceName+"."+serviceMethodName, request, response)
	if err != nil {
		return err
	}

	return nil
}
