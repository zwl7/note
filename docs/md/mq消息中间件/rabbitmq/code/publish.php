<?php

$config = [
    'host' => '127.0.0.1',
    'vhost' => '/',
    'port' => 5672,
    'login' => 'guest',
    'password' => 'guest'
];
// 创建一个链接
$connection = new AMQPConnection($config);
if (!$connection->connect()) {
    die('error');
}

// 创建一个channel
$channel = new AMQPChannel($connection);

// 创建一个交换机
$exchange = new AMQPExchange($channel);

// 设置交换机名称
$exchangeName = 'exchange_1';
$exchange->setName($exchangeName);

// 设置交换机类型
//AMQP_EX_TYPE_DIRECT:直连交换机
//AMQP_EX_TYPE_FANOUT:扇形交换机
//AMQP_EX_TYPE_HEADERS:头交换机
//AMQP_EX_TYPE_TOPIC:主题交换机
$exchange->setType(AMQP_EX_TYPE_DIRECT);

// 设置交换机持久类型
$exchange->setFlags(AMQP_DURABLE);

// 声明一个交换机
$exchange->declareExchange();

$routingKey = 'key1';

for ($i=1;$i<=10;$i++){
    //消息内容
    $msg = array(
        'data'  => 'message_'.time(),
        'hello' => 'world'.$i,
    );
    //发送消息到交换机，并返回发送结果

    //delivery_mode:2声明消息持久，持久的队列+持久的消息在RabbitMQ重启后才不会丢失
    $res = $exchange->publish(json_encode($msg), $routingKey, AMQP_NOPARAM, array('delivery_mode' => 2));
    var_dump($res);
    //代码执行完毕后进程会自动退出
}




