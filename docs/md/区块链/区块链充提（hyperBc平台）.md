1出纳接口文档.http://doc.legenddigital.com.au/web/#/25?page_id=1098

2.官网：https://www.hyperbc.com/

```php
<?php

namespace app\service;

class HyperApi
{
    private $appid = '';
    private $version = '1.0';
    private $url = '';
    private $public_key = '';
    private $private_key = '';

    function __construct($appid, $public_key, $private_key)
    {
        $this->appid = config('appid');
        $this->url = config('hyper_api_domain');
        $this->private_key = transSecretKey($private_key);
        $this->public_key = transSecretKey($public_key, 2);
    }

    public function request_post($url = '', $param = '')
    {
        if (empty($url) || empty($param)) {
            return false;
        }
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSLVERSION, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        $data = curl_exec($ch);
        curl_close($ch);

        return json_decode($data, true);
    }

    /**
     * 私钥加密 - 使用自己的私钥加密
     * @param $data
     * @param $private_key
     */
    public function encryption($data)
    {
        $signString = $this->getSignString($data);
        $privKeyId = openssl_pkey_get_private($this->private_key);
        $signature = '';
        openssl_sign($signString, $signature, $privKeyId, OPENSSL_ALGO_MD5);
        openssl_free_key($privKeyId);
        return base64_encode($signature);
    }

    /**
     * 使用对方的公钥解密，并且判断签名是否匹配
     * @param $sign
     * @param $data
     * @param $public_key
     * @return bool
     */
    public function checkSignature($sign, $data)
    {
        $toSign = $this->getSignString($data);
        $publicKeyId = openssl_pkey_get_public($this->public_key);
        $result = openssl_verify($toSign, base64_decode($sign), $publicKeyId, OPENSSL_ALGO_MD5);
        openssl_free_key($publicKeyId);
        return $result === 1 ? true : false;
    }

    // 序列化待签名数据为字符串
    private function getSignString($data)
    {
        unset($data['sign']);
        ksort($data);
        reset($data);
        $pairs = array();
        foreach ($data as $k => $v) {
            if (is_array($v)) $v = self::arrayToString($v);
            $pairs[] = "$k=$v";
        }
        return implode('&', $pairs);
    }

    private static function arrayToString($data)
    {
        $str = '';
        foreach ($data as $list) {
            if (is_array($list)) {
                $str .= self::arrayToString($list);
            } else {
                $str .= $list;
            }
        }
        return $str;
    }

    /**
     * 获取地址
     * @param $coin_name  主链币名
     * @return bool|mixed
     */
    public function getAddress($coin_name)
    {
        $data = array(
            'app_id' => $this->appid,
            'version' => $this->version,
            'time' => time(),
        );
        $data['coin'] = $coin_name;
        $sign = $this->encryption($data);
        $data['sign'] = $sign;
        $res = $this->request_post($this->url . '/address/getBatch', json_encode($data));
        dump($res);
        if ($res && $res['status'] == 200) {
            //判断返回签名
            $return_sign = $res['sign'];
            unset($res['sign']);
            $resturn_sign_res = $this->checkSignature($return_sign, $res);
            if ($resturn_sign_res) {
                return $res['data'];
            }
            return false;
        }
        return false;
    }

    //分配地址
    public function allocationAddress($address, $uid, $coin_name)
    {
        $data = array(
            'app_id' => $this->appid,
            'version' => $this->version,
            'time' => time(),
            'address' => $address,
            'coin' => $coin_name,
            'user_id' => $uid,
        );
        $sign = $this->encryption($data);
        $data['sign'] = $sign;
        $res = $this->request_post($this->url . '/address/syncStatus', json_encode($data));
        if ($res && $res['status'] == 200) {
            //判断返回签名
            $return_sign = $res['sign'];
            unset($res['sign']);
            $resturn_sign_res = $this->checkSignature($return_sign, $res);
            if ($resturn_sign_res) {
                return true;
            }
            return false;
        }
        return false;
    }

    //充值成功回调成功
    public function rechargeSuccess()
    {
        $data = array(
            'status' => 200,
            'data' => array(
                'success_data' => 'success'
            )
        );
        $sign = $this->encryption($data);
        $data['sign'] = $sign;
        return $data;
    }

    /**
     * 转账
     * @param $uid          用户ID
     * @param $coin_name    币种名
     * @param $amount       金额
     * @param $address      接受地址
     * @param $trade_id     交易单号
     */
    public function transfer($uid, $coin_name, $amount, $address, $trade_id)
    {
        $data = array(
            'app_id' => $this->appid,
            'version' => $this->version,
            'time' => time(),
            'user_id' => $uid,
            'coin' => $coin_name,
            'amount' => $amount,
            'address' => $address,
            'trade_id' => $trade_id,
        );
        $sign = $this->encryption($data);
        $data['sign'] = $sign;
        $res = $this->request_post($this->url . '/transfer', json_encode($data));
        //dump($res);
        if ($res && $res['status'] == 200) {
            //判断返回签名
            $return_sign = $res['sign'];
            unset($res['sign']);
            $resturn_sign_res = $this->checkSignature($return_sign, $res);
            if ($resturn_sign_res) {
                return array('code' => 200, 'msg' => '转账成功');
            }
            return array('code' => 402, 'msg' => '签名错误');
        }
        return array('code' => 402, 'msg' => $res['msg']);
    }

    //提现地址校验
    public function checkAddress($coin, $address)
    {
        if (strtolower($coin) === 'btc') {
            // BTC地址合法校验
            if (!(preg_match('/^(1|3)[a-zA-Z\d]{24,33}$/', $address) && preg_match('/^[^0OlI]{25,34}$/', $address))) {
                return false; //满足if代表地址不合法
            }
            return true;
        } else {
            //usdt
            $data = array(
                'app_id' => $this->appid,
                'version' => $this->version,
                'time' => time(),
                'address' => $address,
                'coin' => $coin,
            );
            $sign = $this->encryption($data);
            $data['sign'] = $sign;
            $res = $this->request_post($this->url . '/address/verifyAddress', json_encode($data));
            if ($res && $res['status'] == 200) {
                return true;
            }
            return false;
        }
    }

    /**
     * 查询兑换汇率
     * @param $source_coin
     * @param $target_coin
     * @param $amount
     * @return false|mixed
     */
    public function queryRate($source_coin, $target_coin, $amount)
    {
        $data = array(
            'app_id' => $this->appid,
            'version' => $this->version,
            'time' => time(),
            'source_coin' => $source_coin,
            'target_coin' => $target_coin,
            'amount' => $amount,
        );
        $sign = $this->encryption($data);
        $data['sign'] = $sign;
        try {
            $res = $this->request_post($this->url . '/rate/exchange', json_encode($data));
            if ($res && $res['status'] == 200) {
                //判断返回签名
                $return_sign = $res['sign'];
                unset($res['sign']);
                $resturn_sign_res = $this->checkSignature($return_sign, $res);
                if ($resturn_sign_res) {
                    return $res['data'];
                }
                return [];
            }
            errorLog('exchange', $res['status'] . '->' . $res['msg']);
        } catch (\Exception $e) {
            errorLog('exchange', $e);
        }
        return [];
    }

    /**
     * 货币兑换
     * @param $source_coin
     * @param $target_coin
     * @param $amount
     * @param $trade_id
     * @return false|mixed
     */
    public function exchange($source_coin, $target_coin, $amount, $trade_id)
    {
        $data = array(
            'app_id' => $this->appid,
            'version' => $this->version,
            'time' => time(),
            'source_coin' => $source_coin,
            'target_coin' => $target_coin,
            'amount' => $amount,
            'trade_id' => $trade_id,
        );
        $sign = $this->encryption($data);
        $data['sign'] = $sign;
        $res = $this->request_post($this->url . '/exchange/index', json_encode($data));
        if ($res && $res['status'] == 200) {
            //判断返回签名
            $return_sign = $res['sign'];
            unset($res['sign']);
            $resturn_sign_res = $this->checkSignature($return_sign, $res);
            if ($resturn_sign_res) {
                return $res['data'];
            }
            return false;
        }
        errorLog('exchange', $res['status'] . '->' . $res['msg']);
        return false;
    }
}
```

