package handler

import (
	"context"
	"go-all-new/mxshop_srvs/user_srv/model"
	"go-all-new/mxshop_srvs/user_srv/proto"
	"time"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserServer struct {
	proto.UnimplementedUserServiceServer
}

func NewUserServer() *UserServer {
	return &UserServer{}
}

func modelToUserInfo(user model.User) *proto.UserInfo {
	return &proto.UserInfo{
		UserId:   uint64(user.ID),
		Name:     user.Name,
		Mobile:   user.Mobile,
		BirthDay: user.Birthday.Format("2006-01-02"),
		Gender:   user.Gender,
		Role:     uint32(user.Role),
	}
}

// rpc GetUserList(GetUserListRequest) returns (GetUserListResponse);
func (s *UserServer) GetUserList(ctx context.Context, req *proto.GetUserListRequest) (*proto.GetUserListResponse, error) {

	//查询数据库的用户列表

	// result := mysql.DB.Scopes(model.BaseModel.Paginate(int(req.Page), int(req.Size))).Find(&users)
	userModel := model.NewUserModel()
	userList, err := userModel.GetList(int(req.Page), int(req.Size))
	if err != nil {
		return nil, err
	}

	var count int64
	total, err := userModel.GetCount(&count)
	if err != nil {
		return nil, err
	}

	userListProto := make([]*proto.UserInfo, 0)
	for _, user := range userList {
		userListProto = append(userListProto, modelToUserInfo(user))
	}

	return &proto.GetUserListResponse{
		Total: uint32(total),
		User:  userListProto,
	}, nil
}

func (s *UserServer) GetUserByMobile(ctx context.Context, req *proto.MobileRequest) (*proto.UserInfo, error) {
	userModel := model.NewUserModel()
	user, err := userModel.GetUserByMobile(req.Mobile)
	if model.IsNotFoundError(err) {
		// return nil, status.Errorf(codes.NotFound, "用户不存在")
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	return modelToUserInfo(*user), nil
}

func (s *UserServer) GetUserById(ctx context.Context, req *proto.UserIdRequest) (*proto.UserInfo, error) {
	userModel := model.NewUserModel()
	err := userModel.GetUserById(req.UserId)
	if model.IsNotFoundError(err) {
		// return nil, status.Errorf(codes.NotFound, "用户不存在")
		return nil, err
	}

	if err != nil {
		return nil, err
	}
	return modelToUserInfo(*userModel), nil
}

func (s *UserServer) CreateUser(ctx context.Context, req *proto.CreateUserInfo) (*proto.UserInfo, error) {
	userModel := model.NewUserModel()

	//先查询用户手机号是否存在
	_, err := userModel.GetUserByMobile(req.Mobile)
	if !model.IsNotFoundError(err) {
		return nil, status.Errorf(codes.AlreadyExists, "用户已存在")
	}
	if err != nil {
		return nil, err
	}

	birthday, err := time.Parse("2006-01-02", req.BirthDay)
	if err != nil {
		return nil, err
	}

	userModel.Mobile = req.Mobile
	//密码要加密一下，这里偷懒不加密了
	userModel.Password = req.Password
	userModel.Name = req.Name
	userModel.Birthday = &birthday
	userModel.Gender = req.Gender
	userModel.Role = int8(req.Role)

	err = userModel.CreateUser()
	if err != nil {
		return nil, err
	}

	return modelToUserInfo(*userModel), nil
}

func (s *UserServer) UpdateUser(ctx context.Context, req *proto.UpdateUserInfo) (*proto.UserInfo, error) {
	userModel := model.NewUserModel()
	err := userModel.GetUserById(req.UserId)
	if model.IsNotFoundError(err) {
		//用户不存在
		return nil, status.Errorf(codes.NotFound, "用户不存在")
	}
	if err != nil {
		return nil, err
	}

	if req.BirthDay != "" {
		birthday, err := time.Parse("2006-01-02", req.BirthDay)
		if err != nil {
			return nil, err
		}
		userModel.Birthday = &birthday
	}

	if req.Mobile != "" {
		userModel.Mobile = req.Mobile
	}

	if req.Name != "" {
		userModel.Name = req.Name
	}

	if req.Password != "" {	
		userModel.Password = req.Password
	}

	if req.Gender != "" {
			userModel.Gender = req.Gender
	}

	if req.Role != 0 {
		userModel.Role = int8(req.Role)
	}

	err = userModel.UpdateUser()
	if err != nil {
		return nil, err
	}

	return modelToUserInfo(*userModel), nil
}

// CheckPassWord
func (s *UserServer) CheckPassWord(ctx context.Context, req *proto.CheckPasswordRequest) (*proto.CheckPasswordResponse, error) {
	userModel := model.NewUserModel()
	err := userModel.GetUserById(req.UserId)
	if model.IsNotFoundError(err) {
		return nil, status.Errorf(codes.NotFound, "用户不存在")
	}

	if err != nil {
		return nil, err
	}

	// 密码要加密一下，这里偷懒不加密了
	if userModel.Password != req.Password {
		return nil, status.Errorf(codes.NotFound, "密码错误")
	} else {
		return &proto.CheckPasswordResponse{Success: true}, nil
	}
}
