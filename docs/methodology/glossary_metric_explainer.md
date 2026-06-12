# 术语与指标说明

本页定义网页和文档中统一使用的核心术语。凡是由公开元数据（而非人工阅读）派生的指标，均按"观察到的模式 / proxy / 抽样指标"理解，不解释为官方评奖原因或因果证明。

| 术语 | 含义 | 出现位置 | 解读边界 |
|---|---|---|---|
| Test of Time Award | 论文发表多年后颁发的回顾性奖项，表彰仍具影响力的工作。 | 项目定位、各模块 | 数据集覆盖的是公开 Test-of-Time 获奖记录中的论文，不是所有具长期影响的计算机论文。 |
| Recognition lag | `announcement_year - publication_year`，从发表到获奖公告的年数。 | Time 模块、时间线 | 度量的是"被正式确认的延迟"，不是影响力开始的确切时间。 |
| Citation depth | 论文在公开学术元数据中积累的引用规模。 | Citation 模块、Benchmark Lab | 引用规模是影响力信号之一，不是重要性的唯一定义。 |
| Citation trajectory | 引用量随年份变化的形态，如长尾持续关注或近期回升。 | 引用轨迹图 | 轨迹类别描述的是 OpenAlex 可见时间窗口，不是完整的论文生命周期。 |
| Impact breadth | 论文在抽样引用文献的领域、机构、国家和年份维度上的扩散广度 proxy。 | Depth × Breadth 散点图、Benchmark Lab | 基于 OpenAlex 抽样的扩散范围近似值，不是完整引用网络。 |
| OpenAlex proxy | 由 OpenAlex 记录派生的指标或元数据字段。 | 方法与限制说明 | 适用于可视化和数据集内部比较；论文级的强结论需要人工证据支撑。 |
| Venue area | 给会议归一化出的领域标签，如 Database、Networking、IR、CV、SE。 | Venue & Field 模块 | 用于社区分组，不是完美的学科分类体系。 |
| Topic label | 由标题、摘要、concepts 字段自动归类得到的主题标签；代表论文的标签经过人工修正。 | Topic 模块、证据卡 | 自动标签用于呈现整体趋势；代表案例使用人工核查后的标签。 |
| Same-field benchmark | 选中论文与同领域（venue area / topic 邻域）论文的对比。 | Benchmark Lab | 可减少跨领域引用习惯差异带来的偏差，但仍依赖标签质量和数据集覆盖。 |
| Evidence card | 论文级卡片，含标题、会议/年份、贡献摘要、证据链接和代表性理由。 | Paper Explorer | 每张卡片附 evidence URL；proxy 类信息保持谨慎表述。 |
| Award-history bias | 各会议设立 Test-of-Time 奖项的时间和公开记录完整度不同造成的差异。 | Venue 模块、限制说明 | venue 数量是可见获奖记录数，不是会议质量排名。 |
