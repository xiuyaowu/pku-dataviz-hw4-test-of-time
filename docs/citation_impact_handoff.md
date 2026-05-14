# E 模块 handoff：Citation & Impact

用途：给 Issue #6 / E 成员一个可直接写报告和展示的 citation depth / trajectory / breadth 分析底稿。这里的数字来自当前 `data/papers_enriched.csv`、`data/citation_trajectories.csv`、`data/citing_breadth_metrics.csv`，最终报告采用前仍建议打开代表论文 evidence URL 与 award citation 做人工核查。Trajectory archetype 候选表见 `docs/citation_trajectory_archetypes.md` / `.csv`；Top 12 breadth 证据分级和安全话术见 `docs/impact_breadth_evidence_audit.md`。

## 1. 模块研究问题

**高引用是否等于经得起时间检验？长期影响更像 citation depth，还是 influence breadth？**

本模块建议把答案写成三层：

1. citation depth：一篇论文被后续工作引用的规模，是影响强度入口；
2. citation trajectory：影响是在早期爆发、长期长尾，还是近期仍在增长；
3. impact breadth：OpenAlex citing works sample 下跨 venue / field / institution / country 的扩散近似指标。

核心展示句：**长期影响不只是被引用次数，还包括研究贡献被多少不同领域和共同体吸收。**

## 2. 当前数据快照

| 指标 | 当前值 | 写作口径 |
|---|---:|---|
| Test of Time papers | 250 | 当前可用 award seed 样本，不代表全部 CS 论文。 |
| citation count 中位数 | 523.5 | 用于 depth × breadth 四象限分割。 |
| recognition lag 中位数 | 12 年 | lag 是获奖确认时间间隔，不是影响产生时间。 |
| impact breadth score 中位数 | 57.56 | OpenAlex sampled proxy，不是完整 citation graph。 |
| citation count 与 recognition lag 相关系数 | 0.014 | 近似无明显线性关系，适合支撑“高引用不必然更早获奖”。 |

## 3. 三条可写入报告的 findings

### Finding 1：高引用不是更早被确认的充分条件

当前 250 篇中，citation count 与 recognition lag 的 Pearson 相关系数约为 **0.014**，几乎没有明显线性关系。换言之，高引用论文常常是代表案例，但它们不一定更早获得 Test of Time 认可。

可写段落：

> Citation vs recognition lag 显示，高引用并不自动对应更短的获奖确认周期。当前数据中 citation count 与 recognition lag 的线性相关很弱，说明 Test of Time 认可并不是简单按照引用量排序；它更像一种回看式判断，需要结合研究贡献、社区吸收和奖项制度共同解释。

安全边界：不要写成“引用量与获奖无关”。更稳妥的说法是“当前样本中未呈现明显线性关系”。

### Finding 2：trajectory 能区分早期爆发与长尾传播

`citation_trajectories.csv` 中大多数论文属于早期爆发后稳定或长尾传播。示例：

| 类型 | 代表案例 | 数据提示 | 解释方向 |
|---|---|---|---|
| 长尾稳定传播 | `A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise` | yearly citation peak 在 2021 年，2012–2026 累计轨迹仍有长尾 | DBSCAN 从数据库/数据挖掘方法扩散为广泛使用的聚类范式。 |
| 早期爆发后稳定 | `Object Recognition from Local Scale-Invariant Features` | 2016 年附近达到 yearly citation peak，近三年占比下降 | SIFT 在视觉领域形成强基准后，后续引用进入稳定沉淀期。 |
| 近期仍强的小样本案例 | `Extensible/Rule Based Query Rewrite Optimization in Starburst` | 近三年 citation share 较高，但总量较小 | 可作为“不是所有长期影响都表现为大规模高引用”的辅助说明。 |

安全边界：trajectory 只覆盖当前 CSV 中可用年份窗口，不能解释完整历史生命周期。

更完整的 trajectory 分类见 `docs/citation_trajectory_archetypes.md`：它把候选论文分成早期峰值后沉淀、长尾稳定传播、近期仍在上升、高深度+高广度、广度高于引用深度五类，适合从中挑 2–3 个对比案例进入最终报告或 PPT。

### Finding 3：impact breadth 补充了 citation depth 无法表达的扩散范围

Depth × breadth 的四象限能把长期影响拆成不同形态。当前四象限用 citation count 中位数 **523.5** 和 impact breadth 中位数 **57.56** 做参考线：

| 象限 | 代表论文候选 | Citation | Breadth | 报告解释 |
|---|---|---:|---:|---|
| 高 depth / 高 breadth | `A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise` | 19133 | 81.1 | 强引用 + 广扩散，适合作为方法范式扩散案例。 |
| 高 depth / 低 breadth | `Ad-hoc On-Demand Distance Vector Routing` | 10309 | 44.2 | 引用强度高，但 sampled breadth 相对低，适合说明社区内深度影响。 |
| 低 depth / 高 breadth | `Ethane: Taking control of the Enterprise` | 522 | 71.1 | citation 不在上半区但 breadth 高，适合做“广扩散不等于最高引用”的反直觉案例。 |
| 低 depth / 低 breadth | `X-Trace: A Pervasive Network Tracing Framework` | 408 | 56.8 | 可作为 baseline/reference，不应过度解释成“影响低”。 |

安全边界：impact breadth 基于 OpenAlex citing works 抽样和字段归并，适合做相对比较和案例筛选，不适合写成官方影响力评分。

## 4. Topic / venue 连接点

如果最终报告需要把 E 模块和 D/C 模块连接起来，可以使用下面两个桥接点：

- Computer Vision 主题在当前数据中平均 citation count 较高（约 2848.7）且平均 breadth 也较高（约 61.2），适合解释“可复用算法/数据集/视觉基准”如何形成跨任务扩散。
- Database / Systems 样本量最大（67 篇），平均 citation count 约 1059.1、平均 breadth 约 55.6，适合解释系统和数据管理论文常常通过基础设施、查询优化、复制、数据挖掘方法形成长期沉淀。

写作时注意：topic label 来自自动规则/API 元数据，重点案例进入最终报告前需要人工确认主题归类。

## 5. 60 秒展示话术

> Citation 模块想回答的是：高引用是不是就等于经得起时间检验？从 scatter 看，citation count 和 recognition lag 没有明显线性关系，所以高引用并不必然更早被确认。接着看 trajectory，可以区分早期爆发后沉淀的论文和长期持续传播的论文。最后 depth × breadth 把引用总量和扩散范围分开：DBSCAN 属于高 depth、高 breadth 的方法范式扩散案例；Ethane 这类 citation 不是最高但 breadth 较高的论文提醒我们，长期影响也可能体现为跨领域、跨机构或跨应用场景的传播。不过 breadth 是 OpenAlex 抽样 proxy，最终解释仍要回到具体论文贡献和 evidence URL。

## 6. E 成员最终人工检查清单

- [ ] 打开最终选入报告的 2–4 篇代表论文 evidence URL，确认一句话贡献没有误读。
- [ ] 四象限至少各保留 1 个案例；课堂展示优先讲 2 个对比清楚的案例即可。
- [ ] 报告中所有 `impact breadth` 后面至少第一次出现时写明 `OpenAlex sampled proxy` 或“公开元数据近似指标”。
- [ ] 不把 citation count 写成官方获奖原因，不把 breadth 写成完整 citation graph。
- [ ] 若补充工业影响或 foundational impact，必须加入 evidence URL，而不是由指标推断。
