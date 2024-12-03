package handler

const HelloServiceName = "handler/HelloService"

type HelloService struct {
}

func NewHelloService() HelloService {
	return HelloService{}
}

func (h HelloService) Hello(request string, response *string) error {
	*response = "hello " + request
	return nil
}
