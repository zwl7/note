## 1.protobuf介绍



![image-20241112154405222](/Users/zwl/Documents/github/note/docs/md/img/image-20241112154405222.png)





![image-20241112154429686](/Users/zwl/Documents/github/note/docs/md/img/image-20241112154429686.png)



安装教程 ：https://juejin.cn/post/7101304169524527140

安装好 protoc命令和go版本的proto工具

### 2. 在 Go 语言中的常用命令



```
//指定版本
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.26
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.1

//最新版本
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```



对于 Go，一般需要安装 `protoc-gen-go` 插件，然后使用 `protoc` 命令生成代码。

#### 1. 安装 `protoc-gen-go` 插件

```
bash


复制代码
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

#### 2. 生成 Go 代码

```
bash


复制代码
protoc -I=. --go_out=. <proto文件>
```

这会在当前目录生成 Go 语言的代码文件，默认的文件名规则是 `<proto文件名>.pb.go`。

#### 3. 生成带有 gRPC 支持的 Go 代码

若要生成带 gRPC 支持的代码，需要安装 `protoc-gen-go-grpc` 插件：

```
bash


复制代码
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

然后运行以下命令：

```
bash


复制代码
protoc -I=. --go_out=. --go-grpc_out=. <proto文件>
```

这会生成两个文件：

- `<proto文件名>.pb.go`：基础的 Protocol Buffers 代码。
- `<proto文件名>_grpc.pb.go`：包含 gRPC 支持的代码。

### 3. 示例

假设有一个文件 `helloworld.proto`，内容如下：

```
proto


复制代码
syntax = "proto3";

package helloworld;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
```

在生成 Go 代码时，执行以下命令：

```
bash


复制代码
protoc -I=. --go_out=. --go-grpc_out=. helloworld.proto
```

这将生成 `helloworld.pb.go` 和 `helloworld_grpc.pb.go` 文件，用于 Go 语言中的 gRPC 服务实现。

### 4. 常用选项说明

- `-I=<路径>`：设置 `.proto` 文件的搜索路径，可设置多个。
- `--<语言>_out=<路径>`：指定输出目录。
- `--go-grpc_out=<路径>`：专门为 gRPC 生成代码，用于 Go 中的 gRPC 代码生成。



```


```



## 实操



#### 1.先生成一个protobuf文件

![image-20241113150952585](/Users/zwl/Documents/github/note/docs/md/img/image-20241113150952585.png)

```protobuf
syntax = "proto3";

option go_package= ".;helloWorld";//指定生成处理的文件 的package名称 option go_package = "<导入路径>;<包名>";

package helloWorld;

message HelloRequest {
  string name = 1; //1是编号 不是值
  int32 age = 2;
  repeated string courses = 3; // 字符串数组
}
```



```
option go_package 的作用
在生成 Go 代码时，option go_package 会影响生成文件的导入路径和包名，使得生成的代码在 Go 项目中符合规范。如果没有指定这个选项，Go 的 protoc-gen-go 插件可能无法正确生成代码，或者生成的代码在模块化项目中会遇到导入路径错误的问题。

使用方法
在 .proto 文件的顶部添加：

proto
复制代码
option go_package = "<导入路径>;<包名>";
<导入路径>：指定生成的 Go 文件的导入路径（一般是模块路径，类似于 Go 模块中的包路径）。
<包名>：指定生成代码的包名（可以省略，默认为最后一级导入路径的名称）。
```

```
repeated 的作用：在 Protocol Buffers (protobuf) 文件中，repeated 关键字用于定义一个字段为“重复”的数据类型，表示该字段可以包含零个或多个相同类型的元素，相当于数组或列表的功能。

使用场景
在 protobuf 中，如果你有一个字段可能会包含多个值，就可以使用 repeated 来定义。例如，一个人可能有多个电话号码，或者一个购物车可能有多个商品。repeated 字段允许灵活地存储不同数量的元素，而不需要提前固定数量。

语法示例
proto
复制代码
message Person {
    string name = 1;
    int32 age = 2;
    repeated string phone_numbers = 3; // phone_numbers 是一个字符串数组
}
在上面的例子中，phone_numbers 被定义为 repeated，表示 Person 对象可以包含多个电话号码。客户端可以选择不设置任何电话号码，也可以设置多个。

特性
顺序性：repeated 字段保持元素的顺序，序列化后仍然能够按照相同的顺序读取数据。
空值处理：当没有任何元素时，repeated 字段的值为空（例如空数组或空列表）。
灵活性：可以动态添加、删除或修改数组中的元素数量。
用途总结
repeated 关键字在 protobuf 中非常有用，可以在数据结构中存储变长数据，以便在序列化和反序列化时更好地适应不同的情况。
```



