### 1.指定数据库连接池名称

如果在注册mysql链接池时，指定了名称，

![image-20210711092219531](../../img/image-20210711092219531.png)在模型事件中也要指定链接的名称，不然会报错：default not register。

![image-20210711092249536](../../img/image-20210711092249536.png)



### 2.获取执行的原生sql。

需要先调用get或者all查询，然后使用下图标记的方法即可。

![image-20210711095034829](../../img/image-20210711095034829.png)