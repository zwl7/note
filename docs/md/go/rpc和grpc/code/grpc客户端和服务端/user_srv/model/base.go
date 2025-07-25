package model

import (
	"errors"
	"go-all-new/mxshop_srvs/user_srv/database/mysql"
	"time"

	"gorm.io/gorm"
)

type NotFoundError struct {
	Message string
}

func (e *NotFoundError) Error() string {
	return e.Message
}

func NewNotFoundError(message string) error {
	return &NotFoundError{Message: message}
}

func IsNotFoundError(err error) bool {
	return errors.Is(err, NewNotFoundError(""))
}

type BaseModel struct {
	ID         uint64     `gorm:"primarykey;column:id;type:bigint;not null;autoIncrement" json:"id"`
	AddTime    *time.Time `gorm:"column:add_time;type:datetime(3)" json:"add_time"`
	UpdateTime *time.Time `gorm:"column:update_time;type:datetime(3)" json:"update_time"`
	DeletedAt  *time.Time `gorm:"column:deleted_at;type:datetime(3)" json:"deleted_at"`
	IsDeleted  *bool      `gorm:"column:is_deleted;type:tinyint(1)" json:"is_deleted"`
}

func (b BaseModel) Paginate(page, size int) *gorm.DB {

	offset := (page - 1) * size
	return mysql.DB.Offset(offset).Limit(size).Order("add_time desc")

}
