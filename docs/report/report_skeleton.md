# 最终报告骨架：Test of Time Award 数据可视化分析

这份骨架可以直接复制到最终报告里扩写。每个模块已经先补入 2–3 条可写进报告的 draft findings、代表案例和限制说明；B-F 后续需要做的是核查案例、补人工阅读解释和 evidence URL，而不是从空白开始写。

## 题目

哪些计算机研究经得起时间检验？——基于 Test of Time Award 数据的论文长期影响力可视化分析

## 1. 引言

计算机领域中，一些研究在发表多年后仍被认为具有基础性影响。Test of Time Award 正是对这种长期影响的制度化认可。本项目希望通过数据可视化回答：一篇计算机论文在多年后仍被认为重要，通常具有什么共同特征？

我们从七个连续角度展开：

1. 时间尺度：论文发表后通常隔多久才获得 Test of Time 认可？
2. 会议与领域：哪些学术社区更频繁地产生长期影响论文？
3. 主题演化：长期影响论文集中在哪些主题，是否随年代变化？
4. 引用与扩散：高引用是否等同于经得起时间检验？影响深度和广度有何差别？
5. 证据索引：能否从 250 篇论文中快速找到可解释的代表案例？
6. 单篇基准：某篇论文相对全数据集和同领域论文处在什么位置？
7. 机构与国家网络：长期影响如何在研究机构和地区之间分布？

## 2. 数据来源与处理

本项目使用 LCS2-IIITD/influence-dispersion 仓库中的 Test of Time Award 论文记录作为获奖论文 seed，并结合 OpenAlex 等公开学术元数据进行补充。当前前端使用 250 篇可用论文，发表年份约覆盖 1974–2008，获奖年份约覆盖 1989–2018。核心字段包括论文标题、作者、发表年份、获奖年份、会议、领域标签、引用轨迹、影响广度近似指标、机构和国家/地区信息。

需要说明的是，citation count、citation trajectory、impact breadth、institution/country distribution 均基于公开元数据整理，适合作为可视化分析中的近似指标，但不应被解释为官方评奖原因或完整因果结论。尤其是 impact breadth 来自 OpenAlex citing works 抽样和字段统计，只能作为“扩散范围”的 proxy。完整指标口径见 `docs/data_provenance_audit.md`；代表论文的 DOI / ACM / IEEE / PDF 证据见 `docs/evidence_cards_top12.md` 和 `manual_annotations/manual_paper_annotations_top60_template.csv`。最终写作时应区分 award seed、public metadata、derived metrics 和 manual annotation 四个层级。

### 2.1 数据来源与指标口径审计摘要

| 层级 | 本项目中的作用 | 报告写作边界 |
|---|---|---|
| Award seed | 确定 250 篇可用 Test of Time Award 论文、发表年、获奖年、venue 和 awarded_by | 只能说明当前公开奖项记录中的可见样本，不能代表所有 CS 长期影响论文。 |
| Public metadata | 补充 citation、concept/topic、institution、country 等可视化字段 | 可观察结构性模式，但字段可能缺失或归并错误。 |
| Derived metrics | 计算 recognition lag、citation trajectory、impact breadth、same-field benchmark | 用于当前数据集内部比较，不是官方评价或因果证据。 |
| Manual annotation | 为代表论文补贡献解释、工业影响和 evidence URL | 单篇论文贡献与落地影响必须由人工证据支撑。 |

报告中推荐统一写法：citation depth 是引用规模入口，impact breadth 是 OpenAlex citing works sample 下的扩散广度近似指标，venue / institution / country 数量是当前数据集中的可见分布。避免写成会议排名、机构排名、国家实力排名或获奖原因。

## 3. 可视化设计

网页采用单页滚动式叙事结构：Opening summary 先给出数据概览，再依次进入 Time、Venue & Field、Topic Evolution、Citation & Recognition、Paper Explorer、Benchmark Lab、Story Builder、Impact Network。每个模块包含图表、hover tooltip、reading note、claim cards 或代表论文详情卡，使读者既能看到总体模式，也能回到具体论文案例。

设计目标不是把所有指标堆在一起，而是让读者沿着一条报告主线阅读：长期影响先表现为时间上的延迟确认，再落入不同学术社区和主题结构，随后通过引用深度、跨领域扩散和机构网络形成可追踪的影响痕迹。

