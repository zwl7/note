```php
<?php
//公用接口返回数据结构
function returnJson($code, $msg = '', $data = '')
{
    $array = array();
    $array['code'] = $code;
    $array['msg'] = $msg;
    $array['data'] = camelCase($data);
    return json_encode($array,JSON_UNESCAPED_UNICODE);
}

//将数组中key下划线转换成小驼峰
function camelCase($arr, $ucfirst = FALSE)
{
    if (!is_array($arr)) {   //如果非数组原样返回
        return $arr;
    }
    $temp = [];
    $keys = '';
    foreach ($arr as $key => $value) {
        $key1 = convertUnderline($key, FALSE);
        $value1 = camelCase($value);
        $temp[$key1] = $value1;
    }
    return $temp;
}

//将下划线命名转换为驼峰式命名
function convertUnderline($str, $ucfirst = true)
{
    $str = ucwords(str_replace('_', ' ', $str));
    $str = str_replace(' ', '', lcfirst($str));
    return $ucfirst ? ucfirst($str) : $str;
}
var_dump(returnJson('200','ok',['nameLO'=>'张三','is_set'=>'1','dsad_pp1'=>'pp']));die;
即可返回驼峰命名的字段
```

