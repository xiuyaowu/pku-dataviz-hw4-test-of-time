# 评分标准覆盖表

用途：把作业说明中的评分点逐条映射到当前仓库证据，最终提交前用于确认项目不是“只有页面”，而是覆盖选题、真实性、故事性、细节、报告和分工。

## 评分结构

作业总分 20 分：

- 小组课堂展示：8 分
- 可视化系统：12 分

项目目标：完成一个基于 D3.js 的 Web 可视化系统，课堂展示，并提交小报告说明完成过程。

## 1. 选题有价值，目的明确，并最终达到该目的

当前覆盖：

- 题目：哪些计算机研究经得起时间检验？
- 数据对象：Test of Time Award papers。
- 核心问题：一篇计算机论文在多年后仍被认为重要，通常具有什么共同特征？
- 页面结构按研究问题展开：Opening → Time → Venue / Field → Topic → Citation / Impact → Network。

证据文件：

- `README.md`
- `docs/project_plan.md`
- `docs/report/report_skeleton.md`
- `index.html`
- `src/app.js`

最终检查：

- [ ] 报告和展示开头明确说清“为什么研究 Test of Time Award”。
- [ ] 结尾回到核心问题，不只是复述图表。

## 2. 满足真实性要求：标注数据来源、说明数据处理方式

当前覆盖：

- 使用公开数据和开放科学 API。
- 保留主数据表、聚合表和派生指标。
- 明确 OpenAlex / sampled breadth 等指标限制。

证据文件：

- `data/papers_enriched.csv`
- `data/award_timeline.csv`
- `data/citation_trajectories.csv`
- `data/citing_breadth_metrics.csv`
- `docs/data_dictionary.md`
- `docs/report/report_skeleton.md`
- `README.md`

最终检查：

- [ ] 报告列出数据来源和字段含义。
- [ ] 报告说明 recognition lag、citation depth、impact breadth 的计算方式。
- [ ] 不把 OpenAlex sampled breadth 写成完整引用网络。

## 3. 作品有故事性，内容充实，易于理解

当前覆盖：

- 页面按一个连续叙事组织，而不是无关图表堆叠。
- 每个模块都有 research question / reading note / detail card 或 insight cards。
- README 提供 6 张 demo 截图，便于未运行页面时理解作品。

证据文件：

- `index.html`
- `src/app.js`
- `src/styles.css`
- `docs/demo/*.png`
- `docs/demo_script.md`
- `docs/quality_upgrade_plan.md`

最终检查：

- [ ] 每个模块至少有 2–3 条发现。
- [ ] 每个模块至少有 1 个代表案例。
- [ ] 展示时每个成员围绕同一主线讲，不各讲各的图。

## 4. 细节规范：交互流畅、配色合理、图形选择准确

当前覆盖：

- D3 页面已包含多种图表：histogram、timeline、bar chart、heatmap、scatter、trajectory、ranking cards。
- 有 tooltip、summary cards、reference/median guides、quadrant cards、selected-paper focus state。
- CSS 统一暗色视觉、卡片、网格、caption 和 responsive layout。

证据文件：

- `src/app.js`
- `src/styles.css`
- `docs/demo/*.png`
- `docs/final_qa_checklist.md`

最终检查：

- [ ] 本地运行无 JavaScript error。
- [ ] 图表不遮挡、不溢出。
- [ ] 色彩、legend、caption、tooltip 术语一致。
- [ ] 每种图表选择能解释对应数据类型。

## 5. 小报告写清团队成员分工和具体贡献

当前覆盖：

- 六人角色已拆成 GitHub Issues #2–#7。
- `docs/work_board.md` 映射每个人的模块、文件、交付物和 PR 标准。
- `docs/report/report_skeleton.md` 提供报告结构。
- `docs/report/contribution_A.md` 已记录 A 的具体贡献。

证据文件：

- `docs/team_division.md`
- `docs/work_board.md`
- `docs/module_handoff_cards.md`
- `docs/report/report_skeleton.md`
- `docs/report/contribution_A.md`
- GitHub Issues #2–#7

最终检查：

- [ ] 每位成员最终 PR 或文档中留下具体贡献。
- [ ] 报告按成员写清负责模块、数据、图表、发现和展示职责。

## 6. 课堂展示 8 分：建议展示结构

建议 8–10 分钟展示：

1. Opening：研究问题和数据规模。
2. Time：长期影响力往往是延迟确认。
3. Venue / Field：不同学术共同体沉淀长期影响的方式不同。
4. Topic：长期影响主题随计算机领域重心迁移。
5. Citation / Impact：高引用不等于全部，depth 与 breadth 共同解释影响。
6. Network：长期影响沉淀在机构、国家和共同体结构中。
7. Limitations：award history、metadata coverage、OpenAlex sampled proxy。
8. Conclusion：时间、主题、引用和网络共同刻画“经得起时间检验”。

证据文件：

- `docs/demo_script.md`
- `docs/demo/*.png`
- `docs/quality_upgrade_plan.md`

最终检查：

- [ ] 每个展示段落有一句核心结论。
- [ ] 每个展示段落最多讲一个主要图和一个案例。
- [ ] 结尾明确回应核心问题。

## 7. 当前距“最终提交”还需要队友完成的内容

这些不是仓库 baseline 的缺陷，而是小组协作项目最终成稿前必须补齐的人工内容：

- B–F 各自补模块发现和代表案例。
- D 补 5–8 篇代表论文 evidence URL。
- E 补四象限论文案例。
- F 补最终 PPT / demo flow。
- A 最后统一报告、截图、QA 和提交包。

如果这些补齐，本项目会同时覆盖系统、展示、报告、分工和真实性五个评分维度。