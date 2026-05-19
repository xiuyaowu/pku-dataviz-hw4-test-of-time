# D 模块 handoff：Topic Evolution

用途：给 Issue #5 / D 成员一个可直接写报告和展示的 topic evolution 分析底稿。这里的数字来自当前 `data/topic_stats.csv`、`data/topic_year_stats.csv`、`data/papers_enriched.csv` 和 `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`。Top 12 代表论文的 API topic vs manual topic 核查见 `docs/manual_topic_audit_top12.md` / `.csv`；contribution archetype 分类见 `docs/research_archetype_taxonomy.md` / `.csv`；topic presentation case shortlist 见 `docs/topic_presentation_case_shortlist.md` / `.csv`；topic × venue crosswalk 见 `docs/topic_venue_crosswalk.md` / `.csv`；automatic topic 与 manual audit 的一致性检查见 `docs/topic_label_consistency_check.md` / `.csv`。最终报告采用前仍建议打开代表论文 evidence URL 与 award citation 做人工核查。

## 1. 模块研究问题

**长期影响论文集中在哪些技术主题？这些主题是否随年代变化？哪些代表论文能解释“为什么经得起时间检验”？**

本模块建议把答案写成三层：

1. topic distribution：长期影响不是单一主题现象，而是系统、数据、视觉、语言、理论等方向共同构成的谱系；
2. topic evolution：不同年代的主题重心会迁移，Database / Systems 长期稳定，Data Mining / Web 在 1990s–2000s 变得更突出；
3. representative evidence：代表论文卡片把自动主题标签落回具体贡献，避免只讲数量柱状图。

核心展示句：**经得起时间检验的研究通常不是一个领域独占，而是在基础设施、算法范式和可复用工具之间反复沉淀。**

## 2. 当前数据快照

| 指标 | 当前值 | 写作口径 |
|---|---:|---|
| Test of Time papers | 250 | 当前可用 award seed 样本，不代表全部 CS 论文。 |
| topic labels | 22 | 来自规则/API 元数据，重点案例需要人工校正。 |
| Top 5 topics coverage | 200 / 250 | 说明当前数据中长期影响论文集中在少数大类，但不是官方学科分类。 |
| Largest topic | Database / Systems，67 篇 | 适合说明系统、数据库、网络基础设施的长期沉淀。 |
| Highest avg citation among large topics | Computer Vision，约 2848.7 | 受 SIFT、Snakes、DBSCAN 等高引用案例影响；DBSCAN 已在人工表中修正为 Data Mining / Clustering。 |
| Highest avg breadth among large topics | Computer Vision，约 61.24；Data Mining / Web，约 58.41 | breadth 是 OpenAlex sampled proxy，只适合做相对扩散线索。 |

Top 5 topic 当前统计：

| Topic | Papers | Avg citation | Avg breadth | Publication span | 报告解释方向 |
|---|---:|---:|---:|---|---|
| Database / Systems | 67 | 1059.1 | 55.58 | 1974–2008 | 基础设施、查询优化、分布式系统、数据库方法长期复用。 |
| Data Mining / Web | 46 | 1189.0 | 58.41 | 1974–2008 | Web、图、搜索、数据挖掘方法向多个应用场景扩散。 |
| Computer Vision | 43 | 2848.7 | 61.24 | 1982–2006 | 图像特征、分割、识别基准带来高引用和跨任务复用。 |
| Natural Language Processing | 26 | 1333.9 | 58.21 | 1980–2008 | 语言模型、IR/NLP 统计方法和表示学习形成长期影响。 |
| Machine Learning Theory | 18 | 892.4 | 56.22 | 1975–2007 | 理论框架、优化和学习算法为后续方法提供基础。 |

## 3. 三条可写入报告的 findings

### Finding 1：经时间检验的研究高度集中在少数基础主题，形成稳定的核心贡献谱系

从主题分布来看，长期影响力论文并非均匀分布在所有领域，而是高度集中在少数基础技术主题：Database / Systems 以 67 篇成为最核心的研究方向，Data Mining / Web（46 篇）、Computer Vision（43 篇）紧随其后，三者合计占比超过总数的一半。这些方向的长期主导地位并非偶然，而是因为它们提供了计算机科学的底层支撑能力，无论是数据库的存储管理、数据挖掘的模式发现，还是计算机视觉的感知理解，都为后续数十年的应用与研究提供了可复用的技术框架。相比之下，新兴应用类主题的长期留存率明显更低，说明 “时间检验” 更青睐具备底层通用性的基础方向，而非短期热点。

安全边界：topic label 是自动归类结果，不是官方学科标签；重点论文最终写入报告前需要人工核对。

### Finding 2：经典研究普遍存在显著的 “认知滞后”，价值需要长期实践验证

数据显示，被长期认可的经典论文普遍存在较长的认知滞后（recognition lag）：以 DBSCAN 为例，1996 年发表的论文直到 2014 年才达到影响力高峰，滞后长达 18 年；部分信息检索领域的早期论文滞后时间甚至超过 30 年。这种滞后并非个例，而是长期影响力研究的共性特征。其背后的原因在于，基础性创新往往需要等待配套技术成熟、应用场景普及，其价值才能被行业充分认知与复用。这也说明，真正经得起时间检验的学术贡献，其价值不是发表时就能立刻被理解的，而是需要通过跨代的实践与验证，才能最终沉淀为领域的核心知识。