## 4. 模块发现矩阵

### 4.1 Time：Recognition Lag 与时间尺度

负责人：B

详细 handoff：`docs/time_recognition_lag_handoff.md` 已整理 Time 模块的统一定义、核心统计、3 篇代表论文候选、年代差异草稿、可复制报告段落和人工检查清单。Issue #55 的 outlier case notes 见 `docs/recognition_lag_outlier_cases.md` / `.csv`，其中补充了 short / typical / long lag 的 6 个候选案例、展示话术和 safe wording。

| 类型 | Draft finding / case | 数据证据 | 报告解释方向 | 边界 |
|---|---|---|---|---|
| Finding 1 | Test of Time 认可通常不是即时发生，而是在发表多年后被重新确认。 | 250 篇论文的 recognition lag 中位数约 12 年，平均约 14.0 年；最短 9 年，最长 34 年。 | “经得起时间检验”本身意味着需要经历后续研究、系统落地或社区吸收。 | 数据只覆盖设立 Test of Time Award 的会议，不能代表所有 CS 论文。 |
| Finding 2 | 10 年左右是最常见的确认窗口，但仍存在大量 15 年以上案例。 | `(5,10]` 区间有 106 篇，`(10,15]` 有 67 篇，`(15,20]` 有 55 篇。 | 许多会议的奖项机制本身也倾向于等待足够长的回看周期。 | lag 分布受各会议设奖规则影响，不应直接解释为研究价值成熟速度。 |
| Case | 极长 lag 案例集中在早期网络与信息检索论文。 | `Probabilistic Models of Indexing and Searching` lag 34 年；`The ALOHA system`、`Research Areas in Computer Communication`、`The Unified Probabilistic Model for IR` lag 32 年。 | 这些案例适合说明基础概念可能在很长时间后才被系统性追认。 | 具体贡献判断需要人工阅读论文或 award citation 后再写入最终报告。 |

可扩写段落：

> Recognition lag 显示，长期影响通常会在论文发表多年后才被奖项重新确认。当前数据中，中位 lag 约为 12 年，说明 Test of Time Award 更接近一种“回看式确认”而非即时热度评价。短 lag 案例可能对应快速进入主流研究的问题，而极长 lag 案例则说明部分基础性工作需要等待后续技术生态成熟后才被充分看见。

### 4.2 Venue & Field：会议和领域分布

负责人：C

详细 handoff：`docs/venue_field_handoff.md` 已整理 Venue & Field 模块的 Top venues、Top venue areas、field × decade 读图提示、代表论文候选、可复制报告段落和人工检查清单。具体 venue-year 案例见 `docs/venue_year_case_studies.md` / `.csv`，可把 SIGCOMM 1988、ICCV 1999、SIGIR 1999 等 cluster 用于报告或展示。

| 类型 | Draft finding / case | 数据证据 | 报告解释方向 | 边界 |
|---|---|---|---|---|
| Finding 1 | Test of Time 论文在少数会议中较集中，但这种集中更像奖项记录密度，不等同于会议质量排名。 | Top venues：SIGIR 35 篇、SIGCOMM 33 篇、ICSE 29 篇、ICCV 24 篇、SIGMOD 24 篇、VLDB 20 篇。 | 不同社区记录长期影响的制度差异会改变可见数量。 | 会议设奖历史、收录范围、数据源完整性都会影响数量。 |
| Finding 2 | Database、Networking、IR、Software Engineering、CV 是当前数据中最主要的领域入口。 | Top venue areas：Database 44、Networking 38、IR 35、Software Engineering 29、CV 24。 | 这些领域既有强系统/基础设施传统，也有清晰的顶会奖项记录，因此在 Test of Time 数据里更容易形成可见轨迹。 | 数量分布不能说明其他领域缺少长期影响论文，只能说明当前奖项数据覆盖。 |
| Case | 不同领域的 recognition lag 可能反映奖项机制和研究吸收节奏的差异。 | Database 平均 lag 约 10.1 年，IR 约 19.8 年，CV 约 16.2 年，AI 约 18.6 年。 | 可以比较“系统/数据库较快确认”和“IR/CV/AI 更长回看窗口”的可能原因。 | 需要结合各会议奖项设立年份，避免把制度差异误写成学科本质差异。 |
| Case | Venue-year mini cases 能把数量榜变成具体证据链。 | SIGCOMM 1988：6 篇；SIGIR 1999：3 篇；ICCV 1999：4 篇且总引用 22,233；SIGMOD 1996 / NSDI 2005：平均 lag 10 年。 | 报告可选 2–3 个 cluster 解释“为什么这些社区在数据中可见”。 | 只说 representative cluster，不说 best year / strongest venue；贡献描述需人工核查 award citation。 |

