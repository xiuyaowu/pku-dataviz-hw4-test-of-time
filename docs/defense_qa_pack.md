# Defense Q&A Pack / 答辩问答准备

用途：课堂展示或老师提问时，统一回答数据来源（data source）、指标边界、人工核查、分工贡献和 live demo 风险。回答原则是：先给结论，再给证据位置，最后主动说明边界。

## Fast answer pattern

1. **Answer**：用一句话直接回答问题。
2. **Evidence**：指向页面模块、数据文件或文档。
3. **Boundary**：说明这个结论能说明什么，不能说明什么。

推荐句式：

> 我们把它作为一个公开元数据下的可视化线索，而不是官方评奖原因。页面中用它帮助比较模式，单篇论文贡献仍需要 evidence URL 和人工核查。

## Likely questions and ready answers

| # | Question | Concise answer | Evidence / where to point | Safe boundary |
|---:|---|---|---|---|
| 1 | 为什么选择 Test of Time Award，而不是 Best Paper 或高引用论文？ | Test of Time Award 更接近“多年后回看确认”的长期影响样本，和本项目的核心问题一致。 | README research question; `docs/report/report_skeleton.md` Section 1–2. | 它不是所有 CS 长期影响论文全集，只是有公开 award records 的可见样本。 |
| 2 | 你们的数据从哪里来？ | Award seed 来自公开整理的 Test of Time Award 论文记录，前端主表再补充 OpenAlex 等公开学术元数据。 | `docs/data_readiness_matrix.md`; `docs/data_provenance_audit.md`; `data/papers_enriched.csv`. | OpenAlex metadata 可能缺失或归并错误，所以重点案例需要人工证据。 |
| 3 | 为什么当前页面是 250 篇论文？ | 上游 award seed 中可解析 publication year / announcement year 并完成前端字段整理的可用记录为 250 篇。 | `data/papers_enriched.csv`; `data/award_timeline.csv`; `docs/data_readiness_matrix.md`. | 这是当前项目可用数据集规模，不宣称覆盖所有会议所有奖项。 |
| 4 | Recognition lag 到底是什么意思？ | 它是 `announcement_year - publication_year`，描述论文发表到被 Test of Time Award 正式确认之间的时间间隔。 | Time module; `docs/time_recognition_lag_handoff.md`; `docs/methods_and_limitations.md`. | 它不等于影响开始出现的时间，也不证明研究价值成熟速度。 |
| 5 | 高引用是否就代表经得起时间检验？ | 不完全。Citation depth 是影响强度入口，但本项目还看 trajectory、breadth、topic、venue 和具体案例证据。 | Citation module; Benchmark Lab; `docs/citation_impact_handoff.md`. | 高引用不能自动写成获奖原因，尤其不能跨领域直接比较价值。 |
| 6 | Impact breadth 是什么，可靠吗？ | Impact breadth 是基于 OpenAlex citing works sample 的扩散范围 proxy，用于观察跨 field / institution / country 的可见扩散。 | `data/citing_breadth_metrics.csv`; `docs/impact_breadth_evidence_audit.md`. | 它不是完整 citation graph，也不是官方 interdisciplinarity score。 |
| 7 | 你们怎么处理不同领域引用习惯不同的问题？ | 页面加入 same-field benchmark，并在报告中把 raw citation 和同领域相对位置分开解释。 | Benchmark Lab; `docs/report/report_skeleton.md` Section 4.6. | Same-field 依赖 topic / venue_area 标签质量，重点案例仍需人工核查。 |
| 8 | Venue / Field 数量图是不是会议排名？ | 不是。它展示当前 Test-of-Time award dataset 中的可见记录密度，不是会议质量或影响力排名。 | Venue module; `docs/venue_field_imbalance_caveats.md`. | 数量受奖项设立历史、覆盖范围和数据源完整性影响。 |
| 9 | Topic label 是人工标的吗？ | 大部分 topic label 来自规则和公开元数据的自动整理，Top 12 代表论文已做一轮 manual topic audit。 | `docs/manual_topic_audit_top12.md`; `docs/manual_topic_audit_top12.csv`. | 最终报告中的重点论文 topic 应优先使用人工核查标签。 |
| 10 | 你们是否读完了 250 篇论文？ | 没有，也不需要把 250 篇都当作人工案例阅读；我们用全量元数据看总体模式，再对代表论文做 evidence-based 人工核查。 | Explorer; Top 12 evidence cards; manual annotation templates. | 单篇贡献、工业影响和 foundational 判断只在有证据链接时写成确定表述。 |
| 11 | 如果某篇论文的贡献解释还没人工确认，展示时怎么办？ | 只讲可由数据直接支持的指标位置，把贡献解释标为待核查或换用 presentation-ready-cautious 代表卡。 | `docs/evidence_card_presentation_matrix.md`; `docs/evidence_coverage_matrix.md`. | 不把未核查材料作为最终强结论。 |
| 12 | 你们的可视化如何避免只是图表堆叠？ | 页面按 Time → Venue/Field → Topic → Citation → Explorer → Benchmark → Network 形成一条证据链，Story Builder 把每个模块转成 question / evidence / so what / owner。 | README module list; Story Builder section; `docs/report/report_skeleton.md`. | 每个模块仍需对应 owner 在报告中补 2–3 条最终人工确认 findings。 |
| 13 | 为什么需要 Paper Explorer 和 Benchmark Lab？ | 它们把整体统计落回单篇论文，方便课堂中回答“这个模式具体对应哪些论文”和“这篇论文相对同领域强在哪里”。 | Explorer screenshot; Benchmark Lab screenshot; `docs/evidence_cards_top12.md`. | 它们是 evidence navigation tools，不替代论文阅读。 |
| 14 | Network 模块能说明国家或机构排名吗？ | 不能。Network 只展示 available affiliation metadata 中的可见分布和研究生态集中性。 | Network module; `docs/network_visual_presentation_handoff.md`; `data/institution_stats.csv`. | 机构/国家字段可能缺失或归并错误，不能写成完整贡献排名。 |
| 15 | 小组分工如何体现每个人贡献？ | A 负责架构、baseline、PR/QA；B-F 分别负责 Time、Venue/Field、Topic、Citation/Impact、Network/Presentation 的分析、报告和最终人工核查。 | `docs/work_board.md`; `docs/team_division.md`; Issues #2–#7. | 自动 baseline 不替代队友最终 evidence review、报告段落和展示发言。 |
| 16 | 如果老师质疑因果关系怎么办？ | 直接承认：本项目展示关联和结构性模式，不证明 award committee 的评奖动机或因果机制。 | `docs/methods_and_limitations.md`; report limitation section. | 使用“显示 / 提示 / 反映 / 可观察到”，避免“证明 / 导致”。 |
| 17 | 如果 live demo 打不开怎么办？ | 使用 presentation-mode screenshots 的 2 分钟 fallback route，并说明截图来自同一 D3 页面和同一批静态数据。 | `docs/live_demo_fallback_script.md`; `docs/demo/*.png`. | 不临场排查超过 30 秒，优先保证展示叙事完整。 |
| 18 | 最终报告最需要人工补什么？ | Top 12 / selected cases 的 award citation、贡献表述、evidence URL 打开核查，以及 B-F 每个模块 2–3 条最终 findings。 | `docs/evidence_coverage_matrix.md`; `docs/final_qa_checklist.md`. | 自动生成的统计和草稿是起点，不是最终人工背书。 |

