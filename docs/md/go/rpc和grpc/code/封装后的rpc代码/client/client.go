package main

import (
	"fmt"
	"learning/rpc/client_proxy"
)

func main() {

	response := new(string)
	err := client_proxy.NewHelloServiceStub().Hello("Hello", "zwl", response)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(*response)

}
