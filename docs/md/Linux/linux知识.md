# **Linux知识**

#### ***\*Linux知识\****

## 1. 

location / {

if (!-e $request_filename) {

​		 rewrite  ^(.*)$  /index.php?s=$1 last; break;

​	}

}

 

## **2.** *\*宝塔上使用ssl即可免费配置https.\**





## 4. 服务器的登录日志

##

由多个程序执行，把记录写入到/var/log/wtmp和/var/run/utmp，login等程序更新wtmp和utmp文件，使系统管理员能够跟踪谁在何时登录到系统。

last -f /var/log/wtmp

即可查看谁登录了服务器



## 5.使用top命令可查看系统的运行情况

直接使用命令top即可

![image-20231204182955184](../img/image-20231204182955184.png)



Load average（系统负载）是一个表示系统活跃进程数量的指标。它通常是系统在过去1分钟、5分钟和15分钟内运行队列中的平均进程数。在 `top` 输出中，这些值通常以三个数字的形式呈现。

一般来说，load average 的范围解释如下：

- **低负载：** 如果 1分钟、5分钟和15分钟的 load average 都很低，比如小于系统的逻辑 CPU 数量，通常表示系统处于轻负载状态，有足够的资源处理当前的工作负载。
- **中等负载：** 如果 load average 稍微高于系统的逻辑 CPU 数量，但仍在可接受范围内，系统可能会感觉有点繁忙，但仍然能够处理工作。
- **高负载：** 当 load average 明显高于系统的逻辑 CPU 数量时，系统可能会变得响应缓慢，表现出过度的繁忙。这可能是由于过多的并发进程或者资源不足引起的。



在一个16核、32GB内存的服务器上，load average为100通常是一个非常高的负载。Load average的具体解释可能有点依赖于系统和应用程序的性质，但一般而言，load average的值应该与系统的逻辑CPU数量相对应。

对于一个16核的服务器，一个理想状态是，load average的值在16左右，因为它反映了系统运行队列中的平均进程数。当load average超过16时，这可能表明系统正在处理的工作超过了其处理能力，导致了排队等待。

在这种情况下，你可能会经历一些性能问题，例如系统响应变慢，进程响应时间增加等。你应该检查具体的进程和资源使用情况，以确定是哪些进程导致了高负载，并采取相应的措施来优化系统性能。



```
[{"id":1,"name":"汉族"},{"id":2,"name":"壮族"}]
```



## 6.VIM知识

![image-20201009173052132](../img\image-20201009173052132.png)

dd的话可以快速删除当前行

yy复制当前行

p粘贴当前行

## 7.使用crontab -l即可列出所有的计划任务

![image-20201009173151927](../img\image-20201009173151927.png)

## 8.安装mysql

```
1
（1）检查系统中是否已安装 MySQL。
rpm -qa | grep mysql
2
5）下载安装包文件。
Wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
3
6）安装mysql-community-release-el7-5.noarch.rpm包
rpm -ivh mysql-community-release-el7-5.noarch.rpm
4
安装mysql。
5
检查mysql是否安装成功。
rpm -qa | grep mysql
6
启动 mysql 服务 。
systemctl start mysqld.service
7
# mysql -u root
mysql> use mysql;
mysql> update user set password=PASSWORD("这里输入root用户密码") where User='root';
mysql> flush privileges; 
grant all privileges on *.* to 'root'@'%' identified by 'DoirO+0u@PS' with grant option;

```

![image-20201009173649725](../img\image-20201009173649725.png)



8.![image-20201009173718485](../img\image-20201009173718485.png)

select user，host from user



9.   grant all privileges on *.* to 'root'@'%' identified by 'Zw+#lzZ2@P#' with grant option;
10. ![image-20201009173819588](../img\image-20201009173819588.png)







## 9.使用脚本安装nginx时，会出现报错

![image-20201009173950604](../img\image-20201009173950604.png)

```
yum -y install pcre-devel
yum -y install openssl openssl-devel
```

## 10文件没有权限时

某些文件没有权限时，可以直接chmod -R 777 runtime  递归的给runtime下面的所有文件夹赋予全部权限。即可解决权限问题。



## 11。查看报错的日志文件

```linux
tail -f -n 50 25.log 
查找日志文件的最末尾的50行。 -f是以监控的方式打开日志文件。-n 50是以查看末尾的50行。
```

## 12.以管理员身份执行什么命令

```
sudo 命令其实是Linux中的一种权限管理机制，管理员可以授权于一些普通用户去执行一些 root 执行的操作，而不需要知道 root 的密码。
严谨些说，sudo 允许一个已授权用户以超级用户或者其它用户的角色运行一个命令。当然，能做什么不能做什么都是通过安全策略来指定的
```

## 13.备份数据库脚本

```shell


#!/bin/bash
mysqldump -uroot -proot big2 | gzip > /home/backup/big2_$(date +%Y%m%d_%H%M%S).sql.gz

赋予此脚本执行权限，然后在计划任务中设置对应的时间，即可每天自动备份数据库。

/usr/bin/sh /usr/local/mysqlBackupData/backup.sh

#!/bin/bash
mysqldump -uroot -psfhi3f83y02uh maite | gzip > /usr/local/mysqlBackupData/maite_$(date +%Y%m%d_%H%M%S).sql.gz

但是mysqldump默认会锁住全部表，进行备份。备份后再解锁，这个对于生产环境一般是很难接受的。


```

![image-20201126174126234](../img\image-20201126174126234.png)

![image-20201126174228366](../img\image-20201126174228366.png)



## 14.查看linux系统版本

```shell
cat /etc/redhat-release
```

## 15一键安装nginx，mysql5.7，php7.3，redis和redis扩展。mysql密码是：Zf!7?z4#xifO0q ,默认端口是57410，安装会重启服务器

```
wget -c http://mirrors.linuxeye.com/oneinstack-full.tar.gz && tar xzf oneinstack-full.tar.gz && ./oneinstack/install.sh --nginx_option 1 --php_option 9 --phpcache_option 1 --php_extensions gmagick,fileinfo,imap,redis,memcached,mongodb,swoole --db_option 2 --dbinstallmethod 1 --dbrootpwd zZAqZsLka4SwPa9k --pureftpd  --redis  --memcached  --reboot 

```



```shell
wget -c http://mirrors.linuxeye.com/oneinstack-full.tar.gz && tar xzf oneinstack-full.tar.gz && ./oneinstack/install.sh --nginx_option 1 --php_option 8 --phpcache_option 1 --php_extensions fileinfo,redis --db_option 2 --dbinstallmethod 1 --dbrootpwd Zf!7?z4#xifO0q --redis  --ssh_port 57410 --reboot 
```

安装成功会出现下面的截图

![image-20201211171443905](../img\image-20201211171443905.png)



重新链接后，需要赋予mysql中的root账号远程链接的权限。

```sql
mysql -h 127.0.0.1 -u root -p 上图中的密码（fYmO0xo0v8_wQ-）。
use mysql;
查看数控库的链接权限
select  User,authentication_string,Host from user;
1.新增一个可以远程链接的root用户，且密码为密码p0@+pFkj@#?dDbZP
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'wdD2ufGajsxAdq';
2.刷新权限
flush privileges;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'61.4.115.58' IDENTIFIED BY 'Adur2Dz2KwH4km';
```