可扩写段落：

> Venue 与 field 分布反映哪些学术社区更频繁地通过 Test of Time Award 记录长期影响。SIGIR、SIGCOMM、ICSE、ICCV、SIGMOD 和 VLDB 在数据中占比较高，但这些数字首先代表“奖项记录和数据覆盖中的可见性”，不能直接当作会议排名。更稳妥的解释是：长期影响论文往往在拥有稳定学术共同体、长期评奖传统和可追溯论文历史的领域中被系统记录下来。报告中可以补入 SIGCOMM 1988、ICCV 1999、SIGIR 1999 等 venue-year cluster，让数量分布回到可解释的具体论文案例。

### 4.3 Topic Evolution：主题演化与代表论文

负责人：D

详细 handoff：`docs/topic_evolution_handoff.md` 已整理 Topic Evolution 模块的 Top topics、decade-level 主题迁移、代表论文人工 topic 修正、3 条可写入报告的 findings、60 秒展示话术和 topic label 写作边界。

| 类型 | Draft finding / case | 数据证据 | 报告解释方向 | 边界 |
|---|---|---|---|---|
| Finding 1 | 长期影响论文并不集中在单一技术主题，而是覆盖系统、数据挖掘、视觉、NLP、理论等多个方向。 | Top topics：Database / Systems 67 篇、Data Mining / Web 46 篇、Computer Vision 43 篇、NLP 26 篇、Machine Learning Theory 18 篇。 | Test of Time 不是单一领域现象，而是跨社区的长期知识沉淀。 | topic_label 来自规则/API 元数据，需要对重点论文做人工校正。 |
| Finding 2 | Computer Vision 的平均 citation count 和 impact breadth 都较高，适合作为“高引用 + 广扩散”主题案例。 | Computer Vision：43 篇，平均 citation count 约 2848.7，平均 breadth 约 61.24；Data Mining / Web 平均 breadth 约 58.41。 | 视觉和数据挖掘类方法更容易通过数据集、算法范式或工具链进入多个应用场景。 | 高引用受领域规模和引用习惯影响，不能直接等同于贡献更大。 |
| Case | 高引用代表论文可以作为主题解释入口。 | `A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise` citation 19133；`Snakes: Active Contour Models` citation 17009；`Object Recognition from Local Scale-Invariant Features` citation 16147。 | 这些案例适合解释聚类、轮廓模型、局部特征等方法如何成为后续研究共同语言；Top 12 证据卡已补 DOI/论文页和一句话贡献，可直接作为报告案例草稿。 | 最终报告仍需人工确认 award citation 与具体贡献表述，避免只引用自动统计。 |

可扩写段落：

> Topic evolution 说明长期影响论文并不集中在单一主题，而是在不同年代随计算机领域的技术重心迁移。Database / Systems 和 Data Mining / Web 体现了基础设施与数据处理传统，Computer Vision、NLP 和 ML Theory 则体现了算法范式的积累。代表论文卡片用于把抽象主题重新落回具体贡献，避免可视化只停留在数量统计。

### 4.4 Citation & Recognition：引用深度、轨迹与影响广度

负责人：E

详细 handoff：`docs/citation_impact_handoff.md` 已整理 Citation & Impact 模块的 depth / trajectory / breadth 统一定义、核心统计、四象限代表论文、60 秒展示话术和 OpenAlex proxy 写作边界；Issue #61 的 citation trajectory 分类候选见 `docs/citation_trajectory_archetypes.md` / `.csv`。