#### 2.然后执行命令 根据proto文件，生成对应的客户端



 命令：protoc -I=. --go_out=. helloworld.proto



![image-20241113151134482](/Users/zwl/Documents/github/note/docs/md/img/image-20241113151134482.png)

`protoc` 是 Protocol Buffers 编译器，用于将 `.proto` 文件编译生成不同语言的代码，比如 Go、Java、Python 等。以下是常见的 `protoc` 命令用法：



```
bash


复制代码
protoc -I=<proto文件路径> --<语言>_out=<输出路径> <proto文件>
```

其中：

- `-I` 指定 `.proto` 文件的路径（`include` 路径）。
- `--<语言>_out` 指定生成的代码存放位置。
- `<proto文件>` 是要编译的 `.proto` 文件。



```
protoc -I . --go_out=. --go-grpc_out=. proto/helloworld.proto


--go_out=. 生成普通的go普通的proto代码 
--go-grpc_out=. 生成待grpc的proto代码 
```

```


--go_out 代表生成的文件 输出在哪个文件路径下面  --java_out 等等语言
--go_out=:.  代表输出在当前目录下面


```





Protobuf 和 json 的对比

```go
package main

import (
	"encoding/json"
	"fmt"
	"google.golang.org/protobuf/proto"
	helloWorld "learning/protobufTest/proto"
)

type Hello struct {
	Name    string   `json:"name"`
	Age     int32    `json:"age"`
	Courses []string `json:"courses"`
}

func main() {
	req := helloWorld.HelloRequest{
		Name:    "zwl",
		Age:     10,
		Courses: []string{"math", "english"},
	}

	//解析
	rsp, _ := proto.Marshal(&req) //  底层的编码原理是用到可变长度 varint
	fmt.Println(len(rsp))
	fmt.Println(rsp)
	fmt.Println(string(rsp))

	newReq := helloWorld.HelloRequest{}

	//反解析
	proto.Unmarshal(rsp, &newReq)
	fmt.Println(newReq.Name, newReq.Age, newReq.Courses)

	fmt.Println("---------")

	jsonStruct := Hello{
		Name:    "zwl",
		Age:     10,
		Courses: []string{"math", "english"},
	}

	jsonRsp, _ := json.Marshal(jsonStruct)
	fmt.Println(len(jsonRsp))
	fmt.Println(jsonRsp)
	fmt.Println(string(jsonRsp))

	jsonStructDecode := Hello{}
	json.Unmarshal(jsonRsp, &jsonStructDecode)

	fmt.Println(jsonStructDecode)

}

```



![image-20241112182137911](/Users/zwl/Documents/github/note/docs/md/img/image-20241112182137911.png)



![image-20241112182247830](/Users/zwl/Documents/github/note/docs/md/img/image-20241112182247830.png)





### grpc



![image-20241112164228378](/Users/zwl/Documents/github/note/docs/md/img/image-20241112164228378.png)



```protobuf
syntax = "proto3";

option go_package = ".;proto";

package proto;

service Greeter {
  rpc GetStream(StreamReqData) returns (stream StreamResData); // 服务端流模式
  rpc PutStream(stream StreamReqData) returns ( StreamResData); // 客户端流模式
  rpc AllStream(stream StreamReqData) returns (stream StreamResData); // 双向流 流模式
}

message StreamReqData {
  string data = 1;
}

message StreamResData {
  string data = 1;
}


```



stream 关键字 代表启用流模式



一定要写--go_out=. --go-grpc_out=.    生成两个，grpc才能互相使用

```
protoc -I=. --go_out=. --go-grpc_out=. stream.proto

protoc -I=. --go_out=. --go-grpc_out=. stream.proto 这样则生成两个proto代码

一个是基础的

一个是带grpc语法的
```



--go-grpc_out=.   生成grpc的代码  可以使用service的语法



![image-20241113151538351](/Users/zwl/Documents/github/note/docs/md/img/image-20241113151538351.png)



