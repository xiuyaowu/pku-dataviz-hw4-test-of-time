# 小组 Issue 分工表

用途：先把六个人的工作拆成 GitHub Issues，之后组长可以在 GitHub 上 assign 给具体队友。当前代码已经先做了一版全模块 baseline，队友可以在此基础上补发现、优化图表、填证据。

| 角色 | GitHub Issue | 模块 | 主要文件 | PR 合并标准 |
|---|---|---|---|---|
| A | [#2](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/2) | A · 页面整合 / PR 管理 / 最终提交 QA | `README.md`, `docs/*`, 全站 QA | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |
| B | [#3](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/3) | 发表年、获奖年与 recognition lag | `data/award_timeline.csv`, `data/recognition_lag_distribution.csv`, `src/app.js` Time functions | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |
| C | [#4](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/4) | 会议和领域分布 | `data/venue_stats.csv`, `data/venue_area_stats.csv`, Venue section | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |
| D | [#5](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/5) | 主题分布、演化和代表论文卡 | `data/topic_stats.csv`, `data/topic_year_stats.csv`, `manual_annotations/*`, Topic section | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |
| E | [#6](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/6) | 引用轨迹、深度和广度 | `data/citation_trajectories.csv`, `data/citing_breadth_metrics.csv`, Citation section | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |
| F | [#7](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/7) | 机构国家、视觉统一和展示 | `data/institution_stats.csv`, `data/country_stats.csv`, Network section, CSS/PPT | 有可运行页面 + 2-3 条发现 + PR 描述写清数据来源 |

## 统一 PR 要求

- 每个人从 `main` 新建自己的分支。
- 不直接改 `main`。
- PR 描述必须包含：做了什么、使用的数据、主要发现、需要别人注意的地方。
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
