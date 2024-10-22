## 1.go压缩图片

你可以通过读取不同格式的图片（PNG、JPEG、JPG），压缩处理后将它们全部转换为JPEG格式输出。Go语言标准库以及一些第三方库都能帮助实现这个功能。

以下是一个简化的实现，使用标准库中的 `image` 包来读取图片，`jpeg` 包来输出 JPEG 格式。对于 PNG 图像，还可以使用 `image/png` 包来解码，而其他 JPEG 格式如 `.jpg` 和 `.jpeg` 则使用 `image/jpeg` 解码。

### 实现步骤：

1. 打开输入图片文件，识别其格式。
2. 根据格式选择合适的解码器（PNG 使用 `image/png`，JPEG 使用 `image/jpeg`）。
3. 使用 `resize` 包对图片进行压缩或调整尺寸。
4. 将图片以 JPEG 格式保存到输出文件。

```go
package main

import (
    "fmt"
    "image"
    "image/jpeg"
    "image/png"
    "os"
    "strings"

    "github.com/nfnt/resize"
)

func main() {
    inputFile := "2.png"               // 输入文件路径
    outputFile := "out2.jpg"           // 输出文件路径
    sizeThreshold := int64(500 * 1024) // 500KB 阈值

    // 打开输入图片文件
    file, err := os.Open(inputFile)
    if err != nil {
       panic(err)
    }
    defer file.Close()

    // 获取文件信息
    fileInfo, err := file.Stat()
    if err != nil {
       panic(err)
    }

    // 获取文件扩展名
    ext := strings.ToLower(inputFile[strings.LastIndex(inputFile, ".")+1:])

    // 解码图片
    var img image.Image
    switch ext {
    case "png":
       img, err = png.Decode(file)
    case "jpeg", "jpg":
       img, err = jpeg.Decode(file)
    default:
       panic("不支持的图片格式")
    }
    if err != nil {
       panic(err)
    }

    // 创建输出 JPEG 文件
    out, err := os.Create(outputFile)
    if err != nil {
       panic(err)
    }
    defer out.Close()

    // 检查文件大小，小于 200KB 就直接转换为 JPEG，不进行压缩
    if fileInfo.Size() < sizeThreshold {
       fmt.Println("文件小于 200KB，不进行压缩，直接转换为 JPEG。")

       // 直接保存为 JPEG 格式，不压缩
       err = jpeg.Encode(out, img, &jpeg.Options{Quality: 100})
       if err != nil {
          panic(err)
       }
    } else {
       fmt.Println("文件大于 200KB，进行压缩并转换为 JPEG。")

       //调整 JPEG 质量参数：默认压缩时 JPEG 的质量设置为 80，适当提高质量可以减少压缩带来的模糊。质量范围是 0-100，建议在 85-95 之间尝试。
       // 图片大于 500KB，进行压缩 插值算法：依然使用 resize.Lanczos3 插值算法，这是 Go 中质量较高的缩放算法之一。
       resizedImg := resize.Resize(800, 0, img, resize.Lanczos3) // 这里压缩到宽度800像素

       // 保存为 JPEG 格式，设置质量参数为 80~100
       err = jpeg.Encode(out, resizedImg, &jpeg.Options{Quality: 90})
       if err != nil {
          panic(err)
       }
    }

    fmt.Println("图片已成功处理并转换为 JPEG 格式输出:", outputFile)
}
```

1. **JPEG 质量参数调整**：将 JPEG 质量从 80 提升到 90。这个值可以根据具体情况调整，但过高的质量（如 100）几乎没有压缩效果，会导致文件过大。
2. **调整缩放尺寸**：将压缩图片的宽度调整为 800 像素（以前是 500）。过度缩放可能导致模糊，800 像素宽度能保持更多的图像细节。如果希望更清晰，可以进一步增加这个宽度。
3. **插值算法**：依然使用 `resize.Lanczos3` 插值算法，这是 Go 中质量较高的缩放算法之一。

通过这些调整，图片在保持合理文件大小的同时，压缩后的清晰度应该会有显著提高。