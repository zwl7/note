## AES加密

Aes(对称性加密算法);用途:给别人一个加密过后的字符串,里面蕴含着重要信息(订单号),当别人再次请求我时进行解密,解密后的数据就是订单号,依靠此订单号来查询数据.达到数据的安全性.

使用openssl

```php
class AESCipher {

    private $key;
    private $iv;
    private static $instance = null;
    private $algorithm = 'aes-256-cbc';  // 加密算法作为属性，方便更改

    private $slat = 'Jf3dwPwoO0w2Nvl';

    public static function getInstance(): AESCipher {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __clone() {
        // 防止实例被克隆
    }

    private function __construct() {
        $salt = env('AES_CIPHER_SALT') ?: $this->slat;
        $this->key = substr(hash('sha256', $salt, true), 0, 32);
        $this->iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($this->algorithm));
    }

    public function encrypt(string $data): string {
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($this->algorithm));
        $encrypted = openssl_encrypt($data, $this->algorithm, $this->key, 0, $iv);
        if ($encrypted === false) {
            throw new RuntimeException('Encryption failed.');
        }
        return base64_encode($iv . $encrypted);
    }

    public function decrypt(string $data): string {
        $data = base64_decode($data);
        $ivLength = openssl_cipher_iv_length($this->algorithm);
        $iv = substr($data, 0, $ivLength);
        $encrypted = substr($data, $ivLength);
        $decrypted = openssl_decrypt($encrypted, $this->algorithm, $this->key, 0, $iv);
        if ($decrypted === false) {
            throw new RuntimeException('Decryption failed.');
        }
        return $decrypted;
    }
}
```



使用AES加密解密明文内容.
工作模式：ECB，填充模式：PKCS7，密钥长度：AES-256，加密密钥：LCaCuNoodCDziUMkxJaRjrjyvoENgrXX

```php
<?php
class AES
{
    private $key;
    private $method;

    public function __construct($key)
    {
        $this->key = $key;
        $this->method = 'aes-256-ecb';
    }

    public function encrypt($data): string
    {
        $paddedData = $this->pkcs7Pad($data);
        $encrypted = openssl_encrypt($paddedData, $this->method, $this->key, OPENSSL_RAW_DATA | OPENSSL_NO_PADDING);
        return base64_encode($encrypted);
    }

    public function decrypt($data)
    {
        $decodedData = base64_decode($data);
        $decrypted = openssl_decrypt($decodedData, $this->method, $this->key, OPENSSL_RAW_DATA | OPENSSL_NO_PADDING);
        return $this->pkcs7Unpad($decrypted);
    }

    private function pkcs7Pad($data)
    {
        $blockSize = 16;
        $pad = $blockSize - (strlen($data) % $blockSize);
        return $data . str_repeat(chr($pad), $pad);
    }

    private function pkcs7Unpad($data)
    {
        $pad = ord($data[strlen($data) - 1]);
        return substr($data, 0, -$pad);
    }
}

$key = 'LCaCuNoodCDziUMkxJaRjrjyvoENgrXX';
$aes = new AES($key);

$plaintext = "This is a test message.";
$encrypted = $aes->encrypt($plaintext);
echo "Encrypted: " . $encrypted . "\n";

$decrypted = $aes->decrypt($encrypted);
echo "Decrypted: " . $decrypted . "\n";
?>
```

Encrypted: UFiTuf3JSy324fMEMJ1xluk/FGAyOHytbjIxBYmT6uA=

Decrypted: This is a test message.