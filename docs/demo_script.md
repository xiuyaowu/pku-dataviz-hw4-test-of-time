# 展示讲解脚本：6-8 分钟版本

目标：让展示像一个完整故事，避免逐个介绍图表。

## 0. 开场：研究问题（约 40 秒）

我们的问题是：哪些计算机研究经得起时间检验？

Test of Time Award 的特殊之处在于，它关注多年后仍被重新确认的长期价值。因此我们不只看“哪些论文获奖”，还看长期影响在时间、领域、主题、引用和研究网络中如何体现。

## 1. 数据概览（约 40 秒）

展示 Opening summary cards：论文数量、年份范围、会议/领域覆盖和 citation/breadth 等概览。

讲法：

> 这里先给出数据范围。我们把 Test of Time Award 记录和公开学术元数据结合，形成可以前端直接读取的静态数据表。后面的所有图都围绕同一批论文展开。

## 2. Time：长期影响需要多久被确认（约 1 分钟）

展示 recognition lag histogram、publication → award timeline，以及 Time Machine case cards。

讲法：

> recognition lag 是从发表年到获奖年的间隔，它直接对应“时间检验”的时间尺度。Time Machine 进一步把这个时间差落到单篇论文：我们不是说发表时就能准确预测它会获奖，而是展示多年之后哪些证据让它被重新确认。

## 3. Venue & Field：哪些学术社区更常记录长期影响（约 1 分钟）

展示 top venues 和 field map。

讲法：

> 这里观察哪些学术社区更频繁地通过 Test of Time Award 记录长期影响。不同会议的设奖历史和评奖传统不同，所以数量差异需要谨慎解释，不能直接当作会议质量排名。

## 4. Topic Evolution：长期影响主题如何变化（约 1 分钟）

展示 topic distribution、topic evolution、Representative Paper Lineage 和代表论文 detail card。

讲法：

> 主题模块把论文从 venue 维度推进到内容维度。长期影响论文并不固定在单一主题，而是随计算机领域的技术重心变化。Lineage 卡片用于把“主题出现很多次”转成“某类贡献为什么会被复用”，避免只展示抽象数量。

## 5. Citation & Recognition：高引用是否等于经得起时间检验（约 1.5 分钟）

展示 citation vs lag、trajectory、depth × breadth。

讲法：

> Citation count 可以衡量影响深度，但长期影响不只有“被引用很多”一种形态。我们进一步加入 impact breadth，观察影响是否跨越更多领域、机构或国家。这样可以区分在单一社区内部被反复引用的论文，以及扩散范围更广的论文。

## 6. Paper Explorer：把统计发现落回证据（约 50 秒）

展示 search / sort / field filter、archetype cards 和 paper list。

讲法：

> 为了避免只停留在总体趋势，我们加了一个可检索的 evidence index。展示时可以搜索某个主题或会议，也可以按 citation、breadth、lag 排序，快速找到代表论文并联动详情卡。这个模块相当于报告和答辩时的证据库：老师问到具体例子时，可以直接定位到论文。

## 7. Benchmark Lab：解释代表论文为什么有代表性（约 50 秒）

展示 selected paper percentile bars 和 interpretation lens。

讲法：

> 选中任意论文后，Benchmark Lab 会把它放回全数据集比较。新增的 Long-term Impact Signature 会把 citation depth、impact breadth、recognition lag、topic generality、venue memory 和 network spread 合成一个描述性画像。注意这里不叫预测模型：它解释这篇论文在当前 corpus 里的长期影响形态。

## 8. Network：影响如何在研究生态中分布（约 1 分钟）

展示 institution/country bubble、Global Memory Map 和 academic/industry split。

讲法：

> 最后我们把长期影响从单篇论文扩展到研究生态。Global Memory Map 展示公开 affiliation metadata 里哪些国家/机构反复出现，以及对应代表论文。这里一定不能讲成国家或机构排名；它是可见元数据地图。

## 9. 结尾：回答核心问题（约 40 秒）

讲法：

> 总结来看，经得起时间检验的研究通常需要多维观察。它可能经历较长 recognition lag，出现在特定学术社区和主题演化节点上，在引用轨迹中持续累积影响，并通过机构和地区网络扩散。新增的 Time Machine、Lineage、Impact Signature 和 Global Memory Map 让这个项目从 dashboard 变成一条证据故事：从时间差，到贡献路径，到单篇画像，再到研究生态。

## 备选 Q&A

### Q1：为什么不用 Best Paper，而用 Test of Time Award？

Best Paper 更接近发表时的即时评价，Test of Time Award 更符合“经得起时间检验”的题目，因为它关注多年后仍被认可的研究贡献。

### Q2：引用量能不能代表长期影响？

不能完全代表。引用量是重要线索，但会受领域规模、论文年龄、社区习惯影响。因此我们同时展示 recognition lag、topic、venue、impact breadth 和 network。

### Q3：数据有什么限制？

奖项覆盖不完整，不同会议设奖历史不同；公开元数据存在缺失；impact breadth 和 network 属于近似指标，不能直接解释为官方评奖原因。