| 类型 | Draft finding / case | 数据证据 | 报告解释方向 | 边界 |
|---|---|---|---|---|
| Finding 1 | 高引用论文经常也是 Test of Time 代表案例，但 citation depth 只能说明被大量引用，不能完整说明“为何经得起时间检验”。 | Top citation papers 包括 DBSCAN 19133、Snakes 17009、SIFT 16147、Association Rules 14771。 | 引用深度可作为影响强度入口，但需要结合方法贡献、应用扩散和 award citation 解释。 | 不同领域引用习惯差异明显，citation count 不能跨领域直接比较价值。 |
| Finding 2 | 影响广度提供了不同于引用总量的视角：有些论文引用不是最高，但 citing field / institution / country 范围很宽。 | Top breadth：`Graphs over Time` breadth 87.38；`Multitasking without compromise` 86.5；`YAGO` 85.88；`Factorization meets the neighborhood` 84.88。 | depth × breadth 可以区分“在本领域被密集引用”和“跨领域扩散”的不同长期影响形态。 | breadth 来自 OpenAlex 抽样 citing works，是近似指标，不是完整 citation graph。 |
| Case | 数据库/数据挖掘案例适合说明“方法成为通用工具”的长期影响。 | `Mining Association Rules Between Sets of Items in Large Databases` citation 14771；`Fast Algorithms for Mining Association Rules` citation 9384；`YAGO` breadth 85.88。 | 这些论文可以讲成从具体算法/知识库到后续数据挖掘和 Web 生态的扩散；association rule 两个代表案例已在证据卡中补入 ACM/VLDB 链接。 | 工业影响或基础设施影响必须有 evidence URL 支撑，不能只靠引用数推断。 |

可扩写段落：

> Citation depth 衡量论文被引用的强度，impact breadth 更接近影响扩散范围。两者结合后，可以区分“在一个社区内被反复引用”和“跨领域扩散”的不同长期影响形态。最终报告应避免把高引用直接写成官方获奖原因，而应把引用曲线、breadth 指标和具体论文贡献结合起来解释。

### 4.5 Paper Explorer：证据索引与案例回查

负责人：A / D / E 协同

| 类型 | Draft finding / case | 数据证据 | 报告解释方向 | 边界 |
|---|---|---|---|---|
| Finding 1 | Explorer 把 250 篇论文变成可检索证据库，适合支撑报告中的“代表案例从哪里来”。 | 页面支持 title / venue / topic / field 搜索，支持按 citation、breadth、lag、year 排序。 | 报告中可以说明案例不是临时挑选，而是从统一数据表中筛选。 | Explorer 是检索和展示工具，不替代人工阅读论文。 |
| Finding 2 | 排序和筛选可以帮助不同模块快速找到各自案例。 | Time 可按 lag 排序；Topic 可按 topic/field 过滤；Citation 可按 citation 或 breadth 排序。 | 这减少了小组协作中的重复找资料成本，也让展示问答时可以快速回查。 | 搜索结果依赖已有元数据和 topic_label，缺失字段需手工补充。 |
| Case | 课堂展示时可用 Explorer 快速定位 DBSCAN、SIFT、AODV、Network Information Flow 等代表论文。 | 这些论文分别对应高引用、视觉方法、网络协议和理论框架扩散。 | 适合作为现场互动：从整体模式跳到单篇论文，再回到模块结论；`docs/evidence_cards_top12.md` 给出每篇的代表性理由和证据链接。 | 代表性判断需要在最终报告中写清选择标准，且人工确认后再写工业/落地影响。 |

### 4.6 Benchmark Lab：单篇论文相对位置解释

负责人：A / E 协同

| 类型 | Draft finding / case | 数据证据 | 报告解释方向 | 边界 |
|---|---|---|---|---|
| Finding 1 | 单篇论文的长期影响可以从 citation depth、impact breadth、recognition lag、country span、institution span 多维比较。 | Benchmark Lab 将选中论文与全数据集/同领域中位数进行 percentile 或相对位置比较。 | 这比只展示论文列表更适合回答“这篇论文为什么是代表案例”。 | percentile 是相对当前 250 篇数据集的内部比较，不是全 CS 排名。 |
| Finding 2 | 同领域基准可以减少跨领域引用习惯差异带来的误读。 | 页面区分全数据集比较和 same-field peers。 | 报告可以写明：视觉论文和数据库论文不宜只按原始 citation count 直接比较。 | same-field peers 受 topic/venue_area 标签质量影响，仍需人工检查。 |
| Case | 对 DBSCAN、SIFT、YAGO、A Scalable Commodity Data Center Network Architecture 做 benchmark，可以分别讲高引用、算法范式、知识库扩散和系统影响。 | 这些论文在 citation、breadth、field 或 lag 上有明显展示点。 | 每个案例可转成“指标位置 → 贡献解释 → 局限”的三段式报告材料。 | 最终案例必须补人工 evidence URL 和贡献文本。 |

