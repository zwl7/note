### 1.利用TCPDF类生成pdf

composer配置

```
"tecnickcom/tcpdf": "^6.4"
```

```php
/**
     * Notes: 把图片生成pdf
     * User: 闻铃
     * DateTime: 2021/9/2 上午11:11
     * @param $img_path
     * @return bool
     */
    function create_pdf($img_path = '')
    {
        $time = date('s').substr(microtime(), 2, 8).mt_rand(111111,999999);
        $pdf_path = ROOT_PATH.'public/static/pdf/'.$time.'.pdf';
        // create new PDF document
        $pdf = new \TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

        ob_start();
        // remove default header/footer
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        // set margins
        $pdf->SetMargins(0, 0, 0, true);
        // set auto page breaks false
        $pdf->SetAutoPageBreak(false, 0);

        // add a page
        $pdf->AddPage('P', 'A4');

        // Display image on full page
        $pdf->Image($img_path, 0, 0, 210, 297, 'PNG', '', '', true, 200, '', false, false, 0, false, false, true);


        //Close and output PDF document
        $pdf->Output('test.pdf', 'I');

        $content = ob_get_clean();
        file_put_contents($pdf_path,$content);
        return $pdf_path;
    }
```

