# Final Presentation Blueprint

用途：把 `docs/presentation_pack.md` 进一步压缩成可以直接制作 PPT 的逐页蓝图。每页只保留一个主张、一个视觉证据、一个讲解句和一个备用检查点，避免展示时变成逐图说明。截图裁剪、统一框架和安全表述的最终检查见 `docs/slide_visual_consistency_audit.md`。

## 8–10 分钟总节奏

| Slide | Speaker | Time | Title | Main takeaway | Visual / backup asset |
|---:|---|---:|---|---|---|
| 1 | A | 0:40 | What Research Stands the Test of Time? | Test of Time Award 让我们观察多年后仍被重新确认的研究价值。 | `docs/demo/homepage-overview.png` |
| 2 | A | 0:45 | Dataset & Analytical Frame | 250 篇论文覆盖 1974–2008 发表年、1989–2018 获奖年，分析从时间、领域、主题、引用、证据和网络展开。 | homepage summary cards |
| 3 | B | 1:05 | Time + Time Machine | 中位 recognition lag 为 12 年，Time Machine 用代表案例解释“当年能不能看出来”。 | `docs/demo/time-and-timeline.png` |
| 4 | C | 0:55 | Venue & Field | SIGIR、SIGCOMM、ICSE、ICCV、SIGMOD 等社区记录了较多长期影响，但数量差异要结合设奖历史解释。 | `docs/demo/venue-and-field.png` |
| 5 | D | 1:15 | Topic Evolution + Lineage | Topic chart 展示长期影响主题迁移，Paper Lineage 把主题落到可复用贡献路径。 | `docs/demo/topic-evolution.png` |
| 6 | E | 1:15 | Citation Depth × Impact Breadth | 高引用不等于全部长期影响；citation depth 和 impact breadth 区分不同影响形态。 | `docs/demo/citation-and-impact.png` |
| 7 | A/D | 0:45 | Evidence Index | Paper Explorer 把总体趋势落回具体论文，展示和答疑时可以按主题、会议、指标快速定位案例。 | `docs/demo/explorer-evidence-index.png` |
| 8 | E/A | 1:00 | Benchmark + Impact Signature | 单篇论文可以和全数据集/同领域比较，并形成 descriptive long-term impact profile。 | `docs/demo/benchmark-lab.png` |
| 9 | F | 1:05 | Network + Global Memory Map | 长期影响也沉淀在机构和国家/地区可见元数据中，但不能解释为国家/机构排名。 | `docs/demo/network-diffusion.png` |
| 10 | A | 0:35 | Rubric Receipt | 把数据、视觉、交互、故事、边界和展示交付映射成老师可见的评分证据。 | `#rubric` section / export PNG |
| 11 | A/F | 0:50 | Methods & Boundaries | 结论基于 award seed + OpenAlex public metadata + derived proxy，不声称官方评奖因果。 | `docs/methods_and_limitations.md` |
| 12 | A | 0:40 | Conclusion | 经得起时间检验的研究需要用时间、主题、引用、证据案例和网络多维观察。 | summary / closing slide |

预计总时长：9 分钟 10 秒。若课程要求压缩到 8 分钟，删去 Slide 8 的现场演示，只保留一句 Benchmark Lab 说明。

## 逐页可直接粘贴内容

### Slide 1 · Title

**Title**

What Research Stands the Test of Time?

**Subtitle**

Visualizing Long-Term Impact in Computer Science

**Speaker note**

> 我们关注的不是论文发表当年的即时热度，而是多年后仍被学术共同体重新确认的研究价值。

**Backup**

打开 `docs/demo/homepage-overview.png` 或本地页面 `index.html?present=1` 顶部。

### Slide 2 · Dataset & Analytical Frame

**Slide bullets**

- 250 Test of Time Award papers
- Publication years: 1974–2008
- Award announcement years: 1989–2018
- Metadata: venue, field, topic, citation, breadth proxy, institution/country
- Core question: what patterns characterize long-term CS impact?

**Speaker note**

> 我们把 Test of Time Award 记录和公开学术元数据结合，形成静态前端数据表。后面的图表都围绕同一批论文展开，避免每个模块各讲各的。

**Backup**

README 数据说明 + `data/papers_enriched.csv` row count。

### Slide 3 · Time: Recognition Lag

**Slide bullets**

- Recognition lag = award announcement year − publication year
- Median lag: 12 years
- Observed range: 9–34 years
- Interpretation: long-term value often needs delayed confirmation