```
wget -c http://mirrors.linuxeye.com/oneinstack-full.tar.gz && tar xzf oneinstack-full.tar.gz && ./oneinstack/install.sh --nginx_option 1 --php_option 9 --phpcache_option 1 --php_extensions imagick,fileinfo,imap,redis,memcached,memcache,mongodb,swoole --db_option 2 --dbinstallmethod 1 --dbrootpwd wdD2ufGajsxAdq --redis  --memcached  --ssh_port 57410 --reboot 
```



```
wget -c http://mirrors.linuxeye.com/oneinstack-full.tar.gz && tar xzf oneinstack-full.tar.gz && ./oneinstack/install.sh --nginx_option 1 --php_option 9 --phpcache_option 1 --php_extensions imagick,fileinfo,imap,redis,memcached,memcache,mongodb,swoole --db_option 2 --dbinstallmethod 1 --dbrootpwd Adur2Dz2KwH4km --redis  --memcached  --ssh_port 57411 --reboot
```



## 16.php和php-fpm区别与联系

1.php-fpm本质上也是一种php的形式.在使用nginx作为web服务器时,php以进程的方式存在,处理请求.此时php的全称加php-fastCGI process Manager,php-fpm是其缩写而成.而在使用Apache作为web服务器时.php是以模块的方式被apache加载,进而处理请求.所以本质上都是php,只是在不同环境下的运行方式不同,php是以模块的方式运行,而php-fpm是以进程的方式运行.

模块方式运行的php,占用的端口号是8080.进程方式运行的php占用的端口号是9000



.在lnmp下搭建站点时,nginx有两种方式链接php-fpm.
取决于php-fpm.conf文件中的listen选项

![image-20210218004409663](../img/image-20210218004409663.png)



![image-20210218004448392](../img/image-20210218004448392.png)

```
一个普通的vhost下面的conf文件例子.
重启php-fpm
1.先杀死进程,pkill php-fpm
2.重启php-fpm,使用service php-fpm start即可
server {
        listen 8090;
        server_name localhost;
        index index.html index.htm index.php;
        root   /home/wwwroot/Big2PHP/public;

                location / {
            #autoindex  on;
            if (!-e $request_filename) {
                          rewrite ^/(.*)$ /index.php/$1 last;
                          break;
                          }
        }
                location ~ \.php(.*)$ {
                #fastcgi_pass   unix:/dev/shm/php-cgi.sock;
                fastcgi_pass   127.0.0.1:9000;
                fastcgi_index  index.php;
                #下面两句是给fastcgi权限，可以支持 ?s=/module/controller/action的url访问模式
                fastcgi_split_path_info  ^((?U).+\.php)(/?.+)$;
                fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
                #下面两句才能真正支持 index.php/index/index/index的pathinfo模式
                fastcgi_param  PATH_INFO  $fastcgi_path_info;
                fastcgi_param  PATH_TRANSLATED  $document_root$fastcgi_path_info;
                include        fastcgi_params;
        }
}
```

## 17.scp命令

Linux scp 命令用于 Linux 之间复制文件和目录。

scp 是 secure copy 的缩写, scp 是 linux 系统下基于 ssh 登陆进行安全的远程文件拷贝命令。

