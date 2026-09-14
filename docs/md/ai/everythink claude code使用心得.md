根据你的开发流程，我整理了 ECC 中可以融入每个环节的组件。你的流程完整覆盖了一个功能从零到交付的全过程，ECC 正好提供了每个阶段对应的工具。

------

## 你的开发流程 × ECC 组件映射



```
读原型 → 分析需求 → 设计表结构 → 编写代码 → 写单元测试 → 跑测试 → 提交代码
  │         │           │           │           │          │         │
  ▼         ▼           ▼           ▼           ▼          ▼         ▼
 阶段1     阶段2       阶段3       阶段4       阶段5      阶段6     阶段7
```

------

### 阶段 1：读原型

| 类型  | 名称                          | 作用                                                  |
| ----- | ----------------------------- | ----------------------------------------------------- |
| Skill | **intent-driven-development** | 将模糊的原型/产品需求转化为可验证的验收标准           |
| Skill | **product-lens**              | 在动手前验证"为什么做"、压测产品方向                  |
| Skill | **product-capability**        | 将 PRD/原型翻译为实现就绪的能力计划，暴露约束和不变量 |

------

### 阶段 2：分析需求

| 类型        | 名称                              | 作用                                                       |
| ----------- | --------------------------------- | ---------------------------------------------------------- |
| **Command** | **/plan**                         | 重述需求 → 评估风险 → 输出分步实现计划（动手前等待你确认） |
| **Command** | **/plan-prd**                     | 从原型/想法一键生成精简的 PRD，然后交给 /plan 做规划       |
| **Command** | **/prp-plan**                     | 带代码库分析的全面实现计划，自动提取现有模式               |
| Agent       | **planner**                       | 复杂功能/重构的专家规划，自动分解任务                      |
| Agent       | **architect**                     | 系统设计、可扩展性和技术决策                               |
| Agent       | **code-explorer**                 | 深入分析现有代码库的依赖和执行路径                         |
| Agent       | **code-architect**                | 输出带具体文件、接口、数据流和构建顺序的实现蓝图           |
| Skill       | **architecture-decision-records** | 自动捕获架构决策，记录上下文和备选方案                     |
| Skill       | **contract-first**                | 后端有多个消费者时，防止 API Schema 漂移                   |

------

### 阶段 3：设计数据库表结构

| 类型  | 名称                    | 作用                                                         |
| ----- | ----------------------- | ------------------------------------------------------------ |
| Agent | **database-reviewer**   | PostgreSQL 审查——查询优化、Schema 设计、索引、安全           |
| Skill | **database-migrations** | Schema 变更/数据迁移/回滚/零停机部署（覆盖 PostgreSQL/MySQL + 主流 ORM） |
| Skill | **postgres-patterns**   | PG 查询优化、索引、安全（基于 Supabase 最佳实践）            |
| Skill | **mysql-patterns**      | MySQL/MariaDB 表设计、索引、事务、连接池                     |
| Skill | **prisma-patterns**     | Prisma ORM 的 Schema 设计、事务陷阱、分页                    |
| Skill | **jpa-patterns**        | Java/JPA/Hibernate 实体设计、关系、查询优化                  |

------

### 阶段 4：编写代码

**语言特定的编码规范 + 模式（按你的技术栈选用）：**

| 类型  | 名称                 | 作用                                           |
| ----- | -------------------- | ---------------------------------------------- |
| Skill | **python-patterns**  | Python 惯用模式、PEP 8、类型提示               |
| Skill | **golang-patterns**  | Go 惯用模式、并发、错误处理                    |
| Skill | **rust-patterns**    | Rust 所有权、Traits、错误处理                  |
| Skill | **kotlin-patterns**  | Kotlin 惯用模式、协程、DSL                     |
| Skill | **vue-patterns**     | Vue 3 Composition API、Pinia、Vue Router       |
| Skill | **react-patterns**   | React 18/19 Hooks、Suspense、Server Components |
| Skill | **coding-standards** | 跨语言基线规范（命名、不可变性、代码审查）     |

**通用的编码辅助：**

| 类型        | 名称                       | 作用                                            |
| ----------- | -------------------------- | ----------------------------------------------- |
| Skill       | **api-design**             | REST API 设计——资源命名、状态码、分页、版本控制 |
| Skill       | **backend-patterns**       | Node/Express/Next.js 后端架构                   |
| Skill       | **error-handling**         | TypeScript/Python/Go 统一错误处理模式           |
| Skill       | **hexagonal-architecture** | Ports & Adapters 架构，依赖反转                 |
| **Command** | **/feature-dev**           | 代码库感知的引导式功能开发                      |
| **Command** | **/api-connector-builder** | 按现有模式新增第三方 API 集成                   |

------

### 阶段 5：写单元测试

| 类型  | 名称               | 作用                                             |
| ----- | ------------------ | ------------------------------------------------ |
| Agent | **tdd-guide**      | TDD 专员——强制先写测试再写代码，确保 80%+ 覆盖率 |
| Skill | **tdd-workflow**   | 完整的 TDD 方法论：Red → Green → Refactor        |
| Skill | **test-generator** | 读取 Python/Go/PHP 源码，自动生成单元测试代码    |

**语言特定测试 Skill：**

