# Time module demo claim cards

Purpose: give B / Time a compact, report-ready bridge from the recognition-lag charts to exact evidence, safe wording, and final human checks. This packet supports issue #98 and keeps the broad Time container #3 open for teammate-owned verification.

## Fast use

- Use cards 1-2 for the opening Time chart explanation.
- Use cards 3-5 when moving from the histogram to concrete paper cases.
- Use cards 6-7 only as an appendix or Q&A point because citation-window comparisons need explicit non-causal wording.

## Current data anchors

- Usable paper rows: **250** from `data/papers_enriched.csv`.

- Publication years: **1974-2008**; award announcement years: **1989-2018**.

- Venues: **27**; venue areas: **16**.

- Median recognition lag: **12 years**; densest lag bin: **(5, 10]** with **106 papers**.

- Award-lifecycle comparable subset: **127 papers**; median pre-award yearly citations **42.5**, median post-award yearly citations **28.4**.


## Claim-card table

| Card | Claim type | Claim | Evidence | Safe boundary | Human check |
|---|---|---|---|---|---|
| time-01 | dataset span | The usable Test-of-Time sample has 250 papers across 27 venues and 16 venue areas, with publication years 1974-2008 and award announcement years 1989-2018. | `data/papers_enriched.csv` | Describe this as the current curated Test-of-Time award dataset, not a complete census of all CS impact. | Confirm whether final report should mention the upstream seed source in the same sentence. |
| time-02 | lag distribution | The densest recognition-lag bin is (5, 10] with 106 papers; the median lag is 12 years. | `data/recognition_lag_distribution.csv; data/papers_enriched.csv` | Recognition lag is announcement year minus publication year; it is a timing descriptor, not a causal measure of quality. | Check that the final screenshot uses the sorted lag-bin chart and labels the dense window clearly. |
| time-03 | short-lag cases | The shortest observed lag is 9 years; high-citation short-lag examples include Collaborative Filtering for Implicit Feedback Datasets (ICDM 2008) and gSpan: Graph-Based Substructure Pattern Mining (ICDM 2002). | `data/papers_enriched.csv; docs/recognition_lag_outlier_cases.csv` | Use as examples of quicker formal recognition in this award record; do not say they were objectively more important than long-lag cases. | Read the selected papers/source pages before using contribution-level wording in slides. |
| time-04 | typical-lag cases | A typical Time-module comparison can use Object Recognition from Local Scale-Invariant Features and XORs in the air: practical wireless network coding, both close to the median lag of 12 years. | `data/papers_enriched.csv; docs/recognition_lag_outlier_cases.csv` | Frame these as median-neighborhood examples, not representative of every field or venue. | Choose one middle case for the final PPT if time allows; otherwise keep as backup Q&A material. |
| time-05 | long-lag cases | The longest observed lag is 34 years; long-lag examples include Probabilistic Models of Indexing and Searching and The ALOHA system. | `data/papers_enriched.csv; docs/recognition_lag_outlier_cases.csv` | Long lag can suggest delayed formal recognition in this award record, but the reason must be checked from paper/history evidence. | Verify award citation or paper context before explaining why each case was recognized late. |
| time-06 | award lifecycle | In the comparable award-lifecycle subset (127 papers), median yearly citations are 42.5 in the five-year pre-award window and 28.4 in the five-year post-award window. | `docs/award_lifecycle_prepost_metrics.csv; docs/award_lifecycle_analysis.md` | This is an observed citation-window comparison around award timing, not evidence that the award caused citation movement. | If used in slides, include the non-causal boundary in the speaker note. |
| time-07 | lifecycle contrast cases | Lifecycle contrast examples: A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise has the largest post-minus-pre average in the comparable subset, while Ad-hoc On-Demand Distance Vector Routing has the most negative difference. | `docs/award_lifecycle_prepost_metrics.csv` | Use as trajectory-shape examples only; do not infer award effect or committee reasoning from the difference. | Read both papers/source pages before naming them as final presentation examples. |

## Copy-ready Time module paragraph

> The Time module treats Test-of-Time recognition as a measurable time interval: `recognition_lag = announcement_year - publication_year`. In the current 250-paper dataset, publication years span 1974-2008, and the densest lag window is (5, 10] with 106 papers. This supports a cautious narrative: many papers are formally recognized after a substantial delay, while short- and long-lag cases show that award timing varies by paper history and venue record. Citation-window comparisons around the award year are useful as descriptive metadata, but they should not be written as proof that the award caused later citations.

## Presentation route for B owner

1. Start with the lag histogram and say the metric definition first.
2. Point to the dense window / median band before naming individual papers.
3. Use one short-lag and one long-lag example only after checking the paper/source page.
4. If asked about citations around awards, use the lifecycle subset as an appendix and repeat the non-causal boundary.

## Remaining B-owner checks

- [ ] Choose the final 2-3 paper examples for slides.
- [ ] Verify source URLs or award citations for contribution-level wording.
- [ ] Keep `recognition lag` framed as timing metadata, not a quality score.
- [ ] Decide whether lifecycle cards stay in the report appendix or become one backup slide.
