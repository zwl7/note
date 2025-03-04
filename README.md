# Headline

> 记录自己与编程的爱恨情仇



```sql
CREATE TABLE `platform_instructor_site` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `company_id` int NOT NULL DEFAULT '0' COMMENT '公司id',
  `province` int NOT NULL DEFAULT '0' COMMENT '省',
  `city` int NOT NULL DEFAULT '0' COMMENT '市',
  `county` int NOT NULL DEFAULT '0' COMMENT '区县',
  `street` int NOT NULL DEFAULT '0' COMMENT '街道',
  `address` varchar(500) NOT NULL DEFAULT '0' COMMENT '详细地址',
  `instructor_site_id` int NOT NULL DEFAULT '0' COMMENT '指导员站点ID',
  `operator` int NOT NULL DEFAULT '0' COMMENT '操作人id',
  `organ_unit_id` int NOT NULL DEFAULT '0' COMMENT '机构单位id',
  `is_del` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除，1=是，0=否',
  `lat` decimal(10,6) NOT NULL DEFAULT '0.000000' COMMENT '维度',
  `lng` decimal(10,6) NOT NULL DEFAULT '0.000000' COMMENT '经度',
  `sport_tag_ids` varchar(255) NOT NULL DEFAULT '0' COMMENT '服务项目ID，可多选',
  `name` varchar(255) NOT NULL DEFAULT '0' COMMENT '站点名称',
  `no` varchar(100) NOT NULL DEFAULT '0' COMMENT '站点编号',
  `service_time` varchar(500) NOT NULL DEFAULT '0' COMMENT '服务时间',
  `itude_address` varchar(255) NOT NULL DEFAULT '0' COMMENT '经纬度地址',
  `detail_address` varchar(255) NOT NULL DEFAULT '0' COMMENT '详细地址',
  `charge_person` varchar(50) NOT NULL DEFAULT '0' COMMENT '负责人',
  `contact_phone` varchar(50) NOT NULL DEFAULT '0' COMMENT '联系电话',
  `des` varchar(2000) NOT NULL DEFAULT '0' COMMENT '详细介绍',
  `images` varchar(1000) NOT NULL DEFAULT '0' COMMENT '图片,多个则逗号拼接',
  `sity_type` tinyint NOT NULL DEFAULT '0' COMMENT '站点类型',
  `love` int NOT NULL DEFAULT '0' COMMENT '收藏或关注数量',
  `instructor_num` int NOT NULL DEFAULT '0' COMMENT '站点指导员数量',
  `instructor_num` int NOT NULL DEFAULT '0' COMMENT '站点活动数量',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1=审核中，2=发布，3=下架',
  `u_time` int NOT NULL DEFAULT '0' COMMENT '修改时间戳',
  `c_time` int NOT NULL DEFAULT '0' COMMENT '添加时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `instructor_site_id` (`instructor_site_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='社体指导员模块-指导员站点';
```



```sql

```

```sql
CREATE TABLE `platform_instructor_relate_site_map` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `company_id` int NOT NULL DEFAULT '0' COMMENT '公司id',
  `instructor_relate_site_map` int NOT NULL DEFAULT '0' COMMENT '记录id',
  `instructor_id` int NOT NULL DEFAULT '0' COMMENT '指导员id',
  `member_id` int NOT NULL DEFAULT '0' COMMENT '用户id',
  `instructor_site_id` int NOT NULL DEFAULT '0' COMMENT '指导员站点ID',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '审核状态 1=审核中，2=审核通过，3=审核驳回，默认1',
  `u_time` int NOT NULL DEFAULT '0' COMMENT '修改时间戳',
  `c_time` int NOT NULL DEFAULT '0' COMMENT '添加时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `instructor_relate_site_map` (`instructor_relate_site_map`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='社体指导员模块-站点和指导员关联表';
```