| Skill              | 适用语言                                      |
| ------------------ | --------------------------------------------- |
| **python-testing** | Python — pytest、fixtures、Mocking、参数化    |
| **golang-testing** | Go — 表驱动测试、子测试、基准测试、Fuzzing    |
| **rust-testing**   | Rust — 单元/集成/异步/属性测试                |
| **kotlin-testing** | Kotlin — Kotest、MockK、协程测试、Kover       |
| **react-testing**  | React — RTL、Vitest/Jest、MSW、Axe 无障碍断言 |
| **cpp-testing**    | C++ — GoogleTest、CTest、Sanitizer            |
| **fsharp-testing** | F# — xUnit、FsUnit、FsCheck 属性测试          |
| **perl-testing**   | Perl — Test2::V0、Test::More、Devel::Cover    |

------

### 阶段 6：跑测试流程

| 类型        | 名称                      | 作用                                                 |
| ----------- | ------------------------- | ---------------------------------------------------- |
| **Command** | **/build-fix**            | 构建/编译/类型错误增量修复                           |
| **Command** | **/test-coverage**        | 分析覆盖率 → 识别缺口 → 生成缺失测试                 |
| **Command** | **/quality-gate**         | 单文件质量门检查并报告修复方案                       |
| Skill       | **e2e-testing**           | Playwright E2E 模式——POM、CI/CD 集成、不稳定测试隔离 |
| Skill       | **browser-qa**            | 部署后的自动可视化回归测试                           |
| Skill       | **canary-watch**          | HTTP 端点/SSE/静态资源/性能回归的冒烟验证            |
| Skill       | **ai-regression-testing** | AI 辅助开发的回归测试策略、无 DB 依赖的沙盒 API 测试 |

**语言特定 TDD 命令（先写测试 → 实现 → 验证覆盖率）：**

| 命令             | 语言   |
| ---------------- | ------ |
| **/go-test**     | Go     |
| **/cpp-test**    | C++    |
| **/kotlin-test** | Kotlin |
| **/react-test**  | React  |
| **/rust-test**   | Rust   |

------

### 阶段 7：提交代码

| 类型        | 名称                      | 作用                                               |
| ----------- | ------------------------- | -------------------------------------------------- |
| **Command** | **/code-review**          | 对本地 diff 或 PR 做代码审查                       |
| **Command** | **/santa-loop**           | **双模型对抗审查**：两个独立 AI 审查员都通过才放行 |
| **Command** | **/pr**                   | 自动分析变更 → 生成 PR 描述 → 推送                 |
| **Command** | **/prp-commit**           | 自然语言描述要提交的内容自动生成 commit            |
| **Command** | **/review-pr**            | 多 Agent 综合 PR 审查                              |
| Agent       | **code-reviewer**         | 代码质量/安全/可维护性审查                         |
| Agent       | **security-reviewer**     | OWASP Top 10、密钥泄露、注入、SSRF 检测            |
| Agent       | **silent-failure-hunter** | 审查被吞没的错误、静默失败、错误回退               |
| Skill       | **git-workflow**          | 分支策略、Commit 规范、Merge vs Rebase             |
| Skill       | **plankton-code-quality** | 每次编辑自动格式化 + Lint + AI 修复（hook 触发）   |
| Skill       | **delivery-gate**         | Stop Hook：质量检查未通过前阻止提交完成            |
| Skill       | **verification-loop**     | 综合验证：构建/测试/覆盖率/安全/差异审查           |

------

## 全流程自动化（一键编排）

如果你想让整个流程自动跑起来，ECC 提供了几个端到端编排方案：

| 命令                  | 覆盖阶段 | 说明                                                         |
| --------------------- | -------- | ------------------------------------------------------------ |
| **/orch-add-feature** | 2→7      | **新增功能全流程**：研究 → 规划 → TDD → 审查 → 门控提交      |
| **/orch-fix-defect**  | 2→7      | **修 Bug 全流程**：复现为失败测试 → 修复 → 审查 → 门控提交   |
| **/orch-build-mvp**   | 1→7      | **从设计文档到 MVP**：摄入 → 切片 → 搭建 → TDD → 审查 → 提交 |
| **/multi-workflow**   | 2→7      | 多模型完整研发流程：研究/规划/执行/优化/审查                 |

每个 `/orch-*` 命令都会在经过**两个人机确认门**（plan 确认 + review 确认）后才推进到下一步，不会自己一路跑到提交。

------

## 推荐的最小集成方案

如果你不想一次性全接入，按优先级逐步融入：



```
第一优先级（立即可用，每个阶段都能直接受益）：
  /plan          → 需求分析后自动生成实现计划
  tdd-guide      → 写代码时强制 TDD
  /code-review   → 提交前审查
  /pr            → 自动生成 PR

第二优先级（质量提升明显）：
  /santa-loop    → 双模型对抗审查，减少 AI 写 bug
  database-reviewer → Schema 设计时自动审查
  /test-coverage → 提交前确认覆盖率
  test-generator → 自动生成单元测试节省时间

第三优先级（全流程自动化）：
  /orch-add-feature → 新功能一键编排全流程
  delivery-gate     → 质量不达标自动阻止提交
  plankton-code-quality → 保存即自动格式化+Lint
```