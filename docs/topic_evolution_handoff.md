# D 模块 handoff：Topic Evolution

用途：给 Issue #5 / D 成员一个可直接写报告和展示的 topic evolution 分析底稿。这里的数字来自当前 `data/topic_stats.csv`、`data/topic_year_stats.csv`、`data/papers_enriched.csv` 和 `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`。Top 12 代表论文的 API topic vs manual topic 核查见 `docs/manual_topic_audit_top12.md` / `.csv`；contribution archetype 分类见 `docs/research_archetype_taxonomy.md` / `.csv`；topic × venue crosswalk 见 `docs/topic_venue_crosswalk.md` / `.csv`。最终报告采用前仍建议打开代表论文 evidence URL 与 award citation 做人工核查。

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

### Finding 1：长期影响论文形成多主题谱系，而不是单一技术热点

当前 250 篇中，Top 5 topic 覆盖 200 篇：Database / Systems 67、Data Mining / Web 46、Computer Vision 43、Natural Language Processing 26、Machine Learning Theory 18。这个分布适合解释长期影响的多种形态：系统/数据库偏基础设施与工程范式，视觉/NLP/ML 偏算法和表示方法，数据挖掘/Web 偏可复用分析工具。

可写段落：

> Topic distribution 显示，Test of Time 论文并不属于单一技术热点，而是覆盖系统、数据挖掘、视觉、语言和理论等多个方向。这说明“经得起时间检验”既可能来自基础设施和系统设计，也可能来自算法范式、表示方法或可复用分析工具。

安全边界：topic label 是自动归类结果，不是官方学科标签；重点论文最终写入报告前需要人工核对。

### Finding 2：主题演化体现了 CS 研究重心从基础系统到数据/视觉/网络化应用的扩展

按 decade 粗看：

| Decade | Papers | Top topic pattern | 可讲解释 |
|---|---:|---|---|
| 1970s | 8 | Database / Systems 与 Computer science 小样本为主 | 早期样本少，不宜过度解释，只可作为历史起点。 |
| 1980s | 48 | Database / Systems 13、Computer Vision 11、NLP 6 | 系统/数据库和早期视觉、IR/NLP 基础方法逐渐出现。 |
| 1990s | 88 | Database / Systems 22、Computer Vision 18、Data Mining / Web 17 | 数据库、视觉、数据挖掘同时成为长期影响主线。 |
| 2000s | 106 | Database / Systems 30、Data Mining / Web 23、Computer Vision 14、NLP 12 | Web、搜索、网络、数据中心和统计学习相关主题更可见。 |

可写段落：

> Topic evolution 的价值不只是展示每类论文数量，而是展示长期影响随研究生态变化而迁移。Database / Systems 在多个年代都保持可见，说明基础设施类贡献会持续沉淀；Data Mining / Web 在 1990s–2000s 更突出，反映互联网和大规模数据问题带来的新长期影响入口；Computer Vision 和 NLP 则把长期影响更多体现为方法、特征和模型范式的复用。

安全边界：1970s 样本只有 8 篇，不能把早期比例当成稳定趋势；decade 趋势还受各会议设奖年份影响。

### Finding 3：代表论文卡片应优先用人工修正 topic，而不是直接采用 API 标签

Top 12 evidence-ready 表里已经出现一个重要例子：DBSCAN 的 API topic 是 `Computer Vision`，但人工表已修正为 `Data Mining / Clustering`。这类修正很适合写进方法部分，说明项目区分 automatic metadata 和 manual annotation。

| 代表案例 | API topic | 建议展示 topic | 为什么适合讲 |
|---|---|---|---|
| `A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise` | Computer Vision | Data Mining / Clustering | DBSCAN 是最强代表案例之一，citation 19133、breadth 81.12，且人工 topic 已修正。 |
| `Snakes: Active Contour Models` | Computer Vision | Computer Vision / Segmentation | citation 17009、lag 26 年，适合说明视觉基础模型长期复用。 |
| `Object Recognition from Local Scale-Invariant Features` | Computer Vision | Computer Vision / Local Features | SIFT 适合讲视觉特征如何成为后续研究共同语言。 |
| `Mining Association Rules Between Sets of Items in Large Databases` | Database / Systems | Data Mining / Association Rules | 适合连接数据库、数据挖掘和商业规则挖掘。 |
| `Graphs over Time: Densification Laws, Shrinking Diameters and Possible Explanations` | Data Mining / Web | Data Mining / Network Science | breadth proxy 87.38，适合讲跨领域网络分析框架。 |

安全边界：代表论文贡献解释可以先使用 `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv` 的草稿，但最终报告仍需要人工打开 DOI/论文页核查。

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
