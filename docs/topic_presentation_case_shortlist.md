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

| Case | Topic label | Paper | Venue / year | Slide use | Human check |
|---|---|---|---|---|---|
| D-topic-case-01 | Data Mining / Clustering | A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise | KDD 1996 | opening representative case for high-recognition topic evidence | Open evidence URL once before final PPT/report and keep wording descriptive. |
| D-topic-case-02 | Computer Vision / Local Features | Object Recognition from Local Scale-Invariant Features | ICCV 1999 | opening representative case for high-recognition topic evidence | Open evidence URL once before final PPT/report and keep wording descriptive. |
| D-topic-case-03 | Database / Association Rules | Mining Association Rules Between Sets of Items in Large Databases | SIGMOD 1993 | bridge slide between topic pattern and venue/field evidence | Open evidence URL once before final PPT/report and keep wording descriptive. |
| D-topic-case-04 | Information Theory / Network Coding | Network Information Flow | IEEE Transactions on Information Theory 2000 | bridge slide between topic pattern and venue/field evidence | Open evidence URL once before final PPT/report and keep wording descriptive. |
| D-topic-case-05 | Programming Languages / Virtual Machines | Multitasking without compromise: a virtual machine evolution | OOPSLA 2001 | contrast case showing topic diversity beyond data-mining/vision examples | Verify DOI/source match and contribution wording before final PPT. |
| D-topic-case-06 | Information Retrieval / Probabilistic Models | Probabilistic Models of Indexing and Searching | SIGIR 1980 | contrast case showing topic diversity beyond data-mining/vision examples | Open evidence URL once before final PPT/report and keep wording descriptive. |
| D-topic-case-07 | Networking / Research Agenda | Research Areas in Computer Communication | SIGCOMM 1974 | backup case for historical context or breadth/depth contrast | Open evidence URL once before final PPT/report and keep wording descriptive. |
| D-topic-case-08 | Data Mining / Network Science | Graphs over Time: Densification Laws, Shrinking Diameters and Possible Explanations | KDD 2005 | backup case for historical context or breadth/depth contrast | Open evidence URL once before final PPT/report and keep wording descriptive. |

## Copy-ready report wording

For representative Topic Evolution examples, we selected cases from the manually audited Top 12 evidence-ready papers rather than relying only on automatic topic labels. The shortlist spans data mining, computer vision, databases, information theory, programming languages, information retrieval, networking, and network science. These examples should be described as dataset-backed representative cases; final prose should still verify each evidence URL and avoid presenting topic labels as an official taxonomy.

## D-owner final checklist

- [ ] Pick 3-4 rows from `docs/topic_presentation_case_shortlist.csv` for the final slide deck.
- [ ] Open the evidence URL for every selected case before writing contribution wording.
- [ ] Prefer `topic_label_for_slides` over raw API topic labels in report prose.
- [ ] Preserve the boundary: representative case within this dataset, not official topic taxonomy or paper-quality ranking.
