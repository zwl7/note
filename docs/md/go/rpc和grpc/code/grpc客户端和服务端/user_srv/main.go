package main

import (
	"context"
	"flag"
	"fmt"
	"go-all-new/mxshop_srvs/user_srv/database/mysql"
	"go-all-new/mxshop_srvs/user_srv/handler"
	"go-all-new/mxshop_srvs/user_srv/proto"
	"time"

	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// grpc panic拦截器  类似于http中间件
func panicInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
	//请求处理前
	defer func() {
		if r := recover(); r != nil {
			fmt.Printf("gRPC服务panic: %v\n", r)
			err = status.Errorf(codes.Internal, "服务器内部错误")
		}
	}()
	start := time.Now()

	resp, err = handler(ctx, req)

	//请求处理后
	duration := time.Since(start)
	fmt.Printf("方法: %s, 耗时: %v, 错误: %v\n", info.FullMethod, duration, err)

	return resp, err
}

func main() {
	// 1. 初始化数据库

	mysql.InitMySQL()

	// //生成user表结构
	// mysql.DB.AutoMigrate(model.User{})

	//md5.New()

	defer func() {
		if r := recover(); r != nil {
			fmt.Println("grpc server panic: ", r)
		}
	}()

	///--------------------------------grpc--------------------------------

	//通过命令行输入ip地址 和 port
	ip := flag.String("ip", "0.0.0.0", "ip address")
	port := flag.Int("port", 50051, "port")
	flag.Parse()

	//使用grpc 注册服务

	//初始化grpc服务，添加panic拦截器
	grpcServer := grpc.NewServer(
		grpc.UnaryInterceptor(panicInterceptor),
	)

	//注册服务到grpc 中
	proto.RegisterUserServiceServer(grpcServer, handler.NewUserServer())

	//监听端口
	lis, err := net.Listen("tcp", fmt.Sprintf("%s:%d", *ip, *port))
	if err != nil {
		panic("failed to listen: " + err.Error())
	}

	//启动grpc服务
	fmt.Println("grpc server started ...")

	err = grpcServer.Serve(lis)
	if err != nil {
		panic("failed to serve: " + err.Error())
	} else {
		fmt.Println("grpc server started successfully")
	}

}
