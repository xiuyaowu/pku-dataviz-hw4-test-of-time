# 数据可视化 HW4 小组项目

## 项目题目

**哪些计算机研究经得起时间检验？——基于 Test of Time Award 数据的论文长期影响力可视化分析**

英文副标题：

**What Research Stands the Test of Time? Visualizing Long-Term Impact in Computer Science**

## 项目目标

本项目基于 Test of Time Award 论文数据，分析计算机领域中哪些研究在多年后仍然被认为具有重要影响。我们会从时间跨度、会议领域、研究主题、引用轨迹、影响扩散、作者机构网络等角度进行可视化分析。

核心问题：

> 一篇计算机论文在多年后仍被认为重要，通常具有什么共同特征？

## 协作规则：必须 Pull Request，不要直接改 main

为了避免文件互相覆盖、方便统一审核，本仓库采用 **always PR** 协作方式。

1. 不要直接 push 到 `main` 分支。
2. 每个人做自己的任务时，先从 `main` 新建分支。
3. 修改完成后提交到自己的分支，并发 Pull Request。
4. PR 需要审核后再合并。
5. 如果多人要改同一个文件，请先在群里同步一下。

推荐流程：

```bash
git checkout main
git pull origin main
git checkout -b feature/your-name-task

# 修改文件后
git add .
git commit -m "add: your task description"
git push -u origin feature/your-name-task
```

然后在 GitHub 页面创建 Pull Request。

## 仓库结构

```text
.
├── README.md
├── index.html
├── docs/
│   ├── project_plan.md
│   ├── team_division.md
│   └── data_dictionary.md
├── data/
│   ├── papers_enriched.csv
│   ├── award_timeline.csv
│   ├── recognition_lag_distribution.csv
│   ├── venue_stats.csv
│   ├── venue_area_stats.csv
│   ├── topic_stats.csv
│   ├── topic_year_stats.csv
│   ├── citation_trajectories.csv
│   ├── citing_breadth_metrics.csv
│   ├── institution_stats.csv
│   └── country_stats.csv
├── manual_annotations/
│   ├── manual_paper_annotations_top60_template.csv
│   └── 按方向拆分的 5 份待补充表
├── src/
│   ├── app.js
│   └── styles.css
├── 小组作业说明.md
└── 小组作业说明-20260415.pdf
```

## 当前基础网页

仓库已经包含一个可直接运行的 D3 网页基础版：`index.html` + `src/app.js` + `src/styles.css`。

当前页面包含 5 个研究问题模块：

1. Time：recognition lag 分布和核心时间尺度；
2. Venue & Field：会议排名和领域分布；
3. Topic Evolution：主题分布和代表论文详情卡；
4. Citation & Recognition：引用量与 recognition lag 的关系、引用轨迹；
5. Impact Network：机构和国家/地区分布。

这个版本的目标是作为小组协作底座：大家可以并行补充数据解释、优化单个图表、增加交互，不需要从零搭页面。

## 本地运行

不要直接双击打开 `index.html`，因为浏览器可能拦截本地 CSV 读取。请在仓库根目录启动一个本地静态服务器：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

然后在浏览器打开：

```text
http://127.0.0.1:8765/index.html
```

修改 `src/app.js` 或 `src/styles.css` 后，刷新网页即可查看效果。

## 分工概览

详细分工见：`docs/team_division.md`

| 成员 | 模块 | 主要任务 |
|---|---|---|
| A | 总负责 / 页面整合 | 故事线、网页框架、最终整合、README、报告总稿、提交检查 |
| B | 时间线与 recognition lag | 分析发表年、获奖年、recognition lag，做时间线和分布图 |
| C | 会议 / 领域分布 | 分析 venue、venue_area，做会议排名、领域分布、热力图 |
| D | 主题演化 | 分析 topic_label / concepts，做主题演化和代表论文卡片 |
| E | 引用轨迹与影响深度/广度 | 分析 citation trajectory、citation count、impact breadth |
| F | 作者机构网络 / 视觉 / PPT | 做机构网络、国家分布、统一视觉风格、准备展示 PPT |

## 推荐网页结构

1. Opening：项目引入和数据概览；
2. Time：时间检验奖一般多久后颁发；
3. Venue & Field：哪些会议/领域更容易产生长期影响；
4. Topic Evolution：长期影响论文的主题如何变化；
5. Citation & Recognition：高引用是否等于经得起时间检验；
6. Impact Network：长期影响如何跨作者、机构、国家扩散。

## 数据使用说明

优先使用 `data/` 目录下的 CSV 文件。每个成员做图时，请在 PR 里说明：

- 使用了哪些数据文件；
- 使用了哪些字段；
- 图表回答了哪个问题；
- 得到了哪些主要发现。

字段说明见：`docs/data_dictionary.md`

## 手工补充任务

`manual_annotations/` 中有 Top 60 代表论文的待补充表。手工补充主要用于网页中的论文详情卡和展示案例。

补充时注意：

- 内容尽量简洁，适合放进网页；
- 重要判断尽量附 evidence_url；
- 不确定的影响不要硬写；
- 主题标签尽量统一。

## 提交前检查

每个 PR 合并前请检查：

- 图表能正常打开；
- 数据路径使用相对路径，不要写本地绝对路径；
- 图表标题、caption、tooltip 能让人看懂；
- 主要发现有文字说明；
- 没有提交 `.DS_Store`、缓存、临时文件、无关大文件；
- PR 描述写清楚改了什么。

## 最终目标

最终作品应该像一个完整的数据故事，而不是几个图表拼在一起：

> 用可视化解释：哪些计算机研究真正经得起时间检验，以及这种长期影响力如何在时间、领域、主题、引用和合作网络中体现出来。