protoc -I=. --go_out=. --go-grpc_out=. stream.proto 这样则生成两个proto代码

一个是基础的

一个是带grpc语法的



### 2.1 rpc的4种模式

![image-20241113140857106](/Users/zwl/Documents/github/note/docs/md/img/image-20241113140857106.png)



#### 2.1一元调用  (简单模式)

发送一次请求后， 服务端处理完一次性返回结果 就断开



客户端代码

```go
/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// Package main implements a client for Greeter service.
package main

import (
	"context"
	"flag"
	"grpc/pb"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

const (
	defaultName = "world"
)

var (
	addr = flag.String("addr", "localhost:50051", "the address to connect to")
	name = flag.String("name", defaultName, "Name to greet")
)

func main() {
	flag.Parse()
	// Set up a connection to the server.
	conn, err := grpc.NewClient(*addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewGreeterClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.SayHello(ctx, &pb.HelloRequest{Name: *name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.GetMessage())
}

```





服务端

```go
/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

// Package main implements a server for Greeter service.
package main

import (
	"context"
	"flag"
	"fmt"
	"grpc/pb"
	"log"
	"net"

	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(_ context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
}

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

```

结果

![image-20241113140435306](/Users/zwl/Documents/github/note/docs/md/img/image-20241113140435306.png)





#### 2.2 服务端流模式

![image-20241113141710538](/Users/zwl/Documents/github/note/docs/md/img/image-20241113141710538.png)



#### 2.3 客户端流模式

![image-20241113141754269](/Users/zwl/Documents/github/note/docs/md/img/image-20241113141754269.png)



#### 2.4 双向流模式

![image-20241113141810533](/Users/zwl/Documents/github/note/docs/md/img/image-20241113141810533.png)



```protobuf
syntax = "proto3";

option go_package = ".;streamProto";

package streamProto;

service Greeter {
  rpc GetStream(StreamReqData) returns (stream StreamResData); // 服务端流模式
  rpc PutStream(stream StreamReqData) returns ( StreamResData); // 客户端流模式
  rpc AllStream(stream StreamReqData) returns (stream StreamResData); // 双向流 流模式
}

message StreamReqData {
  string data = 1;
}

message StreamResData {
  string data = 1;
}


```



流模式 客户端代码



```go
package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	streamProto "grpc/stream_grpc_test/proto"
	"log"
	"sync"
	"time"
)

var wg sync.WaitGroup

func main() {

	conn, err := grpc.NewClient("localhost:8900", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	greeterClient := streamProto.NewGreeterClient(conn)

	// Contact the server and print out its response.

	//GetStream(ctx context.Context, in *StreamReqData, opts ...grpc.CallOption) (grpc.ServerStreamingClient[StreamResData], error)
	res, err := greeterClient.GetStream(context.Background(), &streamProto.StreamReqData{Data: "hello"})
	if err != nil {
		panic(err)
	}
	for {
		a, err := res.Recv()
		if err != nil {
			log.Printf("res.Recv() error %v", err)
			break
		}
		fmt.Println(a.Data)
	}

	//往服务端发送数据
	putStreamClient, err := greeterClient.PutStream(context.Background())
	if err != nil {
		return
	}
	i := 0
	for {
		err := putStreamClient.Send(&streamProto.StreamReqData{Data: "客户端说789"})
		if err != nil {
			log.Printf("发送失败")
			break
		}
		i++

		if i >= 10 {
			break
		}

		time.Sleep(time.Second)
	}

	fmt.Println("客户端推流完毕。。。")

	log.Printf("开始双向流模式。。。。")

	// 启动两个协程 一个是接收客户端的消息，一个推送数据

	bidiStreamingClient, err := greeterClient.AllStream(context.Background())
	wg.Add(2)

	//接受
	go func() {
		defer wg.Done()
		for {
			req, err := bidiStreamingClient.Recv()
			if err != nil {
				log.Printf("接受服务端端消息报错，reason: %v", err)
				break
			}
			log.Printf("服务端端说 %v", req.Data)
		}
	}()

	//发送
	go func() {
		defer wg.Done()
		for {
			err := bidiStreamingClient.Send(&streamProto.StreamReqData{Data: "客户端端说 来自客户端"})
			if err != nil {
				break
			}

			time.Sleep(time.Second)
		}

	}()

	wg.Wait()

}

```



服务端

