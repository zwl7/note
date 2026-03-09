```sql
CREATE TABLE `ppospro_coupon_page_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coupon_page_config_id` int NOT NULL COMMENT '配置记录ID',
  `paid_coupon_id` int NOT NULL COMMENT '付费卷ID',
  `company_id` int NOT NULL DEFAULT '0' COMMENT '所属公司（集团）',
  `page_style` tinyint NOT NULL DEFAULT '1' COMMENT '页面风格（1：海报页面；2：活动样式-强调适用场馆）',
  `activity_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '活动图（尺寸500*500）',
  `activity_poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '活动海报（宽度500，长度不限）',
  `main_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '主色调配置（色值）',
  `bg_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '背景色配置（色值）',
  `price_text` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '价格文案（如“体验价”）',
  `stadium_show_type` tinyint NOT NULL DEFAULT '2' COMMENT '适用场馆展示配置（1：不展示场馆筛选功能；2：支持按项目筛选场馆）',
  `is_show_stadium_logo` tinyint NOT NULL DEFAULT '1' COMMENT '场馆logo是否展示（1：展示；2：不展示）',
  `is_show_contact` tinyint NOT NULL DEFAULT '1' COMMENT '联系/导航按钮是否展示（1：展示；2：不展示）',
  `is_show_enterprise_info` tinyint NOT NULL DEFAULT '1' COMMENT '企业/商户入驻信息是否展示（1：展示；2：不展示）',
  `is_enable` tinyint(1) NOT NULL DEFAULT '1' COMMENT '配置状态（1：启用；2：禁用）',
  `operator` int NOT NULL DEFAULT '0' COMMENT '操作员',
  `c_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  `u_time` int NOT NULL DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `config_id` (`config_id`) USING BTREE,
  KEY `company_id` (`company_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='付费券页面配置表';


-- 配套的“券适用场馆打标”关联表（因为场馆打标是多记录）
CREATE TABLE `ppospro_coupon_stadium_tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `config_id` int NOT NULL COMMENT '关联ppospro_coupon_page_config的config_id',
  `stadium_id` int NOT NULL COMMENT '场馆ID',
  `stadium_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '场馆名称',
  `tag` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '' COMMENT '标签设置（如新上场馆、热门场馆）',
  `sort_weight` int NOT NULL DEFAULT '0' COMMENT '排序权重（1-10，值越大越靠前）',
  `c_time` int NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `config_id` (`config_id`) USING BTREE,
  KEY `stadium_id` (`stadium_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='付费券适用场馆打标表';
```

