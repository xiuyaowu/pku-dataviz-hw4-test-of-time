# 数据字段说明

本仓库主要使用 `data/` 目录下的 CSV 文件。以下是常用文件和字段说明。

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
