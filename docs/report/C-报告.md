# C 模块报告：Venue & Field 会议和领域分布

## 1. 模块问题

**哪些会议和研究领域更频繁地产生被 Test of Time Award 记录的论文？这种分布应该如何解释，哪些地方不能过度推断？**

## 2. 核心统计

### 2.1 Top venues

| Rank | Venue   | Area                 | Paper count | Avg lag | Avg citation | Avg breadth |
| ---: | ------- | -------------------- | ----------: | ------: | -----------: | ----------: |
|    1 | SIGIR   | IR                   |          35 |    19.8 |        951.1 |        53.6 |
|    2 | SIGCOMM | Networking           |          33 |    15.2 |       1284.8 |        52.8 |
|    3 | ICSE    | Software Engineering |          29 |    10.7 |        333.0 |        57.0 |
|    4 | ICCV    | CV                   |          24 |    16.2 |       3314.9 |        62.4 |
|    5 | SIGMOD  | Database             |          24 |    10.2 |       1340.3 |        56.8 |
|    6 | VLDB    | Database             |          20 |    10.0 |       1562.5 |        56.4 |

### 2.2 Top venue areas

| Rank | Area                 | Paper count | Avg lag | Avg citation | Avg breadth |
| ---: | -------------------- | ----------: | ------: | -----------: | ----------: |
|    1 | Database             |          44 |    10.1 |       1441.3 |        56.6 |
|    2 | Networking           |          38 |    14.6 |       1276.3 |        54.0 |
|    3 | IR                   |          35 |    19.8 |        951.1 |        53.6 |
|    4 | Software Engineering |          29 |    10.7 |        333.0 |        57.0 |
|    5 | CV                   |          24 |    16.2 |       3314.9 |        62.4 |
|    6 | AI                   |          19 |    18.6 |        585.1 |        55.6 |

### 2.3 Field × decade 读图提示

| Decade | 可见度最高的 areas                                       | 读法                                   |
| ------ | -------------------------------------------------- | ------------------------------------ |
| 1970s  | Software Engineering 4, Networking 3, CS 1         | 样本量小，只适合作为早期基础社区的线索。                 |
| 1980s  | IR 11, Networking 10, AI 8, Software Engineering 8 | IR、网络、AI、SE 在早期 Test-of-Time 记录中较可见。 |
| 1990s  | Database 24, IR 14, CV 13, Networking 10           | 数据库、IR、视觉在 1990s 形成较明显的长期影响记录。       |
| 2000s  | Networking 15, Database 13, DM/Web 12, IR 10       | 网络、数据库和数据挖掘/Web 的记录继续增长。             |

## 3. Findings

### Finding 1：Venue 分布高度集中与"长尾效应"

数据集呈现极强的集中度，前 3 个 Venue（SIGIR, SIGCOMM, ICSE）贡献了 38.8% 的论文，前 6 个 Venue（占比约 22.2%）则垄断了 66% 的席位。这个集中度说明 Test of Time Award 记录并非均匀覆盖所有 CS 社区，而是与具体会议是否设奖、何时设奖、公开记录是否完整高度相关，并不是会议绝对质量或学科重要性的线性排名。

各会议的原始论文获奖数（Paper Count）极大地受限于该会议首次颁奖年份、颁奖窗口期（Award Window Years）以及数据集中覆盖的出版年份。例如，SIGIR 有 35 篇获奖记录，是因为其拥有 5 年的颁奖窗口和长达 27 年的出版跨度。直接对比会议间的绝对获奖数量是不科学的。

### Finding 2：Database、Networking、IR 等社区形成主要观察入口

按 venue\_area 聚合后，Database 44、Networking 38、IR 35、Software Engineering 29、CV 24 位于前列。这些方向通常有清晰顶会体系、长期论文归档和较稳定的 retrospective award 机制，因此更容易形成可量化的长期影响记录。