### 4.7 Impact Network：机构、国家/地区与展示整合

负责人：F

Network / Visual / Presentation 的集中交付见 `docs/network_visual_presentation_handoff.md`，其中包含 F 模块 60–70 秒展示路线、截图对应表和 Issue #7 验收映射。

| 类型 | Draft finding / case | 数据证据 | 报告解释方向 | 边界 |
|---|---|---|---|---|
| Finding 1 | 长期影响论文在少数北美研究机构中高度可见。 | Top institutions：UC Berkeley 17、CMU 15、Stanford 14、MIT 11；Cornell、IBM Research - Almaden、IBM、UMass Amherst 各 8。 | 这反映了顶级研究机构和工业研究实验室在长期影响论文中的重要位置。 | institution metadata 存在缺失、归并和署名误差，不宜写成完整机构排名。 |
| Finding 2 | 国家/地区分布以美国为主，但加拿大、英国、德国等也有较高可见度。 | Country stats：US 170、CA 20、GB 16、DE 11、IL 5。 | 长期影响论文的生产和传播具有明显的研究生态集中性，同时仍存在跨国扩散。 | country 统计基于作者机构元数据，不能完整反映合作网络和实际贡献比例。 |
| Case | 工业研究机构和大学共同出现，适合展示 CS 长期影响中的产学研混合生态。 | IBM Research - Almaden 8，IBM (United States) 8，与 Berkeley/CMU/Stanford/MIT 等大学并列在前列。 | 可在展示中说明系统、数据库、网络等方向常见大学与工业实验室共同推动。 | 工业影响强弱需要额外证据，不能只由机构名推断。 |

可扩写段落：

> Network 模块把论文长期影响从单篇论文扩展到学术组织和地区层面。机构与国家分布可以展示长期影响在研究生态中的集中与扩散，但由于机构元数据存在缺失和归一化误差，结论应作为结构性观察而非完整合作网络统计。

## 5. 总体叙事链条

| 环节 | 关键问题 | 可写结论 | 对应页面 |
|---|---|---|---|
| Time | 多久后被确认？ | Test of Time 是延迟确认，典型 lag 约 10–15 年，但基础性工作可能被 30 年后重新看见。 | Time |
| Venue / Field | 哪些社区更常记录长期影响？ | Database、Networking、IR、SE、CV 等领域在数据中较集中，但数量受奖项制度影响。 | Venue & Field |
| Topic | 长期影响集中在哪些技术主题？ | 系统、数据挖掘、视觉、NLP 和理论等主题共同构成长周期影响谱系。 | Topic Evolution |
| Citation / Breadth | 影响如何被后续研究吸收？ | 高引用代表深度，breadth 代表扩散，两者共同解释长期影响形态。 | Citation & Recognition |
| Explorer / Benchmark | 如何把整体模式落到单篇证据？ | 可检索证据库和单篇 benchmark 让报告案例可追溯、可比较。 | Explorer / Benchmark |
| Network | 长期影响落在哪些研究生态中？ | 机构与国家分布显示出研究生态集中和跨地区传播并存。 | Impact Network |

最终结论可以按下面这条线组织：

> 经得起时间检验的研究通常不是只在发表当年形成影响，而是在多个时间窗口中被不断引用、复用和重新解释。它们往往出现在有稳定学术共同体和长期评奖传统的领域，围绕系统、数据、视觉、语言和理论等关键主题积累影响；有些论文通过高引用形成深度影响，有些论文通过跨领域、跨机构和跨国家/地区扩散形成广度影响。Test of Time Award 的价值不是给论文做简单排名，而是提供了观察计算机研究长期知识沉淀的一组入口。