```go
package main

import (
	"fmt"
	"google.golang.org/grpc"
	streamProto "grpc/stream_grpc_test/proto"
	"log"
	"net"
	"sync"
	"time"
)

type server struct {
	streamProto.UnimplementedGreeterServer
}

var wg sync.WaitGroup

func (s *server) GetStream(streamReqData *streamProto.StreamReqData, serverStreamingServer grpc.ServerStreamingServer[streamProto.StreamResData]) error {

	log.Printf("receive client send data %v", streamReqData.GetData())
	//往客户端推送数据

	i := 0
	for {
		err := serverStreamingServer.Send(&streamProto.StreamResData{Data: fmt.Sprintf("服务端说 %d time is %d", i, time.Now().Unix())})
		if err != nil {
			fmt.Println(err)
		}
		i++
		if i >= 10 {
			break
		}

		time.Sleep(time.Second)

	}

	log.Printf("服务端推送完成...")
	return nil
}

func (s *server) PutStream(clientStreamingServer grpc.ClientStreamingServer[streamProto.StreamReqData, streamProto.StreamResData]) error {

	fmt.Println("收到客户端的putStream调用。。。")
	//收到客户端的消息
	for {
		req, err := clientStreamingServer.Recv()
		if err != nil {
			fmt.Println(err)
			break
		}

		fmt.Println(fmt.Sprintf("客户端推送的数据 %v", req.GetData()))
	}

	return nil
}

func (s *server) AllStream(bidiStreamingServer grpc.BidiStreamingServer[streamProto.StreamReqData, streamProto.StreamResData]) error {

	// 启动两个协程 一个是接收客户端的消息，一个推送数据
	wg.Add(2)

	//接受
	go func() {
		defer wg.Done()
		for {
			req, err := bidiStreamingServer.Recv()
			if err != nil {
				log.Printf("接受客户端消息报错，reason: %v", err)
				break
			}
			log.Printf("客户端说 %v", req.Data)
		}
	}()

	//发送
	go func() {
		defer wg.Done()
		for {
			err := bidiStreamingServer.Send(&streamProto.StreamResData{Data: "from server msg"})
			if err != nil {
				break
			}
			time.Sleep(time.Second)
		}

	}()

	wg.Wait()

	return nil
}

//rpc GetStream(StreamReqData) returns (stream StreamResData); // 服务端流模式
//rpc PutStream(stream StreamReqData) returns ( StreamResData); // 客户端流模式
//rpc AllStream(stream StreamReqData) returns (stream StreamResData); // 双向流 流模式

//GetStream(*StreamReqData, ) error
//PutStream(grpc.ClientStreamingServer[StreamReqData, StreamResData]) error
//AllStream(grpc.BidiStreamingServer[StreamReqData, StreamResData]) error
//mustEmbedUnimplementedGreeterServer()

func main() {

	s := grpc.NewServer()
	streamProto.RegisterGreeterServer(s, &server{})

	listen, err := net.Listen("tcp", "0.0.0.0:8900")
	if err != nil {
		return
	}

	err = s.Serve(listen)
	if err != nil {
		fmt.Println(err)
		return
	}

}

```





### 3 protobuf 详细介绍和使用



官方地址： https://developers.google.com/protocol-buffers/docs/proto3





#### 3.1 客户端和服务端的公用的ptoto文件的 编号不能搞错，一定要一一对应上



#### 3.2 proto可以互相引入



![image-20241113200949651](/Users/zwl/Documents/github/note/docs/md/img/image-20241113200949651.png)





#### 3.3 proto的message可以互相嵌套

```protobuf
syntax = "proto3";
import "google/protobuf/empty.proto";
import "base.proto";

option go_package = ".;streamProto";

package streamProto;

service Greeter {
  rpc GetStream(StreamReqData) returns (stream StreamResData); // 服务端流模式
  rpc PutStream(stream StreamReqData) returns ( StreamResData); // 客户端流模式
  rpc AllStream(stream StreamReqData) returns (stream StreamResData); // 双向流 流模式
  rpc Ping(google.protobuf.Empty) returns (Pong); // 双向流 流模式
}

message StreamReqData {
  string data = 1;
}

message StreamResData {
  string data = 1;
}


message HelloRely {
  string data = 1;

  message Result {
    string name = 1; //编号 也是从1开始 与HelloRely的 编号1 互相不影响
    string age = 2;
  }

  repeated Result result = 2;
}

```



