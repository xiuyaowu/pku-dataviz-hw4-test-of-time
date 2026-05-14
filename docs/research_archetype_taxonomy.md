# Research archetype taxonomy for representative Test-of-Time papers

Purpose: give the Topic Evolution / D module and final presentation a more memorable answer to **what kinds of research stand the test of time?** Topic labels say the field; archetypes describe the contribution pattern. This packet is routed to Issue #47 and supports the D owner container #5.

Data source: `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv` plus the derived machine-readable table `docs/research_archetype_taxonomy_top12.csv`.

## 1. Taxonomy definitions

| Archetype | What it means | Safe way to say it |
|---|---|---|
| Reusable algorithm / 可复用算法范式 | A named method or task formulation reused across later work. | “This paper appears to function as a reusable method in later research.” |
| Modeling framework / 建模框架 | A mathematical or conceptual frame that lets later work formulate a problem. | “Its long-term value can be explained as a modeling frame, subject to paper-level verification.” |
| Empirical law / 经验规律 | A data-backed regularity that helps later research reason about a phenomenon. | “The dataset suggests this case contributes a recurring observation/law, not only an implementation.” |
| Infrastructure/tool platform / 基础设施或工具平台 | Runtime, tool, or platform design that shapes how systems are built. | “Treat as platform/infrastructure influence unless evidence URLs show a narrower contribution.” |
| Probabilistic theory/model / 概率理论模型 | Statistical or probabilistic theory used to explain ranking, search, or inference. | “Describe as a theoretical model family rather than claiming direct product impact.” |
| Research agenda / 研究议程 | A survey, agenda, or field-framing paper that organizes later questions. | “Use as field-framing evidence, not as a single algorithmic contribution.” |
| Measurement model / 测量与性能模型 | A model that makes system behavior measurable, comparable, or predictable. | “Say it gives a measurement/comparison lens; avoid saying it fully explains all later systems.” |
| Protocol/system design / 协议或系统设计 | A concrete system/protocol architecture or design pattern. | “Use as system/protocol design evidence, with final reading checks for deployment claims.” |
| Scalable algorithm engineering / 可扩展算法工程 | Algorithmic optimization that makes a known task practical at larger scale. | “Frame as scalability/engineering contribution, not just citation volume.” |
| Foundational theory / 基础理论 | A theory or abstraction that changes what later research can reason about. | “Call it foundational theory only with citation/evidence wording kept cautious.” |

## 2. Top 12 representative-paper mapping

| Proposed archetype | Paper | Manual topic | Review status |
|---|---|---|---|
| Reusable algorithm / 可复用算法范式 | A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise | Data Mining / Clustering | manual review needed |
| Modeling framework / 建模框架 | Snakes: Active Contour Models | Computer Vision / Segmentation | manual review needed |
| Empirical law / 经验规律 | Graphs over Time: Densification Laws, Shrinking Diameters and Possible Explanations | Data Mining / Network Science | manual review needed |
| Infrastructure/tool platform / 基础设施或工具平台 | Multitasking without compromise: a virtual machine evolution | Programming Languages / Virtual Machines | manual review needed |
| Probabilistic theory/model / 概率理论模型 | Probabilistic Models of Indexing and Searching | Information Retrieval / Probabilistic Models | manual review needed |
| Research agenda / 研究议程 | Research Areas in Computer Communication | Networking / Research Agenda | manual review needed |
| Measurement model / 测量与性能模型 | Modeling TCP Throughput: A Simple Model and Its Empirical Validation | Networking / TCP Performance Modeling | manual review needed |
| Reusable algorithm / 可复用算法范式 | Object Recognition from Local Scale-Invariant Features | Computer Vision / Local Features | manual review needed |
| Reusable algorithm / 可复用算法范式 | Mining Association Rules Between Sets of Items in Large Databases | Database / Association Rules | manual review needed |
| Protocol/system design / 协议或系统设计 | Ad-hoc On-Demand Distance Vector Routing | Networking / Mobile Ad Hoc Routing | manual review needed |
| Scalable algorithm engineering / 可扩展算法工程 | Fast Algorithms for Mining Association Rules in Large Databases | Data Mining / Association Rules | manual review needed |
| Foundational theory / 基础理论 | Network Information Flow | Information Theory / Network Coding | manual review needed |

## 3. Distribution among Top 12

| Archetype | Top 12 count |
|---|---:|
| Reusable algorithm / 可复用算法范式 | 3 |
| Modeling framework / 建模框架 | 1 |
| Empirical law / 经验规律 | 1 |
| Infrastructure/tool platform / 基础设施或工具平台 | 1 |
| Probabilistic theory/model / 概率理论模型 | 1 |
| Research agenda / 研究议程 | 1 |
| Measurement model / 测量与性能模型 | 1 |
| Protocol/system design / 协议或系统设计 | 1 |
| Scalable algorithm engineering / 可扩展算法工程 | 1 |
| Foundational theory / 基础理论 | 1 |

Reading note: the Top 12 are not meant to estimate the global distribution of Test-of-Time papers. They are a presentation-ready representative set selected for citation depth, recognition lag, breadth proxy, and evidence-card usefulness.

## 4. Report-ready table

| Question | Evidence to cite | Interpretation | Boundary |
|---|---|---|---|
| What survives over time besides “hot topics”? | Top 12 include reusable algorithms, models, infrastructure, protocols, empirical laws, and theory. | Long-term recognition often attaches to contribution forms that other researchers can reuse, measure against, or build on. | Proposed taxonomy; final examples need evidence URL reading. |
| Why is this better than topic labels alone? | DBSCAN and SIFT are both high-citation reusable methods, while TCP throughput modeling and Network Information Flow have different contribution forms. | Field labels describe where a paper lives; archetypes explain how the contribution travels. | Do not rank archetypes by value from this small set. |
| How should D connect this to Topic Evolution? | Use topic trends first, then archetype cards to explain representative cases inside each topic. | Topic shift + archetype taxonomy turns the module from distribution chart into narrative evidence. | API topic labels and archetype labels both require human review for final claims. |

Copy-ready paragraph:

> Beyond venue and topic labels, the representative Test-of-Time papers show several recurring contribution patterns: reusable algorithms such as clustering or visual features, models that make retrieval or performance measurable, system/protocol designs, empirical laws, and foundational theory. This suggests that “standing the test of time” is often about whether a contribution becomes a reusable lens, tool, benchmark, or building block for later communities. We use the taxonomy as a report scaffold rather than an official classification, and final paper-level wording should be checked against evidence URLs.

## 5. Presentation talking point

> Topic labels answer “which area?”; archetypes answer “what kind of contribution lasted?” In the Top 12 set, some papers last because they are reusable algorithms, some because they provide measurement or probabilistic models, and some because they define infrastructure, protocols, or theory. This gives the project a more defensible conclusion than simply saying certain venues or topics have more awards.

## 6. D-owner final checklist

- [ ] Verify the archetype for each paper selected for final slides against `evidence_url_1` / `evidence_url_2`.
- [ ] Use at most 3-4 archetype examples in the live presentation; keep the full CSV as backup evidence.
- [ ] Do not claim this Top 12 distribution represents all 250 papers.
- [ ] If a teammate changes `manual_topic_label`, re-check whether the proposed archetype still matches.
- [ ] Keep wording as “proposed archetype” until final human evidence review is complete.
