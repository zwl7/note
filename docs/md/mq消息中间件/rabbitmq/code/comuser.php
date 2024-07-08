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
var_dump($connection);
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

// 创建一个队列
$queue = new AMQPQueue($channel);

// 设置队列名称
$queueName = 'queue_1';
$queue->setName($queueName);
//设置队列持久
$queue->setFlags(AMQP_DURABLE);
//声明消队列

$queue->declareQueue();

// 设置binding key，把队列和交换机进行绑定
$bindKey = 'key1';

//交换机和队列通过$routingKey进行绑定
$queue->bind($exchange->getName(), $bindKey);

//接收消息并进行处理的回调方法1
//设置消息队列消费者回调方法，并进行阻塞
$queue->consume(function ($envelope, $queue){
    $data = json_decode($envelope->getBody(),true);
    var_dump($data);
    if($data){
        //显式确认，队列收到消费者显式确认后，会删除该消息
        $queue->ack($envelope->getDeliveryTag());

        //$queue->nack($envelope->getDeliveryTag());
    }
});