## 6. 交互与视觉设计亮点

- 单页叙事结构：从 summary cards 到七个模块，阅读顺序与报告结构一致。
- Summary cards：快速给出论文数量、年份跨度、典型 recognition lag、主要领域等全局背景。
- Tooltip / detail card：把图表中的点、柱和论文列表与具体 title、venue、year、citation、breadth 信息联动。
- Reading notes：每个模块用短句解释当前视图如何支持研究问题，减少读者只看图不看结论的问题。
- Claim cards：B-F 模块底部提供 `Finding / Evidence / Boundary` 三段式材料，可直接迁移到报告。
- Explorer + Benchmark：把“整体模式”转换成“可检索案例 + 同领域比较”，增强展示和答辩时的可解释性。
- 多模块统一视觉系统：统一卡片、配色、caption、导航锚点和响应式布局，使小组不同成员的内容能整合为一个网页。

## 7. 局限性

1. Test of Time Award 覆盖的是设立该奖项的会议与社区，不能代表所有计算机研究。
2. 不同会议的奖项历史、评选口径和覆盖时间不同，数量对比需要谨慎解释。
3. 引用量和影响广度来自公开学术元数据，存在缺失、归一化误差和采样限制。
4. Impact breadth 是 OpenAlex citing works 的抽样 proxy，不是完整引用图谱或官方影响力评价。
5. Topic label 来自自动规则和 API 元数据，需要对重点案例做人工校正。
6. 机构与国家/地区信息依赖论文元数据，不能完整还原真实合作网络。
7. 可视化展示的是模式和线索，不直接证明某个因素导致论文获得长期认可。

## 7.1 写作口径检查表

- [ ] “recognition lag” 写成获奖确认时间间隔，不写成影响产生时间。
- [ ] “citation depth” 写成引用规模入口，不写成论文重要性的唯一标准。
- [ ] “impact breadth” 始终带有 OpenAlex sample / proxy / approximate 边界。
- [ ] Venue 数量、institution 数量、country 数量只写成当前数据中的可见分布，不写成质量排名或贡献排名。
- [ ] 代表论文的贡献、工业影响、基础设施落地必须附 evidence URL；未核查时保留为待核查案例。
- [ ] 结论使用“显示 / 提示 / 反映 / 可观察到”，避免“证明 / 导致 / 决定获奖”。

## 8. 结论

本项目通过 Test of Time Award 数据展示了计算机研究长期影响的多维结构：时间上，许多重要贡献需要多年后才被充分确认；领域上，不同学术社区记录长期影响的方式存在差异；主题上，长期影响随技术重心不断迁移；引用上，高影响既包含引用深度，也包含跨领域扩散广度；证据层面，Explorer 和 Benchmark Lab 帮助把总体模式落回单篇论文；网络上，长期影响还体现为机构和地区研究生态的集中与传播。

最终，可视化的价值不只是列出获奖论文，而是帮助读者理解“经得起时间检验”的研究通常如何在时间、领域、主题、引用和合作网络中留下痕迹。

## 9. 成员贡献

- A：项目架构、GitHub 协作、全站 D3 baseline、数据接入、视觉系统、demo 截图、PR review、最终整合 QA、Explorer / Benchmark / Story Builder / findings matrix。详见 `docs/report/contribution_A.md`。
- B：Time 模块分析与报告小节，重点核查 recognition lag 案例。
- C：Venue & Field 模块分析与报告小节，重点解释会议和领域分布的制度边界。
- D：Topic Evolution 与代表论文补充，重点修正 topic label 和补 evidence URL。
- E：Citation & Impact 模块分析与报告小节，重点解释 depth / breadth / trajectory 的差异。
- F：Network / Visual / Presentation 模块分析与展示材料，重点整理机构国家发现和最终展示稿。

## 10. 待人工完成的小项

- Top 12 代表论文已补 DOI/论文页/辅助证据链接；最终采用前需人工打开核对 award citation、贡献解释和展示用中文表述。
- B-F 各自确认本模块 2–3 条 findings 是否与人工阅读一致。
- 将本骨架压缩成课程要求的最终报告篇幅。
- 把 `docs/presentation_pack.md` 转成最终 PPT 或演讲稿。