**Speaker note**

> recognition lag 直接对应“时间检验”的尺度。极长 lag 的案例提醒我们，基础研究的价值有时要等技术生态成熟后才变得清楚。

**Speaker owner**

B：补 1 个典型 lag 案例；展示前只需确认案例标题和年份。

### Slide 4 · Venue & Field

**Slide bullets**

- Top venues by paper count: SIGIR 35, SIGCOMM 33, ICSE 29, ICCV 24, SIGMOD 24
- Top areas: Database 44, Networking 38, IR 35, Software Engineering 29, CV 24
- Boundary: count reflects award coverage/history, not venue quality ranking

**Speaker note**

> 这个模块回答哪些学术共同体更常通过 Test of Time Award 记录长期影响。我们需要强调：数量榜是奖项记录分布，不是会议质量排名。

**Speaker owner**

C：选择 1 个 venue 或 area 解释“为什么这里容易出现长期影响论文”。

### Slide 5 · Topic Evolution

**Slide bullets**

- Top topic groups: Database / Systems 67, Data Mining / Web 46, Computer Vision 43, NLP 26, ML Theory 18
- Topic evolution links long-term impact to shifts in CS research focus
- Representative Paper Lineage prevents the slide from becoming only counts
- Use 1–2 lineage cards to explain topic → reusable contribution → later impact

**Speaker note**

> 主题模块把论文从 venue 推进到内容。长期影响论文不是固定在一个方向，而是随着计算机研究重心迁移。

**Speaker owner**

D：优先使用 `docs/evidence_card_presentation_matrix.md` 中 presentation-ready-cautious 的案例，避免临场使用仍需人工复核的卡片。

### Slide 6 · Citation Depth × Impact Breadth

**Slide bullets**

- Citation depth: how strongly a paper is cited
- Impact breadth: OpenAlex sampled proxy for cross-field/institution/country diffusion
- Example high-citation papers include DBSCAN, Snakes, SIFT
- High breadth cases show diffusion patterns that are not identical to raw citation count

**Speaker note**

> 引用量是重要线索，但长期影响不只有“被引用很多”。depth 和 breadth 放在一起后，可以区分深度影响和扩散广度。

**Speaker owner**

E：选 1 个 depth 高、1 个 breadth 高的代表案例；所有工业或奠基性判断必须有 evidence URL。

### Slide 7 · Paper Explorer / Evidence Index

**Slide bullets**

- Search by title / venue / topic
- Sort by citation, breadth, lag, year
- Click a paper to sync detail cards and benchmark interpretation
- Use as backup evidence during Q&A

**Speaker note**

> 这是展示中的证据库。当前面某个统计发现被追问时，可以马上定位具体论文，而不是只回答总体趋势。

**Live route**

Open `index.html?present=1` → Paper Explorer → search a prepared keyword such as `database`, `vision`, or `network` → click one result.

### Slide 8 · Benchmark Lab

**Slide bullets**

- Compares selected paper against all papers and same-field baseline
- Long-term Impact Signature summarizes citation depth, breadth, lag, topic, venue, and network spread
- Safe frame: descriptive profile inside this corpus, not future Best Paper prediction

**Speaker note**

> Benchmark Lab 把一个案例放回全数据集比较。它适合衔接 Explorer：先找到案例，再解释它在 citation、breadth、lag 等维度上强在哪里。

**Backup**

`docs/demo/benchmark-lab.png`。如果时间不够，这页可以压缩为 20 秒过渡。

### Slide 9 · Network Diffusion

**Slide bullets**

- Top institutions: UC Berkeley 17, Carnegie Mellon 15, Stanford 14, MIT 11, Cornell 8
- Global Memory Map links country/region metadata to leading institutions and representative papers
- Boundary: affiliation metadata can be incomplete; this is not a country or institution ranking

**Speaker note**

> 机构和国家/地区分布让我们看到长期影响如何沉淀在研究生态中。但这里更适合做结构观察，不应写成完整合作网络或机构排名。

**Speaker owner**

F：负责视觉一致性检查和最终 PPT 截图替换。

### Slide 10 · Methods & Boundaries

**Slide bullets**

- Award seed: Test of Time Award records
- Enrichment: OpenAlex public metadata
- Derived metrics: recognition lag, citation depth, impact breadth proxy
- Manual evidence: representative paper contribution wording needs URL review
- Cannot infer: official award causality, complete citation graph, absolute field ranking

**Speaker note**

