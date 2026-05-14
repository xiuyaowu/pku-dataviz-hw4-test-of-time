# 小组 Issue 分工表

用途：把六个人的工作拆成可以并行推进的 GitHub Issues。当前代码已经有一版全模块 baseline，队友可以在各自模块上补发现、优化图表、写报告小节并通过 PR 合并。

## 总体协作规则

1. 每个人从 `main` 新建自己的分支，不直接改 `main`。
2. 每个 PR 必须链接自己的 Issue，并按 `.github/pull_request_template.md` 填写。
3. 每个模块至少交付：可运行页面 + 2-3 条分析发现 + 数据来源说明 + 报告小节草稿。
4. 如果改 `src/app.js`，本地先跑 `node --check src/app.js`。
5. 如果改页面，本地启动 `python3 -m http.server 8765 --bind 127.0.0.1`，打开 `http://127.0.0.1:8765/index.html` 检查。
6. PR 自查和 A review 统一按 `docs/pr_review_rubric.md` 执行：先满足 minimum to merge，再补 nice-to-have。
7. A 负责 review、merge、全站叙事统一和最终 QA。

## 六人分工总表

补充质量目标：如需进一步提高完成度，按 `docs/quality_upgrade_plan.md` 检查每个模块是否都有“发现、案例、限制、截图/验证”。额外增强板块见 `docs/stretch_backlog.md`，建议作为 #17–#20 分配给完成基础任务较快的成员。持续提 feature、开 Issue、PR 完成和回填文档的循环见 `docs/feature_iteration_system.md`；下一批 feature 已开为 #23–#27，其中 #24 已为 Top 12 代表论文补入 DOI/论文页/辅助证据链接和一句话贡献，#18 的 `docs/evidence_card_presentation_matrix.md` 已把 8 张展示优先卡和 4 张需复核备选卡分开，#26 已把 `docs/report/report_skeleton.md` 补成可扩写的 findings matrix，#27 已新增 `docs/data_provenance_audit.md` 统一数据来源和 proxy 指标口径，#43 已新增 `docs/data_readiness_matrix.md` 汇总核心数据行数、模块用途和提交前字段检查，B-F 后续只需核查表述、补少量 award citation 并压缩成正式报告段落。