**报告边界：** 数量多不能推出其他领域长期影响少，只能说明当前 award seed 对这些社区覆盖更充分。

在本次数据中，Database 是最大的"长影响领域"：Database（44）、Networking（38）、IR（35）远高于 Security、Systems 等领域。

这说明长期影响论文更容易出现在"基础设施型学科"；数据库、网络、IR 的核心问题几十年不变：如何组织数据？如何高效检索？因此经典论文更容易形成"标准范式"。而例如 Security 只有 6，安全领域变化快，很多论文生命周期较短。

### Finding 3：Field × Decade 热力图反映了不同年代长期影响研究社区的可见性变化

Field × Decade heatmap 展示的并不是"某个年代哪些学科最重要"，而是：在当前收集到的 Test-of-Time 奖项样本中，不同研究领域在不同年代的"长期影响记录"出现得更集中。它反映的是长期影响社区的可见性变化，而非整个计算机科学领域的完整历史结构。

从时间分布来看，1970s 的记录数量整体较少，主要集中在 Software Engineering 与 Networking，更多体现的是早期基础计算社区的形成。早期年代样本量较小，不能过度比较。进入 1980s 后，IR、Networking、AI 与 Software Engineering 的可见度明显提升，说明信息检索、网络与智能化研究开始形成具有持续影响力的方法论社区。到了 1990s，Database、IR 与 CV 出现显著集中，反映出互联网发展与数据规模扩张背景下，数据管理、信息检索与视觉计算逐渐成为长期影响论文的重要来源。2000s 则进一步呈现 Networking、Database 与 DM/Web 的持续增长，体现了 Web-scale infrastructure、分布式系统以及数据挖掘研究的快速发展。

总体而言，该 heatmap 表明：长期影响论文更容易集中于基础设施型研究社区，而不同年代的聚集特征则对应了不同技术范式与研究重点的演变。同时，需要注意的是，这种可视化呈现的是"长期影响记录的集中可见性"，而不是各学科在历史上的绝对重要程度。

## 4. Case 案例

### Case 1 — SIGIR

SIGIR 是在本次数据中长期影响论文最集中的 venue，SIGIR 以 35 篇显著领先，超过 SIGCOMM（33）和 ICSE（29）。Information Retrieval（IR）领域具有非常强的"方法持续复用"特征，很多经典 IR 思想（ranking、query modeling、language model、click feedback）会被后续十年以上研究持续继承。

IR 社区重视"Test of Time"文化。SIGIR 专门设立了自己的长期影响奖：<https://sigir.org/awards/test-of-time-awards/>

#### 代表论文："A Language Modeling Approach to Information Retrieval"