## Three fallback answers for “we did not manually read every paper”

### 1. Scope answer

> 我们的项目不是做 250 篇论文的逐篇文献综述，而是用公开元数据可视化长期影响的总体模式。逐篇人工阅读放在代表案例层面，尤其是最终报告和展示会用到的 Top 12 / Top 60 优先论文。

### 2. Evidence answer

> 对总体模式，我们使用统一数据表和静态 CSV，保证每个图表都能追溯到同一套字段；对单篇贡献，我们只在有 DOI、论文页、award citation 或其他 evidence URL 时写成明确表述。没有核查的内容会保留为待核查，不作为最终强结论。

### 3. Method boundary answer

> 这种分层方法是有意设计的：全量数据负责回答“有哪些结构性模式”，人工 annotation 负责回答“某个代表案例为什么重要”。这样可以避免用少数主观案例替代总体数据，也避免用自动指标冒充论文贡献判断。

## Quick response bank

- **On data reliability**：数据可信度来自公开 award seed、公开学术元数据和可复查的静态 CSV；边界是 coverage / normalization / metadata missingness。
- **On citations**：citation depth 是入口，不是结论；我们结合 trajectory、breadth、same-field benchmark 和 representative evidence。
- **On breadth**：impact breadth 是 sampled OpenAlex proxy，只描述可见扩散，不等于完整影响网络。
- **On venue counts**：venue count 是当前数据中的 award-record visibility，不是 venue ranking。
- **On topic labels**：自动 topic label 用于聚合视图，最终代表案例优先采用 manual topic audit。
- **On contribution claims**：没有 evidence URL 的工业影响、基础设施影响或 foundational 贡献，不写成确定结论。

## Owner rehearsal checklist

| Owner | Before Q&A, prepare one answer about | Supporting doc |
|---|---|---|
| A | 数据来源、整体叙事、PR/QA、live demo fallback | README; `docs/final_qa_checklist.md`; `docs/live_demo_fallback_script.md` |
| B | recognition lag 定义、short / typical / long lag 案例 | `docs/time_recognition_lag_handoff.md`; `docs/recognition_lag_outlier_cases.md` |
| C | venue / field 数量边界、award history bias | `docs/venue_field_imbalance_caveats.md`; `docs/venue_year_case_studies.md` |
| D | topic label uncertainty、manual topic audit、代表论文证据 | `docs/topic_evolution_handoff.md`; `docs/manual_topic_audit_top12.md` |
| E | citation depth vs breadth、trajectory archetypes、proxy boundary | `docs/citation_impact_handoff.md`; `docs/citation_trajectory_archetypes.md` |
| F | Network 元数据边界、截图 fallback、PPT 视觉一致性 | `docs/network_visual_presentation_handoff.md`; `docs/slide_visual_consistency_audit.md` |

## Final wording guardrail

Use these verbs in defense: **shows, suggests, reflects, indicates, can be observed**.

Avoid these unless paper-specific evidence supports them: **proves, causes, determines, ranks, official reason, complete impact graph**.