> 这个项目的可信度来自清楚说明数据能支持什么、不能支持什么。我们可以观察长期影响的模式，但不把 proxy 指标说成官方评价原因。

**Backup**

`docs/methods_and_limitations.md` + `docs/data_provenance_audit.md`。

### Slide 11 · Conclusion

**Slide bullets**

- Long-term impact is delayed, contextual, and multi-dimensional
- Time, venue/field, topic, citation, evidence cases, benchmark and network each explain one layer
- Test of Time Award provides a window into how CS research value is recognized over time

**Speaker note**

> 回到核心问题，经得起时间检验的研究不能只用一个指标判断。它们往往经历延迟确认，在特定共同体和主题演化节点上沉淀，并通过引用和研究网络扩散。

## Speaker handoff table

| Speaker | Must prepare before final presentation | Safe wording boundary |
|---|---|---|
| A | Opening, data frame, Explorer/Benchmark route if needed, methods/conclusion | 不把 proxy 指标说成官方评奖原因 |
| B | 1 个 recognition lag 代表案例，最好覆盖典型或最长 lag | 不把 lag 长短解释为论文质量高低 |
| C | 1 个 venue/field 发现 + award history 限制 | 不把 venue count 写成会议排名 |
| D | 5–8 张 presentation-ready-cautious evidence cards 中选 1–2 张讲 | 未人工核查的卡片只作备选 |
| E | 1 个 citation depth 案例 + 1 个 impact breadth 案例 | 不声称 breadth 是完整引用网络 |
| F | Network slide、截图可读性、PPT 视觉统一 | 不把机构/国家数写成完整合作网络 |

## Offline backup checklist

Before inserting these assets into slides, use `docs/slide_visual_consistency_audit.md` to confirm purpose, owner, screenshot size, crop/frame consistency, and module-specific safe wording.

- [x] `docs/demo/homepage-overview.png`
- [x] `docs/demo/time-and-timeline.png`
- [x] `docs/demo/venue-and-field.png`
- [x] `docs/demo/topic-evolution.png`
- [x] `docs/demo/citation-and-impact.png`
- [x] `docs/demo/explorer-evidence-index.png`
- [x] `docs/demo/benchmark-lab.png`
- [x] `docs/demo/network-diffusion.png`

Before class, copy these images into the PPT folder or insert them directly into slides. If the live demo fails, present only from screenshots and use Slide 7/8 speaker notes to describe interactions.

## Final rehearsal run

1. Open `http://127.0.0.1:8765/index.html?present=1`.
2. Move through nav anchors in this order: Time → Venue → Topic → Citation → Explorer → Benchmark → Network.
3. Keep each B–F module to one main takeaway.
4. Mention limitations before Q&A, not only after being challenged.
5. End by restating the core question and the multi-dimensional answer.

## High-end module story spine

| Module | Why it upgrades the project | One-sentence safe wording |
|---|---|---|
| Time Machine | Turns recognition lag from a histogram into a case-level story. | “This case shows delayed retrospective recognition, not a prediction that the paper was identifiable as a future classic at publication time.” |
| Representative Paper Lineage | Connects topic evolution to reusable contribution pathways. | “Topic labels guide navigation; final contribution claims come from evidence-checked paper cards.” |
| Long-term Impact Signature | Keeps the user’s “best paper potential” idea while avoiding overclaim. | “This is a descriptive profile inside our Test-of-Time corpus, not a future award prediction model.” |
| Global Memory Map | Gives the project a premium spatial / institutional layer. | “This map visualizes visible affiliation metadata, not national research quality.” |

## Optional teacher-facing closeout

If the presentation has 30–40 seconds left, show the Rubric Receipt section before limitations. The purpose is not to beg for points; it makes the work legible as six dimensions of value: data pipeline, visual structure, interaction, research story, integrity boundaries, and delivery polish.

Safe one-liner:

> 我们的贡献不是单个预测模型，而是一个可解释、可追溯、可展示的长期影响分析系统。

## Best-score demo route added to page

The live page now includes a `#demo-route` section: a 6-step, 8-minute classroom route optimized for grading signal. Use it as the fallback if the presentation feels too feature-heavy: it tells the team exactly which high-end pieces to show and which claims to avoid.

## Cross-module selected paper sync

The page now has an `#evidence-thread` section. During live demo, select one paper from Explorer/Time Machine/Lineage/Map, then use Evidence Thread to narrate the same paper through Time, Topic, Citation, Signature, and Network. This is the most product-like interaction in the system and should be shown if there is enough time.
