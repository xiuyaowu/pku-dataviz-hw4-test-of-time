# A 贡献记录：项目负责人 / 全站 baseline / GitHub 协作 / Review / 最终整合 QA

## 贡献概述

负责项目整体架构与协作整合：搭建 GitHub 仓库、设计 Issue/PR 协作流程、实现全站 D3 baseline，包括五个研究模块的数据加载、图表容器、tooltip、详情卡、summary cards 和统一视觉样式；后续负责 review 各模块 PR、检查数据路径与页面运行、统一图表叙事与最终提交 QA。该工作保证小组成员可以在已有可运行模块上并行优化，而不是从零开始各自开发。

## 具体工作

### 1. GitHub 协作与分工管理

- 建立小组协作仓库，并清理为 teammate-facing 结构。
- 维护 `README.md`、`docs/project_plan.md`、`docs/team_division.md`、`docs/work_board.md`。
- 创建并细化 Issues #2–#7，对应六个成员的模块任务。
- 为每个 Issue 写清：研究问题、已有 baseline、相关文件、继续优化任务、报告小节和验收标准。
- 建立 `.github/pull_request_template.md`，让每个 PR 必须说明改动、数据、发现、验证方式。

### 2. 初版网页和代码实现

- 实现 `index.html` 页面结构和五个模块导航：Time / Venue / Topic / Citation / Network。
- 实现 `src/app.js` 中的统一数据加载、D3 图表绘制、tooltip、详情卡、summary cards 和 reading notes。
- 实现 `src/styles.css` 中的整体视觉风格、卡片布局、tooltip 和响应式样式。
- 为五个研究模块先产出可运行版本：
  - Time：recognition lag histogram + publication → award timeline。
  - Venue：top venues + field/area distribution。
  - Topic：topic distribution + topic evolution + representative paper detail card。
  - Citation：citation vs recognition lag + citation trajectory + depth × breadth scatter。
  - Network：institution ranking + country/region ranking。

### 3. 数据接入和路径检查

- 将前端所需核心数据整理到 `data/` 目录。
- 接入 `papers_enriched.csv`、`award_timeline.csv`、`recognition_lag_distribution.csv`、`venue_stats.csv`、`venue_area_stats.csv`、`topic_stats.csv`、`topic_year_stats.csv`、`citation_trajectories.csv`、`citing_breadth_metrics.csv`、`institution_stats.csv`、`country_stats.csv`。
- 保证前端全部使用相对路径，便于 GitHub Pages 或本地静态服务器运行。
- 检查数据解释边界：citation、impact breadth、network 都是公开元数据近似指标，不能过度宣称。

### 4. 代码审查与最终整合

- 后续负责 review 队友 PR。
- 检查 JS 是否能通过 `node --check src/app.js`。
- 检查页面是否能通过 `python3 -m http.server 8765 --bind 127.0.0.1` 本地运行。
- 检查是否出现 `Data loading failed`、空图、tooltip 报错、样式溢出。
- 检查每个模块是否至少有 2-3 条可写进报告/展示的发现。
- 检查各模块术语、视觉、叙事是否统一。
- 负责最终运行测试和提交前 QA。

### 5. 报告和展示整合

- 将全站主线统一为：哪些 CS 研究经得起时间检验，以及这种长期影响体现在哪些时间、领域、主题、引用和网络模式中。
- 确保每个成员贡献能追溯到具体 Issue、文件、数据和图表。
- 在报告中说明 A 的贡献不是单纯协调，而是 baseline 代码、协作流程、review 和最终整合 QA。
- 配合 F 的展示/PPT，检查故事线和模块顺序。

## 对应文件 / 记录

- `index.html`
- `src/app.js`
- `src/styles.css`
- `README.md`
- `.github/pull_request_template.md`
- `docs/project_plan.md`
- `docs/team_division.md`
- `docs/work_board.md`
- `docs/final_qa_checklist.md`
- `docs/report/contribution_A.md`
- GitHub Issues #2–#7
- GitHub PR review / merge 记录

## 可直接放进报告的短版

负责项目整体架构与协作整合。前期搭建 GitHub 仓库和 Issue/PR 工作流，并先实现全站可运行的 D3 baseline：包括 Time、Venue、Topic、Citation、Network 五个模块的数据加载、图表绘制、tooltip 交互、代表论文详情卡、summary cards 和统一视觉样式。中后期负责 review 队友 PR，检查数据路径、页面运行、图表解释、术语统一和最终 QA，保证小组成员可以在已有模块上并行优化，最终形成一个叙事统一、可运行、可展示的完整数据可视化项目。
