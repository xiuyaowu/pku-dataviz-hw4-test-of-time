# Data Provenance & Metric Definition Audit

用途：统一本项目页面与文档中的数据来源与指标口径，避免把公开元数据 proxy 写成官方评奖原因或因果结论。

## 1. Source boundary

| 数据层 | 当前文件 / 字段 | 来源与处理 | 可支持的结论 | 不应支持的结论 |
|---|---|---|---|---|
| Award seed | `papers_enriched.csv`, `award_timeline.csv` 中的 title、year、announcement_year、venue、awarded_by | 公开 Test of Time Award 论文列表整理后统一 schema；前端使用 250 条可用记录 | 描述当前数据集中哪些论文、会议、年份被记录为 Test of Time Award | 代表所有 CS 论文、所有长期影响论文或所有会议的完整排名 |
| Public metadata | authors、institutions、countries、concepts、OpenAlex IDs、citation_count | OpenAlex 等开放学术元数据补充；部分字段存在缺失和归并误差 | 做主题、机构、国家/地区、引用规模的结构性观察 | 证明单篇论文真实贡献大小、作者贡献比例或机构完整合作网络 |
| Derived metrics | recognition_lag、citation trajectory、impact_breadth_score、centrality、percentile | 基于上述 seed 与公开元数据计算，用于前端比较和报告解释 | 对当前 250 篇数据做内部比较，帮助定位案例和发现模式 | 官方评价、跨领域绝对排名、获奖因果解释 |
| Manual annotation | `manual_annotations/*`, evidence cards, report case notes | 成员人工阅读论文、award citation、项目主页或可信介绍后补充 | 支撑“为什么该论文经得起时间检验”的具体案例解释 | 在没有 evidence URL 时宣称工业影响、基础设施落地或官方评价 |

## 2. Canonical metric wording

| 指标 | 推荐写法 | 避免写法 |
|---|---|---|
| `recognition_lag` | “发表年份到获奖年份的间隔，用于描述奖项回看确认的时间尺度。” | “论文产生影响所需时间”或“研究价值成熟时间”。 |
| `citation_count` / citation depth | “公开元数据中的引用规模，作为被后续研究使用或讨论的近似入口。” | “论文重要性分数”或“获奖原因”。 |
| `citation_trajectory` | “逐年引用变化，用于观察影响是早期爆发、持续增长还是长期稳定。” | “完整影响生命周期”或“真实传播路径”。 |
| `impact_breadth_score` | “基于 OpenAlex citing works sample 的扩散广度 proxy，综合 citing venue/field/institution/country 范围。” | “官方影响力评分”“完整 citation graph”或“绝对广度排名”。 |
| `venue_area` / `topic_label` | “为了可视化和小组分析而统一的领域/主题标签，需要重点案例人工核查。” | “精确学科分类”或“论文唯一主题”。 |
| institution / country counts | “基于作者机构元数据的可见分布。” | “完整合作网络”“真实贡献份额”或“国家科研实力排名”。 |
| same-field percentile | “相对当前数据集中同领域样本的位置。” | “全 CS 排名”或“跨领域价值比较”。 |


## 3. 数据来源综述

> 本项目以公开 Test of Time Award 论文列表为 seed，并结合 OpenAlex 等开放学术元数据补充引用、主题、机构和国家/地区信息。Recognition lag 表示从发表到获奖的间隔；citation depth 和 citation trajectory 用于描述公开元数据中的引用规模与时间变化；impact breadth 是基于 OpenAlex citing works sample 的扩散广度近似指标。所有这些指标用于观察当前数据集中的结构性模式和代表案例，不被解释为官方评奖原因、完整引用网络或跨领域绝对排名。涉及单篇论文贡献、工业影响或基础设施落地的判断，均以人工阅读后补充的 evidence URL 为依据。

## 4. 解读边界

- “impact breadth” 始终带有 approximate / proxy / sample 边界。
- 不把 venue paper_count 写成会议质量排名。
- 不把 citation_count 写成论文重要性的唯一标准。
- 不把 institution/country counts 写成完整合作网络或国家实力排名。
- 代表论文的 contribution / industry impact / foundational status 均有 evidence URL。