# 术语与指标说明

本页定义网页和文档中统一使用的核心术语。指标的已知限制见 `docs/methodology/methods_and_limitations.md`。

| 术语 | 含义 | 出现位置 |
|---|---|---|
| Test of Time Award | 论文发表多年后颁发的回顾性奖项，表彰仍具影响力的工作。 | 项目定位、各模块 |
| Recognition lag | `announcement_year - publication_year`，从发表到获奖公告的年数。 | Time 模块、时间线 |
| Citation depth | 论文在公开学术元数据中积累的引用规模。 | Citation 模块、Benchmark Lab |
| Citation trajectory | 引用量随年份变化的形态，如长尾持续关注或近期回升。 | 引用轨迹图 |
| Impact breadth | 论文在抽样引用文献的领域、机构、国家和年份维度上的扩散广度 proxy。 | Depth × Breadth 散点图、Benchmark Lab |
| OpenAlex proxy | 由 OpenAlex 记录派生的指标或元数据字段。 | 方法与限制说明 |
| Venue area | 给会议归一化出的领域标签，如 Database、Networking、IR、CV、SE。 | Venue & Field 模块 |
| Topic label | 由标题、摘要、concepts 字段自动归类得到的主题标签；代表论文的标签经过人工修正。 | Topic 模块、证据卡 |
| Same-field benchmark | 选中论文与同领域（venue area / topic 邻域）论文的对比。 | Benchmark Lab |
| Evidence card | 论文级卡片，含标题、会议/年份、贡献摘要、证据链接和代表性理由。 | Paper Explorer |
| Award-history bias | 各会议设立 Test-of-Time 奖项的时间和公开记录完整度不同造成的差异。 | Venue 模块、限制说明 |
