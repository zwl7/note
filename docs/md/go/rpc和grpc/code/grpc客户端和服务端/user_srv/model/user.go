package model

import (
	"go-all-new/mxshop_srvs/user_srv/database/mysql"
	"time"

	"gorm.io/gorm"
)

func NewUserModel() *User {
	return &User{}
}

// User 用户模型
type User struct {
	BaseModel
	Mobile   string     `gorm:"column:mobile;type:varchar(11);not null;default:'';uniqueIndex:uni_user_mobile;index:idx_mobile" json:"mobile"`
	Password string     `gorm:"column:password;type:varchar(100);not null;default:''" json:"password"`
	Name     string     `gorm:"column:name;type:varchar(20);default:''" json:"name"`
	Birthday *time.Time `gorm:"column:birthday;type:date" json:"birthday"`
	Gender   string     `gorm:"column:gender;type:varchar(6);default:'male'" json:"gender"`
	Role     int8       `gorm:"column:role;type:tinyint;default:1" json:"role"`
}

// BeforeCreate GORM钩子：创建前设置时间
func (u *User) BeforeCreate(tx *gorm.DB) error {
	now := time.Now()
	u.AddTime = &now
	u.UpdateTime = &now
	return nil
}

// BeforeUpdate GORM钩子：更新前设置时间
func (u *User) BeforeUpdate(tx *gorm.DB) error {
	now := time.Now()
	u.UpdateTime = &now
	return nil
}

func (u *User) GetList(page, size int) ([]User, error) {
	offset := (page - 1) * size
	var users []User
	result := mysql.DB.Offset(offset).Limit(size).Order("id desc").Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return users, nil
}

func (u *User) GetCount(count *int64) (int64, error) {
	result := mysql.DB.Model(&User{}).Count(count)
	if result.Error != nil {
		return 0, result.Error
	}
	return *count, nil
}

func (u *User) GetUserByMobile(mobile string) (*User, error) {
	result := mysql.DB.Where("mobile = ?", mobile).First(&u)
	if result.Error != nil {
		return nil, result.Error
	}

	if result.RowsAffected == 0 {
		return nil, NewNotFoundError("")
	}

	return u, nil
}

func (u *User) GetUserById(id uint64) error {
	result := mysql.DB.Where("id = ?", id).First(&u)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return NewNotFoundError("")
	}
	return nil
}

func (u *User) CreateUser() error {
	result := mysql.DB.Create(&u)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (u *User) UpdateUser() error {
	result := mysql.DB.Save(&u)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
