```php

if (!function_exists('curl_request')) {
    /**
     * Notes: curl发送http请求
     * User: 闻铃
     * DateTime: 2021/9/8 下午6:27
     * @param string $url 请求的url
     * @param bool $is_post 是否为post请求
     * @param array $data 请求参数
     * @param array $header 请求头 说明：应这样格式设置请求头才生效 ['Authorization:0f5fc4730e21048eae936e2eb99de548']
     * @param bool $is_json 是否为json请求，默认为Content-Type:application/x-www-form-urlencoded
     * @param int $time_out 超时时间 单位秒，0则永不超时
     * @return mixed
     */
    function curl_request(string $url, bool $is_post = true, array $data = [], array $header = [], bool $is_json = false, int $time_out = 0):array
    {
        if (empty($url)) {
            return  false;
        }

        //初始化curl
        $curl = curl_init();

        //如果curl版本，大于7.28.1，得是2才行 。 而7.0版本的php自带的curl版本为7.40.1.  使用php7以上的，就能确保没问题
        $ssl = (strpos($url,'https') !== false) ? 2 : 0;
        $options = [
            //设置url
            CURLOPT_URL => $url,

            //将头文件的信息作为数据流输出
            CURLOPT_HEADER => false,

            // 请求结果以字符串返回,不直接输出
            CURLOPT_RETURNTRANSFER => true,

            // 禁止 cURL 验证对等证书
            CURLOPT_SSL_VERIFYPEER => false,

            //identity", "deflate", "gzip“，三种编码方式，如果设置为空字符串，则表示支持三种编码方式。当出现乱码时，可设置此字符串
            CURLOPT_ENCODING => '',

            //设置http版本。HTTP1.1是主流的http版本
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,

            //连接对方主机时的最长等待时间。设置为10秒时，如果对方服务器10秒内没有响应，则主动断开链接。为0则，不限制服务器响应时间
            CURLOPT_CONNECTTIMEOUT => $time_out,

            //整个cURL函数执行过程的最长等待时间，也就是说，这个时间是包含连接等待时间的
            CURLOPT_TIMEOUT => 0,

            //检查服务器SSL证书中是否存在一个公用名
            CURLOPT_SSL_VERIFYHOST => $ssl,

            //设置头信息
            CURLOPT_HTTPHEADER => $header
        ];

        //post和get特殊处理
        if ($is_post) {
            // 设置POST请求
            $options[CURLOPT_POST] = true;

            if ($is_json && $data) {
                //json处理
                $data = json_encode($data);
                $header = array_merge($header, ['Content-Type: application/json']);
                //设置头信息
                $options[CURLOPT_HTTPHEADER] = $header;

                //如果是json字符串的方式，不能用http_build_query函数
                $options[CURLOPT_POSTFIELDS] = $data;
            } else {
                //x-www-form-urlencoded处理
                //如果是数组的方式,要加http_build_query，不加的话，遇到二维数组会报错。
                $options[CURLOPT_POSTFIELDS] = http_build_query($data);
            }
        } else {
            // GET
            $options[CURLOPT_CUSTOMREQUEST] = 'GET';

            //没有？且data不为空,将参数拼接到url中
            if (strpos($url,'?') === false && !empty($data) && is_array($data)) {
                $params_arr = [];
                foreach ($data as $k => $v) {
                    array_push($params_arr,$k . '=' . $v);
                }
                $params_string = implode('&',$params_arr);
                $options[CURLOPT_URL] = $url . '?' . $params_string;
            }
        }

        //数组方式设置curl，比多次使用curl_setopt函数设置在速度上要快
        curl_setopt_array($curl,$options);

        // 执行请求
        $response = curl_exec($curl);

        //返回的CONTENT_TYPE类型
        $content_type = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);

        //返回的http状态码
        $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        $result = ['code' => $http_code,'header' => $content_type];
        //没有错误时curl_errno返回0
        if (curl_errno($curl) == 0) {
            $result['msg'] = 'SUCCESS';
            if (is_null($response)) {
                $result['body'] = null;
            } else {
                $data = json_decode($response, true);
                if ($data) {
                    //json数据
                    $result['body'] = $data;
                } else {
                    //不是json,则认为是xml数据
                    libxml_disable_entity_loader(true);//验证xml
                    $xml = simplexml_load_string($response, 'SimpleXMLElement', LIBXML_NOCDATA);//解析xml
                    $result['body'] = $xml;
                }
            }
        } else {
            $result['msg'] = curl_error($curl);
            $result['body'] = null;
        }
        //关闭请求
        curl_close($curl);
        return $result;
    }
}



curl拉取文件，用get的方式拉取文件。url等于	http://13.70.0.51:8080/static/balance.csv这种类型的。需要用get形式请求。
function getFileCurlTwo($url)
{
    //设置Header头
    $header[] = "Accept: application/json";
    $header[] = "Accept-Encoding: gzip";
    //添加HTTP header头采用压缩和GET方式请求
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSLVERSION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt( $ch, CURLOPT_HTTPHEADER, $header );
    curl_setopt($ch,CURLOPT_ENCODING , "gzip");
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    $res = curl_exec($ch);
    curl_close($ch);
    return $res;
}


//文件拉取用curl，用post请求，并且带有签名的。
function getFileCurl($url,$data = [])
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSLVERSION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $res = curl_exec($ch);
    curl_close($ch);
    return $res;
}
例子如下
//mt5收益文件拉取
    public function getMt5File()
    {
        //先判断文件所时候已经拉取
        $file_name = "./static/file/static_bonus_cloud_" . date('Ymd', time()) . ".csv";
        if (file_exists($file_name)) {
            die('文件已存在');
        }
        $private_key = config('scan_private_key');
        $private_key = chunk_split($private_key, 64, "\n");
        $private_key = "-----BEGIN RSA PRIVATE KEY-----\n$private_key-----END RSA PRIVATE KEY-----\n";
        $find_url = config('scan_url') . '/api/adjusted_bonus';
        $data = array(
            'type' => 1,
            'bonus_date' => date('Y-m-d'),
            'timestamp' => time(),
        );
        $sign = encryption($data, $private_key);
        $data['sign'] = $sign;
        //先查询文件是否生成
        $find_res = getFileCurl($find_url, $data);
        dump($find_res);
        if ($find_res) {
            $find_res = json_decode($find_res, true);
            if ($find_res['code'] == 200 & $find_res['data']['is_grant'] == 1) {
                //文件拉取
                $file_url = config('scan_url') . '/api/get_csv';
                $file_res = getFileCurl($file_url, $data);
                file_put_contents($file_name, $file_res);
            }
        }
    }
```

