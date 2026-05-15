# Topic label consistency check

Purpose: give D / Issue #5 a report-ready bridge between automatic topic labels and manually reviewed representative-paper labels. This packet implements stretch issue #120 and should be read together with `docs/manual_topic_audit_top12.md`, `docs/topic_presentation_case_shortlist.md`, and `docs/topic_venue_crosswalk.md`.

## Current coverage snapshot

- Master dataset: **250** Test-of-Time rows from `data/papers_enriched.csv`.
- Automatic topic labels: **22** distinct `topic_label` values.
- Large automatic topics (10+ papers): **6**.
- Top-12 manually audited topic rows: **12** across **7** automatic topic buckets.
- Manual correction / needs-review buckets: **5**. These are the safest places to mention the automatic-label limitation in the methods/report section.

## Fast table for the largest topic buckets

| API topic label | Papers | Top-12 audited | Corrected rows | Review priority | Safe wording boundary |
|---|---:|---:|---:|---|---|
| Database / Systems | 67 | 1 | 0 | medium | Top-12 checked cases currently align, but the label is still a project grouping rather than an official taxonomy. |
| Data Mining / Web | 46 | 4 | 0 | medium | Use this automatic topic as a starting grouping; prefer manually checked labels for named representative papers. |
| Computer Vision | 43 | 3 | 1 | high | Use this automatic topic as a starting grouping; prefer manually checked labels for named representative papers. |
| Natural Language Processing | 26 | 1 | 1 | high | Use this automatic topic as a starting grouping; prefer manually checked labels for named representative papers. |
| Machine Learning Theory | 18 | 1 | 1 | high | Use this automatic topic as a starting grouping; prefer manually checked labels for named representative papers. |

## Correction and caution anchors

- **Data Mining / Web**: Graphs over Time: Densification Laws, Shrinking Diameters and Possible Explanations (2005; aligned; manual: Data Mining / Network Science); Multitasking without compromise: a virtual machine evolution (2001; needs review; manual: Programming Languages / Virtual Machines); Research Areas in Computer Communication (1974; aligned; manual: Networking / Research Agenda)
- **Computer Vision**: A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise (1996; corrected; manual: Data Mining / Clustering); Snakes: Active Contour Models (1987; aligned; manual: Computer Vision / Segmentation); Object Recognition from Local Scale-Invariant Features (1999; aligned; manual: Computer Vision / Local Features)
- **Natural Language Processing**: Probabilistic Models of Indexing and Searching (1980; corrected; manual: Information Retrieval / Probabilistic Models); A Unified Architecture for Natural Language Processing: Deep Neural Networks with Multitask Learning (2008; API topic: Natural Language Processing); Probabilistic Latent Semantic Indexing (1999; API topic: Natural Language Processing)
- **Machine Learning Theory**: Network Information Flow (2000; corrected; manual: Information Theory / Network Coding); Random Features for Large-Scale Kernel Machines (2007; API topic: Machine Learning Theory); A New Method for Solving Hard Satisfiability Problems (1992; API topic: Machine Learning Theory)
- **Human-Computer Interaction**: Ad-hoc On-Demand Distance Vector Routing (1999; corrected; manual: Networking / Mobile Ad Hoc Routing); Wake on Wireless: An Event Driven Energy Saving Strategy for Battery Operated Devices (2002; API topic: Human-Computer Interaction); A Look Back and a Look Forward (1988; API topic: Human-Computer Interaction)

Use these cases as method-quality evidence: the project does not blindly treat API/metadata labels as final research categories. For named paper examples, prefer `manual_topic_label` or `proposed_manual_topic` after checking the paper/evidence URL.

## D-owner review queue

- **Computer Vision** (43 papers): D owner should verify corrected / needs-review cases before using them as slide examples.
- **Natural Language Processing** (26 papers): D owner should verify corrected / needs-review cases before using them as slide examples.
- **Machine Learning Theory** (18 papers): D owner should verify corrected / needs-review cases before using them as slide examples.
- **Human-Computer Interaction** (13 papers): D owner should verify corrected / needs-review cases before using them as slide examples.
- **Database / Systems** (67 papers): Keep evidence URLs open when converting the checked cases into final prose.
- **Data Mining / Web** (46 papers): D owner should verify corrected / needs-review cases before using them as slide examples.
- **Real-Time / Embedded Systems** (5 papers): Keep evidence URLs open when converting the checked cases into final prose.
- **Reinforcement Learning** (8 papers): If this topic appears in final PPT, choose one representative paper and add a manual topic/evidence check.

## Copy-ready report wording

> Topic labels in this project are first-pass metadata groupings derived from OpenAlex concepts and rule-based labels. We use them to show broad patterns across 250 Test-of-Time papers, but representative cases are checked separately. For example, the Top-12 audit records where an API topic should be manually corrected or treated cautiously, so the final report uses automatic labels for aggregate exploration and manually reviewed labels for paper-level interpretation.

## Presentation wording

- Safe: “The current dataset groups papers by automatic topic labels, then manually checks representative cases.”
- Safe: “Some high-impact examples reveal why manual review matters: a paper can be useful for Data Mining even when metadata initially places it elsewhere.”
- Avoid: “This is the official topic taxonomy.”
- Avoid: “Topic A is more important than Topic B because it has higher average citations.”

## Remaining human checks for D

- [ ] Pick 5–8 final paper examples from `docs/topic_presentation_case_shortlist.csv` and verify their evidence URLs.
- [ ] Prefer `manual_topic_label` for named examples; use API `topic_label` only for aggregate charts.
- [ ] If a topic bucket without Top-12 audit becomes a slide focus, add one manual topic/evidence check before final submission.
- [ ] Keep citation and breadth metrics as descriptive proxies, not topic-value rankings.
