1.启动jmeter

sh + jmeter命令的路径。

sh /Users/zwl/Downloads/apache-jmeter-5.4.1/bin/jmeter



2.在计划任务中添加线程组。

![image-20210806105228463](img/image-20210806105228463.png)

一个线程数代表一个请求。时间代表在多少秒内发出请求。

![image-20210806105301950](/Users/zwl/Library/Application Support/typora-user-images/image-20210806105301950.png)





设置请求从文件读取请求参数.文件名上传不了的话直接输入路径即可。



![image-20210806105618150](img/image-20210806105618150.png)



发送post请求时，想通过参数从文件读时，如下配置即可

![image-20210806105841493](img/image-20210806105841493.png)



如果get时，则使用下面的形式即可

![image-20210806105943589](img/image-20210806105943589.png)



然后添加查看结果树和汇总报告，然后run起来即可

![image-20210806110055028](img/image-20210806110055028.png)