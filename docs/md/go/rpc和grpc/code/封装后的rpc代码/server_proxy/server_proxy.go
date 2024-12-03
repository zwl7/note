package server_proxy

import (
	"learning/rpc/handler"
	"net/rpc"
)

type HelloServiceInterface interface {
	Hello(request string, reply *string) error
}

func RegisterHelloServiceName(srv HelloServiceInterface) error {
	////2. 注册处理逻辑 handler
	err := rpc.RegisterName(handler.HelloServiceName, srv)
	if err != nil {
		return err
	}
	return nil
}
