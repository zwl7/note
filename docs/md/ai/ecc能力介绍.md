# ECC Skills 完整介绍

> 本文档整理了 ECC 项目中全部 **281 个 Skills（技能）** 的介绍信息，按功能领域分类。
> 数据来源：`skills/*/SKILL.md` 的 YAML frontmatter 中的 `description` 字段。

---

## 目录

| 分类 | 数量 |
|------|------|
| [AI / Agent 工程](#1-ai--agent-工程) | 22 |
| [前端与 UI 设计](#2-前端与-ui-设计) | 18 |
| [语言特定模式](#3-语言特定模式) | 20 |
| [测试与 TDD](#4-测试与-tdd) | 16 |
| [安全与合规](#5-安全与合规) | 14 |
| [后端与数据库](#6-后端与数据库) | 14 |
| [DevOps 与部署](#7-devops-与部署) | 10 |
| [架构与设计模式](#8-架构与设计模式) | 12 |
| [内容与营销](#9-内容与营销) | 12 |
| [ECC 平台运营](#10-ecc-平台运营) | 22 |
| [工作流与编排](#11-工作流与编排) | 16 |
| [研究与分析](#12-研究与分析) | 12 |
| [网络工程](#13-网络工程) | 10 |
| [科学计算与数据](#14-科学计算与数据) | 10 |
| [医疗健康](#15-医疗健康) | 5 |
| [家庭实验室](#16-家庭实验室) | 5 |
| [视频与媒体](#17-视频与媒体) | 8 |
| [金融与预测市场](#18-金融与预测市场) | 7 |
| [其他专业领域](#19-其他专业领域) | 17 |
| [通用与模板](#20-通用与模板) | 11 |
| **总计** | **281** |

---

## 1. AI / Agent 工程

| Skill | 介绍 |
|-------|------|
| **agent-architecture-audit** | Agent 和 LLM 应用的全栈诊断。审计 12 层 agent 堆栈，检测包装器回归、内存污染、工具纪律失败、隐藏修复循环和渲染损坏。生成按严重程度排序的发现和代码优先修复方案。适用于构建 agent 应用、自主循环或任何 LLM 驱动功能的开发者。 |
| **agent-eval** | 编程 Agent（Claude Code、Aider、Codex 等）在自定义任务上的一对一对比，涵盖通过率、成本、时间和一致性指标。 |
| **agent-harness-construction** | 设计和优化 AI Agent 的动作空间、工具定义和观察格式，以提高任务完成率。 |
| **agent-introspection-debugging** | AI Agent 失败场景的结构化自我调试工作流，使用捕获、诊断、受控恢复和内省报告。 |
| **agent-payment-x402** | 为 AI Agent 添加 x402 支付执行能力，支持按任务预算、消费控制和非托管钱包。支持 Base（agentwallet-sdk）和 X Layer（OKX Payments / OKX Agent Payments Protocol）。 |
| **agent-self-evaluation** | 在完成任何非平凡任务后使用。Agent 在 5 个轴上自我评分——准确性、完整性、清晰度、可操作性、简洁性——每项附具体证据。生成 1-5 分的结构化评分卡和改进建议。 |
| **agent-sort** | 通过并行仓库感知审查，为特定仓库构建基于证据的 ECC 安装计划——将 skill、command、rule、hook 和额外组件分类到 DAILY 和 LIBRARY 两个桶中。适用于需要精简 ECC 而非加载完整包时。 |
| **agentic-engineering** | 以 Agentic 工程师身份操作，使用评估优先执行、任务分解和成本感知的模型路由。 |
| **agentic-os** | 在 Claude Code 上构建持久的多 Agent 操作系统。涵盖内核架构、专业 Agent、斜杠命令、基于文件的记忆、定时自动化和无外部数据库的状态管理。 |
| **ai-first-engineering** | 面向 AI Agent 生成大量实现输出的团队的工程运营模型。 |
| **ai-regression-testing** | AI 辅助开发的回归测试策略。沙盒模式 API 测试（无需数据库依赖）、自动化 Bug 检查工作流，以及捕获同一模型同时编写和审查代码时的 AI 盲点的模式。 |
| **autonomous-agent-harness** | 将 Claude Code 转变为完全自主的 Agent 系统，支持持久记忆、定时操作、计算机使用和任务队列。替代独立 Agent 框架（Hermes、AutoGPT），利用 Claude Code 原生的 crons、dispatch、MCP 工具和记忆。 |
| **autonomous-loops** | Claude Code 自主循环的模式和架构——从简单的顺序管道到 RFC 驱动的多 Agent DAG 系统。 |
| **continuous-agent-loop** | 带有质量门、评估和恢复控制的持续自主 Agent 循环模式。 |
| **continuous-learning** | **[已弃用 - 请使用 continuous-learning-v2]** 旧版 v1 stop-hook 技能提取器。v2 是基于本能、项目范围、hook 可靠学习的严格超集。请勿调用 v1；将持续学习、会话学习和模式提取请求路由到 continuous-learning-v2。 |
| **continuous-learning-v2** | 基于本能的学习系统，通过 hooks 观察会话，创建带置信度评分的原子本能，并将其进化为 skill/command/agent。v2.1 添加了项目范围本能以防止跨项目污染。 |
| **dynamic-workflow-mode** | 为 Claude 动态工作流模式和其他自适应 Agent harness 设计任务级 harness、评估门和可重用技能提取。 |
| **enterprise-agent-ops** | 操作长期运行的 Agent 工作负载，具备可观察性、安全边界和生命周期管理。 |
| **eval-harness** | 实现评估驱动开发（EDD）原则的 Claude Code 会话正式评估框架。 |
| **claude-devfleet** | 通过 Claude DevFleet 编排多 Agent 编码任务——规划项目、在隔离 worktree 中调度并行 Agent、监控进度和阅读结构化报告。 |
| **mle-workflow** | 生产级机器学习工程工作流——数据契约、可重现训练、模型评估、部署、监控和回滚。用于构建、审查或强化超越一次性 Notebook 的 ML 系统。 |
| **ml-adoption-playbook** | AI Agent 和软件工程师向现有非 ML 代码库添加机器学习算法的端到端方法论。涵盖问题框架、数据就绪、架构解耦和基线模型集成。 |

---

## 2. 前端与 UI 设计

| Skill | 介绍 |
|-------|------|
| **accessibility** | 使用 WCAG 2.2 Level AA 标准设计、实现和审计包容性数字产品。为 Web 生成语义 ARIA，为 Web 和 Native 平台实现无障碍特征。 |
| **angular-developer** | 生成 Angular 代码并提供架构指导。涵盖信号（signal、linkedSignal、resource）、表单、依赖注入、路由、SSR、无障碍（ARIA）、动画、样式（组件样式、Tailwind CSS）、测试和 CLI 工具。 |
| **compose-multiplatform-patterns** | KMP 项目的 Compose Multiplatform 和 Jetpack Compose 模式——状态管理、导航、主题、性能和平台特定 UI。 |
| **dart-flutter-patterns** | 生产就绪的 Dart 和 Flutter 模式，涵盖空安全、不可变状态、异步组合、Widget 架构、流行状态管理框架（BLoC、Riverpod、Provider）、GoRouter 导航、Dio 网络、Freezed 代码生成和 Clean Architecture。 |
| **design-system** | 生成或审计设计系统，检查视觉一致性，审查涉及样式的 PR。 |
| **frontend-a11y** | React 和 Next.js 的无障碍模式——语义 HTML、ARIA 属性、表单标签、键盘导航、焦点管理和屏幕阅读器支持。构建任何交互式 UI 组件或表单时使用。 |
| **frontend-design-direction** | 为生产级 UI 工作设置 ECC 特定的前端设计方向。用于构建需要更强产品特定设计判断的网站、仪表盘、应用、组件、着陆页、可视化工具等。 |
| **frontend-patterns** | React、Next.js、状态管理、性能优化和 UI 最佳实践的前端开发模式。 |
| **frontend-slides** | 从零创建动画丰富的精美 HTML 演示文稿，或从 PowerPoint 转换。帮助非设计师通过视觉探索而非抽象选择来发现审美方向。 |
| **liquid-glass-design** | iOS 26 Liquid Glass 设计系统——动态玻璃材质，带模糊、反射和交互式变形效果，适用于 SwiftUI、UIKit 和 WidgetKit。 |
| **make-interfaces-feel-better** | 应用具体的工程设计细节让界面感觉精致。用于审查或改进 UI 间距、排版、边框、阴影、动效、热区、图标、文本换行和交互状态。 |
| **motion-advanced** | React / Next.js 的高级动效模式——拖放、手势、文字动画、SVG 路径绘制、自定义 Hooks、命令式序列（useAnimate）、加载器和完整的 API 决策树。依赖 motion-foundations。 |
| **motion-foundations** | React / Next.js 的 Motion 令牌、弹性预设、性能规则、设备适配、无障碍执行和 SSR 安全。使用 motion/react 的基础层——所有其他 motion 技能依赖此技能。 |
| **motion-patterns** | React / Next.js 的生产就绪动画模式——按钮、模态、Toast、交错、页面过渡、退出动画、滚动和布局——基于 motion-foundations 令牌和弹性。 |
| **motion-ui** | React/Next.js 的生产就绪 UI 动效系统。用于实现动画、过渡或动效模式。 |
| **react-patterns** | React 18/19 模式，包括 Hooks 纪律、服务端/客户端组件边界、Suspense + Error Boundaries、表单动作、数据获取、状态管理决策树和可访问性优先组合。 |
| **react-native-patterns** | React Native 和 Expo 应用模式——Expo Router 导航、状态分离（server/client/route/form）、TanStack Query + Zod 数据获取、高性能列表、NativeWind/StyleSheet 样式、Native API 和安全存储。 |
| **vue-patterns** | Vue.js 3 Composition API 模式、组件架构、响应式最佳实践、Pinia 状态管理、Vue Router 导航和 Nuxt SSR 模式。激活于 Vue、Nuxt、Vite 或 Pinia 项目。 |

---

## 3. 语言特定模式

| Skill | 介绍 |
|-------|------|
| **android-clean-architecture** | Android 和 Kotlin Multiplatform 项目的 Clean Architecture 模式——模块结构、依赖规则、UseCase、Repository 和数据层模式。 |
| **bun-runtime** | Bun 作为运行时、包管理器、打包器和测试运行器。何时选择 Bun vs Node，迁移说明和 Vercel 支持。 |
| **coding-standards** | 跨项目基线编码规范——命名、可读性、不可变性和代码质量审查。对于框架特定模式，请使用详细的前端或后端技能。 |
| **cpp-coding-standards** | 基于 C++ Core Guidelines（isocpp.github.io）的 C++ 编码标准。用于编写、审查或重构 C++ 代码以执行现代、安全、惯用的实践。 |
| **dotnet-patterns** | 惯用的 C# 和 .NET 模式、约定、依赖注入、async/await 和构建健壮、可维护 .NET 应用的最佳实践。 |
| **golang-patterns** | 惯用的 Go 模式、最佳实践和约定，用于构建健壮、高效、可维护的 Go 应用。 |
| **java-coding-standards** | Spring Boot 和 Quarkus 服务的 Java 编码标准——命名、不可变性、Optional 使用、Stream、异常、泛型、CDI、响应式模式和项目布局。自动应用框架特定约定。 |
| **kotlin-coroutines-flows** | Android 和 KMP 的 Kotlin 协程和 Flow 模式——结构化并发、Flow 运算符、StateFlow、错误处理和测试。 |
| **kotlin-patterns** | 惯用的 Kotlin 模式、最佳实践和约定，用于构建健壮、高效、可维护的 Kotlin 应用，含协程、空安全和 DSL 构建器。 |
| **nestjs-patterns** | NestJS 架构模式——模块、控制器、提供者、DTO 验证、守卫、拦截器、配置和生产级 TypeScript 后端。 |
| **nextjs-turbopack** | Next.js 16+ 和 Turbopack——增量打包、FS 缓存、开发速度和何时使用 Turbopack vs webpack。 |
| **nuxt4-patterns** | Nuxt 4 应用模式——水合安全、性能、路由规则、懒加载和 SSR 安全数据获取（useFetch 和 useAsyncData）。 |
| **perl-patterns** | 现代 Perl 5.36+ 的惯用模式、最佳实践和约定，用于构建健壮、可维护的 Perl 应用。 |
| **python-patterns** | Python 惯用模式、PEP 8 标准、类型提示和构建健壮、高效、可维护 Python 应用的最佳实践。 |
| **pytorch-patterns** | PyTorch 深度学习模式和构建健壮、高效、可重现训练管道、模型架构和数据加载的最佳实践。 |
| **rust-patterns** | 惯用的 Rust 模式——所有权、错误处理、Traits、并发和构建安全、高性能应用的最佳实践。 |
| **swiftui-patterns** | SwiftUI 架构模式、状态管理（@Observable）、视图组合、导航、性能优化和现代 iOS/macOS UI 最佳实践。 |
| **tinystruct-patterns** | tinystruct Java 框架的专家指导——Application 类、@Action 映射路由、单元测试、ActionRegistry、HTTP/CLI 双模、内建 HTTP 服务器、事件系统、Builder/Builders JSON、AbstractData 数据库持久化、POJO 生成、SSE、文件上传和 HTTP 网络。 |
| **vite-patterns** | Vite 构建工具模式——配置、插件、HMR、环境变量、代理设置、SSR、库模式、依赖预打包和构建优化。激活于 vite.config.ts、Vite 插件或基于 Vite 的项目。 |
| **kotlin-exposed-patterns** | JetBrains Exposed ORM 模式——DSL 查询、DAO 模式、事务、HikariCP 连接池、Flyway 迁移和 Repository 模式。 |
| **kotlin-ktor-patterns** | Ktor 服务器模式——路由 DSL、插件、认证、Koin DI、kotlinx.serialization、WebSocket 和 testApplication 测试。 |

---

## 4. 测试与 TDD

| Skill | 介绍 |
|-------|------|
| **browser-qa** | 在部署功能后使用浏览器自动化进行自动可视化测试和 UI 交互验证。 |
| **canary-watch** | 发布后监控和验证部署的 URL——检查 HTTP 端点、SSE 流、静态资源、控制台错误和部署/合并/依赖升级后的性能回归。冒烟/金丝雀/部署后验证。 |
| **cpp-testing** | 仅在编写/更新/修复 C++ 测试、配置 GoogleTest/CTest、诊断失败或不稳定测试、或添加覆盖率/隔离器时使用。 |
| **csharp-testing** | C# 和 .NET 测试模式——xUnit、FluentAssertions、Mocking、集成测试和测试组织最佳实践。 |
| **e2e-testing** | Playwright E2E 测试模式——Page Object Model、配置、CI/CD 集成、工件管理和不稳定测试策略。 |
| **fsharp-testing** | F# 测试模式——xUnit、FsUnit、Unquote、FsCheck 属性测试、集成测试和测试组织最佳实践。 |
| **golang-testing** | Go 测试模式——表驱动测试、子测试、基准测试、Fuzzing 和测试覆盖率。遵循 TDD 方法论，采用惯用的 Go 实践。 |
| **kotlin-testing** | Kotlin 测试模式——Kotest、MockK、协程测试、属性测试和 Kover 覆盖率。遵循 TDD 方法论。 |
| **perl-testing** | Perl 测试模式——Test2::V0、Test::More、prove 运行器、Mocking、Devel::Cover 覆盖率和 TDD 方法论。 |
| **python-testing** | Python 测试策略——pytest、TDD 方法论、fixtures、Mocking、参数化和覆盖率要求。 |
| **react-testing** | React 组件测试——React Testing Library、Vitest/Jest、MSW 网络 Mock、可访问性断言（axe）和组件测试 vs Playwright/Cypress E2E 的决策边界。 |
| **rust-testing** | Rust 测试模式——单元测试、集成测试、异步测试、属性测试、Mocking 和覆盖率。遵循 TDD 方法论。 |
| **tdd-workflow** | 在编写新功能、修复 Bug 或重构代码时使用的 TDD 工作流。强制 80%+ 覆盖率，包括单元测试、集成测试和 E2E 测试。 |
| **windows-desktop-e2e** | Windows 原生桌面应用的 E2E 测试（WPF、WinForms、Win32/MFC、Qt）——使用 pywinauto 和 Windows UI Automation。 |
| **flutter-dart-code-review** | 库无关的 Flutter/Dart 代码审查清单——Widget 最佳实践、状态管理模式（BLoC、Riverpod、Provider、GetX、MobX、Signals）、Dart 惯用模式、性能、无障碍、安全和 Clean Architecture。 |
| **react-performance** | React 和 Next.js 性能优化模式，改编自 Vercel Engineering 的 React Best Practices。将 70+ 规则组织到 8 个优先级类别——瀑布流、包大小、服务端渲染、客户端数据获取、重渲染、渲染、JS 微性能、高级。 |

---

## 5. 安全与合规

| Skill | 介绍 |
|-------|------|
| **security-review** | 添加认证、处理用户输入、使用密钥、创建 API 端点或实现支付/敏感功能时使用。提供全面的安全清单和模式。 |
| **security-scan** | 使用 AgentShield 扫描 Claude Code 配置（.claude/ 目录）的安全漏洞、错误配置和注入风险。检查 CLAUDE.md、settings.json、MCP 服务器、hooks 和 agent 定义。 |
| **security-bounty-hunter** | 寻找仓库中可利用的、值得赏金的安全问题。关注可远程访问的漏洞，产生真正有价值的报告，而非嘈杂的本地发现。 |
| **defi-amm-security** | Solidity AMM 合约、流动性池和交换流的安全清单。涵盖重入、CEI 排序、捐赠/通胀攻击、预言机操纵、滑点、管理员控制和整数运算。 |
| **evm-token-decimals** | 防止跨 EVM 链的静默小数不匹配 Bug。涵盖运行时小数查找、链感知缓存、桥接代币精度偏移和 Bot/仪表盘/DeFi 工具的安全归一化。 |
| **llm-trading-agent-security** | 具有钱包或交易权限的自主交易 Agent 的安全模式。涵盖提示注入、支出限制、发送前模拟、断路器、MEV 保护和密钥处理。 |
| **django-security** | Django 安全最佳实践——认证、授权、CSRF 保护、SQL 注入防护、XSS 防护和安全部署配置。 |
| **laravel-security** | Laravel 安全最佳实践——认证、授权、Eloquent 安全、CSRF、XSS 防护、API 安全和安全部署配置。 |
| **perl-security** | 全面的 Perl 安全性——污点模式、输入验证、安全进程执行、DBI 参数化查询、Web 安全（XSS/SQLi/CSRF）和 perlcritic 安全策略。 |
| **quarkus-security** | Quarkus 安全最佳实践——认证、授权、JWT/OIDC、RBAC、输入验证、CSRF、密钥管理和依赖安全。 |
| **springboot-security** | Spring Security 最佳实践——认证/授权、验证、CSRF、密钥、HTTP 头、速率限制和 Java Spring Boot 服务的依赖安全。 |
| **safety-guard** | 在生产系统上工作或自主运行 Agent 时防止破坏性操作。 |
| **hipaa-compliance** | HIPAA 特定的医疗隐私和安全工作入口。用于明确围绕 HIPAA、PHI 处理、覆盖实体、BAA、违规态势或美国医疗合规要求的任务。 |
| **prediction-market-risk-review** | 审查预测市场、篮子、预言机和交易 Agent 工作流的合规性、安全性、数据质量、隐私和执行风险。在任何工作流处理场所认证、用户组合数据、API 密钥或交易规划前使用。 |

---

## 6. 后端与数据库

| Skill | 介绍 |
|-------|------|
| **api-design** | REST API 设计模式——资源命名、状态码、分页、过滤、错误响应、版本控制和生产 API 的速率限制。 |
| **api-connector-builder** | 通过精确匹配目标仓库现有的集成模式来构建新的 API 连接器或提供者。用于添加一个集成而不发明第二套架构。 |
| **backend-patterns** | Node.js、Express 和 Next.js API 路由的后端架构模式、API 设计、数据库优化和服务端最佳实践。 |
| **database-migrations** | 数据库迁移最佳实践——模式变更、数据迁移、回滚和零停机部署，涵盖 PostgreSQL、MySQL 和常见 ORM（Prisma、Drizzle、Kysely、Django、TypeORM、golang-migrate）。 |
| **postgres-patterns** | PostgreSQL 数据库模式——查询优化、模式设计、索引和安全。基于 Supabase 最佳实践。 |
| **prisma-patterns** | TypeScript 后端的 Prisma ORM 模式——模式设计、查询优化、事务、分页和关键陷阱（如 updateMany 返回 count 而非 records、$transaction 超时、migrate dev 重置数据库、@updatedAt 跳过批量写入、Serverless 连接耗尽）。 |
| **mysql-patterns** | MySQL 和 MariaDB 模式、查询、索引、事务、复制和连接池的生产后端模式。 |
| **redis-patterns** | Redis 数据结构模式、缓存策略、分布式锁、速率限制、发布/订阅和生产应用连接管理。 |
| **django-patterns** | Django 架构模式、DRF REST API 设计、ORM 最佳实践、缓存、信号、中间件和生产级 Django 应用。 |
| **django-celery** | Django + Celery 异步任务模式——配置、任务设计、Beat 调度、重试、Canvas 工作流、监控和测试。用于向 Django 应用添加后台作业、定时任务或异步处理。 |
| **laravel-patterns** | Laravel 架构模式——路由/控制器、Eloquent ORM、服务层、队列、事件、缓存和生产应用 API 资源。 |
| **springboot-patterns** | Spring Boot 架构模式——REST API 设计、分层服务、数据访问、缓存、异步处理和日志。用于 Java Spring Boot 后端工作。 |
| **quarkus-patterns** | Quarkus 3.x LTS 架构模式——Camel 消息集成、RESTful API 设计、CDI 服务、Panache 数据访问和异步处理。用于事件驱动架构的 Java Quarkus 后端工作。 |
| **fastapi-patterns** | FastAPI 最佳实践——项目结构、Pydantic v2 模式、依赖注入、异步处理器、认证、授权、事务服务层和 httpx + pytest 测试。 |

---

## 7. DevOps 与部署

| Skill | 介绍 |
|-------|------|
| **deployment-patterns** | 部署工作流、CI/CD 管道模式、Docker 容器化、健康检查、回滚策略和 Web 应用的生产就绪清单。 |
| **docker-patterns** | Docker 和 Docker Compose 模式——本地开发、容器安全、网络、卷策略和多服务编排。 |
| **flox-environments** | 使用 Flox 创建可重现的跨平台（macOS/Linux）开发环境——声明式 Nix 基础的环境管理器。用于设置任何语言的项目工具链、安装系统级依赖、固定团队精确版本、运行本地服务或解决"在我机器上能跑"的问题。 |
| **git-workflow** | Git 工作流模式——分支策略、提交约定、合并 vs 变基、冲突解决和各规模团队协作开发最佳实践。 |
| **github-ops** | GitHub 仓库操作、自动化和管理——Issue 分类、PR 管理、CI/CD 操作、发布管理、安全监控。使用 gh CLI 进行超越简单 git 命令的操作。 |
| **kubernetes-patterns** | Kubernetes 工作负载模式、资源管理、RBAC、探针、自动缩放、ConfigMap/Secret 处理和用于生产级部署的 kubectl 调试。 |
| **production-audit** | 基于本地证据的生产就绪审计——适用于已发布应用、启动前审查、合并后检查和"生产中会出什么问题"的分析，不将仓库数据发送到外部审计服务。 |
| **latency-critical-systems** | 低延迟敏感系统——实时仪表盘、市场数据、流 Agent、执行网关、队列、缓存或 HFT 类基础设施，其中新鲜度和 p95 延迟至关重要。 |
| **plankton-code-quality** | 使用 Plankton 的编写时代码质量执行——每次文件编辑时通过 hooks 自动格式化、Linting 和 Claude 驱动修复。 |
| **content-hash-cache-pattern** | 使用 SHA-256 内容哈希缓存昂贵的文件处理结果——路径无关、自动失效、服务层分离。 |

---

## 8. 架构与设计模式

| Skill | 介绍 |
|-------|------|
| **architecture-decision-records** | 将 Claude Code 会话中做出的架构决策捕获为结构化的 ADR。自动检测决策时刻，记录上下文、考虑的替代方案和理由。维护 ADR 日志，让未来开发者理解代码库为何如此设计。 |
| **hexagonal-architecture** | 设计、实现和重构 Ports & Adapters 系统，具有清晰的领域边界、依赖反转和可测试的用例编排，覆盖 TypeScript、Java、Kotlin 和 Go 服务。 |
| **contract-first** | 当多个消费者和提供者必须演进 API 或事件模式而没有字段漂移、集成意外或单方面重新定义接口时使用。 |
| **error-handling** | 跨 TypeScript、Python 和 Go 的健壮错误处理模式。涵盖类型化错误、错误边界、重试、断路器和面向用户的错误消息。 |
| **code-tour** | 创建 CodeTour `.tour` 文件——面向角色的、带真实文件和行锚点的逐步走查。用于接入导览、架构走查、PR 走查、RCA 走查和结构化"解释这个如何工作"的请求。 |
| **ralphinho-rfc-pipeline** | RFC 驱动的多 Agent DAG 执行模式，具有质量门、合并队列和工作单元编排。 |
| **recsys-pipeline-architect** | 使用六阶段 Source→Hydrator→Filter→Scorer→Selector→SideEffect 框架设计可组合的推荐、排名和信息流管道（由 xAI 开源 For You 算法推广）。适用于社交信息流、内容 CMS、RAG 重排、任务优先级、通知分类、搜索重排、广告排名。 |
| **data-throughput-accelerator** | 大数据摄入、回填、导出、ETL、仓库加载、清单追赶或表同步需要大幅加速同时保持数据正确性时使用。 |
| **iterative-retrieval** | 逐步细化上下文检索以解决子 Agent 上下文问题的模式。 |
| **nodejs-keccak256** | 防止 JavaScript 和 TypeScript 中的以太坊哈希 Bug。Node 的 sha3-256 是 NIST SHA3，不是 Ethereum Keccak-256，会静默破坏选择器、签名、存储槽和地址派生。 |
| **regex-vs-llm-structured-text** | 在解析结构化文本时选择 Regex 还是 LLM 的决策框架——从 Regex 开始，仅在低置信度边缘情况添加 LLM。 |
| **jpa-patterns** | JPA/Hibernate 模式——实体设计、关系、查询优化、事务、审计、索引、分页和 Spring Boot 中的连接池。 |

---

## 9. 内容与营销

| Skill | 介绍 |
|-------|------|
| **article-writing** | 使用提供的示例或品牌指导的声音风格编写文章、指南、博客、教程、Newsletter 和长文内容。用于需要声音一致性、结构和可信度的长篇内容。 |
| **brand-voice** | 从真实帖子、文章、发布说明、文档或网站文案构建源派生的写作风格画像，然后在内容、外联和社交工作流中重用它。用于需要声音一致性且没有通用 AI 写作腔调时。 |
| **content-engine** | 创建面向 X、LinkedIn、TikTok、YouTube、Newsletter 的平台原生内容系统和重新用途的多平台营销活动。用于社交帖子、线程、脚本、内容日历或一个源资产跨平台干净适配。 |
| **crosspost** | 跨平台内容分发——X、LinkedIn、Threads、Bluesky。使用 content-engine 模式逐平台适配内容。各平台内容各不相同。 |
| **investor-materials** | 创建和更新 Pitch Deck、一页纸、投资备忘录、加速器申请、财务模型和融资材料。用于需要跨多个融资资产保持内部一致性的投资者文档。 |
| **investor-outreach** | 为融资起草冷邮件、Warm Intro 短句、跟进邮件、更新邮件和投资者沟通。用于面向天使、VC、战略投资者或加速器的外联。 |
| **lead-intelligence** | AI 原生的潜在客户情报和外联管道。替代 Apollo、Clay 和 ZoomInfo——通过 Agent 驱动信号评分、双向排名、Warm Path 发现、源派生声音建模和渠道特定外联（邮件、LinkedIn、X）。 |
| **market-research** | 进行带有源归属和决策导向摘要的市场研究、竞争分析、投资者尽职调查和行业情报。用于市场规模、竞争对手比较、基金研究、技术扫描或为商业决策提供信息的研究。 |
| **marketing-campaign** | 端到端营销活动规划和执行——受众研究、定位、活动角度定义、着陆页文案、邮件序列、社交帖子、广告文案、短视频脚本和内容日历。多平台产品发布的编排层。 |
| **connections-optimizer** | 重组用户的 X 和 LinkedIn 网络——审查优先的修剪、添加/关注建议和用真实声音起草的渠道特定温暖外联。用于清理关注列表、向当前优先事项扩展或围绕更高信号关系重新平衡社交图。 |
| **social-publisher** | 通过 SocialClaw 在 13 个平台上进行 Agent 驱动的社交媒体帖子调度和发布。用于发布到 X、LinkedIn、Instagram、Facebook Pages、TikTok、Discord、Telegram、YouTube、Reddit、WordPress 或 Pinterest——或管理活动、上传媒体或监控发布状态。 |
| **seo** | 审计、规划和实现 SEO 改进——技术 SEO、页面优化、结构化数据、Core Web Vitals 和内容/关键词策略。用于网站审计、Meta 标签审查、Schema 标记、Sitemap/Robots 问题和 SEO 修复计划。 |

---

## 10. ECC 平台运营

| Skill | 介绍 |
|-------|------|
| **ecc-guide** | 引导用户了解 ECC 当前的 Agent、技能、命令、Hooks、规则、安装配置文件和项目接入流程——在回答前阅读实时仓库表面。 |
| **configure-ecc** | ECC 交互式安装器——引导用户选择和安装技能和规则到用户级或项目级目录，验证路径，并可选优化已安装文件。 |
| **config-gc** | Claude Code 配置的垃圾回收。定期扫描 ~/.claude（技能、记忆、Hooks、权限、MCP 服务器、缓存）查找冗余、陈旧、孤立或低价值项目，然后引导用户逐个确认删除。 |
| **workspace-surface-audit** | 审计活动仓库、MCP 服务器、插件、连接器、环境表面和 harness 设置，然后推荐最高价值的 ECC 原生技能、Hooks、Agent 和操作员工作流。 |
| **cost-tracking** | 从 ECC 成本跟踪器指标日志跟踪和报告 Claude Code 的 Token 使用、支出和预算。用于询问成本、支出、使用、Token、预算或按模型/会话/日期的成本分解时。 |
| **cost-aware-llm-pipeline** | LLM API 使用的成本优化模式——按任务复杂性路由模型、预算跟踪、重试逻辑和提示缓存。 |
| **context-budget** | 审计 Claude Code 上下文窗口在 Agent、技能、MCP 服务器和规则上的消耗。识别臃肿、冗余组件，并生成优先级排序的 Token 节省建议。 |
| **ecc-recipes** | 将描述的工作流映射到正确的 ECC 命令组，附运行顺序和停止条件，并浏览所有命令组配方族。在命令目录之上添加族分组+运行顺序+何时停止层。 |
| **ecc-tools-cost-audit** | 基于证据的 ECC 工具消耗和计费审计工作流。用于调查 ECC 工具仓库中的失控 PR 创建、配额绕过、Premium 模型泄漏、重复作业或 GitHub App 成本飙升。 |
| **rules-distill** | 扫描技能以提取跨领域原则，并将其蒸馏为规则——追加、修订或创建新的规则文件。 |
| **skill-comply** | 可视化技能、规则和 Agent 定义是否实际被遵循——在 3 个提示严格级别自动生成场景，运行 Agent，分类行为序列，报告合规率并附带完整工具调用时间线。 |
| **skill-scout** | 在创建新技能前搜索现有的本地、市场、GitHub 和 Web 技能源。用于创建、构建、Fork 或查找工作流技能时。 |
| **skill-stocktake** | 审计 Claude 技能和命令质量。支持 Quick Scan（仅已更改技能）和 Full Stocktake 模式，使用顺序子 Agent 批量评估。 |
| **hermes-imports** | 将本地 Hermes 操作员工作流转换为消毒后的 ECC 技能和发布包工件。用于准备 Hermes 工作流公开 ECC 复用时，不泄漏私有工作空间状态、凭证或本地路径。 |
| **delivery-gate** | Stop Hook 阻止 Claude 在质量检查通过前完成。检测合理化模式（表面文本启发式）、陈旧学习日志（文件系统 mtime）和低磁盘空间。通过机械执行学习捕获习惯来补充自我审计。 |
| **gateguard** | 事实强制门，阻止 Edit/Write/Bash（包括 MultiEdit），在允许操作前要求具体调查（导入器、数据模式、用户指令）。可比无门 Agent 提升输出质量 +2.25 分。 |
| **inherit-legacy-style** | 遗留项目风格继承技能。将 AI 编码 Agent 接入手写遗留项目时使用，防止"风格漂移"（模型将其预训练的主流惯用模式强加于项目）。语言和框架无关——仅对齐元架构，不对齐语法。 |
| **strategic-compact** | 建议在逻辑间隔手动压缩上下文，以在任务阶段间保持上下文连贯，而非任意自动压缩。 |
| **parallel-execution-optimizer** | 用于通过并行工作、并发 Agent、批量工具调用、隔离 worktree 或许多独立验证通道让任务大幅加速同时保持正确性。 |
| **unified-memory** | 通过本地 ECC Memory Vault 在 Claude、Codex、Hermes、Cursor、OpenCode 等 Agent 间共享持久、可检查的上下文和交接。用于 Agent 必须保存工作状态、传输上下文、恢复其他 Agent 的任务或搜索共享项目知识时。 |
| **knowledge-ops** | 跨多个存储层（本地文件、MCP 记忆、向量存储、Git 仓库）的知识库管理、摄入、同步和检索。用于保存、组织、同步、去重或跨知识系统搜索。 |

---

## 11. 工作流与编排

| Skill | 介绍 |
|-------|------|
| **orch-add-feature** | 编排端到端构建全新功能——研究、规划、TDD 实现、审查和门控提交——将每个阶段委托给匹配的 ECC Agent。用于添加尚不存在的功能。 |
| **orch-build-mvp** | 编排从设计或规范文档启动一个可工作的 MVP——摄入文档、规划薄垂直切片、搭建第一个端到端切片，然后 TDD 实现、审查和门控提交。用于将 SDD/PRD 转化为可运行的起点。 |
| **orch-change-feature** | 编排将现有工作功能改变为新的期望行为——更新测试到新规范、更改实现以匹配、审查和门控提交。用于功能未损坏但行为需要不同时。 |
| **orch-fix-defect** | 编排修复 Bug——复现为失败的回归测试、修复到绿色、审查和门控提交——将每个阶段委托给匹配的 ECC Agent。用于现有行为已损坏或错误时。 |
| **orch-pipeline** | orch-* 技能族的共享编排引擎。定义门控的 Research-Plan-TDD-Review-Commit 管线、大小分类器、Agent 映射和两个人工门，供 orch-* 操作技能委托。通常不直接调用。 |
| **orch-refine-code** | 编排行为保持的重构——确认测试通过、不改变行为地重组、保持测试通过、审查和门控提交。用于结构应改善但行为不得改变时。 |
| **gan-style-harness** | GAN 启发的生成器-评估器 Agent harness，用于自主构建高质量应用。基于 Anthropic 2026 年 3 月 harness 设计论文。 |
| **santa-method** | 多 Agent 对抗性验证与收敛循环。两个独立的审查 Agent 必须都通过才能发布输出。 |
| **loop-design-check** | 设计目标导向的 Agent Loop，并审查 Loop 的出错方式——空转和烧 Token、Goodhart 博弈验证器、或将错误答案跑到完成。两个动作：(1) 写 Loop；(2) 审查 Loop。 |
| **plan-canvas** | 在本地浏览器 Canvas 中打开计划和 HTML 工件，人可以在页面上标注元素、聊天、批准或请求更改而不离开页面。用于呈现需要审查的计划时。 |
| **plan-orchestrate** | 读取计划文档、分解为步骤、从 ECC 目录中设计每步 Agent 链，并发出可粘贴的 /orchestrate 自定义提示。仅生成——本身不调用 /orchestrate。 |
| **team-agent-orchestration** | 使用工作项、所有权、Agent Kanban、合并门和控制面板交接运行基于团队的 Agent 编排。 |
| **team-builder** | 交互式 Agent 选择器，用于组合和调度并行团队。 |
| **dmux-workflows** | 使用 dmux（AI Agent 的 tmux 窗格管理器）进行多 Agent 编排。用于并行 Agent 工作流的模式，跨 Claude Code、Codex、OpenCode 和其他 harness。 |
| **product-capability** | 将 PRD 意图、路线图请求或产品讨论转化为实现就绪的能力计划——在多服务工作开始前暴露约束、不变量、接口和未解决的决策。 |
| **intent-driven-development** | 在实现之前或同时，将模糊或高影响力的产品和工程变更转化为有范围的、可验证的验收标准。用于澄清功能、定义验收标准、降低安全/数据/迁移/集成变更风险。 |

---

## 12. 研究与分析

| Skill | 介绍 |
|-------|------|
| **deep-research** | 使用 firecrawl 和 exa MCP 的多源深度研究。搜索 Web、综合发现并以源引用交付报告。用于对任何主题进行带有证据和引用的深入研究。 |
| **research-ops** | 基于证据的当前状态研究工作流。用于需要新鲜事实、比较、丰富或基于当前公开证据和提供的本地上下文构建建议时。 |
| **exa-search** | 通过 Exa MCP 的神经搜索——Web、代码和公司研究。用于 Web 搜索、代码示例、公司情报、人员查找或用 Exa 神经搜索引擎的 AI 驱动深度研究。 |
| **documentation-lookup** | 使用 Context7 MCP 获取最新库和框架文档，而非依赖训练数据。激活于设置问题、API 参考、代码示例或用户提及框架（如 React、Next.js、Prisma）时。 |
| **search-first** | 研究先于编码的工作流——在编写自定义代码前搜索现成的工具、库和模式。调用 researcher agent。 |
| **benchmark** | 测量性能基线、检测 PR 前后回归和比较技术栈替代方案。 |
| **benchmark-methodology** | 在 competitive-platform-analysis 生成分层竞争对手集后使用。在九个加权维度上评分每个竞争对手（定位、声音、视觉工艺、报价包装、证据、企业就绪、思想领导力、定价、客户战略张力），附明确 1-5 评分标准和张力图。 |
| **benchmark-optimization-loop** | 当用户要求让某事更快、尝试多个变体、运行递归优化、基准延迟/吞吐量/成本或通过重复测量测试选择最佳实现时使用。 |
| **growth-log** | 在复杂任务、失败后或审查学到的内容时使用。教授如何写增长日志以提取可重用模式——不是日记条目。 |
| **recursive-decision-ledger** | 当用户要求重复推出、带标记的决策过程、高维搜索、随机优化、局部最优探索、集合比较或带可见证据轨迹的递归推理时使用。 |
| **product-lens** | 在构建前验证"为什么"、运行产品诊断并在请求成为实现合同前对产品方向进行压力测试。 |
| **codebase-onboarding** | 分析不熟悉的代码库并生成结构化接入指南——架构地图、关键入口点、约定和 starter CLAUDE.md。用于加入新项目或在仓库中首次设置 Claude Code 时。 |

---

## 13. 网络工程

| Skill | 介绍 |
|-------|------|
| **cisco-ios-patterns** | Cisco IOS 和 IOS-XE 审查模式——show 命令、配置层次、通配符掩码、ACL 放置、接口卫生和安全变更窗口验证。 |
| **network-bgp-diagnostics** | 仅限诊断的 BGP 故障排除模式——邻居状态、路由交换、前缀策略、AS 路径检查和安全证据收集。 |
| **network-config-validation** | 路由器/交换机配置的部署前检查——危险命令、重复地址、子网重叠、陈旧引用、管理面风险和 IOS 风格安全卫生。 |
| **network-interface-health** | 诊断接口错误、丢包、CRC、双工不匹配、翻动、速度协商问题和路由器/交换机/Linux 主机上的计数器趋势。 |
| **netmiko-ssh-automation** | 安全的 Python Netmiko 模式——只读收集、有界批量 SSH、TextFSM 解析、受保护的配置更改、超时和网络自动化错误处理。 |
| **clickhouse-io** | ClickHouse 数据库模式、查询优化、分析和数据工程最佳实践，用于高性能分析工作负载。 |
| **data-scraper-agent** | 构建完全自动化的 AI 驱动数据收集 Agent——适用于职位、价格、新闻、GitHub、体育等任何公开来源。按计划运行，用免费 LLM（Gemini Flash）丰富数据，结果存储到 Notion/Sheets/Supabase，从用户反馈中学习。100% 免费在 GitHub Actions 上运行。 |
| **homelab-network-readiness** | 更改路由器/防火墙/DHCP/VPN 配置前的家庭实验室 VLAN 分段、本地 DNS 过滤和 WireGuard 远程访问就绪清单。 |
| **homelab-network-setup** | 实用家庭和家庭实验室网络规划——网关、交换机、AP、IP 范围、DHCP 预留、DNS、布线和常见初学者错误。 |
| **homelab-pihole-dns** | Pi-hole 安装、阻止列表管理、DNS-over-HTTPS 设置、DHCP 集成、本地 DNS 记录和家庭网络上 DNS 解析故障排除。 |
| **homelab-vlan-segmentation** | 使用 UniFi、pfSense/OPNsense 和 MikroTik 将家庭网络分段为 IoT、Guest、Trusted 和 Server VLAN——包括交换机 Trunk 配置、防火墙规则和无线 SSID 映射。 |
| **homelab-wireguard-vpn** | WireGuard VPN 服务器设置、对等配置、密钥生成、Split Tunneling vs Full Tunnel 路由和从移动/笔记本客户端到家庭网络的远程访问。 |

---

## 14. 科学计算与数据

| Skill | 介绍 |
|-------|------|
| **scientific-db-pubmed-database** | 直接 PubMed 和 NCBI E-utilities 搜索工作流——生物医学文献、MeSH 查询、PMID 查找、引用检索和 API 支持的文献监控。 |
| **scientific-db-uspto-database** | USPTO 专利和商标数据工作流——官方记录查找、PatentSearch 查询、TSDR 检查、Assignment 数据和可重现的 IP 研究日志。 |
| **scientific-pkg-gget** | gget CLI 和 Python 工作流——快速基因组数据库查询、序列查找、BLAST 式搜索、富集检查和可重现的生物信息学证据日志。 |
| **scientific-thinking-literature-review** | 学术、生物医学、技术和科学主题的系统性文献综述工作流——包括搜索规划、源筛选、综合、引用检查和证据记录。 |
| **scientific-thinking-scholar-evaluation** | 结构化学术工作评估——论文、提案、文献综述、方法部分、证据质量、引用支持和研究写作反馈。 |
| **videodb** | 视频和音频处理：摄取本地文件/URL/RTSP/桌面录制；提取帧、构建视觉/语义/时间索引、搜索带有时间戳的时刻；转码和标准化、时间线编辑（字幕、叠加、品牌、配音、翻译）、生成媒体资源。 |
| **nutrient-document-processing** | 使用 Nutrient DWS API 处理、转换、OCR、提取、编辑、签名和填写文档。支持 PDF、DOCX、XLSX、PPTX、HTML 和图片。 |
| **codehealth-mcp** | 通过 CodeScene MCP 的实时结构代码健康——编辑前审查、变更后验证分数增量、提交和 PR 门控。用于审查代码质量、重构或检查 AI 变更是否降低了文件质量。 |
| **prompt-optimizer** | 分析原始提示、识别意图和差距、匹配 ECC 组件（skill/command/agent/hook），输出可粘贴的优化提示。仅顾问角色——本身不执行任务。 |
| **visa-doc-translate** | 将签证申请文件（图片）翻译为英文并创建双语 PDF，原文+翻译对照。 |

---

## 15. 医疗健康

| Skill | 介绍 |
|-------|------|
| **healthcare-cdss-patterns** | 临床决策支持系统（CDSS）开发模式——药物相互作用检查、剂量验证、临床评分（NEWS2、qSOFA）、警报严重性分类和 EMR 工作流集成。 |
| **healthcare-emr-patterns** | EMR/EHR 医疗应用开发模式——临床安全、就诊工作流、处方生成、CDSS 集成和医疗数据录入的无障碍优先 UI。 |
| **healthcare-eval-harness** | 医疗应用部署的患者安全评估 Harness——CDSS 准确性、PHI 暴露、临床工作流完整性和集成合规的自动化测试套件。安全失败阻止部署。 |
| **healthcare-phi-compliance** | 医疗应用的受保护健康信息（PHI）和个人身份信息（PII）合规模式。涵盖数据分类、访问控制、审计跟踪、加密和常见泄漏向量。 |
| **hipaa-compliance** | HIPAA 特定的医疗隐私和安全工作入口。用于明确围绕 HIPAA 的任务——PHI 处理、覆盖实体、BAA、违规态势或美国医疗合规要求。 |

---

## 16. 视频与媒体

| Skill | 介绍 |
|-------|------|
| **video-editing** | AI 辅助视频编辑工作流——切割、构建和增强真实素材。覆盖从原始拍摄到 FFmpeg、Remotion、ElevenLabs、fal.ai 和 Descript/CapCut 最终润色的完整管道。 |
| **remotion-video-creation** | Remotion - React 视频创建最佳实践。29 条领域特定规则，涵盖 3D、动画、音频、字幕、图表、过渡等。 |
| **manim-video** | 构建可重用的 Manim 技术概念、图形、系统图和产品走查解释器。用于需要干净动画解释器而非通用 Talking-Head 脚本时。 |
| **blender-motion-state-inspection** | 检查 Blender 角色、骨骼、姿势、动画重定向、地面接触、朝向方向或模型-动画对齐，当仅靠截图不够时使用。 |
| **taste** | Angelcore / Cloud-Trance / Hyperpop 视觉族中音乐视频和短视频编辑的创意方向（品味）层。提炼命名的流派美学词汇、情绪+颜色+光系统和节拍同步编辑语法。 |
| **fal-ai-media** | 通过 fal.ai MCP 统一媒体生成——图像、视频和音频。涵盖文生图（Nano Banana）、文/图生视频（Seedance、Kling、Veo 3）、文生语音（CSM-1B）和视频转音频（ThinkSound）。 |
| **ui-demo** | 使用 Playwright 录制精致的 UI 演示视频。用于创建演示、走查、屏幕录制或教程视频。生成带可见光标、自然节奏和专业感的 WebM 视频。 |
| **ios-icon-gen** | 从 SF Symbols（5000+ Apple 原生）或 Iconify API（200+ 集合 275k+ 开源图标）为 Xcode Asset Catalog 生成 iOS 应用图标 PNG 图集。 |

---

## 17. 金融与预测市场

| Skill | 介绍 |
|-------|------|
| **ito-basket-compare** | 将 Itô 预测市场篮子与用户的知识库、投资组合注释、财务上下文、观察列表或研究论文进行只读比较和差距分析，不提供投资建议或实时交易。 |
| **ito-compute** | 查询实时 GPU 库存、提交认证的 Itô 固定费率 RFQ、检查 RFQ 或采购状态，并通过独立安装的规范 CLI 运行明确门控的节点资格验证。 |
| **ito-data-atlas-agent** | 为 Itô 篮子研究、市场发现、参数起草和人机协作编辑设计后台 Data Atlas 风格 Agent。用于架构和工作流规划，不是实时订单执行。 |
| **ito-market-intelligence** | 为 Itô 篮子工作流研究预测市场事件、场所、底层资产、流动性和新闻背景。用于只读市场情报。 |
| **ito-trade-planner** | 为 Itô 或场所工作流构建非咨询的预测市场交易规划工作表。用于检查场所、底层、约束、订单前提条件和手动执行步骤，不放置交易或推荐仓位。 |
| **prediction-market-oracle-research** | 将预测市场作为数据源或预言机信号进行研究——用于产品、Agent、仪表盘和企业决策情报。专注于有源的市场隐含概率、注意事项和集成模式分析，不提供投资建议。 |
| **prediction-market-risk-review** | 审查预测市场、篮子、预言机和交易 Agent 工作流的合规、安全、数据质量、隐私和执行风险。在任何工作流处理场所认证、用户组合数据、API 密钥或交易规划前使用。 |

---

## 18. 其他专业领域

| Skill | 介绍 |
|-------|------|
| **email-ops** | 基于证据的邮箱分类、起草、发送验证和已发送邮件安全跟进工作流。用于整理邮件、通过真实邮件表面起草或发送，或证明哪些内容进入了已发送文件夹。 |
| **finance-billing-ops** | 基于证据的收入、定价、退款、团队计费和计费模型真相工作流。用于需要销售快照、定价比较、重复扣费诊断或代码支持的计费现实，而非通用支付建议。 |
| **customer-billing-ops** | 使用 Stripe 等计费工具操作客户计费工作流——订阅、退款、流失分类、计费门户恢复和计划分析。 |
| **google-workspace-ops** | 跨 Google Drive、Docs、Sheets 和 Slides 作为一个工作流表面操作——计划、跟踪器、演示文稿和共享文档。 |
| **messages-ops** | 基于证据的即时消息工作流。用于阅读文本或 DM、恢复最近的一次性验证码、在回复前检查线程或证明实际检查了哪个消息源。 |
| **unified-notifications-ops** | 将通知作为统一 ECC 原生工作流操作——跨 GitHub、Linear、桌面警报、hooks 和连接通信表面。用于警报路由、去重、升级或收件箱崩溃时。 |
| **project-flow-ops** | 跨 GitHub 和 Linear 操作执行流——分类 Issue 和 PR、链接活跃工作、保持 GitHub 面向公众而 Linear 作为内部执行层。 |
| **terminal-ops** | 基于证据的仓库执行工作流。用于需要运行命令、检查仓库、调试 CI 失败或推送精确修复，并附确切执行和验证证据时。 |
| **jira-integration** | 检索 Jira 工单、分析需求、更新状态、添加评论或转换议题。通过 MCP 或直接 REST 调用提供 Jira API 模式。 |
| **mailtrap-email-integration** | 引导 Agent 通过 Mailtrap Email API 集成事务性邮件发送——包括沙箱测试、域名验证和 API 认证。 |
| **laravel-plugin-discovery** | 通过 LaraPlugins.io MCP 发现和评估 Laravel 包。用于查找插件、检查包健康度或评估 Laravel/PHP 兼容性。 |
| **openclaw-persona-forge** | 为 OpenClaw AI Agent 锻造完整的龙虾灵魂方案。根据用户偏好或随机抽卡，输出身份定位、SOUL.md、角色化底线规则、名字和头像生图提示词。 |
| **generating-python-installer** | Windows 商业级 Python 安装器专家——Nuitka 极限编译、dist 瘦身、DLL 足迹分析和 Inno Setup 打包以交付最小最快的安装器。 |
| **nanoclaw-repl** | 操作和扩展 NanoClaw v2——ECC 的零依赖会话感知 REPL，构建在 claude -p 之上。 |
| **uncloud** | 管理 Uncloud 集群——部署服务、配置 Caddy Ingress、为非集群设备添加静态代理路由、发布端口、扩展、检查日志或使用 `uc` CLI 管理机器和卷。 |
| **x-api** | X/Twitter API 集成——发帖、线程、读取时间线、搜索和分析。涵盖 OAuth 认证模式、速率限制和平台原生内容发布。 |
| **ui-to-vue** | 批量将 UI 截图或设计导出转换为 Vue 3 组件，尤其是配合 Vant、Element Plus 或 Ant Design Vue 使用时。 |

---

## 19. 通用与模板

| Skill | 介绍 |
|-------|------|
| **ck** | Claude Code 的持久逐项目记忆。会话开始自动加载项目上下文，通过 git 活动跟踪会话，并写入原生记忆。命令运行确定性 Node.js 脚本——行为跨模型版本一致。 |
| **council** | 为模糊决策、权衡和 Go/No-Go 调用召开四人理事会。当存在多个可行路径且需要在做出选择前进行结构化分歧时使用。 |
| **hookify-rules** | 创建 Hookify 规则、编写 Hook 规则、配置 Hookify 或需要 Hookify 规则语法和模式指导时使用。 |
| **opensource-pipeline** | 开源管线——Fork、消毒、打包私有项目以安全公开发布。链接 3 个 Agent（forker、sanitizer、packager）。触发词：'/opensource'、'open source this'、'make this public'。 |
| **social-graph-ranker** | 加权社交图谱排名——用于 Warm Intro 发现、桥梁评分和跨 X/LinkedIn 网络差距分析。用于需要可重用图谱排名引擎本身，而非构建在其上的外联或网络维护工作流时。 |
| **verification-loop** | Claude Code 会话的综合验证系统。 |
| **laravel-verification** | Laravel 项目验证循环——环境检查、Linting、静态分析、带覆盖率测试、安全扫描和部署就绪检查。 |
| **django-verification** | Django 项目验证循环——迁移、Linting、带覆盖率测试、安全扫描和发布/PR 前部署就绪检查。 |
| **quarkus-verification** | Quarkus 项目验证循环——构建、静态分析、带覆盖率测试、安全扫描、原生编译和发布/PR 前差异审查。 |
| **springboot-verification** | Spring Boot 项目验证循环——构建、静态分析、带覆盖率测试、安全扫描和发布/PR 前差异审查。 |
| **quarkus-tdd** | Quarkus 3.x LTS 的 TDD——JUnit 5、Mockito、REST Assured、Camel 测试和 JaCoCo。用于添加功能、修复 Bug 或重构事件驱动服务。 |
| **springboot-tdd** | Spring Boot 的 TDD——JUnit 5、Mockito、MockMvc、Testcontainers 和 JaCoCo。用于添加功能、修复 Bug 或重构。 |
| **django-tdd** | Django 测试策略——pytest-django、TDD 方法论、factory_boy、Mocking、覆盖率和 Django REST Framework API 测试。 |
| **laravel-tdd** | Laravel 测试策略——PHPUnit、Pest、模型工厂、HTTP 测试、Sanctum 认证测试、Mocking 和覆盖率。 |
| **swift-actor-persistence** | Swift 中使用 Actor 的线程安全数据持久化——内存缓存与文件后端存储，从设计上消除数据竞争。 |
| **swift-concurrency-6-2** | Swift 6.2 可接近并发——默认单线程，@concurrent 用于显式后台卸载，为主 Actor 类型提供隔离一致性。 |
| **swift-protocol-di-testing** | Swift 可测试代码的协议依赖注入——使用聚焦协议和 Swift Testing Mock 文件系统、网络和外部 API。 |
| **foundation-models-on-device** | Apple FoundationModels 框架——iOS 26+ 设备端 LLM 文本生成、@Generable 引导生成、工具调用和快照流。 |

---

> **数据来源**：所有介绍提取自 ECC 项目的 `skills/*/SKILL.md` 文件的 YAML frontmatter 中的 `description` 字段。
> **共计 281 个 Skills**，按 19 个功能领域分类整理。

---

# ECC Agents 完整介绍

> 以 `ecc:` 为前缀调用的专业 AI 智能体。共计 **68 个 Agents**。
> 数据来源：`agents/*.md` 的 YAML frontmatter 中的 `description` 字段。

---

## 代码审查类（21个）

| Agent | 介绍 |
|-------|------|
| **code-reviewer** | 专家代码审查专员。主动审查代码质量、安全性和可维护性。所有代码更改后必须使用。 |
| **cpp-reviewer** | 专家 C++ 代码审查员——内存安全、现代 C++ 惯用模式、并发、性能。C++ 项目必须使用。 |
| **csharp-reviewer** | 专家 C# 代码审查员——.NET 约定、async 模式、安全性、可空引用类型、性能。C# 项目必须使用。 |
| **database-reviewer** | PostgreSQL 数据库专员——查询优化、模式设计、安全性、性能。结合 Supabase 最佳实践。编写 SQL、创建迁移、设计模式时主动使用。 |
| **django-reviewer** | 专家 Django 代码审查员——ORM 正确性、DRF 模式、迁移安全、安全错误配置、生产级实践。Django 项目必须使用。 |
| **fastapi-reviewer** | FastAPI 应用审查——异步正确性、依赖注入、Pydantic 模式、安全性、OpenAPI 质量、测试和生产就绪。 |
| **flutter-reviewer** | Flutter/Dart 代码审查员——Widget 最佳实践、状态管理模式、Dart 惯用模式、性能陷阱、无障碍、Clean Architecture 违规。库无关，适用任何状态管理方案。 |
| **fsharp-reviewer** | 专家 F# 代码审查员——函数式惯用模式、类型安全、模式匹配、计算表达式、性能。F# 项目必须使用。 |
| **go-reviewer** | 专家 Go 代码审查员——惯用 Go、并发模式、错误处理、性能。Go 项目必须使用。 |
| **healthcare-reviewer** | 医疗应用代码审查——临床安全、CDSS 准确性、PHI 合规、医疗数据完整性。专用于 EMR/EHR、临床决策支持和健康信息系统。 |
| **java-reviewer** | 专家 Java 代码审查员（Spring Boot/Quarkus）——自动检测框架并应用相应的审查规则。涵盖分层架构、JPA/Panache、MongoDB、安全、并发。Java 项目必须使用。 |
| **kotlin-reviewer** | Kotlin/Android/KMP 代码审查员——惯用模式、协程安全、Compose 最佳实践、Clean Architecture 违规和常见 Android 陷阱。 |
| **mle-reviewer** | 生产 ML 工程审查员——数据契约、特征管道、训练可重现性、离线/在线评估、模型服务、监控、回滚。ML/MLOps 代码更改时使用。 |
| **php-reviewer** | 专家 PHP 代码审查员——PSR-12 合规、PHP 类型系统、Eloquent ORM 模式、安全性、性能。PHP 项目必须使用。 |
| **python-reviewer** | 专家 Python 代码审查员——PEP 8 合规、Pythonic 惯用模式、类型提示、安全性、性能。Python 项目必须使用。 |
| **react-reviewer** | 专家 React/JSX 代码审查员——Hook 正确性、渲染性能、服务端/客户端组件边界、无障碍、React 特定安全。涉及 .tsx/.jsx 文件的更改必须使用。 |
| **rust-reviewer** | 专家 Rust 代码审查员——所有权、生命周期、错误处理、unsafe 使用、惯用模式。Rust 项目必须使用。 |
| **security-reviewer** | 安全漏洞检测和修复专员。处理用户输入、认证、API 端点或敏感数据的代码之后主动使用。标记密钥、SSRF、注入、不安全加密和 OWASP Top 10 漏洞。 |
| **swift-reviewer** | 专家 Swift 代码审查员——面向协议设计、值语义、ARC 内存管理、Swift 并发、惯用模式。Swift 项目必须使用。 |
| **typescript-reviewer** | 专家 TypeScript/JavaScript 代码审查员——类型安全、异步正确性、Node/Web 安全、惯用模式。TS/JS 项目必须使用。 |
| **vue-reviewer** | 专家 Vue.js 代码审查员——Composition API 正确性、响应式陷阱、组件架构、模板安全、Vue 特定性能。涉及 .vue 文件或 Vue 生态代码的更改必须使用。 |

## 构建与错误解决类（11个）

| Agent | 介绍 |
|-------|------|
| **build-error-resolver** | 构建和 TypeScript 错误解决专员。构建失败或类型错误时主动使用。仅最小化差异修复构建/类型错误，不做架构修改。专注快速通过构建。 |
| **cpp-build-resolver** | C++ 构建、CMake 和编译错误解决专员。修复构建/链接器/模板错误。C++ 构建失败时使用。 |
| **dart-build-resolver** | Dart/Flutter 构建、分析和依赖错误解决专员。修复 dart analyze 错误、Flutter 编译失败、pub 依赖冲突和 build_runner 问题。Dart/Flutter 构建失败时使用。 |
| **django-build-resolver** | Django/Python 构建、迁移和依赖错误解决专员。修复 pip/Poetry 错误、迁移冲突、导入错误、Django 配置问题和 collectstatic 失败。Django 设置或启动失败时使用。 |
| **go-build-resolver** | Go 构建、vet 和编译错误解决专员。修复构建错误、go vet 问题和 linter 警告。Go 构建失败时使用。 |
| **java-build-resolver** | Java/Maven/Gradle 构建、编译和依赖错误解决专员。自动检测 Spring Boot 或 Quarkus 并应用框架特定修复。Java 构建失败时使用。 |
| **kotlin-build-resolver** | Kotlin/Gradle 构建、编译和依赖错误解决专员。修复构建错误、Kotlin 编译器错误和 Gradle 问题。Kotlin 构建失败时使用。 |
| **pytorch-build-resolver** | PyTorch 运行时、CUDA 和训练错误解决专员。修复张量形状不匹配、设备错误、梯度问题、DataLoader 问题和混合精度失败。PyTorch 训练或推理崩溃时使用。 |
| **react-build-resolver** | 诊断和修复 React 构建失败——跨 Vite/webpack/Next.js/CRA/Parcel/esbuild/Bun。处理 JSX/TSX 编译错误、水合不匹配、服务端/客户端组件边界失败、缺失类型和打包器特定配置问题。React 构建失败时必须使用。 |
| **rust-build-resolver** | Rust 构建、编译和依赖错误解决专员。修复 cargo 构建错误、借用检查器问题和 Cargo.toml 问题。Rust 构建失败时使用。 |
| **swift-build-resolver** | Swift/Xcode 构建、编译和依赖错误解决专员。修复 Swift 构建错误、Xcode 构建失败、SPM 依赖问题和代码签名问题。Swift 构建失败时使用。 |

## 架构与设计类（6个）

| Agent | 介绍 |
|-------|------|
| **architect** | 软件架构专员——系统设计、可扩展性和技术决策。规划新功能、重构大型系统或做架构决策时主动使用。 |
| **code-architect** | 通过分析现有代码库模式和约定来设计功能架构，然后提供包含具体文件、接口、数据流和构建顺序的实现蓝图。 |
| **a11y-architect** | 无障碍架构师——WCAG 2.2 合规，Web 和 Native 平台。设计 UI 组件、建立设计系统或审计代码的无障碍体验时主动使用。 |
| **homelab-architect** | 从硬件清单、目标和操作员经验水平设计家庭和小型实验室网络计划，包含安全的分阶段变更和回滚指导。 |
| **network-architect** | 从需求设计企业或多站点网络架构，使用现有网络技能进行聚焦路由、验证、自动化和故障排除。 |
| **type-design-analyzer** | 分析类型设计——封装、不变量表达、有用性和执行力。 |

## 代码探索与分析类（6个）

| Agent | 介绍 |
|-------|------|
| **code-explorer** | 深入分析现有代码库功能——追踪执行路径、映射架构层、记录依赖关系，为新的开发提供信息。 |
| **code-simplifier** | 简化和精炼代码——清晰、一致、可维护，同时保持行为不变。除非另有指示，聚焦于最近修改的代码。 |
| **comment-analyzer** | 分析代码注释的准确性、完整性、可维护性和注释腐烂风险。 |
| **silent-failure-hunter** | 审查代码中的静默失败、被吞没的错误、错误的回退和缺失的错误传播。 |
| **pr-test-analyzer** | 审查 Pull Request 测试覆盖质量和完整性，强调行为覆盖和真实 Bug 预防。 |
| **spec-miner** | 从现有代码库提取行为规格用于 OpenSpec。生成带有结构化元数据的 Requirement 和 Invariant 块。完全自举——不依赖 codebase-onboarding。用于将棕地项目接入规格驱动开发。 |

## 测试与质量类（4个）

| Agent | 介绍 |
|-------|------|
| **tdd-guide** | TDD 专员——强制先写测试方法论。编写新功能、修复 Bug 或重构代码时主动使用。确保 80%+ 测试覆盖率。 |
| **e2e-runner** | E2E 测试专员——Vercel Agent Browser（首选）+ Playwright 回退。主动用于生成、维护和运行 E2E 测试。管理测试旅程、隔离不稳定测试、上传工件（截图、视频、trace）。 |
| **agent-evaluator** | 在 5 轴质量评分标准（准确性、完整性、清晰度、可操作性、简洁性）上评估 Agent 输出。非平凡任务后或 agent-self-evaluation 技能激活时使用。生成带证据和改进建议的结构化评分卡。 |
| **performance-optimizer** | 性能分析和优化专员。主动用于识别瓶颈、优化慢代码、减少包大小和改善运行时性能。涵盖性能分析、内存泄漏、渲染优化和算法改进。 |

## GAN 生成对抗（3个）

| Agent | 介绍 |
|-------|------|
| **gan-planner** | GAN Harness 规划器——将一句话提示扩展为完整产品规格，包含功能、Sprint、评估标准和设计方向。 |
| **gan-generator** | GAN Harness 生成器——按规格实现功能、读取评估器反馈、迭代直到达到质量阈值。 |
| **gan-evaluator** | GAN Harness 评估器——通过 Playwright 测试运行中的应用，按评分标准评分，为生成器提供可操作的反馈。 |

## 开源流水线（3个）

| Agent | 介绍 |
|-------|------|
| **opensource-forker** | Fork 任何项目用于开源——复制文件、剥离密钥和凭证（20+ 模式）、用占位符替换内部引用、生成 .env.example、清理 git 历史。opensource-pipeline 技能的第一阶段。 |
| **opensource-sanitizer** | 验证开源 Fork 在发布前已完全消毒。使用 20+ Regex 模式扫描泄露的密钥、PII、内部引用和危险文件。生成 PASS/FAIL/PASS-WITH-WARNINGS 报告。公开发布前主动使用。 |
| **opensource-packager** | 为消毒后的项目生成完整开源包装——生成 CLAUDE.md、setup.sh、README.md、LICENSE、CONTRIBUTING.md 和 GitHub Issue 模板。使任何仓库立即可用 Claude Code。opensource-pipeline 技能的第三阶段。 |

## 网络工程（3个）

| Agent | 介绍 |
|-------|------|
| **network-architect** | 从需求设计企业或多站点网络架构。 |
| **network-config-reviewer** | 审查路由器和交换机配置——安全性、正确性、陈旧引用、高风险变更窗口命令和缺失的操作护栏。 |
| **network-troubleshooter** | 使用只读 OSI 层工作流和证据支持的根本原因摘要诊断网络连接、路由、DNS、接口和策略症状。 |

## 运维与 DevOps（4个）

| Agent | 介绍 |
|-------|------|
| **harness-optimizer** | 分析和改进本地 Agent harness 配置——可靠性、成本、吞吐量。 |
| **refactor-cleaner** | 死代码清理和合并专员。主动用于移除未使用的代码、重复和重构。运行分析工具（knip、depcheck、ts-prune）识别死代码并安全移除。 |
| **doc-updater** | 文档和 CodeMap 专员。主动用于更新 CodeMap 和文档。运行 /update-codemaps 和 /update-docs，生成 docs/CODEMAPS/*，更新 README 和指南。 |
| **docs-lookup** | 用户询问如何使用库/框架/API 或需要最新代码示例时，使用 Context7 MCP 获取最新文档并返回答案和示例。 |

## 其他专业（7个）

| Agent | 介绍 |
|-------|------|
| **planner** | 专家规划专员——复杂功能和重构。用户请求功能实现、架构变更或复杂重构时主动使用。规划任务自动激活。 |
| **loop-operator** | 操作自主 Agent 循环、监控进度、在循环停顿时安全干预。 |
| **seo-specialist** | SEO 专员——技术 SEO 审计、页面优化、结构化数据、Core Web Vitals 和内容/关键词映射。用于网站审计、Meta 标签审查、Schema 标记、Sitemap/Robots 问题和 SEO 修复计划。 |
| **marketing-agent** | 营销策略师和文案——活动规划、受众研究、定位、文案创建和内容审查。涵盖着陆页、邮件序列、社交帖子、广告文案、短视频脚本和内容日历。用户想规划或执行产品发布/营销活动时使用。 |
| **chief-of-staff** | 个人通讯幕僚长——邮件、Slack、LINE 和 Messenger 分类。将消息分为 4 级，生成草稿回复，通过 hooks 强制执行发送后跟进。管理多渠道通讯工作流时使用。 |
| **conversation-analyzer** | 分析对话转录以发现有 Hooks 预防价值的行为。由 /hookify（无参数）触发。 |
| **harmonyos-app-resolver** | HarmonyOS 应用开发专家——ArkTS 和 ArkUI。审查代码的 V2 状态管理合规、Navigation 路由模式、API 使用和性能最佳实践。用于 HarmonyOS/OpenHarmony 项目。 |

---

> **数据来源**：所有介绍提取自 ECC 项目的 `agents/*.md` 文件的 YAML frontmatter 中的 `description` 字段。
> **共计 68 个 Agents**。

---

# ECC Commands 完整介绍

> 以 `/` 为前缀调用的快捷命令。共计 **92 个 Commands**。
> 数据来源：`commands/*.md` 的 YAML frontmatter 中的 `description` 字段。

---

## 代码审查与质量（13个）

| 命令 | 介绍 |
|------|------|
| **/code-review** | 代码审查——本地未提交更改或 GitHub PR（传递 PR 编号/URL 用于 PR 模式） |
| **/cpp-review** | C++ 全面代码审查——内存安全、现代 C++ 惯用模式、并发、安全。调用 cpp-reviewer agent。 |
| **/fastapi-review** | FastAPI 应用审查——架构、异步正确性、依赖注入、Pydantic 模式、安全性、性能、可测试性。 |
| **/flutter-review** | Flutter/Dart 代码审查——惯用模式、Widget 最佳实践、状态管理、性能、无障碍、安全。调用 flutter-reviewer agent。 |
| **/go-review** | Go 全面代码审查——惯用模式、并发安全、错误处理、安全性。调用 go-reviewer agent。 |
| **/kotlin-review** | Kotlin 全面代码审查——惯用模式、空安全、协程安全、安全性。调用 kotlin-reviewer agent。 |
| **/python-review** | Python 全面代码审查——PEP 8 合规、类型提示、安全性、Pythonic 惯用模式。调用 python-reviewer agent。 |
| **/react-review** | React/JSX 全面代码审查——Hook 正确性、渲染性能、服务端/客户端边界、无障碍、React 特定安全。调用 react-reviewer agent（TSX/JSX 同时调用 typescript-reviewer）。 |
| **/rust-review** | Rust 全面代码审查——所有权、生命周期、错误处理、unsafe 使用、惯用模式。调用 rust-reviewer agent。 |
| **/vue-review** | Vue.js 全面代码审查——Composition API 正确性、响应式、可组合模式、模板安全、无障碍、Vue 特定性能。调用 vue-reviewer agent（.vue/.ts 同时调用 typescript-reviewer）。 |
| **/quality-gate** | 对单个文件运行 ECC 格式化质量门并报告修复步骤。 |
| **/review-pr** | 使用专业 Agent 的全面 PR 审查。 |
| **/santa-loop** | 对抗性双重审查收敛循环——两个独立模型审查员必须都批准才能发布代码。 |

## 构建与测试（15个）

| 命令 | 介绍 |
|------|------|
| **/build-fix** | 检测项目构建系统并增量修复构建/类型错误，使用最小安全更改。 |
| **/cpp-build** | 修复 C++ 构建错误、CMake 问题和链接器问题。调用 cpp-build-resolver agent。 |
| **/cpp-test** | C++ 的 TDD 工作流——先写 GoogleTest，再实现。用 gcov/lcov 验证覆盖率。 |
| **/flutter-build** | 修复 Dart 分析器错误和 Flutter 构建失败。调用 dart-build-resolver agent。 |
| **/flutter-test** | 运行 Flutter/Dart 测试、报告失败并增量修复。涵盖单元、Widget、Golden 和集成测试。 |
| **/go-build** | 修复 Go 构建错误、go vet 警告和 linter 问题。调用 go-build-resolver agent。 |
| **/go-test** | Go 的 TDD 工作流——先写表驱动测试，再实现。用 go test -cover 验证 80%+ 覆盖率。 |
| **/gradle-build** | 修复 Android 和 KMP 项目的 Gradle 构建错误。 |
| **/kotlin-build** | 修复 Kotlin/Gradle 构建错误、编译器警告和依赖问题。调用 kotlin-build-resolver agent。 |
| **/kotlin-test** | Kotlin 的 TDD 工作流——先写 Kotest 测试，再实现。用 Kover 验证 80%+ 覆盖率。 |
| **/react-build** | 修复 React 构建失败（Vite/webpack/Next.js/CRA/Parcel/esbuild/Bun）——JSX/TSX 编译错误、水合不匹配、服务端/客户端边界失败、缺失类型。调用 react-build-resolver agent。 |
| **/react-test** | React 的 TDD 工作流——先写 React Testing Library 测试（行为聚焦、无障碍优先），再实现。自动检测 Vitest 或 Jest 并验证覆盖率。 |
| **/rust-build** | 修复 Rust 构建错误、借用检查器问题和依赖问题。调用 rust-build-resolver agent。 |
| **/rust-test** | Rust 的 TDD 工作流——先写测试，再实现。用 cargo-llvm-cov 验证 80%+ 覆盖率。 |
| **/test-coverage** | 分析覆盖率、识别差距并生成缺失测试以达到目标阈值。 |

## 规划与编排（19个）

| 命令 | 介绍 |
|------|------|
| **/plan** | 重述需求、评估风险、创建逐步实现计划。修改代码前等待用户确认。 |
| **/plan-prd** | 生成精简的、问题优先的 PRD 并交给 /plan 进行实现规划。 |
| **/plan-canvas** | 在浏览器 Plan Canvas 中打开计划或 HTML 工件进行标注和批准审查。 |
| **/feature-dev** | 具有代码库理解和架构聚焦的引导式功能开发。 |
| **/project-init** | 检测项目技术栈并生成基于仓库安装清单和栈映射的 ECC 接入计划（dry-run）。 |
| **/orch-add-feature** | 编排构建全新功能端到端——研究、规划、TDD、审查、门控提交。orch-add-feature 技能的包装器。 |
| **/orch-build-mvp** | 编排从设计/规范文档启动 MVP——摄入、切片、搭建、TDD、审查、门控提交（复用 GAN harness）。orch-build-mvp 技能的包装器。 |
| **/orch-change-feature** | 编排改变现有功能到新行为——更新测试到新规范、改实现、审查、门控提交。orch-change-feature 技能的包装器。 |
| **/orch-fix-defect** | 编排修复 Bug——复现为失败回归测试、修复到绿色、审查、门控提交。orch-fix-defect 技能的包装器。 |
| **/orch-refine-code** | 编排行为保持的重构——确认测试通过、不改变行为地重组、保持通过、审查、门控提交。orch-refine-code 技能的包装器。 |
| **/orch-review** | 对 diff（本地更改或 GitHub PR）运行 orch-review 原生 Workflow，报告阻塞性 vs 咨询性发现。 |
| **/gan-build** | 运行生成器/评估器构建循环——实现任务的有界迭代和评分。 |
| **/gan-design** | 运行生成器/评估器设计循环——前端或视觉工作的有界迭代和评分。 |
| **/multi-backend** | 运行以后端聚焦的多模型工作流——API、算法、数据和业务逻辑。 |
| **/multi-frontend** | 运行以前端聚焦的多模型工作流——组件、布局、动画和 UI 润色。 |
| **/multi-plan** | 创建多模型实现计划，不修改生产代码。 |
| **/multi-execute** | 执行多模型实现计划，保留 Claude 为唯一文件系统写入者。 |
| **/multi-workflow** | 运行完整多模型开发工作流——研究、规划、执行、优化和审查。 |
| **/model-route** | 根据复杂性、风险和预算为当前任务推荐最佳模型层级。 |

## PRP 工作流（5个）

| 命令 | 介绍 |
|------|------|
| **/prp-plan** | 创建全面的功能实现计划，含代码库分析和模式提取。 |
| **/prp-implement** | 执行具有严格验证循环的实现计划。 |
| **/prp-prd** | 交互式 PRD 生成器——问题优先、假设驱动的产品规格，含来回问答。 |
| **/prp-commit** | 快速提交——用自然语言描述要提交的内容。 |
| **/prp-pr** | 从有未推送提交的当前分支创建 GitHub PR——发现模板、分析更改、推送。 |

## Epic 管理（7个）

| 命令 | 介绍 |
|------|------|
| **/epic-claim** | 认领 Epic Issue，标记协调状态，同步本地所有权。 |
| **/epic-decompose** | 将 Epic 分解为任务子项，不创建任务分支。 |
| **/epic-publish** | 将验证后的 Epic 更新发布回 Issue 和本地缓存。 |
| **/epic-review** | 标记 Epic 审查为已请求、已批准或需更改。 |
| **/epic-sync** | 从 GitHub 同步 Epic Issue 正文、标签和本地协调快照。 |
| **/epic-unblock** | 扫描被阻塞的 Epic Issue 并重新打开依赖已关闭的项目。 |
| **/epic-validate** | 验证 Epic 就绪状态、依赖和协调策略。 |

## ECC 平台管理（16个）

| 命令 | 介绍 |
|------|------|
| **/ecc-guide** | 从实时仓库表面导航 ECC 当前的 Agent、技能、命令、Hooks、安装配置文件和文档。 |
| **/auto-update** | 拉取最新 ECC 仓库更改并重新安装当前管理的目标。 |
| **/checkpoint** | 在运行验证检查后创建、验证或列出工作流检查点。 |
| **/harness-audit** | 运行确定性仓库 harness 审计并返回优先级评分卡。 |
| **/cost-report** | 从 ECC 成本跟踪器指标日志生成本地 Claude Code 成本报告。 |
| **/sessions** | 管理 Claude Code 会话历史、别名和会话元数据。 |
| **/save-session** | 将当前会话状态保存到 ~/.claude/session-data/ 的日期文件中，以便在未来的会话中恢复。 |
| **/resume-session** | 从 ~/.claude/session-data/ 加载最近的会话文件，从上次中断处恢复工作。 |
| **/security-scan** | 对 Agent、Hook、MCP、权限和密钥表面运行 AgentShield。 |
| **/projects** | 列出已知项目及其本能统计。 |
| **/refactor-clean** | 安全识别和移除死代码，每次更改后验证。 |
| **/skill-create** | 分析本地 git 历史提取编码模式并生成 SKILL.md 文件。Skill Creator GitHub App 的本地版本。 |
| **/skill-health** | 显示技能组合健康仪表盘——图表和分析。 |
| **/update-codemaps** | 扫描项目结构并生成 Token 精简的架构 CodeMap。 |
| **/update-docs** | 从真实来源文件（脚本、模式、路由、导出）同步文档。 |
| **/setup-pm** | 配置首选包管理器（npm/pnpm/yarn/bun）。 |

## Hookify 与本能系统（12个）

| 命令 | 介绍 |
|------|------|
| **/hookify** | 从对话分析或明确指令创建 Hooks 以防止不希望的行为。 |
| **/hookify-configure** | 交互式启用或禁用 Hookify 规则。 |
| **/hookify-help** | 获取 Hookify 系统的帮助。 |
| **/hookify-list** | 列出所有配置的 Hookify 规则。 |
| **/evolve** | 分析本能并建议或生成进化的结构。 |
| **/learn** | 从当前会话提取可重用模式并保存为候选技能或指导。 |
| **/learn-eval** | 从会话提取可重用模式，保存前自我评估质量，确定正确的保存位置（全局 vs 项目）。 |
| **/instinct-status** | 显示学到的本能（项目 + 全局）及置信度。 |
| **/instinct-export** | 将本能从项目/全局范围导出到文件。 |
| **/instinct-import** | 从文件或 URL 导入本能到项目/全局范围。 |
| **/promote** | 将项目范围的本能提升到全局范围。 |
| **/prune** | 删除 30 天前创建且从未提升的待处理本能。 |

## 其他命令（8个）

| 命令 | 介绍 |
|------|------|
| **/aside** | 回答快速的侧面问题，不中断或丢失当前任务的上下文。回答后自动恢复工作。 |
| **/jira** | 检索 Jira 工单、分析需求、更新状态或添加评论。使用 jira-integration 技能和 MCP 或 REST API。 |
| **/marketing-campaign** | 规划和执行完整营销活动——接收产品简报，返回定位、着陆页文案、邮件序列、社交帖子、广告变体、视频脚本和内容日历。也可审查现有文案的转化质量。 |
| **/pr** | 从有未推送提交的当前分支创建 GitHub PR——发现模板、分析更改、推送。 |
| **/loop-start** | 启动具有安全默认值和明确停止条件的托管自主循环模式。 |
| **/loop-status** | 检查活跃循环状态、进度、失败信号和建议的干预。 |
| **/pm2** | 分析项目并为检测到的前端/后端/数据库服务生成 PM2 服务命令。 |
| **/model-route** | 根据复杂性、风险和预算为当前任务推荐最佳模型层级。 |

---

> **数据来源**：所有介绍提取自 ECC 项目的 `commands/*.md` 文件的 YAML frontmatter 中的 `description` 字段。
> **共计 92 个 Commands**。

---

# 汇总统计

| 组件类型 | 数量 |
|----------|------|
| Skills（技能） | 281 |
| Commands（命令） | 92 |
| Agents（智能体） | 68 |
| **合计** | **441** |

> **ECC (Everything Claude Code)** 是一个全面的 Claude Code 扩展生态系统，通过 Skills（知识/工作流模式）、Commands（快捷操作）和 Agents（专业 AI 角色）三个维度，为开发者提供了覆盖全开发周期的自动化工具集。
