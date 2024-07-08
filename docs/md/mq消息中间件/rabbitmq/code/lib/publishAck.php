<?php

use PhpAmqpLib\Message\AMQPMessage;

require_once '../vendor/autoload.php';
$config = [
    'host'     => '127.0.0.1',
    'vhost'    => '/',
    'port'     => 5672,
    'login'    => 'guest',
    'password' => 'guest'
];
try {
    // 创建一个链接1
    $connection = new \PhpAmqpLib\Connection\AMQPStreamConnection($config['host'],$config['port'],$config['login'],$config['password'],'/');
    $channel = $connection->channel();

// 开启确认机制
    $channel->confirm_select();

// 设置推送成功的回调
    $channel->set_ack_handler(function (\PhpAmqpLib\Message\AMQPMessage $message) {
        echo 'success body:'.$message->body.PHP_EOL;
    });

// 设置推送成功的回调
    $channel->set_nack_handler(function (\PhpAmqpLib\Message\AMQPMessage $message) {
        echo 'fail body:'.$message->body.PHP_EOL;
    });

//消息到达交换机,但是没有进入合适的队列,消息回退
    $channel->set_return_listener(function ($reply_code,$reply_text,$exchange,$routing_key,AMQPMessage $msg){
        echo '没有进入合适的队列'.PHP_EOL;
    });

    $exchange = 'exchange_2';
    $channel->exchange_declare($exchange,\PhpAmqpLib\Exchange\AMQPExchangeType::TOPIC);

    $routingKey = $bindKey =  'queue_2';

    $queue = 'queue-demo';
    //定义队列 - 1
    $channel->queue_declare($queue,false,true,false,false);
    //绑定
    $channel->queue_bind($queue,$exchange,$routingKey);

    //array('content_type' => 'text/plain', 'delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT), ['expiration' => '6000']
    $msg = new AMQPMessage(1,['content_type' => 'text/plain','expiration' => '60000']);

    for ($i = 1; $i <= 10; $i++) {
        //发送消息到交换机，并返回发送结果
        $channel->basic_publish($msg,$exchange,$routingKey,true);
    }
    //等待server确认
    $channel->wait_for_pending_acks_returns();
    $channel->close();
    $connection->close();
} catch (\Exception $e) {
    echo "异常信息".$e->getMessage();
}




