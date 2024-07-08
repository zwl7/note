### 1文件上传函数

```php
//图片上传
function uploadFile($folder = 'img')
{
    // 获取表单上传文件
    $file = request()->file('file');
    if (!$file || $file->getError()) {
        return false;
    }
    $info = $file->getInfo();//得到文件的名称
    $temp = explode('.', $info['name']);//用.分割数组
    $imgtype = end($temp);//取数组的最后一个
    $filetype = ['jpg', 'jpge', 'gif', 'png', 'word', 'pdf', 'mp4', 'mkv', 'ts', 'rmvb', 'avi', 'wmv'];//定义图片类型
    if (!in_array(strtolower($imgtype), $filetype)) {
        return 1;
    }
    // 验证文件大小(最大50M 52428800字节)
    if ($info['size'] > 52428800) {
        return 2;
    }

    $uploadInfo = $file->move(ROOT_PATH . 'public' . DS . 'upload' . DS . $folder);

    if ($uploadInfo) {
        return DS . 'upload' . DS . $folder . DS . $uploadInfo->getSaveName();
    } else {
        return 3;
    }
}
```

```
$sql = "SELECT SUM(p.price) AS tp_sum FROM hyper_member as m LEFT JOIN hyper_plan_order AS p ON m.id = p.uid WHERE FIND_IN_SET({$info['id']},m.directly_ids) AND p.add_time BETWEEN {$this_month_first} AND {$next_month_first}";
                $sql_res = Db::query($sql);
```

