# Headline

> 记录自己与编程的爱恨情仇



```sql
CREATE TABLE `platform_liveness_record` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `company_id` int NOT NULL DEFAULT '0' COMMENT '公司id',
  `liveness_record_id` int NOT NULL DEFAULT '0' COMMENT '明细表id',
  `train_activity_id` int NOT NULL DEFAULT '0' COMMENT '培训活动ID',
  `voluntary_activity_id` int NOT NULL DEFAULT '0' COMMENT '志愿活动ID',
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '类型：1=志愿者活动，2=培训活动,默认1',
  `member_id` int NOT NULL DEFAULT '0' COMMENT '会员ID',
  `instructor_id` int NOT NULL DEFAULT '0' COMMENT '社体指导员ID',
  `liveness_rule_name` int NOT NULL DEFAULT '0' COMMENT '活跃度规则名称',
  `liveness_rule_value` int NOT NULL DEFAULT '0' COMMENT '活跃度值',
  `u_time` int NOT NULL DEFAULT '0' COMMENT '修改时间戳',
  `c_time` int NOT NULL DEFAULT '0' COMMENT '添加时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `liveness_record_id` (`liveness_record_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='社体指导员模块-活跃度明细表';
```



```sql
CREATE TABLE `platform_liveness_total` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `company_id` int NOT NULL DEFAULT '0' COMMENT '公司id',
  `liveness_total_id` int NOT NULL DEFAULT '0' COMMENT '活跃度统计表id',
  `instructor_id` int NOT NULL DEFAULT '0' COMMENT '社体指导员ID',
  `voluntary_num` int NOT NULL DEFAULT '0' COMMENT '志愿服务次数',
  `voluntary_activity_duration` int NOT NULL DEFAULT '0' COMMENT '志愿服务时长(小时)',
  `join_train_activity_num` int NOT NULL DEFAULT '0' COMMENT '参与培训次数',
  `train_activity_duration` int NOT NULL DEFAULT '0' COMMENT '参与培训时长(小时)',
  `all_liveness_value` int NOT NULL DEFAULT '0' COMMENT '综合活跃度值',
  `u_time` int NOT NULL DEFAULT '0' COMMENT '修改时间戳',
  `c_time` int NOT NULL DEFAULT '0' COMMENT '添加时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `liveness_total_id` (`liveness_total_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='社体指导员模块-活跃度统计表';
```

```sql
CREATE TABLE `platform_liveness_rule` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `company_id` int NOT NULL DEFAULT '0' COMMENT '公司id',
  `liveness_rule_id` int NOT NULL DEFAULT '0' COMMENT '活跃度规则表id',
  `name` varchar(500) NOT NULL DEFAULT '' COMMENT '名称',
  `value` int NOT NULL DEFAULT '0' COMMENT '服务时长1小时获得的活跃度值',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1=启用，2=禁用',
  `type` tinyint NOT NULL DEFAULT '1' COMMENT '类型：1=组织志愿服务，2=参加培训活动',
  `u_time` int NOT NULL DEFAULT '0' COMMENT '修改时间戳',
  `c_time` int NOT NULL DEFAULT '0' COMMENT '添加时间戳',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `liveness_rule_id` (`liveness_rule_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC COMMENT='社体指导员模块-活跃度规则管理表';
```