安全边界：认知滞后基于当前样本统计，不代表所有领域的统一规律。

### Finding 3：穿越时间的高影响力成果，以 “范式奠基型” 工作为主

在长期影响力的论文中，基础算法、理论框架、范式奠基类工作占比极高：DBSCAN 定义了密度聚类的范式，Apriori 奠定了关联规则挖掘的框架，SIFT 开创了局部不变特征的研究方向，这些成果都不是单一的技术改进，而是为整个子领域提供了通用的方法论与工具。这类工作的通用性极强，不依赖特定的硬件或应用场景，因此能在数十年间持续被引用与拓展。相比之下，短期应用导向的技术迭代往往随平台与场景变化而快速过时，难以形成长期影响力。这表明，计算机科学领域中，真正能穿越时间周期的，是那些定义了 “问题 - 方法 - 评价标准” 的范式级贡献，而非一次性的技术突破。


安全边界：结论基于当前 Test‑of‑Time 样本，不代表对所有研究类型的价值评判。

## 配套报告
在本次分析的时间检验奖论文中，计算机科学研究的长期影响力呈现出清晰的主题规律：获奖成果高度集中在数据库 / 系统、数据挖掘、计算机视觉等基础技术主题，形成稳定且跨年代的核心贡献谱系。这些经典工作普遍存在 10–34 年的认知滞后，其学术价值与实际意义需要长期实践、技术成熟与行业普及才能被充分验证。从贡献类型来看，具备时间检验价值的成果多为范式奠基型工作，包括基础算法、理论框架与系统设计，这类研究通用性强、可复用度高，不依附于短期技术浪潮，因此能够持续支撑领域发展并穿越时间周期。

## 4. Topic × citation breadth 连接点

如果最终报告需要把 D 模块和 E 模块连起来，可以使用下面两个桥接点：

- Computer Vision 在大类中平均 citation count 和平均 breadth 都最高，适合解释“视觉方法/特征/模型一旦成为通用基准，会在许多后续任务中复用”。但应说明 DBSCAN 的 API 标签误差会抬高视觉类均值，所以最终展示要用人工 topic 修正后的代表案例。
- Data Mining / Web 平均 breadth 约 58.41，且 `Graphs over Time`、association rules、search clickthrough 等案例适合说明数据分析框架如何跨应用场景扩散。
- Database / Systems 样本量最大，但平均 breadth 低于 Computer Vision / Data Mining；报告可以解释为“系统类长期影响常常表现为基础设施沉淀和社区内深度复用，不一定总是最高 breadth”。

写作时注意：breadth 是 OpenAlex citing works sample 近似指标，不能写成完整跨领域引用网络。

## 4b. Topic × venue crosswalk 连接点

`docs/topic_venue_crosswalk.md` / `.csv` 把 250 篇论文汇总成 83 个 venue-area × topic-label 交叉行，其中 26 个交叉行至少有 3 篇论文。D 可以用它把 topic 发现连接到 C 的 Venue/Field 解释：topic label 描述技术线索，venue_area 描述奖项记录中的学术共同体可见性。

报告建议只选 2–3 个交叉行作为桥接案例。安全写法是“当前 Test-of-Time 数据中，某 venue area 下某 topic 更可见”，不要写成“该 venue 更强”或“该 topic 更重要”。如果某行的代表论文在 Top 12 manual topic audit 中已有人工修正，最终报告优先采用人工 topic label。

## 5. 60 秒展示话术

> Topic 模块想回答的是：长期影响到底集中在哪些技术主题？从分布看，Database / Systems、Data Mining / Web、Computer Vision、NLP 和 ML Theory 共同覆盖了大部分样本，说明 Test of Time 不是某一个领域独占。再看年代变化，Database / Systems 比较稳定，Data Mining / Web 在 1990s–2000s 更突出，反映大规模数据和互联网问题成为新的长期影响入口。最后看代表论文卡片，DBSCAN、Snakes、SIFT、association rules 这些案例能把抽象 topic 落回具体贡献。这里要特别说明：topic label 先来自自动规则，重点案例要用人工修正和 evidence URL 核查，所以我们不会把 API 标签直接当成最终结论。

## 6. D 成员最终人工检查清单

- [ ] 优先核查 Top 12 evidence-ready 论文中与 Topic 模块相关的 5–8 篇：DBSCAN、Snakes、SIFT、Association Rules、Graphs over Time、PLSI / NLP 代表、Network Information Flow。
- [ ] 对 API topic 明显不准的案例，在 `manual_topic_label` 中保留人工修正，并在报告中说明自动标签限制。
- [ ] 每个最终展示 topic 至少保留 1 篇代表论文、1 个 evidence URL 和 1 句中文贡献解释。
- [ ] 写 topic evolution 时避免只说“数量变多/变少”，至少解释一次技术重心迁移：系统基础设施 → 数据/Web → 可复用算法/模型。
- [ ] 不把 avg citation 或 avg breadth 写成主题价值排名；只写成当前样本中的可观察模式。


