<?php

require_once '../vendor/autoload.php';
$config = [
    'host'     => '127.0.0.1',
    'vhost'    => '/',
    'port'     => 5672,
    'login'    => 'guest',
    'password' => 'guest'
];
try {
    // 创建一个链接
    $connection = new \PhpAmqpLib\Connection\AMQPStreamConnection($config['host'],$config['port'],$config['login'],$config['password'],'/');
    $channel = $connection->channel();

    //
    $queue = 'queue-demo';
    // 限流
    $channel->basic_qos(null, 3,null);
    $channel->basic_consume($queue,'',false,false,false,false,function (\PhpAmqpLib\Message\AMQPMessage $msg) {
        echo " [x] Received ", $msg->body, "\n"; //根据"."数量个数获取延迟时间，单位秒
        $msg->getChannel()->basic_ack($msg->getDeliveryTag());
        sleep(2);
    });

    while(count($channel->callbacks)) {
        $channel->wait(null,false,50);
    }

    $channel->close();
    $connection->close();

} catch (\Exception $e) {
    echo 'error:'.$e->getMessage();
}
