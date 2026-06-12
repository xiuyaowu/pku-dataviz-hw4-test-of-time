# Methods & Limitations

用途：给最终报告、展示和网页方法说明提供统一口径。写报告时可以直接压缩改写，不需要重新组织。

## Data source

本项目以计算机领域 Test of Time Award papers 为核心对象，基础论文列表来自公开整理的 Test of Time Award 数据，并结合 OpenAlex 等开放科学元数据补充论文、作者、机构、国家/地区、主题、引用和引用扩散相关字段。

更详细的数据来源和指标审计见：`docs/methodology/data_provenance_audit.md`。最终报告、展示稿和网页文案应统一采用其中的口径：公开元数据用于观察结构性模式，人工 annotation 用于解释单篇论文贡献；citation、breadth、institution/country counts 都不应被写成官方评奖原因或完整因果证据。

数据层级按四类维护：

| Layer | Role in project | Boundary |
|---|---|---|
| Award seed | 公开 Test of Time Award 论文列表，提供 title、year、announcement_year、venue 等基础记录。 | 支持描述当前数据集的获奖论文，不代表所有 CS 长期影响论文。 |
| Public metadata | OpenAlex 等开放元数据补充 authors、institutions、countries、concepts、citation_count。 | 支持结构性观察，不证明贡献大小、获奖原因或完整合作网络。 |
| Derived metrics | 基于 seed 和 public metadata 计算 recognition lag、citation trajectory、impact breadth、percentile 等。 | 只用于当前 250 篇内部比较，不是官方评价或跨领域绝对排名。 |
| Manual annotation | 成员人工阅读论文、award citation、项目主页和可信介绍后补充 contribution / evidence URL。 | 只有经过证据链接核查的内容才适合写成单篇论文贡献或工业影响判断。 |

主要数据文件：

- `data/papers_enriched.csv`：论文主表，包含题名、年份、venue、award year、topic、citation、institution、country、derived metrics 等。
- `data/award_timeline.csv`：publication year、announcement year、recognition lag 等时间线字段。
- `data/recognition_lag_distribution.csv`：recognition lag 的分布。
- `data/venue_stats.csv` / `data/venue_area_stats.csv`：会议和领域统计。
- `data/topic_stats.csv` / `data/topic_year_stats.csv`：主题分布和主题随年份变化。
- `data/citation_trajectories.csv`：论文逐年引用轨迹。
- `data/citing_breadth_metrics.csv`：基于 OpenAlex citing works sample 的影响广度近似指标。
- `data/institution_stats.csv` / `data/country_stats.csv`：机构和国家/地区统计。

## Key metric definitions

| 指标 | 标准定义 | 使用边界 |
|---|---|---|
| Recognition lag | `announcement_year - publication_year` | 描述奖项回看确认的时间尺度，不等于影响开始出现的时间。 |
| Citation depth | `citation_count` 与 yearly / cumulative citation trajectory | 描述公开元数据中的引用规模，不是论文重要性的唯一标准。 |
| Citation trajectory | `citation_trajectories.csv` 中逐年引用变化 | 用于观察引用形态，不能还原完整知识传播路径。 |
| Impact breadth | OpenAlex citing works sample 中 venue / field / institution / country 扩散范围的 proxy | 近似指标，不是官方影响力评分或完整 citation graph。 |
| Topic / venue area | 规则和公开元数据整理出的分析标签 | 适合聚合可视化，重点案例需人工校正。 |
| Institution / country distribution | 作者机构元数据中的可见分布 | 不能解释为完整合作网络或国家/机构贡献排名。 |

### Recognition lag

`recognition_lag = announcement_year - publication_year`

含义：一篇论文从发表到获得 Test of Time Award 的时间间隔。它用于衡量一个研究贡献被长期重新确认的时间尺度。

注意：recognition lag 不等于“影响出现的时间”，也不等于“论文开始被引用的时间”。它只表示奖项正式确认的滞后时间。

### Citation depth

Citation depth 主要用 `citation_count` 和逐年引用轨迹表示。

含义：论文被引用的强度，以及引用随时间变化的形态。

注意：高引用通常说明论文被广泛使用或讨论，但不自动等于“更重要”。不同领域引用习惯不同，论文年龄也会影响总引用数。

### Citation trajectory

`citation_trajectories.csv` 记录论文在不同年份的引用变化。

