# 数据字段说明

本仓库主要使用 `data/` 目录下的 CSV 文件。以下是常用文件和字段说明。指标口径的统一说明见 `docs/methodology/data_provenance_audit.md`；最终报告中应沿用这里的定义，不把公开元数据 proxy 写成官方评奖原因或因果结论。

## 通用来源与解释边界

| 数据层 | 包含内容 | 使用边界 |
|---|---|---|
| Award seed | Test of Time Award 论文标题、发表年、获奖年、venue、awarded_by | 只代表当前公开奖项记录中的可见论文，不代表所有 CS 长期影响论文。 |
| Public metadata | OpenAlex 等开放元数据中的作者、机构、国家/地区、主题、引用量 | 适合做结构性观察；可能有缺失、归并和覆盖误差。 |
| Derived metrics | recognition_lag、citation trajectory、impact_breadth_score、same-field percentile、centrality | 用于当前数据集内部比较；不是官方评价、完整引用图谱或获奖因果解释。 |
| Manual annotation | 成员补充的贡献解释、工业影响、evidence URL | 单篇论文贡献和工业/基础设施影响必须由人工证据支撑。 |

## 核心指标统一定义

| 指标 | 定义 | 报告中建议写法 |
|---|---|---|
| `recognition_lag` | `announcement_year - year` | 奖项回看确认的时间尺度；不等于论文开始产生影响的时间。 |
| `citation_count` / citation depth | 公开元数据中的引用规模 | 后续研究使用或讨论的近似入口；不能单独代表重要性或获奖原因。 |
| `citation_trajectory` | 逐年引用变化 | 用于观察早期爆发、持续增长或长期稳定等引用形态。 |
| `impact_breadth_score` | 基于 OpenAlex citing works sample 的扩散广度 proxy | 估计跨 venue / field / institution / country 的可见扩散范围；不是完整 citation graph。 |
| `venue_area` / `topic_label` | 为可视化统一整理的领域和主题标签 | 适合聚合分析；重点案例需人工核查。 |
| institution / country counts | 作者机构元数据中的可见分布 | 不能写成完整合作网络、机构排名或国家科研实力排名。 |

## `papers_enriched.csv`

论文主表，一行对应一篇论文。

常用字段：

| 字段 | 含义 |
|---|---|
| `paper_id` | 项目论文 ID |
| `title` | 论文标题 |
| `abstract` | 摘要 |
| `year` | 发表年份 |
| `announcement_year` | 获奖年份 |
| `recognition_lag` | 获奖年份 - 发表年份 |
| `venue` | 会议简称 |
| `venue_area` | 会议/论文所属领域 |
| `topic_label` | 主题分类 |
| `citation_count` | 当前引用量 |
| `influential_citation_count` | 影响力引用数，如该字段可用 |
| `impact_breadth_score` | 影响广度近似分数 |
| `authors_raw` | 原始作者字段 |
| `institutions` | 作者机构信息 |
| `countries` | 国家/地区信息 |

## `award_timeline.csv`

适合做时间线和 recognition lag 分析。

常用字段：

| 字段 | 含义 |
|---|---|
| `paper_id` | 论文 ID |
| `title` | 论文标题 |
| `year` | 发表年份 |
| `announcement_year` | 获奖年份 |
| `recognition_lag` | 从发表到获奖的间隔 |
| `venue` | 会议 |
| `venue_area` | 领域 |
| `topic_label` | 主题 |
| `citation_count` | 引用量 |
| `impact_breadth_score` | 影响广度近似分数 |

## `recognition_lag_distribution.csv`

适合做 recognition lag 分布图。

| 字段 | 含义 |
|---|---|
| `lag_bin` | recognition lag 区间 |
| `paper_count` | 论文数量 |
| `avg_citation_count` | 该区间平均引用量 |

## `venue_stats.csv`

适合做会议排名和会议对比。

| 字段 | 含义 |
|---|---|
| `venue` | 会议简称 |
| `venue_area` | 领域 |
| `paper_count` | 论文数量 |
| `first_publication_year` | 最早发表年份 |
| `last_publication_year` | 最晚发表年份 |
| `avg_recognition_lag` | 平均 recognition lag |
| `avg_citation_count` | 平均引用量 |
| `avg_impact_breadth_score` | 平均影响广度分数 |

## `venue_area_stats.csv`

适合做领域分布和领域比较。

| 字段 | 含义 |
|---|---|
| `venue_area` | 领域 |
| `paper_count` | 论文数量 |
| `avg_recognition_lag` | 平均 recognition lag |
| `avg_citation_count` | 平均引用量 |
| `avg_impact_breadth_score` | 平均影响广度分数 |

## `topic_stats.csv`

适合做主题分布。

| 字段 | 含义 |
|---|---|
| `topic_label` | 主题 |
| `paper_count` | 论文数量 |
| `avg_recognition_lag` | 平均 recognition lag |
| `avg_citation_count` | 平均引用量 |
| `avg_impact_breadth_score` | 平均影响广度分数 |

## `topic_year_stats.csv`

适合做主题随年份变化。

| 字段 | 含义 |
|---|---|
| `publication_year` | 发表年份 |
| `topic_label` | 主题 |
| `paper_count` | 论文数量 |
| `proportion` | 当年主题占比 |

## `citation_trajectories.csv`

适合做逐年引用轨迹。

| 字段 | 含义 |
|---|---|
| `paper_id` | 论文 ID |
| `title` | 论文标题 |
| `publication_year` | 发表年份 |
| `citation_year` | 引用年份 |
| `years_since_publication` | 距发表年份的年数 |
| `yearly_citations` | 当年引用量 |
| `cumulative_citations` | 累计引用量 |
| `venue` | 会议 |
| `topic_label` | 主题 |

## `citing_breadth_metrics.csv`

适合做影响扩散分析。这里的影响广度是基于可获得数据构造的近似指标，不应解释为官方评价。

| 字段 | 含义 |
|---|---|
| `paper_id` | 论文 ID |
| `citing_venue_count` | 引用来源 venue 数量 |
| `citing_field_count` | 引用来源领域数量 |
| `citing_institution_count` | 引用来源机构数量 |
| `citing_country_count` | 引用来源国家/地区数量 |
| `citing_year_span` | 引用年份跨度 |
| `impact_breadth_score` | 影响广度近似分数 |

## `institution_stats.csv`

适合做机构排名和机构网络。

| 字段 | 含义 |
|---|---|
| `id` | 机构 ID |
| `name` | 机构名称 |
| `country` | 国家/地区 |
| `paper_count` | 相关论文数量 |
| `centrality` | 网络中心性近似指标 |

## `country_stats.csv`

适合做国家/地区分布。

| 字段 | 含义 |
|---|---|
| `country` | 国家/地区 |
| `paper_count` | 论文数量 |
| `avg_citation_count` | 平均引用量 |
