FROM golang:1.18-alpine
#1.18和go mod中的go版本一致

# 为我们的镜像设置必要的环境变量
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# 移动到工作目录：/build
WORKDIR /build

# 将代码复制到容器中
COPY . .

# 将我们的代码编译成二进制可执行文件app
RUN go build -o app .

# 声明服务端口
EXPOSE 8888

# 启动容器时运行的命令
CMD ["/build/app"]