| 角色 | GitHub Issue | 模块 | 主要文件 | 必须交付 | PR 合并标准 |
|---|---|---|---|---|---|
| A | [#2](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/2), [#13](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/13) | 项目架构 / 全站 baseline / 队友减负 / GitHub 协作 / Demo 预览 / Review / 最终整合 QA | `index.html`, `src/app.js`, `src/styles.css`, `README.md`, `.github/*`, `docs/*`, `docs/demo/*`, 全站 QA | baseline 代码、Issues、PR 模板、work board、README demo 截图、队友任务卡、报告骨架、展示脚本、贡献记录、最终检查表、review/merge 记录 | main 页面始终可运行；README 能让未安装环境的读者快速理解成果；队友可以按任务卡直接开工；最终报告能追溯每个人贡献 |
| B | [#3](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/3) | Time：发表年、获奖年、recognition lag | `data/award_timeline.csv`, `data/recognition_lag_distribution.csv`, `src/app.js`, `docs/time_recognition_lag_handoff.md`, `docs/recognition_lag_outlier_cases.md` | lag 分布解释、最长/典型 lag 代表论文、2-3 条时间发现；当前 handoff 已给出统一定义、代表论文候选、年代差异和可复制报告段落；#55 已补 short / typical / long lag outlier case notes 和 CSV | Time 两个图正常显示；结论能解释“时间检验”的时间尺度；最终报告前人工核查 3 篇代表论文的 award citation / 贡献表述 |
| C | [#4](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/4) | Venue and Field：会议和领域分布 | `data/venue_stats.csv`, `data/venue_area_stats.csv`, `docs/venue_field_handoff.md`, `docs/venue_year_case_studies.md`, Venue section | Top venues、Top fields、集中度分析、field × decade 读法、2-3 条会议/领域发现；当前 handoff 已给出核心统计、代表论文候选、venue-year mini cases 和可复制报告段落 | 不把数量榜误写成官方排名；说明设奖历史、奖项覆盖和数据源完整性限制；最终报告前人工核查 2-3 篇代表论文链接 / award citation |
| D | [#5](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/5) | Topic Evolution：主题分布、演化和代表论文卡 | `data/topic_stats.csv`, `data/topic_year_stats.csv`, `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`, `docs/topic_evolution_handoff.md`, `docs/evidence_cards_top12.md`, Topic section | Top topics、topic evolution、5-8 篇代表论文解释、2-3 条主题发现；当前 handoff 已给出核心统计、decade-level 迁移、代表论文人工 topic 修正和可复制报告段落 | Topic 三个视图正常显示；代表论文卡有可展示解释/证据；最终报告前打开 evidence URL 核对贡献表述 |
| E | [#6](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/6) | Citation and Impact：引用轨迹、深度和广度 | `data/citation_trajectories.csv`, `data/citing_breadth_metrics.csv`, `docs/citation_impact_handoff.md`, `docs/citation_trajectory_archetypes.md`, `docs/evidence_cards_top12.md`, `docs/impact_breadth_evidence_audit.md`, Citation section | citation vs lag、trajectory、depth × breadth、四象限代表论文、2-3 条影响力发现；当前 handoff 已给出核心统计、报告段落、展示话术和 proxy 边界，#61 archetypes 已把 trajectory 拆成 5 类 observed-window 形状，#62 audit 已把 Top 12 breadth 案例分成 safe/proxy/human-check 三类 | 明确区分 citation depth、trajectory shape 和 breadth；说明 OpenAlex 近似指标限制；代表案例只使用已有 evidence URL 支撑的贡献表述 |
| F | [#7](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/7) | Network / Visual / Presentation：机构国家、视觉统一和展示 | `data/institution_stats.csv`, `data/country_stats.csv`, Network section, CSS/PPT, `docs/live_demo_fallback_script.md`, `docs/slide_visual_consistency_audit.md` | institution/country 发现、可选网络图升级、视觉统一检查、PPT 大纲、live demo 失败时的截图 fallback、幻灯片截图一致性检查 | Network baseline 正常；全站风格不被破坏；展示结构和备用截图路线可直接用；PPT 截图目的、owner、裁剪和 safe wording 已统一 |

F 模块补充交付：`docs/network_visual_presentation_handoff.md` 已把 Network 的 3 条 findings、60–70 秒展示话术、每个模块的截图/演示位置、视觉 QA 和 Issue #7 验收映射集中到一处。`docs/slide_visual_consistency_audit.md` 进一步列出全部 `docs/demo/*.png` 的 slide purpose、owner、截图尺寸、裁剪规则和 safe wording boundary。最终 PPT 制作时可直接复制这些文档的 Network 段落和截图对应表。


## Stretch issue routing

新增有意义任务不直接替代 #2-#7，而是作为各 owner 的加分任务保留在 `docs/stretch_issue_assignment_board.md`。当前路由：A → #53/#54/#52，B → #55/#56/#46，C → #57/#58/#50，D → #59/#60/#47，E → #61/#62/#49，F → #63/#64/#48/#51，跨模块 Story Builder → #45。#58 的 venue-year case notes 见 `docs/venue_year_case_studies.md` / `.csv`，#61 的 trajectory archetype 候选表见 `docs/citation_trajectory_archetypes.md` / `.csv`。A 的 PR review rubric 与合并标准见 `docs/pr_review_rubric.md`。

## Stretch / presentation-ready updates

- [#20](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/20)：最终展示包已补全为 `docs/presentation_pack.md` + `docs/final_presentation_blueprint.md`。现在包括 11 页 PPT 蓝图、8–10 分钟时间分配、每页主张/截图/speaker notes、B-F 发言准备项、safe wording boundaries 和离线截图 fallback。最终 PPT 只需把蓝图内容复制到 16:9 slides 并插入 `docs/demo/*.png`。
- [#41](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/41)：最终打包检查见 `docs/final_submission_packaging_checklist.md`。提交前按该文档确认 main 分支、页面运行、核心数据、截图、压缩包结构和 archive inspection，避免把缓存、旧 zip 或私有备份放进最终提交材料。
- [#43](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/43)：数据就绪矩阵见 `docs/data_readiness_matrix.md`。提交前用其中的 validation command 确认核心 CSV/手工模板存在、行数符合当前基线、关键字段没有丢失。

## A 已经先完成的一版 baseline

- Opening summary cards。
- Time：recognition lag histogram + publication → award timeline。
- Venue and Field：top venues + field map。
- Topic：topic distribution + topic evolution + representative paper detail card。
- Citation and Impact：citation vs lag + citation trajectories + depth × breadth scatter。
- Network：institution ranking + country/region ranking。
- README 本地运行说明。
- README demo 预览图：homepage、Time、Citation、Network 截图。
- PR 模板、最终 QA checklist、A 贡献记录。
- A 质量系统、队友任务卡、报告骨架、展示讲稿。

## A 的强化职责拆解

### 1. 项目架构

- 建好 GitHub 仓库和 teammate-facing 文件结构。
- 保证 root 下只有队友需要看的文件和文件夹。
- 维护 README、data dictionary、project plan、team division、work board。
- 把所有模块统一到同一个网页叙事，避免六个人各做一个散图。

### 2. Baseline 代码

- 写出 `index.html` 的全站结构和导航锚点。
- 写出 `src/app.js` 的统一数据加载、D3 绘图函数、tooltip、详情卡和 reading notes。
- 写出 `src/styles.css` 的整体视觉系统、卡片布局、响应式样式。
- 先让五个模块全部能跑，队友只需要在已有函数上继续优化。

### 3. GitHub 协作

- 把 B-F 的任务都拆成具体 Issue。
- 每个 Issue 写清：目标问题、已有 baseline、相关文件、继续做什么、报告小节、验收标准。
- 检查队友 PR 是否链接 Issue、是否写清数据和发现。
- 合并前后检查 main 分支是否仍可运行。

### 4. 内容和叙事把关

- 每个模块必须产生能写进报告的发现。
- 统一术语：Test of Time、recognition lag、citation trajectory、impact breadth、venue area。
- 统一限制说明：公开元数据、OpenAlex 近似指标、奖项历史差异、机构元数据缺失。
- 最终主线固定为：哪些 CS 研究经得起时间检验，以及这种长期影响体现在哪些时间、领域、主题、引用和网络模式中。

### 5. 队友减负与报告展示材料

- 维护 `docs/module_handoff_cards.md`，让 B-F 明确已有 baseline、主要数据、最低交付、高分增强方向和报告句式。
- 维护 `docs/report/report_skeleton.md`，让最终报告可以按模块直接填充。
- 维护 `docs/demo_script.md`，让展示时按同一条故事线讲，避免逐张图解释。
- 维护 `docs/a_lead_quality_system.md`，记录 A 的全局 baseline、review 标准和最终质量闸门。

### 6. 最终整合 QA

- 跑 `node --check src/app.js`。
- 本地启动页面，确认无 `Data loading failed`。
- 检查 summary cards、五个模块、tooltip、详情卡、reading notes。
- 检查所有数据文件存在，路径均为相对路径。
- 检查 README、报告贡献记录、最终 QA checklist。
- 更新 README demo 截图；截图前建议使用 `?present=1` 或按 `P` 打开 presentation mode，保证投影和 16:9 截图可读。
- 最终合并所有队友 PR 后再做一次全站截图/展示检查。

## 报告中 A 的贡献写法

可以直接写：

> 负责项目整体架构与协作整合：搭建 GitHub 仓库、设计 Issue/PR 协作流程、实现全站 D3 baseline，包括五个研究模块的数据加载、图表容器、tooltip、详情卡、summary cards 和统一视觉样式；后续负责 review 各模块 PR、检查数据路径与页面运行、统一图表叙事与最终提交 QA。该工作保证小组成员可以在已有可运行模块上并行优化，减少从零开始各自开发的成本。

更完整版本见：`docs/report/contribution_A.md`。A 的质量系统见 `docs/a_lead_quality_system.md`，队友任务卡见 `docs/module_handoff_cards.md`，报告骨架见 `docs/report/report_skeleton.md`，展示讲稿见 `docs/demo_script.md`，最终整合检查表见 `docs/final_qa_checklist.md`。
