# A 负责人职责：全局 baseline、队友减负与最终质量系统

这份文档用于明确 A 的职责边界：A 不只是协调进度，而是先把项目做成一个可运行、可协作、可展示的完整底座，再让 B-F 在明确模块内补充分析和 polish。这样小组不会出现“每个人各做一张散图，最后拼不起来”的问题。

## A 的核心目标

> 把项目从“六个人分头做”变成“一个已经成型的数据故事，五个模块并行增强”。

A 需要保证三件事：

1. **可运行**：`index.html` + `src/app.js` + `src/styles.css` 能直接启动，五个模块都有 baseline 图表。
2. **可分工**：每个队友有明确 Issue、数据文件、图表函数、报告小节和 PR 验收标准。
3. **可整合**：所有模块的术语、视觉、故事线、限制说明和最终报告口径统一。

## A 已经提供给队友的减负内容

| 减负对象 | A 提供的底座 | 队友只需要继续做 |
|---|---|---|
| B / Time | recognition lag histogram、publication → award timeline、时间阅读提示 | 补 2-3 条时间发现、代表案例、必要的小交互或注释 |
| C / Venue | top venues、field map、会议/领域数据表 | 补集中度解释、领域差异、奖项历史限制说明 |
| D / Topic | topic distribution、topic evolution、representative paper detail card、Top60 手工补充表 | 校正主题标签、补代表论文一句话解释和证据 URL |
| E / Citation | citation vs lag、citation trajectory、depth × breadth scatter | 补高引用是否等于长期影响的分析，解释 depth/breadth 区别 |
| F / Network / Visual | institution ranking、country ranking、统一 CSS 基础风格、demo 截图入口 | 做网络/机构发现、展示脚本、视觉统一微调和 PPT |

## A 的最终交付清单

### 1. 项目工程底座

- `index.html`：完整单页叙事结构和五个模块锚点。
- `src/app.js`：统一数据加载、D3 绘图函数、tooltip、详情卡、reading notes。
- `src/styles.css`：统一配色、卡片、tooltip、响应式布局和展示风格。
- `data/`：前端直接读取的静态数据表。
- `README.md`：项目说明、本地运行、demo 截图、协作规则。

### 2. 协作底座

- `docs/work_board.md`：Issue 级分工和 PR 合并标准。
- `docs/team_division.md`：六人职责、交付物和报告口径。
- `docs/module_handoff_cards.md`：B-F 每个人“最少该做什么 / 想卷该做什么”的任务卡。
- `.github/pull_request_template.md`：PR 描述模板，避免无说明合并。
- `docs/final_qa_checklist.md`：最终提交前检查表。

### 3. 报告与展示底座

- `docs/report/report_skeleton.md`：可直接填充的最终报告结构。
- `docs/demo_script.md`：展示讲解顺序与各模块讲什么。
- `docs/feature_iteration_system.md`：持续提 feature、开 Issue、PR 完成和文档回填的迭代机制。
- `docs/report/contribution_A.md`：A 的报告贡献记录。
- `docs/demo/*.png`：README 预览截图。

## A 的 review 标准

详细合并标准和可复制 review comment 见 `docs/pr_review_rubric.md`。每个队友 PR 合并前，A 至少检查以下项目：

1. **运行检查**：`node --check src/app.js` 通过；本地服务器能打开页面。
2. **数据检查**：所有数据路径为相对路径；没有本地绝对路径；没有提交缓存或 `.DS_Store`。
3. **图表检查**：图表有标题、caption、tooltip 或阅读说明；不会空白或报错。
4. **分析检查**：至少 2-3 条可以写入报告/展示的发现；避免只有图没有结论。
5. **边界检查**：citation、impact breadth、network 只能作为公开元数据近似指标，不能写成官方因果结论。
6. **一致性检查**：术语统一为 Test of Time、recognition lag、citation trajectory、impact breadth、venue area。

### 7. 持续提 feature / 开 Issue / 完成 PR

A 后续可以按 `docs/feature_iteration_system.md` 持续循环：从评分标准和展示效果中发现下一批高收益 feature，写成 GitHub Issue，分配给对应 owner 或由 A 自己完成，再通过 PR 合并并回填 README / work board / 贡献记录。这样项目会持续变厚，而不是停在 baseline。

## A 在报告中的定位

A 的贡献应该写成“项目架构与可运行系统实现”，不要只写成“组长协调”。推荐口径：

> A 负责项目整体架构、全站 baseline 实现与最终整合。前期完成 GitHub 协作仓库、Issue/PR 工作流、数据接入、D3 页面结构、五个研究模块的可运行图表、tooltip/详情卡/reading notes 和统一视觉系统；同时补齐 README demo 截图、队友任务卡、报告骨架和展示脚本，降低其他成员从零搭建的成本。中后期负责 review 各模块 PR、检查页面运行、数据路径、图表解释、术语统一和最终 QA，保证项目最终形成一条完整的数据故事，避免图表拼盘感。