- **作者**：J. M. Ponte & W. B. Croft
- **发表会议 / 年份**：SIGIR 1998
- **Paper URL**：[ACM Digital Library Paper](https://dl.acm.org/doi/10.1145/290941.291008?utm_source=chatgpt.com)

它把 retrieval、probabilistic modeling、language generation 统一到 statistical framework。现代 BM25、neural reranking 都受到它影响。

### Case 2 — Database

#### 代表论文：*The R+-Tree: A Dynamic Index for Multi-Dimensional Objects*

- **作者**：Timos Sellis、Nick Roussopoulos、Christos Faloutsos
- **发表会议 / 年份**：VLDB 1987
- **DOI**：<http://hdl.handle.net/1903/4541>

解决了经典 R 树因节点矩形重叠导致查询变慢的难题。它提出的 R+ 树通过\*\*"裁剪"矩形、避免重叠\*\*的方法，让查询时无需走多条分支。这一思想直接启发了后来的 R\* 树等经典结构，奠定了空间索引"以查询效率优先"的重要方向，成为该领域长期引用的里程碑。

## 5. 候选论文案例

| Venue       | Candidate                                                               | Year | Citation | Lag | Why useful                          |
| ----------- | ----------------------------------------------------------------------- | ---: | -------: | --: | ----------------------------------- |
| SIGIR       | Probabilistic Latent Semantic Indexing                                  | 1999 |     3933 |  15 | 可连接 IR 的长期主题：检索模型、语义表示、后续文本/推荐系统影响。 |
| SIGCOMM     | Chord: A Scalable Peer-to-peer Lookup Service for Internet Applications | 2001 |     6403 |  10 | 可说明网络/分布式系统论文如何通过协议和系统设计长期影响后续研究。   |
| ICSE        | Who Should Fix This Bug                                                 | 2006 |      918 |  10 | 可说明软件工程长期影响不一定体现为最高引用，而是问题定义和工具链实践。 |
| ICCV        | Object Recognition from Local Scale-Invariant Features                  | 1999 |    16147 |  10 | 可连接 CV 高引用、高扩散和方法范式案例。              |
| SIGMOD/VLDB | Mining Association Rules Between Sets of Items in Large Databases       | 1993 |    14771 |  10 | 可连接数据库/数据挖掘如何成为跨场景分析。               |

## 6. Venue-Year 案例推荐

| Case         | Signal                                  | Presentation use                                        | Safe boundary                                 |
| ------------ | --------------------------------------- | ------------------------------------------------------- | --------------------------------------------- |
| SIGCOMM 1988 | 6 篇 Networking 论文，平均 lag 18.0 年         | 早期网络协议、路由、DNS、Internet architecture 的密集可见 cluster       | 只能说当前 award seed 中可见，不能说完整代表 1988 网络研究史。      |
| SIGIR 1999   | 3 篇 IR 论文，总引用 6,286                     | 检索模型、协同过滤、统计翻译形成同一 venue-year 的多主题线索                    | 不写成"SIGIR 最重要年份"，只写成一个适合展示的 IR case。          |
| ICCV 1999    | 4 篇 CV 论文，总引用 22,233，平均 breadth 62.3    | SIFT、texture synthesis、camera calibration 等方法型论文很适合课堂讲解 | citation / breadth 是 OpenAlex proxy，不是获奖原因证明。 |
| SIGMOD 1996  | 2 篇 Database 论文，平均 lag 10.0 年           | 对比 Database / Systems 社区较短 recognition window           | lag 是 award timing，不等于影响真正产生的速度。              |
| NSDI 2005    | 2 篇 Systems/Networking 论文，平均 lag 10.0 年 | 展示较新 venue 也能提供 compact Test-of-Time 案例                 | 样本小，只适合作为 bridge example。                     |

## 7. C 模块最终人工检查清单

- 打开 2–3 篇代表论文链接，核对题名、venue、年份和一句话贡献。
- 若使用 venue 数量榜或 field × decade heatmap，先查看 `docs/analysis/venue_source_traceability_audit.csv` 的 source / OpenAlex 覆盖和 careful wording boundary。
- 若写最终参考文献或 slide source note，先查看 `docs/methodology/source_citation_appendix.csv`，把 award seed、OpenAlex metadata、paper pages 和 manual evidence 分开引用。
- 若比较 venue counts，补查 `docs/analysis/venue_normalization_count_guide.csv` 的 publication-span / award-window denominator，并在报告或 PPT 中至少写一句 denominator caveat。
- 若把 Venue/Field 和 Topic Evolution 联动，先查看 `docs/analysis/topic_venue_crosswalk.csv`，只选择 2–3 个代表性交叉行，并保留"当前数据可见交叉"的表述边界。
- [x] 如果报告提到某 venue/area 的原因，补一句"当前数据可见分布 / award coverage"边界。
- [x] 不使用"官方排名""最强会议""最有价值领域"等绝对化表述。
- 和 Topic 模块联动时，只说"领域入口"和"主题线索"，不要把 venue\_area 等同于论文真实主题。
- [x] 若展示 field × decade heatmap，口头说明早期年代样本量较小，不能过度比较。

