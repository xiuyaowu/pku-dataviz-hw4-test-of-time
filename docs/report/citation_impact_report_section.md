# Citation & Impact 模块报告段落

## 核心论点：高引用不是全部

长期影响的评估需要超越单纯的引用计数。本研究通过对 250 篇 Test of Time 获奖论文的分析发现，citation count 与 recognition lag 的相关系数仅为 0.014，表明高引用并不必然带来更早的学术认可。更重要的是，引用轨迹形态揭示了不同的影响力模式：有些论文在发表早期达到引用峰值后进入稳定沉淀期，而另一些则展现出持续数十年的长尾传播特征。结合 impact breadth（OpenAlex sampled proxy）的四象限分析进一步表明，真正的长期影响需要同时考虑深度、广度、轨迹形态和识别延迟四个维度。引用深度反映学术传播规模，引用轨迹体现影响力随时间的变化模式，基于 OpenAlex 抽样的影响广度近似衡量跨领域、跨机构的扩散范围，而学术认可滞后则记录了论文发表到获奖的时间间隔。本项目将这些指标视为描述性观测信号，而非官方评奖依据；最终关于论文学术贡献的论述，仍需结合原文及证据链接进行人工核验。

## 代表案例对比

### DBSCAN (KDD 1996)：高深度/高广度的典范

DBSCAN（*A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise*）是高引用深度与广泛影响广度同时突出的典范案例。其引用量达 19,133，impact breadth（OpenAlex sampled proxy）得分为 81.1，引用轨迹呈现长尾稳定传播特征，2021 年仍达到年度引用峰值。这展示了方法范式如何在保持高引用深度的同时实现跨领域广泛扩散。

### AODV (WMCSA 1999)：深度与广度的 proxy sensitivity

AODV（*Ad-hoc On-Demand Distance Vector Routing*）则展示了 citation depth 与 impact breadth 之间的 proxy sensitivity。尽管其引用量高达 10,309，但 OpenAlex 采样的 impact breadth（OpenAlex sampled proxy）相对较低（44.25）。这种差异并非论文质量优劣的判断，而是反映了其影响主要集中在移动自组织网络（MANET）这一专业社区内，而非跨领域广泛扩散。AODV 的引用轨迹呈现早期峰值后沉淀特征，recognition lag 为 19 年，与 DBSCAN 的 18 年相近，但影响形态截然不同。

## 结论

这两个案例共同说明，评价研究的长期价值时，应综合考量引用深度、影响广度（公开元数据近似指标）、轨迹形态和识别延迟，避免将单一指标视为完整的影响力衡量标准。高引用是长期影响的必要非充分条件，而影响的形态和范围同样重要。需要强调的是，本研究使用的 impact breadth 是基于 OpenAlex citing works 抽样计算的近似指标，适合做相对比较而非官方评分或因果解释。

---

**谨慎表述边界检查**：
- ✅ 所有 impact breadth 均注明 "OpenAlex sampled proxy" 或"公开元数据近似指标"
- ✅ 未将 citation count 写成官方获奖原因
- ✅ AODV 分歧案例明确表述为 proxy sensitivity，而非论文优劣判断
- ✅ 未将 breadth 写成完整跨领域影响或官方评分