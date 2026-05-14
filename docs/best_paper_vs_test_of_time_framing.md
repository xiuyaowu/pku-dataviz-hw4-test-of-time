# Best Paper vs Test of Time：研究问题转向说明

用途：给 C 模块、引言和展示开场提供一个安全、可复制的比较框架，解释本项目为什么不做“当年 Best Paper 热点榜”，而是研究 Test of Time Award 所记录的长期影响。

## 1. 一句话定位

Best Paper 更接近“发表当下的优秀研究信号”，Test of Time Award 更接近“多年后被学术共同体重新确认的长期影响信号”。本项目当前数据只能系统回答后者：哪些论文在十年或更长时间后仍被公开奖项记录为重要，以及这种长期影响在时间、领域、主题、引用和网络中如何留下痕迹。

## 2. 两类奖项回答的问题不同

| 维度 | Best Paper / 当年优秀论文 | Test of Time Award / 长期影响论文 | 本项目安全写法 |
|---|---|---|---|
| 时间窗口 | 发表当年或会议周期内的即时评价 | 发表多年后回看，常见 recognition lag 约 10–15 年 | 我们分析“延迟确认”，不是预测论文未来价值。 |
| 评价对象 | 新颖性、技术质量、问题重要性、完成度 | 后续研究是否持续引用、复用、扩展或重新解释 | 我们观察长期影响痕迹，不声称还原评奖委员会完整理由。 |
| 可视化重点 | 当年主题热点、方法创新、评审偏好 | 时间跨度、领域可见度、主题迁移、citation depth / breadth、代表案例 | 当前 dashboard 适合讲长期知识沉淀，而非年度竞赛结果。 |
| 数据风险 | 需要完整 Best Paper 历年列表和同年 accepted-paper baseline | 需要说明 award seed 覆盖、公开元数据缺失和 proxy 指标边界 | 没有完整 Best Paper 数据时，不做定量强比较。 |

## 3. 三条可用于开场 / 结论的 contrast bullets

1. **从即时优秀到长期确认**：Best Paper 关注研究刚发表时是否突出；Test of Time 关注多年后是否仍被社区引用、复用和纪念。
2. **从单年评奖到跨年轨迹**：Best Paper 更适合看年度主题和创新点；Test of Time 更适合看 recognition lag、citation trajectory、topic migration 和跨机构/跨领域扩散。
3. **从“谁赢了”到“为什么留下来”**：本项目不把论文简单排成榜单，而是把每篇论文放回时间、领域、主题、引用和网络证据中解释。

## 4. 可放入报告的段落

> 本项目最初可以被理解为对“优秀论文规律”的进一步追问：如果 Best Paper 代表发表当下的高质量信号，那么哪些研究在多年后仍能被学术共同体重新确认？由于当前可系统获取的数据是 Test of Time Award 论文记录，我们将研究问题从“年度最佳论文有什么特征”转向“长期影响论文在时间、领域、主题、引用和网络中呈现什么模式”。这种转向避免在缺少完整 Best Paper baseline 时做过度比较，也更契合数据本身能够支持的长期影响分析。

## 5. 可放入 PPT 的 40 秒讲法

> 我们没有把项目做成 Best Paper 热点榜，因为 Best Paper 回答的是“当年哪些工作最突出”。Test of Time Award 回答的是另一个问题：多年以后，哪些研究仍然被认为重要。这个时间差正是我们的可视化切入点，所以页面从 recognition lag 开始，再看 venue / topic / citation / network，最后回到具体论文证据。

## 6. C 模块如何使用

- 在 Venue & Field 模块里，把 venue 数量解释成“哪些社区更常以 retrospective award 记录长期影响”，不要写成 Best Paper 数量或会议质量排名。
- 如果展示者提到 Best Paper，只作为概念对照：short-term recognition vs long-term recognition。
- 不要声称 Test of Time 论文一定曾是 Best Paper，也不要声称 Best Paper 数据已经被本项目完整收集；没有完整 baseline 时不做定量比较。

## 7. 最终人工检查项

- [ ] 如果最终报告保留 Best Paper 对照，确认全文都使用“qualitative framing / conceptual comparison”，不写成定量比较结论。
- [ ] 如果后来补入真实 Best Paper 数据，另开数据来源、字段定义和 baseline coverage 审计。
- [ ] 展示时避免“Best Paper 不重要”这类价值判断；更安全的表达是“两类奖项回答不同时间尺度的问题”。
