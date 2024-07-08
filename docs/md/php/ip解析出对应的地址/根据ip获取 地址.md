1.根据ip获取地址

![image-20201113184209113](..\img\image-20201113184209113.png)

composer下载：composer require zoujingli/ip2region

2.

```php
//        $ip = $this->request->ip();
        $ip = get_client_ip();
        $ip2region = new \Ip2Region();
        $info = $ip2region->btreeSearch($ip);
        $info = explode('|', $info['region']);
        $data = [
            'country' => $info[0] != '0' ? $info[0] : '',
            'province' => $info[2] != '0' ? $info[2] : '',
            'city' => $info[3] != '0' ? $info[3] : '',
        ];
		var_dump($data);die;



$ip2region = new \Ip2Region();
        $info = $ip2region->btreeSearch($ip);
        // 如果获取不到就不记录
        if (!isset($info)) {
            $data = [
                'country' => '',
                'province' => '',
                'city' => '',
            ];
            return  $data;
        }

        $info = explode('|', $info['region']);
        $data = [
            'country' => $info[0] != '0' ? $info[0] : '',
            'province' => '',
            'city' => '',
        ];
        if (isset($info[2]) && $info[2] != '0') {
            $data['province'] = $info[2];
        }
        if (isset($info[3]) && $info[3] != '0') {
            $data['city'] = $info[3];
        }
        if ($data['province'] == '香港') {
            $data['country'] = '香港';
        }
        return $data;
```

![image-20201113184348133](..\img\image-20201113184348133.png)

