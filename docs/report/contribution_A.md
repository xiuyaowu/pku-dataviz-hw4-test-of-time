# A 贡献记录：项目架构 / 全站 baseline / 队友减负 / GitHub 协作 / Review / 最终整合 QA

## 贡献概述

A 负责把小组项目从开放选题推进为一个可运行、可协作、可展示的数据可视化系统。前期完成 GitHub 协作仓库、Issue/PR 工作流、数据接入、单页 D3 叙事结构、五个研究模块的 baseline 图表、tooltip/详情卡/reading notes、统一 CSS 视觉系统和 README demo 截图；随后继续补充 Field × Decade Heatmap、Citation Quadrants、Paper Explorer、Benchmark Lab、Story Builder、Network KPIs、Methods & Limitations、Presentation Pack 和 feature iteration system，把项目从“有图”推进到“可检索、可讲解、可追溯、可持续加功能”的完整版本。这样 B-F 可以在已有模块上并行增强分析，免去从零搭页面或临时拼图的成本。

A 的职责包含组织，但重心是承担项目的“系统底座 + 质量闸门”：保证主线统一、页面始终可运行、每个模块有明确交付、每个 PR 有验证记录、最终报告能追溯每个人的具体贡献。

## 具体工作

### 1. 项目架构与主线设计

- 将项目主线确定为：哪些 CS 研究经得起时间检验，以及这种长期影响如何在时间、领域、主题、引用和研究网络中体现。
- 将开放题目拆成五个连续研究问题：Time、Venue & Field、Topic Evolution、Citation & Recognition、Impact Network。
- 设计单页滚动式叙事结构，避免六个人各做孤立图表后难以整合。
- 维护 teammate-facing 仓库结构，保证 README、docs、data、manual annotations、src 等目录对队友清晰可用。

### 2. 全站 D3 baseline 实现

- 实现 `index.html` 页面结构、导航锚点、hero 区、summary cards 和五个模块容器。
- 实现 `src/app.js` 的统一数据加载、字段解析、D3 图表绘制、tooltip、detail card 和 reading notes。
- 实现 `src/styles.css` 的整体视觉系统、卡片布局、tooltip、响应式结构和展示风格。
- 为五个模块先产出可运行版本：
  - Time：recognition lag histogram + publication → award timeline。
  - Venue：top venues + field/area distribution。
  - Topic：topic distribution + topic evolution + representative paper detail card。
  - Citation：citation vs recognition lag + citation trajectory + depth × breadth scatter。
  - Network：institution ranking + country/region ranking。

### 3. 数据接入与解释边界

- 将前端所需核心数据整理到 `data/` 目录，并统一为相对路径读取。
- 接入 `papers_enriched.csv`、`award_timeline.csv`、`recognition_lag_distribution.csv`、`venue_stats.csv`、`venue_area_stats.csv`、`topic_stats.csv`、`topic_year_stats.csv`、`citation_trajectories.csv`、`citing_breadth_metrics.csv`、`institution_stats.csv`、`country_stats.csv`。
- 检查 citation、impact breadth、network 等指标的解释边界，统一说明它们属于公开学术元数据近似指标，不能直接解释为官方评奖原因或因果结论。

### 4. 队友减负材料

- 编写 `docs/work_board.md`，把六人工作拆成 Issues、文件、交付物和 PR 合并标准。
- 编写 `docs/module_handoff_cards.md`，为 B-F 提供每个模块的已有哪些 baseline、主要数据、最低交付、高分增强方向和报告句式。
- 编写 `docs/report/report_skeleton.md`，提供最终报告结构和各模块可直接填充的段落框架。
- 编写 `docs/demo_script.md`，提供 6-8 分钟展示讲解顺序和备选 Q&A。
- 编写 `docs/a_lead_quality_system.md`，明确 A 的全局 baseline、队友减负和最终质量闸门职责。
- 编写 `docs/feature_iteration_system.md`，把“继续提 feature、开 Issue、PR 完成、回填文档”的循环固定下来，方便后续持续加功能。

### 5. GitHub 协作与 PR 流程

- 建立小组协作仓库，并清理为 teammate-facing 结构。
- 创建并细化 Issues #2–#7，对应 A-F 六个成员的工作流。
- 为每个 Issue 写清研究问题、已有 baseline、相关文件、继续优化任务、报告小节和验收标准。
- 建立 `.github/pull_request_template.md`，要求每个 PR 说明改动、数据、发现和验证方式。
- 维护 README 协作规则，要求 always PR，避免直接修改 `main` 造成覆盖。

### 6. Demo 预览与展示入口

- 生成 `docs/demo/homepage-overview.png`、`docs/demo/time-and-timeline.png`、`docs/demo/citation-and-impact.png`、`docs/demo/network-diffusion.png` 四张页面截图。
- 在 `README.md` 顶部加入 Demo 预览区，让未安装环境的读者可以先看到网页效果。
- 将 demo 截图作为项目展示入口，也作为后续视觉 QA 的基准。

### 7. Review 与最终整合 QA

- 后续负责 review 队友 PR，检查是否链接对应 Issue、是否写清数据和发现。
- 合并前检查 `node --check src/app.js` 是否通过。
- 本地启动 `python3 -m http.server 8765 --bind 127.0.0.1`，检查页面是否能打开。
- 检查是否出现 `Data loading failed`、空图、tooltip 报错、样式溢出或数据路径错误。
- 检查每个模块是否至少有 2-3 条可写进报告/展示的发现。
- 统一术语、图表标题、caption、reading notes、限制说明和最终报告口径。
- 最终提交前按 `docs/final_qa_checklist.md` 做全站检查。

### 8. 高分增强功能与持续迭代

- 补充 `Paper Explorer`，支持按 title / venue / topic / field 检索、按 citation / breadth / lag / year 排序，并点击联动代表论文详情和 benchmark。
- 补充 `Benchmark Lab`，把任意选中论文转成 citation depth、impact breadth、recognition lag、country span、institution span 的 percentile 对比。
- 补充 `Story Builder`，自动把各模块组织成“研究问题 → 动态证据 → so what → owner”的展示/报告路线图。
- 补充 `docs/feature_iteration_system.md`，将后续“发现 feature → 开 GitHub Issue → PR 完成 → 文档回填”的循环制度化。

## 对应文件 / 记录

- `index.html`
- `src/app.js`
- `src/styles.css`
- `README.md`
- `.github/pull_request_template.md`
- `docs/project_plan.md`
- `docs/team_division.md`
- `docs/work_board.md`
- `docs/a_lead_quality_system.md`
- `docs/module_handoff_cards.md`
- `docs/demo_script.md`
- `docs/feature_iteration_system.md`
- `docs/final_qa_checklist.md`
- `docs/report/report_skeleton.md`
- `docs/report/contribution_A.md`
- `docs/demo/*.png`
- GitHub Issues #2–#7、#13
- GitHub PR review / merge 记录

## 可直接放进报告的短版

A 负责项目整体架构、全站 baseline 实现与最终整合。前期完成 GitHub 协作仓库、Issue/PR 工作流、数据接入、D3 页面结构、五个研究模块的可运行图表、tooltip/详情卡/reading notes 和统一视觉系统；同时补齐 README demo 截图、队友任务卡、报告骨架和展示脚本，降低其他成员从零搭建的成本。中后期负责 review 各模块 PR、检查页面运行、数据路径、图表解释、术语统一和最终 QA，保证项目最终形成一条完整的数据故事，避免图表拼盘感。