含义：用于区分持续增长型、早期爆发型、长期稳定型等影响模式。

注意：轨迹受数据库覆盖、论文发表年代、领域引用节奏影响。

### Impact breadth

Impact breadth 是基于 OpenAlex citing works sample 的近似指标，综合考虑 citing venue、field、institution、country 等扩散范围。

含义：用于估计论文影响是否跨越多个领域、机构或国家/地区。

注意：这不是完整引用网络，也不是官方影响力评分。它是公开元数据下的 sampled proxy，适合做结构性观察，不适合做绝对排名。

## Data processing summary

1. 将 Test of Time Award 论文整理成统一 schema。
2. 用公开科学元数据补充 DOI、OpenAlex ID、authors、institutions、countries、concepts、citation count 等字段。
3. 计算 derived fields，例如 recognition lag、topic label、citation depth、impact breadth。
4. 生成前端可直接读取的静态 CSV 文件，避免运行网页时依赖实时 API。
5. 用 D3.js 在浏览器端加载静态数据并渲染交互图表。

当前前端主要读取 250 篇可用论文的静态数据表。`citation_trajectories.csv` 含逐年引用记录，`citing_breadth_metrics.csv` 含 OpenAlex citing works sample 的广度字段；这些派生表用于比较和展示，不替代人工阅读 award citation 或论文原文。

## Human annotation boundary

以下内容需要人工证据，不应只从自动指标推断：

- 单篇论文的核心贡献是否 foundational；
- 工业系统、开源项目、标准协议或产品落地；
- 某个方向为何“经得起时间检验”的机制性解释；
- 代表案例在最终展示中的贡献描述。

人工补充时应记录 DOI、award citation、论文主页、项目主页、可信百科/机构介绍或其他 evidence URL。没有证据链接时，可以把相关内容写成“待核查案例”，不要写成确定结论。

## Visualization design rationale

- Time 模块使用 lag distribution 和 timeline，回答长期影响力的时间尺度。
- Venue / Field 模块使用 bar chart 和 heatmap，回答哪些学术共同体更常产生长期影响论文。
- Topic 模块使用 topic distribution、topic evolution 和 representative paper card，将统计分布落到具体研究主题。
- Citation / Impact 模块使用 scatter、trajectory 和 quadrant cards，区分 citation depth 与 impact breadth。
- Network 模块使用 institution / country ranking 和 KPI cards，展示长期影响在机构和地区层面的集中与扩散。

## Limitations

### Award history bias

不同会议设立 Test of Time Award 的年份、评奖传统和覆盖范围不同。因此，某个 venue 的获奖数量高，不应被直接解释为该 venue 更好或更重要。

### Coverage bias

数据依赖公开整理的 award list 和 OpenAlex 等开放元数据。某些论文的机构、国家、主题或引用信息可能缺失或不完整。

### Field normalization

不同领域引用习惯差异很大。系统中展示的 citation count 和 derived citation metrics 主要用于探索和比较模式，不能作为跨领域绝对影响力排名。

### Topic label uncertainty

Topic label 来自标题、abstract、concepts 等字段的自动或半自动归类，可能出现过粗、过细或误分的情况。最终展示中的代表论文应由人工核查。

### Impact breadth is approximate

Impact breadth 基于 OpenAlex citing works sample，不是完整 citation graph。它能帮助观察扩散范围，但不能证明真实学术影响的全部路径。

### Causality boundary

本项目展示的是数据中的关联和模式，不能直接证明 award committee 的评奖动机，也不能证明某个因素导致论文获得 Test of Time Award。

## Suggested report paragraph

本项目使用公开 Test of Time Award 论文列表作为基础数据，并结合 OpenAlex 等开放科学元数据补充论文主题、引用、机构与国家/地区信息。我们将 recognition lag 定义为获奖年份与发表年份之差，用于刻画研究贡献被长期确认的时间尺度；将 citation count 和 citation trajectory 用于描述引用深度；将基于 citing works sample 的 field、institution、country 扩散范围作为 impact breadth 的近似指标。需要注意的是，不同会议的奖项设立时间和评奖传统不同，OpenAlex 元数据也存在覆盖和归一化限制，因此本文的可视化结论主要用于观察长期影响力的结构性模式，而不将数量差异解释为绝对排名或因果关系。
