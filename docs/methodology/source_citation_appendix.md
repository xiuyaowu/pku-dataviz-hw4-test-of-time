# 数据来源与引用附录

本页按层级整理项目使用的数据来源，区分来源声明、proxy 指标和人工证据。配合 `docs/methodology/data_provenance_audit.md` 和 `docs/methodology/methods_and_limitations.md` 阅读。

## 来源层级与覆盖情况

| 来源层级 | 覆盖情况 | 用途 | 解读边界 |
|---|---|---|---|
| Award seed（获奖名单） | 250 / 250 篇论文均有 `source_url` | 数据集构建、获奖时间、venue/year 覆盖 | 当前公开的 Test-of-Time 获奖记录，不是所有具长期影响的计算机论文 |
| 论文 / DOI 页面 | 245 / 250 篇有 `paper_url`；193 / 250 篇有 DOI | 代表论文引用与案例卡片 | 链接用于定位来源记录，本身不构成贡献或采用情况的证明 |
| OpenAlex 元数据 | 248 / 250 篇有 OpenAlex ID | citation depth、主题、机构、国家及数据集内部比较 | 公开元数据 proxy，不是官方评奖原因或完整引用图谱 |
| 引用轨迹 / 扩散广度 | 3,077 条逐年引用记录；248 / 250 篇有 breadth 抽样 | 引用轨迹形态、impact breadth proxy、案例选取 | 观察窗口内的抽样 proxy，不是获奖的因果效应 |
| 人工代表论文证据 | Top 12 每篇有两条 evidence URL | 贡献描述与论文级案例说明 | 论文级事实表述以所附证据页面为依据 |

## 来源综述

本项目以公开的 Test of Time Awards 获奖名单为种子数据，对其中 250 篇可用论文补充公开学术元数据：DOI 或论文页面、OpenAlex ID、引用量、concepts、机构、国家、逐年引用轨迹和引用文献抽样的扩散广度字段。这些元数据支持数据集内部的描述性比较；涉及单篇论文贡献、基础性地位或工业影响的判断，以人工证据层所附的 evidence URL 为依据。

## 参考来源分层

1. 公开 Test of Time Awards 获奖名单（award seed）；
2. OpenAlex：引用、concepts、机构归属和 works ID 的公开学术元数据来源；
3. 代表论文的 DOI、ACM、IEEE、DBLP 或出版方页面；
4. `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv` 中列出的 evidence URL（用于贡献与影响相关判断）；
5. 本项目生成的派生数据表（`citation_trajectories.csv`、`citing_breadth_metrics.csv` 及各模块聚合 CSV），均为公开元数据的派生结果，不构成独立权威来源。
