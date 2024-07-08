1.

```php
<?php
namespace app\service;

class ZtPay
{
    private $appid = '';
    private $key = '';
    private $url = 'https://sapi.ztpay.org/api/v2';

    function __construct($appid, $key)
    {
        $this->appid = $appid;
        $this->key = $key;
    }

    /**
     * 查询余额
     * @param $name 查询币种
     * @param $address 查询地址
     * @return bool
     */
    public function get_balance($name,$address)
    {
        $data = array(
            'appid' => $this->appid,
            'method' => __FUNCTION__,
            'name' => $name,
            'address' => $address,
        );
        $sign = getSign($data,$this->key);
        $data['sign'] = $sign;
        $res = $this->request_post($this->url,$data);
        if($res && $res['code'] == 0){
            return $res['data'];
        }
        return false;
    }

    /**
     * 创建地址
     * @param $name 币种名
     * @return bool
     */
    public function get_address($name)
    {
        $data = array(
            'appid' => $this->appid,
            'method' => __FUNCTION__,
            'name' => $name
        );
        $sign = getSign($data,$this->key);
        $data['sign'] = $sign;
        $res = $this->request_post($this->url,$data);
        if($res && $res['code'] == 0){
            return $res['data'];
        }
        return false;
    }

    /**
     * 发起交易
     * @param $name 币种名
     * @param $from 转出地址
     * @param $to 转入地址
     * @param $amount 金额
     * @param string $type 类型
     * @return bool|mixed
     */
    public function transfer($name,$from,$to,$amount,$type='ETH')
    {
        $data = array(
            'appid' => $this->appid,
            'method' => __FUNCTION__,
            'name' => $name,
            'from' => $from,
            'to' => $to,
            'amount' => $amount,
        );
        if($type == 'ETH'){
            $price_data = $this->get_eth_gasprice();
            $data['gas'] = 70000;
            $data['gasPrice'] = $price_data['fastest'];
            //$data['nonce'] = 0;
        }else{
            //手续费
            $data['fee_amount'] = '0.00004';
        }
        $sign = getSign($data,$this->key);
        $data['sign'] = $sign;
        $res = $this->request_post($this->url,$data);
        return $res;
    }

    //查询gas价格
    /*public function get_eth_gasprice()
    {
        $data = array(
            'appid' => $this->appid,
            'method' => __FUNCTION__,
        );
        $sign = getSign($data,$this->key);
        $data['sign'] = $sign;
        $res = $this->request_post($this->url,$data);
        if($res && $res['code'] == 0){
            return $res['data'];
        }
        return false;
    }*/

    public function get_eth_gasprice()
    {
        $url = "https://www.etherchain.org/api/gasPriceOracle";
        $res = curlRequest($url);
        if($res){
            $res = json_decode($res,true);
        }
        return $res;
    }

    //查询行情价格
    public function market()
    {
        $data = array(
            'appid' => $this->appid,
            'method' => __FUNCTION__,
        );
        $sign = getSign($data,$this->key);
        $data['sign'] = $sign;
        $res = $this->request_post($this->url,$data);
        if($res && $res['code'] == 0){
            return $res['data'];
        }
        return false;
    }

    public function request_post($url = '', $param = '') {
        if (empty($url) || empty($param)) {
            return false;
        }
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_SSLVERSION, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
        $data = curl_exec($ch);
        curl_close($ch);

        return json_decode($data,true);
    }
}
```



归集脚本

```php
//自动审核充值订单，归集钱包--三分钟一次，也可以用ztpay平台的自动归集功能
    public function rechargeToBalance()
    {
        try {
            //查询待审核的充值订单
            $order_list = RechargeOrder::getInstance()->getAll(array('a.status' => 0, 'a.type' => 5));
            if (!$order_list) {
                exit;
            }
            //查询手续费
            $ZtPay = new ZtPay(config('ztpay_appid'), config('ztpay_key'));
            $gasprice_array = $ZtPay->get_eth_gasprice();
            if (!$gasprice_array) {
                exit;
            }
            foreach ($order_list as $v) {
                //归集
                $sevice_money_status = true;
                $name = $v['coin_name'];
                if ($v['coin_type'] == 'ERC20') {
                    $name .= '_ERC20';
                }
                //查询余额
                $virtual_money = $ZtPay->get_balance($name, $v['address']);
                if (!$virtual_money) {
                    continue;
                }
                //根据不同币种计算手续费
                if ($v['coin_type'] == 'ERC20') {
                    $sevice_money_type = 'ETH';
                    $sevice_money = bcdiv(bcmul($gasprice_array['fastest'], 70000), 1000000000, 10);
                    if ($sevice_money > $virtual_money[$sevice_money_type]) {
                        //手续费不足
                        $sevice_money_status = false;
                    }
                } elseif ($v['coin_type'] == 'ETH') {
                    $sevice_money_type = 'ETH';
                    $sevice_money = bcdiv(bcmul($gasprice_array['fastest'], 70000), 1000000000, 10);
                    $total_money = bcadd($v['num'], $sevice_money, 10);
                    if ($total_money > $virtual_money[$sevice_money_type]) {
                        //手续费不足
                        $sevice_money_status = false;
                    }
                } elseif ($v['coin_type'] == 'BTC') {
                    $sevice_money_type = 'BTC';
                    //BTC固定手续费
                    $sevice_money = 0.00004;
                    $total_money = bcadd($v['num'], $sevice_money, 10);
                    if ($virtual_money[$sevice_money_type] < $total_money) {
                        //手续费不足
                        $sevice_money_status = false;
                    }
                } else {
                    //不支持当期币种
                    continue;
                }
                if (!$sevice_money_status) {
                    //转入手续费，跳出循环，下一次再归集
                    $res = $ZtPay->transfer($sevice_money_type, config('PLATFROM_' . $sevice_money_type), $v['address'], $sevice_money, $sevice_money_type);
                    file_put_contents('./tranLog.txt',json_encode($res,JSON_UNESCAPED_UNICODE),FILE_APPEND);
                    //dump($res);
                    continue;
                }
                //手续费足够，转入归集地址
                $res = $ZtPay->transfer($name, $v['address'], config('COLLECTION_' . $name), $v['num'], $sevice_money_type);
                file_put_contents('./twoLog.txt',json_encode($res,JSON_UNESCAPED_UNICODE),FILE_APPEND);
                //转账失败跳出当前循环,下次重试
                if ($res && $res['code'] == 0) {
                    //得到归集交易的hash
                    $over_hash = $res['data']['hash'];
                } else {
                    continue;
                }
                //修改订单
                $order_update_data = array(
                    'status' => 1,
                    'over_hash' => $over_hash,
                    'over_time' => time(),
                );
                $order_res = RechargeOrder::getInstance()->updateOrder(array('id' => $v['id']), $order_update_data);
            }
        } catch (\Exception $e) {
            Db::rollback();
            errorLog('rechargeToBalance', $e);
        }
    }
```

