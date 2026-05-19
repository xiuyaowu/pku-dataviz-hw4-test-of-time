# Topic presentation case shortlist
Purpose: give the D / Topic Evolution owner a compact, slide-ready set of representative paper cases that can be checked quickly before the final report or classroom presentation.
Data used: `data/papers_enriched.csv`, `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`, and `docs/manual_topic_audit_top12.csv`. Companion machine-readable table: `docs/topic_presentation_case_shortlist.csv`.

## Snapshot
- Case rows: 8 representative papers.
- Topic labels covered: 8; venues covered: 7; decades covered: 1970s, 1980s, 1990s, 2000s.
- Median recognition lag among shortlist cases: 15.0 years.
- Highest citation-count case in the shortlist: 19,133 citations in the current OpenAlex-enriched table.
- Use manual topic labels where available; treat all labels as report groupings rather than official taxonomy.

## Recommended slide route
1. Start with one high-recognition anchor such as DBSCAN or SIFT to make the Topic module concrete.
2. Add one venue bridge case such as association rules or network coding to connect Topic Evolution with Venue / Field.
3. Use one contrast case such as probabilistic IR or JVM evolution to show that long-term recognition is not only data-mining or vision.
4. Keep one backup historical/context case for Q&A, especially when asked why older low-citation papers still appear in Test-of-Time data.

## Case table
| Case | Topic label | Paper | Venue / year | Slide use | Evidence URL | One-sentence contribution | Human check |
|---|---|---|---|---|---|---|---|
| D-topic-case-01 | Data Mining / Clustering | A Density-Based Algorithm for Discovering Clusters... | KDD 1996 | opening representative | https://dl.acm.org/doi/10.5555/3001460.3001507 | 提出基于密度的聚类算法DBSCAN，能够发现任意形状的簇、有效处理噪声，仅需少量参数，在大规模空间数据库上效率显著优于传统方法。 | Open URL & keep wording descriptive |
| D-topic-case-02 | Computer Vision / Local Features | Object Recognition from Local Scale-Invariant Features | ICCV 1999 | opening representative | https://doi.org/10.1109/ICCV.1999.790410 | 提出 SIFT（尺度不变特征变换）算法，生成对尺度、平移、旋转具有不变性，对光照变化与仿射 / 三维投影部分不变的局部图像特征，实现杂乱遮挡场景下鲁棒、快速的目标识别。 | Open URL & keep wording descriptive |
| D-topic-case-03 | Database / Association Rules | Mining Association Rules... | SIGMOD 1993 | bridge slide | https://doi.org/10.1145/170035.170072 | 提出了Apriori算法，首次系统地解决了大型交易数据库中高效挖掘关联规则的问题，为数据挖掘领域奠定了核心基础。 | Open URL & keep wording descriptive |
| D-topic-case-04 | Information Theory / Network Coding | Network Information Flow | IEEE Trans IT 2000 | bridge slide | https://doi.org/10.1109/18.850663 | 提出network information flow / network coding框架，说明网络中间节点编码可提升多播传输能力。 | Open URL & keep wording descriptive |
| D-topic-case-05 | Programming Languages / Virtual Machines | Multitasking without compromise | OOPSLA 2001 | contrast case | https://doi.org/10.1145/504311.504292 | 讨论虚拟机在多任务场景下的演进，强调隔离、资源管理与性能之间的折中。 | Verify DOI & contribution wording |
| D-topic-case-06 | Information Retrieval / Probabilistic Models | Probabilistic Models of Indexing... | SIGIR 1980 | contrast case | https://dl.acm.org/doi/10.5555/636669.636673 | 系统整合概率检索理论与词频统计模型，提出基于概率排序原理的检索权重公式，统一了早期信息检索的理论框架与实践方法。 | Open URL & keep wording descriptive |
| D-topic-case-07 | Networking / Research Agenda | Research Areas in Computer Communication | SIGCOMM 1974 | backup case | https://doi.org/10.1145/1015660.1015661 | 概括计算机通信领域早期研究问题，为后续网络研究议程提供问题框架。 | Open URL & keep wording descriptive |
| D-topic-case-08 | Data Mining / Network Science | Graphs over Time... | KDD 2005 | backup case | https://doi.org/10.1145/1081870.1081893 | 总结大规模真实网络随时间演化的densification laws与shrinking diameters现象。 | Open URL & keep wording descriptive |

## Copy-ready report wording
For representative Topic Evolution examples, we selected cases from the manually audited Top 12 evidence-ready papers rather than relying only on automatic topic labels. The shortlist spans data mining, computer vision, databases, information theory, programming languages, information retrieval, networking, and network science. These examples should be described as dataset-backed representative cases; final prose should still verify each evidence URL and avoid presenting topic labels as an official taxonomy.

## D-owner final checklist
- [ ] Pick 3-4 rows from `docs/topic_presentation_case_shortlist.csv` for the final slide deck.
- [ ] Open the evidence URL for every selected case before writing contribution wording.
- [ ] Prefer `topic_label_for_slides` over raw API topic labels in report prose.
- [ ] Preserve the boundary: representative case within this dataset, not official topic taxonomy or paper-quality ranking.