# 小组 Issue 分工表

用途：先把六个人的工作拆成 GitHub Issues，之后组长可以在 GitHub 上 assign 给具体队友。当前代码已经先做了一版全模块 baseline，队友可以在此基础上补发现、优化图表、填证据。

| 角色 | GitHub Issue | 模块 | 主要文件 | PR 合并标准 |
|---|---|---|---|---|
| A | [#2](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/2) | 项目负责人 / 初版网页实现 / GitHub 协作与代码整合 | `index.html`, `src/app.js`, `src/styles.css`, `README.md`, `docs/*`, 全站 QA | baseline 代码可运行 + 完成 PR review/merge + 最终整合验证 |
| B | [#3](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/3) | 发表年、获奖年与 recognition lag | `data/award_timeline.csv`, `data/recognition_lag_distribution.csv`, `src/app.js` Time functions | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |
| C | [#4](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/4) | 会议和领域分布 | `data/venue_stats.csv`, `data/venue_area_stats.csv`, Venue section | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |
| D | [#5](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/5) | 主题分布、演化和代表论文卡 | `data/topic_stats.csv`, `data/topic_year_stats.csv`, `manual_annotations/*`, Topic section | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |
| E | [#6](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/6) | 引用轨迹、深度和广度 | `data/citation_trajectories.csv`, `data/citing_breadth_metrics.csv`, Citation section | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |
| F | [#7](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/7) | 机构国家、视觉统一和展示 | `data/institution_stats.csv`, `data/country_stats.csv`, Network section, CSS/PPT | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |

## 统一 PR 要求

- 每个人从 `main` 新建自己的分支。
- 不直接改 `main`。
- PR 描述必须包含：做了什么、使用的数据、主要发现、需要别人注意的地方。
- 仓库已提供 `.github/pull_request_template.md`，发 PR 时按模板填写。
- 如果改了 `src/app.js`，本地先跑 `node --check src/app.js`。
- 如果改了页面，启动 `python3 -m http.server 8765 --bind 127.0.0.1` 后打开 `http://127.0.0.1:8765/index.html` 检查。

## 当前我已先做的一版 baseline

- Opening summary cards
- Time：recognition lag histogram + publication → award timeline
- Venue and Field：top venues + field map
- Topic：topic distribution + topic evolution + representative paper detail card
- Citation and Impact：citation vs lag + citation trajectories + depth × breadth scatter
- Network：institution ranking + country/region ranking
- README 本地运行说明

## A 组长贡献记录写法

报告中可以写：负责项目仓库与代码整合工作：搭建 GitHub 协作仓库并配置 PR 工作流，根据研究问题创建 Issues 分工；先实现完整的 D3 网页 baseline，包括页面结构、数据加载、多个核心图表、tooltip 交互、论文详情卡和统一视觉样式；后续负责 review 队友 PR，检查代码运行、数据路径、图表解释和最终整合质量。

可直接引用的更完整版本见：`docs/report/contribution_A.md`。最终整合检查表见：`docs/final_qa_checklist.md`。
