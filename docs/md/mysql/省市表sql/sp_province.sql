/*
Navicat MySQL Data Transfer

Source Server         : 第三巷
Source Server Version : 50562
Source Host           : 115.28.88.120:3306
Source Database       : dsxwoshop

Target Server Type    : MYSQL
Target Server Version : 50562
File Encoding         : 65001

Date: 2021-09-06 16:20:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sp_province
-- ----------------------------
DROP TABLE IF EXISTS `sp_province`;
CREATE TABLE `sp_province` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pro_name` varchar(32) NOT NULL COMMENT '省名称',
  `zm` char(1) NOT NULL COMMENT '首字母',
  `sort` int(10) unsigned NOT NULL COMMENT '排序',
  `pro_zs` tinyint(1) NOT NULL DEFAULT '0',
  `checked` tinyint(1) NOT NULL DEFAULT '1' COMMENT '开通 1：开通  0：未开通',
  PRIMARY KEY (`id`),
  UNIQUE KEY `pro_name` (`pro_name`) USING BTREE,
  KEY `checked` (`checked`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8 COMMENT='省表';

-- ----------------------------
-- Records of sp_province
-- ----------------------------
INSERT INTO `sp_province` VALUES ('1', '湖南省', 'H', '18', '1', '1');
INSERT INTO `sp_province` VALUES ('2', '河北省', 'H', '5', '1', '1');
INSERT INTO `sp_province` VALUES ('3', '湖北省', 'H', '17', '1', '1');
INSERT INTO `sp_province` VALUES ('4', '四川省', 'S', '22', '1', '1');
INSERT INTO `sp_province` VALUES ('23', '江西省', 'J', '21', '1', '1');
INSERT INTO `sp_province` VALUES ('24', '上海市', 'S', '2', '1', '1');
INSERT INTO `sp_province` VALUES ('25', '广东省', 'G', '19', '1', '1');
INSERT INTO `sp_province` VALUES ('50', '天津市', 'T', '3', '1', '1');
INSERT INTO `sp_province` VALUES ('51', '北京市', 'B', '1', '1', '1');
INSERT INTO `sp_province` VALUES ('53', '重庆市', 'C', '4', '1', '1');
INSERT INTO `sp_province` VALUES ('54', '山西省', 'S', '6', '1', '1');
INSERT INTO `sp_province` VALUES ('55', '河南省', 'H', '7', '1', '1');
INSERT INTO `sp_province` VALUES ('56', '辽宁省', 'L', '8', '1', '1');
INSERT INTO `sp_province` VALUES ('57', '吉林省', 'J', '9', '1', '1');
INSERT INTO `sp_province` VALUES ('58', '黑龙江省', 'H', '10', '1', '1');
INSERT INTO `sp_province` VALUES ('59', '内蒙古自治区', 'N', '11', '1', '1');
INSERT INTO `sp_province` VALUES ('60', '江苏省', 'J', '12', '1', '1');
INSERT INTO `sp_province` VALUES ('61', '山东省', 'S', '13', '1', '1');
INSERT INTO `sp_province` VALUES ('62', '安徽省', 'A', '14', '1', '1');
INSERT INTO `sp_province` VALUES ('63', '浙江省', 'Z', '15', '1', '1');
INSERT INTO `sp_province` VALUES ('64', '福建省', 'F', '16', '1', '1');
INSERT INTO `sp_province` VALUES ('65', '广西壮族自治区', 'G', '20', '1', '1');
INSERT INTO `sp_province` VALUES ('66', '海南省', 'H', '23', '1', '1');
INSERT INTO `sp_province` VALUES ('67', '贵州省', 'G', '24', '1', '1');
INSERT INTO `sp_province` VALUES ('68', '云南省', 'Y', '25', '1', '1');
INSERT INTO `sp_province` VALUES ('69', '西藏自治区', 'X', '26', '1', '1');
INSERT INTO `sp_province` VALUES ('70', '陕西省', 'S', '27', '1', '1');
INSERT INTO `sp_province` VALUES ('71', '甘肃省', 'G', '28', '1', '1');
INSERT INTO `sp_province` VALUES ('72', '青海省', 'Q', '29', '1', '1');
INSERT INTO `sp_province` VALUES ('73', '宁夏回族自治区', 'N', '30', '1', '1');
INSERT INTO `sp_province` VALUES ('74', '新疆维吾尔自治区', 'X', '31', '1', '1');
INSERT INTO `sp_province` VALUES ('75', '台湾省', 'T', '34', '0', '1');
INSERT INTO `sp_province` VALUES ('76', '香港特别行政区', 'X', '32', '0', '1');
INSERT INTO `sp_province` VALUES ('77', '澳门特别行政区', 'A', '33', '0', '1');