生成对应的go代码 后 要像下面这样使用

```
streamProto.StreamResData{}  没有嵌套message


message Result 对应 streamProto.HelloRely_Result{} 
type HelloRely_Result struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"` //编号 也是从1开始 与HelloRely的 编号1 互相不影响
	Age  string `protobuf:"bytes,2,opt,name=age,proto3" json:"age,omitempty"`
}


message HelloRely 对应的结构体是
type HelloRely struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Data   string              `protobuf:"bytes,1,opt,name=data,proto3" json:"data,omitempty"`
	Gender Gender              `protobuf:"varint,2,opt,name=gender,proto3,enum=streamProto.Gender" json:"gender,omitempty"` //枚举类型
	Result []*HelloRely_Result `protobuf:"bytes,3,rep,name=result,proto3" json:"result,omitempty"`
}


streamProto.Pong{}
```





#### 3.4 枚举类型



```
syntax = "proto3";
import "google/protobuf/empty.proto";
import "base.proto";

option go_package = ".;streamProto";

package streamProto;

service Greeter {
  rpc GetStream(StreamReqData) returns (stream StreamResData); // 服务端流模式
  rpc PutStream(stream StreamReqData) returns ( StreamResData); // 客户端流模式
  rpc AllStream(stream StreamReqData) returns (stream StreamResData); // 双向流 流模式
  rpc Ping(google.protobuf.Empty) returns (Pong); // 双向流 流模式
}

message StreamReqData {
  string data = 1;
}

message StreamResData {
  string data = 1;
}

//枚举类
enum Gender {
  UNKNOWN = 0;
  MALE = 1;
  FEMALE = 2;
}

message HelloRely {
  string data = 1;

  Gender gender = 2; //枚举类型

  message Result {
    string name = 1; //编号 也是从1开始 与HelloRely的 编号1 互相不影响
    string age = 2;
  }

  repeated Result result = 3;
}



//使用时 这样使用即可
//streamProto.HelloRely{Gender: streamProto.Gender_FEMALE}
```



#### 3.5 map类型

map要少用，因为proto文件相当于接口文档 ，各种参数要清晰一点。如果都map，别人也不知道会往map里面塞入什么时间。

proto尽量还是要清晰一点



![image-20241115110907025](/Users/zwl/Documents/github/note/docs/md/img/image-20241115110907025.png)

```
map <type,type> 变量名 = 编号;

map <string,string> mapString = 1;
```



使用如下

![image-20241115110836746](/Users/zwl/Documents/github/note/docs/md/img/image-20241115110836746.png)



3.6 时间类型



1.导入 import "google/protobuf/timestamp.proto";

2.加入 ：google.protobuf.Timestamp addTime = 6; //时间类型

```
syntax = "proto3";
import "google/protobuf/empty.proto";
import "google/protobuf/timestamp.proto";
import "base.proto";

option go_package = ".;streamProto";

package streamProto;

service Greeter {
  rpc GetStream(StreamReqData) returns (stream StreamResData); // 服务端流模式
  rpc PutStream(stream StreamReqData) returns ( StreamResData); // 客户端流模式
  rpc AllStream(stream StreamReqData) returns (stream StreamResData); // 双向流 流模式
  rpc Ping(google.protobuf.Empty) returns (Pong); // 双向流 流模式
}

message StreamReqData {
  string data = 1;
}

message StreamResData {
  string data = 1;
}

//枚举类
enum Gender {
  UNKNOWN = 0;
  MALE = 1;
  FEMALE = 2;
}

message HelloRely {
  string data = 1;

  Gender gender = 2; //枚举类型

  message Result {
    string name = 1; //编号 也是从1开始 与HelloRely的 编号1 互相不影响
    string age = 2;
  }

  repeated Result result = 3;


  map <string, string> mapString = 4; //map类型
  map <string, int32> mapInt = 5; //map类型


  google.protobuf.Timestamp addTime = 6; //时间类型
}


```



使用 导入 "google.golang.org/protobuf/types/known/timestamppb" 然后使用如下。

![image-20241115112615759](/Users/zwl/Documents/github/note/docs/md/img/image-20241115112615759.png)

平时:使用int类型的时间戳也行

![image-20241115112755773](/Users/zwl/Documents/github/note/docs/md/img/image-20241115112755773.png)