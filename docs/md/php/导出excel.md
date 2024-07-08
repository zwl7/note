### 1如果导出excel

```php
        "phpoffice/phpspreadsheet": "^1.18"
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

/**
 * @param array $list 数据
 * @param array $header 表头
 * @param string $name 表名称
 * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
 */
function outExcel($list, $header, $name)
{
    $newExcel = new Spreadsheet();              // 创建一个新的excel文档
    $objSheet = $newExcel->getActiveSheet();    // 获取当前操作sheet的对象
    $objSheet->setTitle($name);                // 设置当前sheet的标题

    // 设置表头
    foreach ($header as $k => $v) {
        $coordinate = $k . 1;
        $objSheet->setCellValue($coordinate, $v['title']);
    }
    // 设置表体
    foreach ($list as $k => $v) {
        $i = $k + 2;
        foreach ($header as $key => $val) {
            $coordinate = $key . $i;
            $objSheet->setCellValue($coordinate, $v[$val['value']]);
        }
    }
    /*--------------下面是设置其他信息------------------*/
    header('Content-Type: application/vnd.ms-excel');
    header("Content-Disposition: attachment;filename={$name}.xls");
    header('Cache-Control: max-age=0');
    $objWriter = IOFactory::createWriter($newExcel, 'Xls');
    $objWriter->save('php://output');
    exit();
}
```

```php
$header = [
            'A' => [
                'title' => '日期',
                'value' => 'create_date',
            ],
            'B' => [
                'title' => '日均访问量',
                'value' => 'visits',
            ],
            'C' => [
                'title' => '日均停留时长',
                'value' => 'stay_time',
            ],
            'D' => [
                'title' => '日均有效播放时长',
                'value' => 'play_time',
            ],
            'E' => [
                'title' => '上传量',
                'value' => 'upload_num',
            ],
            'F' => [
                'title' => '草稿量',
                'value' => 'draft_num',
            ],
            'G' => [
                'title' => '发布量',
                'value' => 'release_num',
            ],
            'H' => [
                'title' => '浏览量',
                'value' => 'browse_num',
            ],
            'I' => [
                'title' => '收藏量',
                'value' => 'collect_num',
            ],
            'J' => [
                'title' => '转发量',
                'value' => 'forwarding_num',
            ],
            'K' => [
                'title' => '转发注册量',
                'value' => 'forwarding_register_num',
            ]
        ];
        $start_date = input('start_date');
        $end_date = input('end_date');
        $where = [];
        if ($start_date && $end_date) {
            $where[] = ['create_date', 'between', [$start_date, $end_date]];
        }
        $list = ContentCount::getInstance()->getPage($where, '*', 'create_date desc', [], 10000);
        outExcel($list['data'], $header, '运营数据');
```

