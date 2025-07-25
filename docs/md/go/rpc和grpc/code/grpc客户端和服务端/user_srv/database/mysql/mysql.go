package mysql

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
)

// 👉🏻 https://gorm.io/zh_CN/docs/

var (
	DB *gorm.DB
)

func InitMySQL() error {

	//获得一个*grom.DB对象
	// dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=true&loc=Local",
	// 	viper.GetString("mysql.user"),
	// 	viper.GetString("mysql.password"),
	// 	viper.GetString("mysql.host"),
	// 	viper.GetInt("mysql.port"),
	// 	viper.GetString("mysql.dbname"))
	dsn := "root:mysqlP+ld+1K+Dz@tcp(127.0.0.1:3306)/mxshop_user_srv?charset=utf8mb4&parseTime=true&loc=Local"

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold: time.Second,
			LogLevel:      logger.Info,
			Colorful:      true,
		},
	)

	// 不能直接DB，err := gorm.Open() 因为:=会重新定义新的变量DB，DB就变成了局部变量，外面访问时就变成了nil
	//DB, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	err := errors.New("")
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   "", //如果设置为"mxshop_"，那么User结构体会生成mxshop_users表名
			SingularTable: true, // 设置为true时: 使用单数形式（如User → user）
			NoLowerCase:   false, // 控制是否将字段名转换为小写 ,设置为true时: 保持原始大小写
		},

		Logger: newLogger,
	})
	if err != nil {
		//fmt.Println("Gorm init 异常：", err)
		panic("Gorm DB init 异常：" + err.Error())
	}

	//根据*grom.DB对象获得*sql.DB的通用数据库接口
	sqlDB, err := DB.DB()
	if err != nil {
		panic("Gorm sqlDB init 异常：" + err.Error())
	}
	sqlDB.Ping()
	//sqlDB.SetConnMaxLifetime(time.Hour * 2) // 设置连接最大生命周期

	//max_open_conns
	// sqlDB.SetMaxIdleConns(viper.GetInt("mysql.max_idle_conns")) //设置最大连接数
	// sqlDB.SetMaxOpenConns(viper.GetInt("mysql.max_open_conns")) //设置最大的空闲连接数
	sqlDB.SetMaxIdleConns(10) //设置最大连接数
	sqlDB.SetMaxOpenConns(5)  //设置最大的空闲连接数

	data, err := json.Marshal(sqlDB.Stats()) //获得当前的SQL配置情况
	fmt.Println(string(data))

	return err
}