scp 是加密的，[rcp](https://www.runoob.com/linux/linux-comm-rcp.html) 是不加密的，scp 是 rcp 的加强版。



最好在传输前对文件进行，压缩。传输效率比较快。

```
scp /Applications/phpstudy/WWW/zwl.txt root@www.runoob.com:/home/root/others/music 

scp root@47.97.185.94:/home/wwwroot/demo.txt /Applications/phpstudy/WWW/ 
scp /Applications/phpstudy/WWW/demo.txt root@47.97.185.94:/home/wwwroot/
scp /Applications/phpstudy/WWW/demo.txt root@47.97.185.94:57410:/home/wwwroot/


scp -r /data/wwwroot/maite-api root@116.63.103.6:/home/www/

scp -r /home/www/maite-api.tar.gz root@116.63.103.6:/home/www/

116.63.103.6
root/MetelTrust2022


scp -r /home/www/maite-api.tar.gz root@116.63.103.6:/home/www/
```



## 18.服务器脚本

```shell
清理缓存脚本
#!/bin/bash
#每天0点清除一次缓存
echo "开始清理缓存"
sync;sync;sync #写入硬盘，防止数据丢失
echo 1 > /proc/sys/vm/drop_caches
echo 2 > /proc/sys/vm/drop_caches
echo 3 > /proc/sys/vm/drop_caches
echo "清理结束"

```

```shell
#!/bin/bash
#每天1点清理日志
date_time1=$(date  "+%Y%m")
date_time2=$(date  "+%Y%m%d")
#find /home/wwwroot/HyperPHP/runtime/log/${date_time} -mtime +2 -name "*.log" | xargs tar -czvf /back_data/${date_time2}_log.tar.gz;
find /home/wwwroot/HyperObject/runtime/log/${date_time1} -mtime +1 -name "*.log" -exec rm -rf {} \;

find /home/wwwroot/sql_back -mtime +1 -name "*.gz" -exec rm -rf {} \;


```

```shell
scp命令
#!/bin/bash
function auto_scp()	{
	date_time=$(date  "+%Y%m%d")
	srcFile="/back_data/"${date_time}"_log.tar.gz"
	username='root'
	host='103.229.65.152'
	port='52802'
	dstFile="/hyper_log/"${date_time}"_log.tar.gz"
	passwd='Vw7sgJULwntmse52'

	expect -c "
	set timeout 60
	spawn scp -P $port $srcFile $username@$host:$dstFile
	expect {
	\"(yes/no)?\" {send \"yes\n\"; expect \"*assword:\"	{send \"$passwd\n\"}}
	\"*assword:\"	{send \"$passwd\n\"}
	}
	expect eof
	"
	find /back_data/ -name ${date_time}"_log.tar.gz" -exec rm -rf {} \;
}
auto_scp

对应的格式要记得
scp -P 51888 /home/wwwroot/m_20210331_183045.sql.gz root@61.4.115.58:/home/wwwroot/m.sql.gz
gunzip m.sql.gz即可得到对应的sql文件。
```

scp的命令可以快速迁移大文件。不过和服务器的带宽有关系。

![image-20210401165052849](../img/image-20210401165052849.png)



![image-20210401164524602](../img/image-20210401164524602.png)

输入对应路径，和密码之后，就可以将本服务器的文件，复制到远程服务器中了。

## 19.mysql快速的导入和导出

mysqldump导出 

默认情况下，mysqldump这个工具可以帮助你备份一个mysql数据库，在备份过程中它会把所有的表锁住，直到备份完成。

```
sql备份
#!/bin/bash
导出特定的表
/usr/local/mysql/bin/mysqldump -uroot -pa0o+.D#s?g??p@0 hyper2 hyper_member hyper_member_money hyper_plan_order hyper_recharge_order hyper_withdraw_order | gzip > /home/wwwroot/sql_back/hyper2_$(date +%Y%m%d_%H%M%S).sql.gz

快速导出整个数据库表
/usr/local/mysql/bin/mysqldump -uroot -pwp8bq4pdjphr17f8szx!@# me_obj2 | gzip > /home/wwwroot/me_$(date +%Y%m%d_%H%M%S).sql.gz
/usr/local/mysql/bin/mysqldump -u root -p 'wp8bq4pdjphr17f8szx!@#' me_obj2 | gzip > /home/wwwroot/me_$(date +%Y%m%d_%H%M%S).sql.gz

导出mysqldump
导入mysql source 
进入mysql中对应的数据库，执行命令
source 文件路径 
eg：mysql：source /home/wwwroot/m_20210331_183045.sql

/usr/local/mysql/bin/mysqldump -uroot -pwp8bq4pdjphr17f8szx!@# me_obj2 | gzip > /home/wwwroot/me_$(date +%Y%m%d_%H%M%S).sql.gz

导出特定的表
/usr/local/mysql/bin/mysqldump -u sroot -p hyper hyper_articles hyper_member_money hyper_plan_order hyper_recharge_order hyper_withdraw_order | gzip > /home/wwwroot/hyper_$(date +%Y%m%d_%H%M%S).sql.gz

linux下，导入sql文件
先将备份好的gz文件，解压成sql文件。
gunzip hyper_20210511_101932.sql.gz
然后倒入sql文件即可
mysql -u sroot -p test_h < /home/wwwroot/hyper_20210511_101932.sql
密码：hSJNHw5gKvo4w8WY



/usr/local/mysql/bin/mysqldump -uroot -pjdksafjh823aeygfd23 hyper hyper_clock_record hyper_course hyper_course_study_record hyper_exchange_order hyper_member_address hyper_member_diploma hyper_msg_conf hyper_net_check hyper_recharge_address hyper_recharge_order hyper_member_content hyper_subject hyper_transaction_accounts hyper_withdraw_address hyper_withdraw_order hyper_message_template | gzip > /var/sql-data-bak/hyper_hm_$(date +%Y%m%d_%H%M%S).sql.gz

mysqldump
默认情况下，mysqldump这个工具可以帮助你备份一个mysql数据库，在备份过程中它会把所有的表锁住，直到备份完成。

single-transaction
有时候导出的时候并没有锁表的权限，例如如果你只是一个只读权限的话，很可能没有锁表的权限，这个时候只要加上一句 --single-transaction 就可以不锁表进行导出

上述对于一、二、三来说都会对数据库进行锁表，加上此命令即可达到不锁表导数据的目的
--add-drop-table：在每个创建数据库表语句前添加删除数据库表的语句；
--add-locks：备份数据库表时锁定数据库表； 
--all-databases：备份MySQL服务器上的所有数据库；
--comments：添加注释信息；
--compact：压缩模式，产生更少的输出；
--complete-insert：输出完成的插入语句；
--databases：指定要备份的数据库；
--default-character-set：指定默认字符集；
--force：当出现错误时仍然继续备份操作；
--host：指定要备份数据库的服务器；
--lock-tables：备份前，锁定所有数据库表；
--no-create-db：禁止生成创建数据库语句；
--no-create-info：禁止生成创建数据库库表语句；
--password：连接MySQL服务器的密码；
--port：MySQL服务器的端口号；
--user：连接MySQL服务器的用户名。


/usr/local/mysql/bin/mysqldump -uroot -pRzTUEGPwzlEndgGa maite --single-transaction | gzip > /home/wwwroot/maite_$(date +%Y%m%d_%H%M%S).sql.gz


mysqldump  -uroot -p --host=localhost --all-databases --single-transaction
```

1.快速导入表有两种方式

第一种shell命令 mysql

mysql -uroot -p 数据库名 < 备份文件

mysql -uroot -p hyper_copy_8006 < /data/sql/hyper.sql

hSJNHw5gKvo4w8WY



mysql -uroot -p hyper_hm < /var/sql-data-bak/hyper_hm_20211119_101055.sql









第二种source 命令(不推荐使用)

执行方式不同

- shell命令 `mysql -u root -p dbname < dbname.sql`会做一个批处理（一次执行多条），处理效率高
- mysql命令 `source dbname.sql` ，把文件中的sql每次执行一句并输出，效率较低

基于以上特点，如果是sql文件很大，建议使用shell命令方式。

一般推荐使用第一种

source  /var/sql-data-bak/hyper_member_team.sql

![image-20210401134119858](../img/image-20210401134119858.png)



## 20.查看cpu几核。

命令：lscpu

![image-20210402113534578](../img/image-20210402113534578.png)

查看内存几g。32g, free -m

![image-20210402113730617](../img/image-20210402113730617.png)



## 20.crontab中，环境变量可能会失效，

需要使用命令。

比如不能直接使用php，需要使用/usr/local/php/bin/php才可以。使用which命令，即可找出命令所在的路径

## 21.php源码编译安装扩展

1.下载到扩展包,去php的官方扩展网站中下载扩展包：https://pecl.php.net/

https://pecl.php.net/get/redis-5.3.7.tgz

然后复制下载链接使用wget url。。。。，进行下载包，解压包tar -zxvf 。。。。。解压后。

2.进入到扩展包里，进行phpize命令,生成configure命令。 。其中phpize每个服务器路径不一样。

sudo /Applications/MAMP/bin/php/php7.4.2/bin/phpize

3.执行configure 命令，其中/usr/local/php/bin/php-config是服务器php-config的命令路径/

可以which php-config来找路径。

./configure --with-php-config=/usr/local/php/bin/php-config



sudo ./configure --with-php-config=/usr/local/php/bin/php-config

sudo ./configure --with-php-config=/Applications/MAMP/bin/php/php7.4.2/bin/php-config

4.开始安装

sudo make

sudo make install 

5.去目录：/usr/local/php/lib/php/extensions/no-debug-non-zts-20180731下，发现有对应的.so文件。

6.然后去找php.ini目录开始扩展。extension=redis.so

7.最后重启php，即可生效，使用php -m即可发现安装的扩展生效了。



或者去php的安装包里面找

oneinstack 安装的在 /oneinstack/src/php-7.4.19/ext目录下。

比如要安装gmp扩展，进到对应的gmp扩展，下执行下面的命令，然后添加.so文件到配置文件即可。

![image-20211129152539759](../img/image-20211129152539759.png)	

## 22.服务重启

```
重启php

取决于你的PHP运行模式，如果是fastcgi，重启php-fpm即可。如果是apache mod，需要重启apache服务，即可重启php

一般都是fastcgi， 重启php-fpm即可
//重新加载php配置文件 start, stop, restart
service php-fpm reload

重启nginx
/usr/local/nginx/sbin/nginx -s reload

重启mysql
service mysqld restart


```



## 23.秒级计划任务

搭配shell脚本执行，每分钟执行一次此shell脚本

```

#!/bin/bash
step=5 #间隔的秒数，不能大于60
for (( i = 0; i < 60; i=(i+step) )); do
  eval "/usr/bin/curl 'http://61.4.115.58:8011/api/task/checkScanMember'"
  sleep $step
done
exit 0

/usr/bin/sh /home/wwwroor/hyperfund/hyper-new-api/application/api/controller/scan.sh
```



## 24 nohup命令，在系统后台不挂断的执行某个命令。具体使用可以百度

![image-20211021221839193](../img/image-20211021221839193.png)

可以搭配swoole的毫秒定时器，实现秒级计划任务。

```
nohup Command [ Arg … ] [　& ]
nohup /usr/local/php/bin/php index.php api/task/demo >/dev/null 2>&1 &
比如：nohup /usr/local/php/bin/php /home/wwwroot/tp51_swoole/swoole/server/test.php &
其中test.php
<?php
swoole_timer_tick(2000,function ($time_id) {
    file_put_contents('/home/wwwroot/tp51_swoole/runtime/time.txt','7'.PHP_EOL,FILE_APPEND);
});

此命令时每两秒往time.txt写入7.不会重复设置多个定时器。

如果要停止此定时器
需要先使用ps -ef ｜ grep test.php命令，找到此脚本的进程id（PID）。然后kill掉即可停止nohup的命令。也停止了定时器。
如果需要停掉nohup命令，可以ps -ef ｜ grep 对应的命令名称找到对应的进程id（pid）进行停止。

nohup php index.php api/task/demo >/dev/null 2>&1 &
nohup php index.php api/task/updateBtcRate >/dev/null 2>&1 &
```

```
openssl rsa -in /www/server/nginx/conf/cert/gunbull/8ce6404f116dae1a.pem -out /www/server/nginx/conf/cert/gunbull/8ce6404f116dae1a.key
```



```shell
ALTER TABLE `hyper`.`hyper_startup` 
ADD COLUMN `msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '活动文案' AFTER `is_defi_limit`;
```



## 25.负载均衡。

在http段内，在server段外，配置upstream参数即可。test是别名，随便取都行。

括号里面是服务器ip加端口号，代表要转发到哪个服务器的哪个端口号中。



然后在location /中配置proxy_pass http://test

重启nginx即可。

这里可以配置很多种转发的策略。

第一种，轮询（默认，没有写就是轮询）。

![image-20210627160540368](../img/image-20210627160540368.png)

第二种，权重

![image-20210627160512150](../img/image-20210627160512150.png)

第三种ip哈希

![image-20210627160622694](../img/image-20210627160622694.png)

第4种,根据服务器负载状态分配。

![image-20210627160642224](../img/image-20210627160642224.png)



下面是实例

![image-20210627160012892](../img/image-20210627160012892.png)



![image-20210627155930201](../img/image-20210627155930201.png)





## 26.ab测试性能

安装ab工具

命令：yum -y install httpd-tools

安装好后ab -V即可查看ab命令的版本。

![image-20210706224154043](../img/image-20210706224154043.png)

ab -n 10000 -c 1000 https://www.baidu.com/

ab 参数 url

-n 是总共的请求数

-c是并发数。比如1000个用户同时请求，请求10000次 



**-k**

使用HTTP的KeepAlive特性



**-H**

添加任意的请求头，例如："Accept-Encoding: gzip"，请求头将会添加在现有的多个请求头之后(可以重复该参数选项以添加多个)。



ab -n 5000 -c 200 -k - http://localhost:8601/demo/info

ab -n 5000 -c 200 -k -H "Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODEyOTUyNzksIm5iZiI6MTY4MDY5MDQ3OSwiaWF0IjoxNjgwNjkwNDc5LCJqdGkiOjEwMDAxLCJ1aWQiOjQzMDIxfQ.2Zaop6jpfBUfqXCAqj-H53j7h_2JsPXJSXdypxIC828" http://localhost:9501/demo/info



前面挂了nginx 的qps

hyperf框架和gin框架的ab压测结构

hyperf 框架 qps：661.93
gin框架  qps：849.13

gin比hyperf的qps 高 25%左右



如果前面不挂nginx，请求直接到gin服务， 速度能达到5000qps  ，比挂了nginx快了7倍左右。



```shell
hyperf 框架 qps：661.93
➜  dnmp git:(master) ✗ ab -n 5000 -c 180 -k http://127.0.0.1:8601/api/demo/test 
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 500 requests
Completed 1000 requests
Completed 1500 requests
Completed 2000 requests
Completed 2500 requests
Completed 3000 requests
Completed 3500 requests
Completed 4000 requests
Completed 4500 requests
Completed 5000 requests
Finished 5000 requests


Server Software:        nginx
Server Hostname:        127.0.0.1
Server Port:            8601

Document Path:          /api/demo/test
Document Length:        163 bytes

Concurrency Level:      180
Time taken for tests:   7.554 seconds
Complete requests:      5000
Failed requests:        0
Keep-Alive requests:    5000
Total transferred:      2900000 bytes
HTML transferred:       815000 bytes
Requests per second:    661.93 [#/sec] (mean)
Time per request:       271.932 [ms] (mean)
Time per request:       1.511 [ms] (mean, across all concurrent requests)
Transfer rate:          374.92 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.8      0       6
Processing:    19  267  34.8    277     344
Waiting:       13  267  34.8    277     344
Total:         20  268  34.4    277     344

Percentage of the requests served within a certain time (ms)
  50%    277
  66%    284
  75%    287
  80%    290
  90%    302
  95%    310
  98%    328
  99%    335
 100%    344 (longest request)
➜  dnmp git:(master) ✗ ab -n 5000 -c 180 -k http://127.0.0.1:8100/api/user/test
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 500 requests
Completed 1000 requests
Completed 1500 requests
Completed 2000 requests
Completed 2500 requests
Completed 3000 requests
Completed 3500 requests
Completed 4000 requests
Completed 4500 requests
Completed 5000 requests
Finished 5000 requests


Server Software:        nginx
Server Hostname:        127.0.0.1
Server Port:            8100

Document Path:          /api/user/test
Document Length:        44 bytes

Concurrency Level:      180
Time taken for tests:   5.888 seconds
Complete requests:      5000
Failed requests:        0
Keep-Alive requests:    5000
Total transferred:      2375000 bytes
HTML transferred:       220000 bytes
Requests per second:    849.13 [#/sec] (mean)
Time per request:       211.983 [ms] (mean)
Time per request:       1.178 [ms] (mean, across all concurrent requests)
Transfer rate:          393.88 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.8      0       6
Processing:     4  208  25.1    209     426
Waiting:        4  208  25.1    209     426
Total:          4  209  25.0    209     426

Percentage of the requests served within a certain time (ms)
  50%    209
  66%    213
  75%    216
  80%    219
  90%    225
  95%    231
  98%    241
  99%    270
 100%    426 (longest request)
```



## 27swoole杀不死时，可以用这个命令试试

```
kill -9 `lsof -t -i:9502`//杀死9502端口的swoole进程
```

但最好用kill -15 swoole的master进程id //swoole的master进程id = pidof swoole进程名

15是执行完请求后，在关闭(平滑关闭)

## 28查看当前文件夹大小命令

```
du -sh *
```

![image-20210822104609371](../img/image-20210822104609371.png)



## 29查看linux服务的带宽情况。

如果提示没有此命令，使用yum install nethogs

```
nethogs
```

![image-20210822104744794](../img/image-20210822104744794.png)



## 30如果某个ip的并发量超过5就拒绝访问的iptable规则

一般centos6才是使用iptable

打开iptables的规则页面

vim /etc/sysconfig/iptables，然后插入下面的规则即可。

```
-A INPUT -p tcp --dport 90 -m connlimit --connlimit-above 5 -j REJECT
```

centos7默认使用的防火墙管理软件是firewalled







## 31防火墙知识

```
①关闭防火墙
CentOS6中请运行
# chkconfig --level 35 iptables off				【禁止iptables开机自动启动】
# service iptables stop						【关闭防火墙服务】

CentOS7中请运行
# systemctl disable firewalld					【禁止开机启动】
# systemctl stop firewalld					【关闭防火墙服务】

②添加端口放行规则（建议）
# iptables -I INPUT -p tcp --dport 80 -j ACCEPT//放行80端口
# service iptables save					【固定格式：保存配置】
# service iptables restart					【固定格式：重启防火墙服务】

规则语法了解
Iptables：防火墙的指令名称
-I：insert，表示插入规则，表示规则放在其他规则最前面
INPUT：规则仅针对入站请求生效
-p：表示指定协议，protocol
tcp：协议名称
--dport：表示指定端口号
80：需要指定的端口号
-j：表示操作的行为（是否允许）
ACCEPT：单词表示接受，即意味该请求被允许通过（除此之外还有另外2个操作：drop、reject）

iptables就没进程。因此想通过ps指令检查iptables是否运行是不可以的
可以通过命令：service iptables status
查看状态，如果是一个表格即开启了iptable
```

firewalled命令

```
systemctl start firewalld;#启动
systemctl stop firewalld;#停止
systemctl status firewalld;#查看状态
systemctl disable firewalld;#开机禁用
systemctl enable firewalld;#开启启动
firewall-cmd --zone=public --add-port=80/tcp --permanent #开放80/tcp端口  （--permanent永久生效，没有此参数重启后失效）;
firewall-cmd --reload;#
firewall-cmd --zone= public --query-port=80/tcp;#查看80/tcp端口
firewall-cmd --zone= public --remove-port=80/tcp --permanent;#删除该端口开放
```

firewalled

如果提示：

![image-20210822164454802](../img/image-20210822164454802.png)

使用下面命令即可解锁firewalled

```
systemctl unmask firewalld
```

查看防火墙是否在运行

```
firewall-cmd --state
```

![image-20210822164645880](../img/image-20210822164645880.png)开启防火墙：systemctl start firewalld

停止防火墙：systemctl stop firewalld

禁用防火墙：systemctl disable firewalld

防火墙放行8100端口命令

```
firewall-cmd --zone=public --add-port=8100/tcp --permanent
```

重载规则

firewall-cmd --reload

查看已放行的端口号

```
firewall-cmd --zone=public --list-ports
```

![image-20210822165126531](../img/image-20210822165126531.png)

```
七、 IP 封禁 （这个是我们平时用得最多的）
# firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='222.222.222.222' reject"  单个IP
# firewall-cmd --permanent --add-rich-rule="rule family='ipv4' source address='222.222.222.0/24' reject" IP段
# firewall-cmd --permanent --add-rich-rule="rule family=ipv4 source address=192.168.1.2 port port=80  protocol=tcp  accept" 单个IP的某个端口
这个是我们用得最多的。封一个IP，和一个端口   reject 拒绝   accept 允许

当然，我们仍然可以通过 ipset 来封禁 ip

封禁 ip

# firewall-cmd --permanent --zone=public --new-ipset=blacklist --type=hash:ip
# firewall-cmd --permanent --zone=public --ipset=blacklist --add-entry=222.222.222.222
封禁网段

# firewall-cmd --permanent --zone=public --new-ipset=blacklist --type=hash:net
# firewall-cmd --permanent --zone=public --ipset=blacklist --add-entry=222.222.222.0/24
倒入 ipset 规则

# firewall-cmd --permanent --zone=public --new-ipset-from-file=/path/blacklist.xml
然后封禁 blacklist

# firewall-cmd --permanent --zone=public --add-rich-rule='rule source ipset=blacklist drop'
七、IP封禁和端口

# firewall-cmd --permanent --add-rich-rule="rule family=ipv4 source address=192.168.1.2 port port=80  protocol=tcp  accept"
只对192.168.1.2这个IP只能允许80端口访问  （拒绝访问只需把  accept 换成 reject、删除该规则把 –add-rich-rule 改成 –remove-rich-rule即可）

# firewall-cmd --permanent --add-rich-rule="rule family=ipv4 source address=192.168.1.2/24 port port=80  protocol=tcp  accept"
只对192.168.1.2这个IP段只能允许80端口访问（拒绝访问只需把  accept 换成 reject、删除该规则把 –add-rich-rule 改成 –remove-rich-rule即可）

八、双网卡内网网卡不受防火墙限制

# firewall-cmd --permanent --zone=public --add-interface=eth1
公网网卡–zone=public默认区域

# firewall-cmd --permanent --zone=trusted --add-interface=eth2
内网网卡–zone=trusted是受信任区域 可接受所有的网络连接

九、重新载入以生效

# firewall-cmd --reload
 

查看屏蔽结果

firewall-cmd --list-rich-rules
```



## 31.1防火墙规则

表   (table)
包含4个表：
4个表的优先级由高到低：raw-->mangle-->nat-->filter

raw---RAW表只使用在PREROUTING链和OUTPUT链上,因为优先级最高，从而可以对收到的数据包在连接跟踪前进行处理。一但用户使用了RAW表,在某个链上,RAW表处理完后,将跳过NAT表和ip_conntrack处理,即不再做地址转换和数据包的链接跟踪处理了.

filter---这个规则表是预设规则表，拥有 INPUT、FORWARD 和 OUTPUT 三个规则链，这个规则表顾名思义是用来进行封包过滤的理动作(没有-t则，默认是操作filter表)

net----此规则表拥有prerouting和postrouting两个规则链， 主要功能为进行一对一、一对多、多对多等网址转译工作（SNATDNAT）

mangle--此规则表拥有prerouting、FORWARD、postrouting三个规则链，除了进行网址转译工作会改写封包外，在某些特殊应用可能也必须去改写封包(ITL、TOS)或者是设定MARK(将封包作记号，以进行后续的过滤)这时就必须将这些工作定义在mangles规则表中

常用命令：
-A 追加规则-->iptables -A INPUT
-D 删除规则-->iptables -D INPUT 1(编号)
-R 修改规则-->iptables -R INPUT 1 -s 192.168.12.0 -j DROP 取代现行规则，顺序不变(1是位置)
-I 插入规则-->iptables -I INPUT 1 --dport 80 -j ACCEPT 插入一条规则，原本位置上的规则将会往后移动一个顺位
-L 查看规则-->iptables -L INPUT 列出规则链中的所有规则
-N 新的规则-->iptables -N allowed 定义新的规则

通用参数：
-p 协议 例：iptables -A INPUT -p tcp
-s源地址 例：iptables -A INPUT -s 192.168.1.1
-d目的地址 例：iptables -A INPUT -d 192.168.12.1
-sport源端口 例:iptables -A INPUT -p tcp --sport 22
-dport目的端口 例:iptables -A INPUT -p tcp --dport 22
-i指定入口网卡 例:iptables -A INPUT -i eth0
-o指定出口网卡 例:iptables -A FORWARD -o eth0

-j 指定要进行的处理动作
常用的ACTION：
DROP：丢弃
REJECT：明示拒绝
ACCEPT：接受
SNAT基于原地址的转换
source--指定原地址
  比如我们现在要将所有192.168.10.0网段的IP在经过的时候全都转换成172.16.100.1这个假设出来的外网地址：
iptables -t nat -A POSTROUTING -s 192.168.10.0/24 -j SNAT --to-source 172.16.100.1(外网有效ip)
这样，只要是来自本地网络的试图通过网卡访问网络的，都会被统统转换成172.16.100.1这个IP.
MASQUERADE(动态伪装）--家用带宽获取的外网ip，就是用到了动态伪装
iptables -t nat -A POSTROUTING -s 192.168.10.0/24 -j MASQUERADE
DNAT目标地址转换
destination-指定目标地址
iptables -t nat -A PREROUTING -d 192.168.10.18 -p tcp --dport 80 -j DNAT --to-destination 172.16.100.2
10.18访问80端口转换到100.2上
MASQUERADE：源地址伪装
REDIRECT：重定向：主要用于实现端口重定向
MARK：打防火墙标记的
RETURN：返回 在自定义链执行完毕后使用返回，来返回原规则链。

链   (chain)
每个表都有自己的一组内置链，可以对链进行自定义，这样就可以建立一组规则，
filter表中的input、output和forward链



iptables-restore < iptables



## 32.通过nginx进行ip封禁

该功能基于ngx_http_access_module模块，默认可使用

http://nginx.org/en/docs/http/ngx_http_access_module.html

```
语法（写在server段/http段中），写在server代表对某个server段生效，比如80server段。如果是写在http段，代表对全部server段都生效。
deny ip  禁止ip访问
allow ip  允许访问
```

比如禁止某个ip的访问。ip黑明单

修改nginx的配置文件。在80的server段添加

deny 47.97.198.94;

然后重启nginx即可。

如果是ip段呢？如下

```
扩展：如何针对ip段进行封禁？
Ip是单个，例如：14.130.200.143
Ip段是指一个范围，例如：14.130.200.1-14.130.200.255

如果需要禁用ip段的话，得先确定一件事，如果用“.”将ip分为四段的话，先确定几段内容是不变的（不变的段数为n），然后计算公式：
	8×n = 位数
假设，前三段不变：14.130.200.0/24
	  前两段不变：14.130.0.0/16
      前一段不变：14.0.0.0/8
特殊段：0.0.0.0/0				表示任何ip地址
例如：不允许192.168.198.x这段进行访问，那么配置可以写成
```

![image-20210822163853474](../img/image-20210822163853474.png)







## 32.chmod权限命令

![image-20211111171939061](../img/image-20211111171939061.png)

-a all全部用户。

chmod  a =rwx 文件名

chmod  -R a =rwx 文件夹

u,g,o看上图解释即可。



777是赋予全部读写执行的全部权限，这样很危险。一般不建议。

-R 是递归给文件夹赋予权限

chmod - R 777 文件夹



## 33.当获取不到，$_SERVER['HTTP_X_FORWARDED_FOR']时，需要配置nginx。



```
http代理
# 将客户端host及ip信息转发到对应节点  
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

才能拿到真实的ip



```
websocket代理
# 配置EasySwoole节点 至少需要一个
upstream easyswoole {
    # 将负载均衡模式设置为IP hash，作用：不同的客户端每次请求都会与同一节点进行交互。
    ip_hash;
    server 127.0.0.1:9501;
    server 127.0.0.1:9502;
    server 127.0.0.1:9503;
}

server {
    listen 80;
    server_name websocket.easyswoole.com;

    location / {
        # websocket的header
        proxy_http_version 1.1;
        # 升级http1.1到websocket协议
        proxy_set_header Upgrade websocket;
        proxy_set_header Connection "Upgrade";

        # 将客户端host及ip信息转发到对应节点  
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;

        # 客户端与服务端60s之内无交互，将自动断开连接。
        proxy_read_timeout 60s ;

        # 代理访问真实服务器
        proxy_pass http://easyswoole;
    }
}
```





## 34.cli模式下的标准输入和标准输出流，标准错误流

执行一个命令行都存在3个标准文件(linux一切皆文件):

- 标准输入 (stdin,通常对应终端的键盘,进程可通过该文件获取键盘输入的数据)

- 标准输出 (stdout,对应终端的屏幕,进程通过写入数据到该文件,将数据显示到屏幕)

- 标准错误 (stderr,对应终端的屏幕,进程通过写入数据到该文件,将错误信息显示到屏幕) 在php-cli命令行下,可通过以上3个文件句柄进行一系列的逻辑操作,比如:

  启动php文件,监听标准输入,获取到输入的网址,php再进行网址的数据请求/接收 等等操作 而在常规web模式下,标准输出会被拦截

  > echo var_dump等输出函数其实就是stdout,但是在常规web访问下被重定向到了web服务器,然后由web服务器输出

了解详细内容可查看：php各种io流输入输出用法.md



2>&1 :把标准错误重定向到标准输出

就是把错误，当初标准输出，一起写到某个文件中。



## 34 磁盘信息

查看磁盘读写的情况

iostat



磁盘空间的使用情况

df -h



文件大小的情况

du -sh



## 35.进程占用cpu高的排查

```
strace工具
```



```
strace -f -s 65500 -i -t  -tt -p 4016572

strace -f -s 65500 -i -t  -tt  -e trace=epoll_wait,epoll_pwait,accept,accept4,openat,write,recv,recvfrom,send,sendto,sendmsg -p 4016572
```

如果这个命令查看不到大量的io读写操作的话, 再检查是否是程序有死循环或者调用第三方接口阻塞了



## 36.curl命令

```
post请求
curl -X POST  \
  'http://61.4.115.58:8011/api/login' \
  -H 'Content-Type:application/json' \
  -H 'source:' \
  -d '{"name":"wenlin","password":"12345678","theme":0,"g-recaptcha-response":""}'
  
  get请求
  
   curl http://61.4.115.58:8029/api/settlement?type=3
   
   
   又是一个坑，在linux中&会被转义，所以要用引号
curl 'http://18.166.62.33/api/task/getRechargeAddress?type=1&shopType=2'
```



## 37.有些客户端链接成功，有些客户端却链接不成功

mysql连接失败超过30次，阿里云防火墙把ip给拒了



可以排查是不是阿里云防火墙禁用掉了某些客户端的ip



## 38.上行流量和下行流量

![image-20230530104645415](../img/image-20230530104645415.png)



对服务器而言， 客户端下载资源消耗的是服务器的上行流量，客户端上传资源消耗的是服务器的下行流量，

通常买的服务器，比如阿里云，一般买的带宽指的是上行带宽，下行通常是不限的。而且流量的计算一般都是以上行的来计算的。

所以，客户端上传资源，对服务器的带宽基本没有影响，因为服务器的下行基本不限的，跟客户端本身网络的带宽有影响；

而客户端下载资源，除了跟服务器的带宽有影响，跟客户端本身的网络带宽也有影响的。



## 39 查看服务器的socket链接信息

还有很多具体的用法，要用时再搜索。

![image-20220401140834513](../img/image-20220401140834513.png)



## 39.查看linux的句柄数

  出现错误：too many open files：顾名思义即打开过多文件数时，需要调高句柄数



命令：ulimit -n



## 40apache配置重写规则

![image-20220407150241997](../img/image-20220407150241997.png)



mamp的重写规则，重写文件文件名：.htaccess

```
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Handle Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```



## 41.生产项目出现502bad gateway

问题描述

“Nginx 502 Bad Gateway”错误的含义是请求的PHP-CGI已经执行，但是由于读取资源问题等原因没有执行完毕，而导致PHP-CGI进程终止，一般来说“Nginx 502 Bad Gateway”错误和php-fpm.conf的设置有关。

问题原因

常见的原因可能是php-cgi进程数不够用、MySQL语句执行慢导致PHP执行时间长、或者是php-cgi进程异常中断，都会出现502错误。

解决方案

针对不同的问题原因，提供以下不同的解决方法。当磁盘空间不足时，可以执行`df -h`命令，查看磁盘使用量。

- 在Nginx安装后可正常访问网站的环境中，运行一段时间出现502错误码，一般默认php-cgi进程是5个，可能因为php-cgi进程不够用而造成502错误，需要修改`/usr/local/php/etc/php-fpm.conf`文件，将其中的max_children值适当增加。
- PHP执行超时，修改`/usr/local/php/etc/php.ini`文件，将max_execution_time改为300。

通常的排查方法如下。

1. 依次执如下命令，查看php fastcgi的进程数，及max_children的值。

   ```
   netstat -anop | grep php-cgi | wc -l
   netstat -anpo | grep php-fpm | wc -l
   ```

2. 执行如下命令，查看当前进程。

   ```
   ps aux | grep php-fpm 
   ```

   系统显示类似如下，观察fastcgi、php-fpm进程数，假如使用的进程数等于或高于5个，说明需要增加。

![image-20220521105939882](../img/image-20220521105939882.png)



修改`/usr/local/php/etc/php-fpm.conf`配置文件中的相关参数，将pm.max_children参数的值修改为5，将request_terminate_timeout参数的值修改为60。

> 说明：
>
> - max_children最多5个进程，按照每个进程20MB内存，最多100MB。也就是1分钟。max_children增多，则php-cgi的进程增多就会处理的很快，排队的请求就会很少。但是设置max_children也需要根据服务器的性能进行设定，一台服务器正常情况下，每一个php-cgi进程所耗费的内存在20M左右。根据购买的服务器内存来实际决定。
> - request_terminate_timeout执行的时间为60秒，request_terminate_timeout值可以根据服务器的性能进行设定。一般来说性能越好您可以设置越高，20分钟~30分钟都可以。
> - ![image-20220521110133583](../img/image-20220521110133583.png)



## 42查看tcp3次握手建立链接时，从服务端的角度去看backlog队列是否满了？可以查看丢弃的syn包数量，下图是命令。

![image-20220521110556411](../img/image-20220521110556411.png)

如果丢弃数量太多，需要调大backlog队列的长度。



如果tcp连接太多了，塞满了linux系统的backlog队列，会出现connection reset by peer的错误.backlog和系统的最大连接数的最小值才是真正的队列长度。

![image-20230405222801962](../img/image-20230405222801962.png)



## 43批量杀死进程



```
 ps -ef|grep 关键字 |grep -v "grep"|awk '{print $2}' //找到关键字(可以改成nginx等关键字)的所有进程id，对比，确定没问题的话，就在后面加上|xargs kill -9即可
 
 比如ps -ef|grep 关键字 |grep -v "grep"|awk '{print $2}'|xargs kill -9

 ps -ef|grep notify_server_tick.php|grep -v "grep"|awk '{print $2}'|xargs kill -9
```



## 44压缩和解压

- 1.压缩当前目录下文件夹/文件test到test.tar.gz

  ```
  tar -zcvf test.tar.gz test
  ```

  

- 2.解压缩当前目录下的file.tar.gz到file:

```css
tar -zxvf file.tar.gz
```

### 参数详解

### 五个命令中必选一个

- -c: 建立压缩档案
- -x：解压
- -t：查看内容
- -r：向压缩归档文件末尾追加文件
- -u：更新原压缩包中的文件

### 这几个参数是可选的

- -z：有gzip属性的
- -j：有bz2属性的
- -Z：有compress属性的
- -v：显示所有过程
- -O：将文件解开到标准输出





用zip压缩也可以

zip -r beego.zip beego

-r是递归压缩，  beego.zip压缩后的文件夹名字。 压缩的文件路径，如果是当前目录下的话，可以直接写路径名字。





![image-20230307102216374](../img/image-20230307102216374.png)



## 45 符号> 和 >> 和 <符号的区别



```
> 是重定向到某个文件，覆盖的形式
echo 123 > demo.txt //demo.txt内容是123

>> 是重定向到某个文件，追加的形式
echo 456 >> demo.txt //demo.txt内容是123456

< 命令默认从键盘获得的输入，改成从文件，或者其它打开文件以及设备输入
mysql -u root -p -h test < test.sql

```



## 46.正向代理和反向代理

1.正向代理：在客户端和目标服务器之间的代理，客户端知道目前服务器ip，但是访问不到，就需要设置一个正向代理，然后再访问目标服务，然后请求就从客户端->正向代理->目标服务器，然后请求一步步返回。其实客户端是知道了服务器端真实ip或域名的。



2.反向代理，是客户端直接返回反响代理服务器。然后反向代理服务器去请求真实的服务器ip，其实客户端是完全不知道，代理请求了什么ip。比如nginx的负载均衡。



## 47.linux系统的五种io模型

### 1. 概念说明

为了便于理解后面的内容，我们先来了解一些概念。

#### 1.1 Socket

Socket 中文翻译为套接字，是计算机网络中进程间进行双向通信的端点的抽象。一个 Socket 代表了网络通信的一端，是由操作系统提供的进程间通信机制。

- 在操作系统中，通常会为应用程序提供一组应用程序接口，称为 Socket 接口（Socket API）。应用程序可以通过 Socket 接口，来使用网络 Socket，以进行数据的传输。
- 一个 Socket 由IP地址和端口组成，即：Socket 地址 = IP地址 : 端口号。
- 在同一台计算机上，TCP 协议与 UDP 协议可以同时使用相同的端口（Port），而互不干扰。
- 要想实现网络通信，至少需要一对 Socket，其中一个运行在客户端，称之为 Client Socket；另一个运行在服务器端，称之为 Server Socket。
- Socket 之间的连接过程可以分为三个步骤：（1）服务器监听；（2）客户端连接；（3）连接确认。

![Socket](https://segmentfault.com/img/remote/1460000039898782)

#### 1.2 Socket 缓冲区

每个 Socket 被创建后，都会在内核中分配两个缓冲区：输入缓冲区和输出缓冲区。

- 通过 Socket 发送数据并不会立即向网络中传输数据，而是先将数据写入到输出缓冲区中，再由 TCP 协议将数据从输出缓冲区发送到目标主机。
- 通过 Socket 接收数据也是如此，也是从输入缓冲区中读取数据，而不是直接从网络中读取。

![Socket缓冲区](../img/1460000039898783.png)

#### 1.3 用户空间、内核空间、系统调用

操作系统的进程空间可以分为用户空间（User Space）和内核空间（Kernel Space），它们需要不同的执行权限。

- 大多数系统交互式操作需要在内核空间中运行，比如设备 IO 操作。
- 我们的应用程序运行在用户空间，是不具备系统级的直接操作权限的。如果应用程序想要访问系统核心功能，必须通过系统调用（System Call）来完成。比如调用`recv()`函数，会将输入缓冲区中的内容拷贝到用户缓冲区。
- 系统调用运行在内核空间，是操作系统为应用程序提供的接口。

![用户空间、内核空间、系统调用](../img/1460000039898784.png)



IO可以理解为，在操作系统中，数据在内核态和用户态之间的读、写操作，大部分情况下是指网络IO。



#### 1.4 阻塞与非阻塞

阻塞与非阻塞，用于描述调用者在等待返回结果时的状态。

- 阻塞：调用者发起请求后，会一直等待返回结果，这期间当前线程会被挂起（阻塞）。
- 非阻塞：调用者发起请求后，会立刻返回，当前线程也不会阻塞。该调用不会立刻得到结果，调用者需要定时轮询查看处理状态。

#### 1.5 同步与异步

而同步与异步，用于描述调用结果的返回机制（或者叫通信机制）。

- 同步：调用者发起请求后，会一直等待返回结果，即由调用者主动等待这个调用结果。

- 异步：调用者发起请求后，会立刻返回，但不会立刻得到这个结果，而是由被调者在执行结束后主动通知（如 Callback）调用者。

  

### 2. 五种 IO 模型

IO 模型是指：用什么样的通道或者说是通信模式进行数据的传输，这很大程序上决定了程序通信的性能。

Linux 系统为我们提供五种可用的 IO 模型：阻塞式 IO 模型、非阻塞式 IO 模型、IO 多路复用模型、信号驱动 IO 模型和异步 IO 模型。

#### 2.1 阻塞式 IO 模型

阻塞式 IO （Blocking IO）：应用进程从发起 IO 系统调用，至内核返回成功标识，这整个期间是处于阻塞状态的。

![阻塞式 IO 模型](../img/1460000039898785.png)

#### 2.2 非阻塞式 IO 模型

非阻塞式IO（Non-Blocking IO）：应用进程可以将 Socket 设置为非阻塞，这样应用进程在发起 IO 系统调用后，会立刻返回。应用进程可以轮询的发起 IO 系统调用，直到内核返回成功标识。

![非阻塞式 IO 模型](../img/1460000039898786.png)

#### 2.3 IO 多路复用模型

IO 多路复用（IO Multiplexin）：可以将多个应用进程的 Socket 注册到一个 Select（多路复用器）上，然后使用一个进程来监听该 Select（该操作会阻塞），Select 会监听所有注册进来的 Socket，只要有一个 Socket 的数据准备好，就会返回该Socket。再由应用进程发起 IO 系统调用，来完成数据读取。

可以实现一个线程监视多个文件句柄；一旦某个文件句柄就绪，就能够通知到对应应用程序进行相应的读写操作；没有文件句柄就绪时就会阻塞应用程序，从而释放出CPU资源。

多路复用：多路是指多个链接socket，复用是指多个socket共用一个线程。多个链接共用一个线程，



![IO 多路复用模型](../img/1460000039898787.png)



### 实现IO多路复用的模型有三种，分别是Select、poll 和 epoll。

下面详细介绍一下三种多路复用模型的基本原理和优缺点：

#### 2.select模型

![图片](../img/582fd9e0755a8626e0f675b49aeca6a474863c.png)

select模型，它的基本原理是，采用轮询和遍历的方式。也就是说，在客户端操作服务器时，会创建三种文件描述符，简称FD。分别是writefds（写描述符）、readfds（读描述符）和 exceptfds（异常描述符）。

![图片](../img/f12584a013bc62afb18217a89881e016af058d.png)

而select会阻塞监视这三种文件描述符，等有数据、可读、可写、出异常或超时都会返回；

![图片](../img/9347fbb119c57e8eaa51259598b88401fa7f5b.png)

返回后通过遍历fdset，也就是文件描述符的集合，来找到就绪的FD，然后，触发相应的IO操作。

![图片](../img/75cc948329fd71e82474165d59675e0bc51de4.png)

它的优点是跨平台支持性好，几乎在所有的平台上支持。

![图片](../img/c1850a099854e54894c903d7f75aefd001c426.png)

它的缺点也很明显，由于select是采用轮询的方式进行全盘扫描，因此，随着FD数量增多而导致性能下降。

![图片](../img/f37cd5a614266764aa185459cc5f79642a7f5a.png)

因此，每次调用select()方法，都需要把FD集合从用户态拷贝到内核态，并进行遍历。而操作系统对单个进程打开的FD数量是有限制的，一般默认是1024个。虽然，可以通过操作系统的宏定义FD_SETSIZE修改最大FD数量限制，但是，在IO吞吐量巨大的情况下，效率提升仍然有限。

### 3.poll模型

![图片](../img/c626e7a289064eeff7d2550e6b0da14e71ecbe.png)

poll 模型的原理与select模型基本一致，也是采用轮询加遍历，唯一的区别就是 poll 采用链表的方式来存储FD。

所以，它的优点点是没有最大FD的数量限制。

![图片](https://s7.51cto.com/oss/202208/26/595cba428b344b95fd6937a1ba71d6ad96e086.png)

它的缺点和select一样，也是采用轮询方式全盘扫描，同样也会随着FD数量增多而导致性能下降。

![图片](../img/1372960395e693ae9ea97829476e7ac77f13aa.png)

### 4.epoll模型

由于select和poll都会因为吞吐量增加而导致性能下降，因此，才出现了epoll模型。

epoll模型是采用时间通知机制来触发相关的IO操作。它没有FD个数限制，而且从用户态拷贝到内核态只需要一次。它主要通过系统底层的函数来注册、激活FD，从而触发相关的 IO 操作，这样大大提高了性能。主要是通过调用以下三个系统函数：

![图片](../img/94ac6d210f1cbb19eaa033a9d87a707311ed0f.png)

（1）epoll_create()函数，在系统启动时，会在Linux内核里面申请一个B+树结构的文件系统，然后，返回epoll对象，也是一个FD。

![图片](../img/44a5e2205fc72c2afc255371be34a65500af0b.png)

（2）epoll_ctl()函数，每新建一个连接的时候，会同步更新epoll对象中的FD，并且绑定一个 callback回调函数。

![图片](../img/77dbdf388e64ad4753122777e7439a9b384a35.png)

（3）epoll_wait()函数，轮询所有的callback集合，并触发对应的 IO 操作

![图片](../img/94e45c984a9944de27a37218d6b044d196d2ed.png)

所以，epoll模型最大的优点是将轮询改成了回调，大大提高了CPU执行效率，也不会随FD数量的增加而导致效率下降。当然，它也没有FD数量限制，也就是说，它能支持的FD上限是操作系统的最大文件句柄数。一般而言，1G 内存大概支持 10 万个句柄。分布式系统中常用的组件如Redis、Nginx都是优先采用epoll模型。

![图片](../img/249b23f060750f8c7ff51204aad2d18683147b.png)

它的缺点是只能在Linux下工作。

### 5.综合对比

下表是三种多路复用模型的综合对比，有兴趣的小伙伴可以截图保存一下，或者到我的个人煮叶简介中获取。

![图片](../img/c15ef3185d17bfca14642646a4a17c2cacf065.png)





#### 2.4 信号驱动 IO 模型

信号驱动 IO（Signal Driven IO）：可以为 Socket 开启信号驱动 IO 功能，应用进程需向内核注册一个信号处理程序，该操作并立即返回。当内核中有数据准备好，会发送一个信号给应用进程，应用进程便可以在信号处理程序中发起 IO 系统调用，来完成数据读取了。

![信号驱动 IO 模型](../img/1460000039898788.png)

#### 2.5 异步 IO 模型

异步 IO（Asynchronous IO）： 应用进程发起 IO 系统调用后，会立即返回。当内核中数据完全准备后，并且也复制到了用户空间，会产生一个信号来通知应用进程。

![异步 IO 模型](../img/1460000039898789.png)

### 3. 总结

从上述五种 IO 模型可以看出，应用进程对内核发起 IO 系统调用后，内核会经过两个阶段来完成数据的传输：

- 第一阶段：等待数据。即应用进程发起 IO 系统调用后，会一直等待数据；当有数据传入服务器，会将数据放入内核空间，此时数据准备好。
- 第二阶段：将数据从内核空间复制到用户空间，并返回给应用程序成功标识。

![五种 IO 模型对比](../img/1460000039898790.png)

前四种模型的第二阶段是相同的，都是处于阻塞状态，其主要区别在第一阶段。而异步 IO 模型则不同，应用进程在这两个阶段是完全不阻塞的。



## 48 ps命令

查看某个进程id下面的所有线程

可以使用**-L 参数**，后面加上特定的PID。

ps -L 22996 或者 ps -T -p 22996

![image-20231008103851068](../img/image-20231008103851068.png)



## 49进程按照cpu或者内存大小排序

ps aux --sort=-pcpu,+pmem # CPU或者内存进行排序,-降序，+升序

ps aux --sort=-pcpu

ps aux --sort=-pmem



ps -C nginx 

# 通过名字或命令搜索进程