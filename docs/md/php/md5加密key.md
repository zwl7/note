1.封装好一个类

```
/**
     * 格式化参数
     * @param $paraMap
     * @return false|string
     */
    private function formatBizQueryParaMap($paraMap)
    {
        $buff = "";
        ksort($paraMap);
        foreach($paraMap as $k => $v){
            $buff .= $k . "=" . $v . "&";
        }
        $reqPar = '';
        if(strlen($buff) > 0){
            $reqPar = substr($buff, 0, strlen($buff)-1);
        }
        return $reqPar;
    }

    /**
     * 获取token值
     * @param $data
     * @return string
     */
    protected function getSign($data){
        $string = $this->formatBizQueryParaMap($data);
        return strtoupper(md5($string."&key=".$this->signKey));
    }
```

```
生成签名
$sign = $this->getSign($postData);
$postData['sign'] = $sign;
```



解开签名也同理，根据请求参数，用同样的方式生成一个签名。如果服务端生成的签名和客户端传过来的签名一致，那就通过。