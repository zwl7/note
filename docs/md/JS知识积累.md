JS知识积累

### 1.ajax

```javascript
$.ajax({
				 url: "",
				 type: 'POST',
				 dataType: 'json',
				 data: {
					 username: username
				 },
			 })
			 .done(function(e) {
				 var data = eval("("+e+")");
				 console.log(data);
			 })
			 .fail(function() {
				 console.log('网络错误');
			 });

//通过get请求跳过去。
$(location).attr('href',"{:url('admin/DeFi/export')}?status="+status+'&keywords='+keywords);
```

### 2.ajax获取到json字符串的数据之后使用

```
 var data = eval("("+e+")");
console.log(data);
即可将json字符串转化为对象.data是一个对象
但通过data['status']这样数组的形式即可访问到里面的元素.如图

```

![image-20201009171724402](.\img\image-20201009171724402.png)

### 3.随机获取特点范围的某个数

比如想要获取0到5中的一个数

```
Math.floor((Math.random()*(5+1)));0~5

min~max是范围.
var result = Math.floor(Math.random() * (max - min + 1) + min);
```



### 4.初始化滚动条

```
//初始化滚动条
$('.record').scrollTop($('.record')[0].scrollHeight);
```



### 5.确定用户是否在当前页面

```javascript
//监听客服的页面状态(是否在当前页面)]
	var is_onpage = true;
	document.addEventListener("visibilitychange",function () {
		if(document.visibilityState == "visible"){
     		//在当前页面
     		is_onpage = true;
     		
			
		};
		if(document.visibilityState == "hidden"){
     		//不在当前页面
     		is_onpage = false;
		};
	})
```



### 6.如何在浏览器播放声音

```javascript
//使用audio标签
<audio src="__STATIC__/music/tip.wav" class="hide" id="audio"></audio>
//播放提示音
	this.tip_music = function () {
		//设置声音
		document.getElementById("audio").volume = 0.1;
		//播放声音
		document.getElementById("audio").play();
	}

```



### 7.如何使用图片上传

```
//添加图片标签
<input type="file" name="" class="upload_img_file" accept="image/*">


//点击上传图片的icon 触发input框
	$('.upload_img_icon').click(function() {
		$('.upload_img_file').click();
	});

	//发送图片
	this.send_img = function(fromid,toid,ajax_url) {
		var img_file = $('.upload_img_file')[0].files[0];
		var form_data = new FormData();
		form_data.append("toid",toid);
		form_data.append("img_file",img_file);
		form_data.append("fromid",fromid);
		$.ajax({
				url: ajax_url,
				type: 'POST',
				dataType: 'json',
				data: form_data,
				processData:false,
				contentType:false
			})
			.done(function(e) {
				e = eval("("+e+")");
				//清空输入框的值
				$('.upload_img_file').val("");
				//显示图片
				var content = `<img src="`+STATIC+`/upload_img/`+e['path']+`" class="upload_img">`;
				$('.record').append(`
			 		<div class="from">
				        <img src="`+STATIC+`/img/chatcust.jpg" class="fromHeader">
				        <div class="fromText ">`+content+`</div>
				        <div class="isread" style="color:#999;font-size:13px">已读</div>
				    </div>
					`)
				//初始化滚动条
				$('.record').scrollTop($('.record')[0].scrollHeight);
			})
			.fail(function() {
				console.log("error");
			});;
	}
	
	php接收图片的代码
	public function send_img()
	{
		$data = input('param.'); 
		$fromid = $data['fromid'];
		$toid = $data['toid'];
		$file = request()->file('img_file');
		//如果上传的图片为空
		if(!$file){
			return json_encode(['status'=>"can not get img"]);
		}
		//获取图片的信息
		$file_info = $file->getinfo();

		//校验图片
		if(strtok($file_info['type'],'/') != "image"){
			return json_encode(['status'=>"type error"]);
		}
		if($file_info['size']/1024/1024 > 3){
			return json_encode(['status'=>"size error can not > 3M"]);
		}

		//将图片存入服务器的硬盘中
		$info = $file->move(ROOT_PATH.'public/static/upload_img');
		//如果存储失败
		if(!$info){
			return json_encode(['status'=>"can not save to server"]);
		}
		$path = $info->getSaveName();
			
		//将地址存入数据库
		$data['content'] = $path;
		$data['time'] = time();
		$data['isread'] = 0;
		$data['type'] = 2;
		$res = db('record')->insert($data);
		if(!$res){
			return json_encode(['status'=>"can not save to database"]);
		}
		$data['type'] = 'img';
		//将地址发送给对方
		Gateway::sendToUid($toid,json_encode($data));
		return json_encode(['status'=>200,'path'=>$path]);	
	}
		
```



### 8.使用阿里云图标库

```
网址:https://www.iconfont.cn/

1.搜索自己喜欢的图标,将其加入到自己的项目中.	
然后会生成一段js代码



symbol引用
这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇文章 这种用法其实是做了一个svg的集合，与上面两种相比具有如下特点：

支持多色图标了，不再受单色限制。
通过一些技巧，支持像字体那样，通过font-size,color来调整样式。
兼容性较差，支持 ie9+,及现代浏览器。
浏览器渲染svg的性能一般，还不如png。
使用步骤如下：

第一步：拷贝项目下面生成的symbol代码：
//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js
例子:<script type="text/javascript" src="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"></script>
第二步：加入通用css代码（引入一次就行）：
<style type="text/css">
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
第三步：挑选相应图标并获取类名，应用于页面：
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
</svg>


例子:<use xlink:href="#icon-l-img"></use>	
```



9.后台如何通过jq选择对应的元素的值

```
$("#id").val即可选择某个id标签的value值。
```

```
composer require easyswoole/easyswoole=3.4.2
```









```
<ul>
                    <volist name="data" id="vo">

                        <if condition="$vo['isArray'] eq 2">

                            {$vo['isArray']}
                            <volist name="$vo['data']" id="voo">

                                <ul>

                                <if condition="$voo['isArray'] eq 2">
                                    {$voo['isArray']}

                                    <volist name="$voo['data']" id="v">
                                        <ul>
                                            <li>{$v['data']}</li>
                                        </ul>
                                    </volist>

                                    <else/>
                                    <li>{$voo['data']}</li>
                                </if>

                                </ul>

                            </volist>

                            <else/>
                            <li>{$vo['data']}</li>
                        </if>

                    </volist>

                </ul>
```











```sql

```

