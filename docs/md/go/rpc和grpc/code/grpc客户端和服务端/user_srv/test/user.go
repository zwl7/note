package main

import (
	"context"
	"fmt"
	"go-all-new/mxshop_srvs/user_srv/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var userClient proto.UserServiceClient
var conn *grpc.ClientConn

func initGrpc() proto.UserServiceClient {
	//初始化grpc客户端

	var err error
	conn, err = grpc.NewClient("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))

	if err != nil {
		println("+++++++++++++")
		fmt.Println("grpc new client error: ", err.Error())
		println("+++++++++++++")
		panic(err)
	}

	return proto.NewUserServiceClient(conn)

}

func main() {
	userClient = initGrpc()
	defer conn.Close()

	//GetUserList(ctx context.Context, in *GetUserListRequest, opts ...grpc.CallOption) (*GetUserListResponse, error)
	// // 通过手机号查询用户
	// GetUserByMobile(ctx context.Context, in *MobileRequest, opts ...grpc.CallOption) (*UserInfo, error)
	// // 通过id查询用户
	// GetUserById(ctx context.Context, in *UserIdRequest, opts ...grpc.CallOption) (*UserInfo, error)
	// // 创建用户
	// CreateUser(ctx context.Context, in *CreateUserInfo, opts ...grpc.CallOption) (*UserInfo, error)
	// // 更新用户
	// UpdateUser(ctx context.Context, in *UpdateUserInfo, opts ...grpc.CallOption) (*UserInfo, error)
	// // 检查用户密码
	// CheckPassWord(ctx context.Context, in *CheckPasswordRequest, opts ...grpc.CallOption) (*CheckPasswordResponse, error)
	// // 删除用户
	// DeleteUser(ctx context.Context, in *UserIdRequest, opts ...grpc.CallOption) (*emptypb.Empty, error)

	//--------------------------------用户列表--------------------------------
	GetUserListRequest := &proto.GetUserListRequest{
		Page: 1,
		Size: 10,
	}

	userList, err := userClient.GetUserList(context.Background(), GetUserListRequest)
	if err != nil {
		println("+++++++++++++")
		fmt.Println(err.Error())
		println("+++++++++++++")
		//panic(err.Error())
	}
	fmt.Println(userList)

	//--------------------------------通过手机号查询用户--------------------------------

	GetUserByMobileRequest := &proto.MobileRequest{
		Mobile: "15976123893",
	}
	user, err := userClient.GetUserByMobile(context.Background(), GetUserByMobileRequest)
	if err != nil {
		println("+++++++++++++")
		fmt.Println(err.Error())
		println("+++++++++++++")
	}
	fmt.Println(user)

	//--------------------------------通过id查询用户--------------------------------
	GetUserByIdRequest := &proto.UserIdRequest{
		UserId: 2,
	}
	user, err = userClient.GetUserById(context.Background(), GetUserByIdRequest)
	if err != nil {
		println("+++++++++++++")
		fmt.Println(err.Error())
		println("+++++++++++++")
	}
	fmt.Println(user)

	//--------------------------------创建用户--------------------------------
	// CreateUserRequest := &proto.CreateUserInfo{
	// 	Mobile:   "15976123893",
	// 	Password: "123456",
	// 	Name: "test",
	// }
	// user, err = userClient.CreateUser(context.Background(), CreateUserRequest)
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println(user)

	CreateUserRes, err := userClient.CreateUser(context.Background(), &proto.CreateUserInfo{
		Mobile:   "15976123899",
		Password: "123456",
		Name:     "test",
		BirthDay: "2025-01-01",
		Gender:   "male",
		Role:     1,
	})
	if err != nil {
		println("+++++++++++++")
		fmt.Println(err.Error())
		println("+++++++++++++")
	}
	println("+++++++++++++")
	fmt.Println(CreateUserRes)
	println("+++++++++++++")

	//--------------------------------更新用户--------------------------------
	UpdateUserRequest := &proto.UpdateUserInfo{
		UserId: 1,
		Name:   "test2",
	}
	user, err = userClient.UpdateUser(context.Background(), UpdateUserRequest)
	if err != nil {
		println("+++++++++++++")
		fmt.Println(err.Error())
		println("+++++++++++++")
	}
	fmt.Println(user)

	//--------------------------------检查用户密码--------------------------------
	CheckPasswordRequest := &proto.CheckPasswordRequest{
		UserId:   1,
		Password: "123456",
	}
	CheckPassWordRes, err := userClient.CheckPassWord(context.Background(), CheckPasswordRequest)
	if err != nil {
		println("+++++++++++++")
		fmt.Println(err.Error())
		println("+++++++++++++")
	}
	fmt.Println(CheckPassWordRes)
}
