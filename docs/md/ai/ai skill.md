给 Cursor 配置 Skill，其实就是通过编写特定的 Markdown 文件，为 AI 助手创建一系列可复用的“技能”或“工作流”。配置的核心，就是在你项目的特定文件夹里，创建符合规范的 `SKILL.md` 文件。

整个过程可以分为以下几个步骤：

### 💡 首先，了解什么是 Skill？

Cursor 的 Skill 是一种将特定领域的知识、工作流或重复性任务封装起来的方式，让 AI 可以动态地发现和应用它们 。你可以把它理解为给 AI 的“操作指南”。

它与 Cursor Rules 的核心区别在于：

- **Rules** 更像“纪律”，用于声明式地约束 AI 的行为（如编码规范），通常会自动触发 。
- **Skills** 更像“技能”，用于过程式地指导 AI 完成具体任务（如“生成一个 ROS2 节点”），可以通过手动调用或根据上下文自动触发 。

### 🗺️ 配置 Skill 的两种主要路径

配置 Skill 主要有两种方式，你可以根据自己的情况选择：

| 配置方式       | 适用人群                        | 核心操作                                                     | 优点                     |
| :------------- | :------------------------------ | :----------------------------------------------------------- | :----------------------- |
| **手动创建**   | 开发者，对 Skill 结构有清晰想法 | 在项目目录下手动创建文件夹和`SKILL.md`文件                   | 完全自定义，精细控制     |
| **零代码创建** | 初学者，想快速体验              | 在聊天框输入 `/skill-creator`，用自然语言描述需求，让 AI 自动生成 | 上手快，无需了解语法细节 |

无论哪种方式，最终都是要生成一个符合规范的 Skill 文件包。

### ⚙️ 手动配置 Skill 的详细步骤

如果你想手动创建一个 Skill，可以按照以下步骤操作：

#### 第一步：创建 Skill 目录

在 Cursor 自动识别的 skill 目录中，为你的新 Skill 创建一个文件夹。Skill 可以存放在不同范围，供全局或特定项目使用 ：

- **项目级别**：在你的项目根目录下创建 `.cursor/skills/` 或 `.agents/skills/` 文件夹。
- **用户级别（全局）**：在你的用户根目录下创建 `~/.cursor/skills/` 文件夹。

例如，创建一个名为 `my-skill` 的文件夹，路径可能如下：

text

```
你的项目根目录/
└── .cursor/
    └── skills/
        └── my-skill/   # 文件夹名称必须与后面定义的 skill name 一致
            └── SKILL.md # 核心文件，将在下一步创建
```



#### 第二步：编写核心文件 `SKILL.md`

在 `my-skill` 文件夹中，创建核心文件 `SKILL.md`。这个文件包含了 Skill 的所有定义和指令 。

文件内容主要分为两部分：**YAML 格式的元数据（Frontmatter）** 和 **Markdown 格式的指令内容**。

markdown

```
---
# --- YAML 元数据开始 ---
name: my-skill   # 必须与父文件夹名称一致
description: 简短描述这个技能的作用和适用场景。
# 可选字段
disable-model-invocation: false # 设为 true 后，只能通过 /my-skill 手动调用
# --- YAML 元数据结束 ---

# 我的技能

这里写详细的、逐步的指令，告诉 AI 如何执行这个任务。

## 何时使用

- 当用户想要...时，使用这个技能。
- 这个技能在...场景下特别有用。

## 操作步骤

1.  首先，检查项目中是否存在 `config.json` 文件。
2.  如果不存在，使用以下模板创建一个：
    ```json
    {
      "name": "project-name",
      "version": "1.0.0"
    }
```



1. 然后，运行项目根目录下的脚本：`scripts/deploy.sh`
2. 最后，将输出信息格式化返回给用户。

text

```
#### 第三步：添加辅助文件（可选）

为了让 Skill 更强大，你可以在 `my-skill` 文件夹下创建一些辅助目录 [citation:3]：
- **`scripts/`**：存放可执行的脚本文件（如 `.sh`、`.py`），在 `SKILL.md` 中通过相对路径引用它们，让 AI 来执行 [citation:3][citation:5]。
- **`references/`**：存放额外的参考文档，AI 会在需要时按需加载，避免主文档过于臃肿 [citation:3]。
- **`assets/`**：存放模板、图片等静态资源 [citation:3]。

例如，一个更完整的 Skill 结构可能长这样：
​```text
.cursor/skills/deploy-app/      # Skill 根目录
├── SKILL.md                    # 主说明文档
├── scripts/                    # 脚本目录
│   ├── deploy.sh
│   └── validate.py
└── references/                 # 参考文档目录
    └── DEPLOY_CHECKLIST.md
```



### 🚀 如何使用和验证 Skill

配置好 Skill 后，就可以在 Cursor 中使用了：

1. **自动发现**：Cursor 在启动时会自动扫描上述目录，加载所有 Skill 。
2. **查看已加载的 Skill**：打开 **Cursor Settings → Rules**，在 **Agent Decides** 部分就可以看到所有被发现的 Skill 。
3. **调用 Skill**：
   - **手动调用**：在 Agent 聊天框中输入 `/`，然后从弹出的菜单中选择你的 Skill 名称 。
   - **自动调用**：如果 `disable-model-invocation` 设为 `false`，当你的对话上下文与 Skill 的 `description` 匹配时，Agent 可能会主动询问你是否应用该 Skill 。

### 💡 进阶技巧：快速安装现成的 Skill

如果你不想从零开始，也可以从 GitHub 等来源直接安装别人创建好的 Skill 集合。例如，可以使用 `openskills` 工具来安装 Anthropic 的官方 Skills ：

1. **安装 OpenSkills 工具**：在终端运行 `npm i -g openskills`。
2. **安装 Skills**：在项目目录下运行 `openskills install anthropics/skills`，然后按提示选择你想安装的技能。安装后，你会在项目下看到 `.claude/skills/` 文件夹。
3. **让 Cursor 识别**：为了确保 Cursor 能发现这些技能，你可以在项目根目录创建一个 `AGENTS.md` 文件，然后运行 `openskills sync`，将技能信息同步进去 。

希望这份指南能帮你顺利配置并使用 Cursor 的 Skill。如果你在创建某个特定功能的 Skill 时遇到困难，比如“生成 React 组件”或“规范化 Git 提交消息”，可以随时再问我，我们可以一起探讨具体的指令怎么写。



