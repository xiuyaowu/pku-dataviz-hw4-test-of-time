# Evidence coverage heatmap / matrix

Purpose: make the project's evidence strength visible before final report and presentation writing. This is a teammate-facing audit, not a new claim source: it tells each owner where current data is strong, where wording must stay cautious, and where human checking still matters.

Related issue: #49. Core owner: E / Citation-Impact, with inputs from B-F.

## Status legend

| Status | Meaning | Safe use |
|---|---|---|
| `ready` | Dataset fields, source links, and module handoff are already sufficient for cautious report use. | Can be used in report after normal proofreading. |
| `presentation-ready-cautious` | Useful for demo/PPT, but final wording or crop/rehearsal still needs a human pass. | Use short, bounded claims. |
| `proxy only` | Quantitative signal exists, but it is derived from OpenAlex/API sampling rather than official award reasoning. | Say "proxy" and avoid causal wording. |
| `needs human check` | Data exists, but representative-paper interpretation still needs URL reading or manual label confirmation. | Do not make strong contribution/impact claims yet. |
| `missing` | Required evidence is absent or too thin for classroom claims. | Fill evidence URL / manual note first. |

## Module-level coverage

| Owner | Module | Status | Evidence files | Next action |
|---|---|---|---|---|
| B | Time / recognition lag | `ready` | data/award_timeline.csv; data/recognition_lag_distribution.csv; docs/time_recognition_lag_handoff.md; docs/recognition_lag_outlier_cases.md | Check award citation wording for selected cases before final report. |
| C | Venue / Field | `ready` | data/venue_stats.csv; data/venue_area_stats.csv; docs/venue_field_handoff.md; docs/venue_year_case_studies.md | Do not describe counts as objective field quality ranking. |
| D | Topic Evolution | `needs human check` | data/topic_stats.csv; data/topic_year_stats.csv; docs/topic_evolution_handoff.md; manual_annotations/manual_paper_annotations_top12_evidence_ready.csv | Audit API/manual topic mismatches for final selected papers. |
| E | Citation / Impact | `proxy only` | data/citation_trajectories.csv; data/citing_breadth_metrics.csv; docs/citation_impact_handoff.md; docs/citation_trajectory_archetypes.md; docs/impact_breadth_evidence_audit.md | Keep impact breadth described as sampled OpenAlex proxy. |
| F | Network / Presentation | `presentation-ready-cautious` | data/institution_stats.csv; data/country_stats.csv; docs/network_visual_presentation_handoff.md; docs/slide_visual_consistency_audit.md; docs/live_demo_fallback_script.md | Final PPT crop/rehearsal remains human-owned. |


Machine-readable file: [`docs/evidence_coverage_matrix.csv`](evidence_coverage_matrix.csv)

## Top 12 representative-paper coverage

Summary from `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv` joined with `data/papers_enriched.csv`:

| Coverage status | Count |
|---|---:|
| `ready` | 0 |
| `presentation-ready-cautious` | 12 |
| `proxy only` | 0 |
| `needs human check` | 0 |
| `missing` | 0 |

Machine-readable file: [`docs/top12_evidence_coverage_matrix.csv`](top12_evidence_coverage_matrix.csv)

## Highest-value gaps to close

1. Mark `checked` after opening evidence URLs for the final 5-8 papers used in PPT/report; several Top 12 cards have enough links but still need final human confirmation.
2. Keep citation breadth and trajectory language explicitly proxy-based: the data supports sampled diffusion patterns, not official award-committee explanations.
3. For D/Topic, use manual topic labels for representative papers and mention API-topic mismatch as a data-quality limitation when relevant.
4. For F/Presentation, use the screenshot audit and fallback script, then do human crop/rehearsal checks before exporting slides.

## Actionable representative-paper queue

| Paper | Status | Next action |
|---|---|---|
| A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise (KDD 1996) | `presentation-ready-cautious` | ready for cautious classroom wording |
| Snakes: Active Contour Models (ICCV 1987) | `presentation-ready-cautious` | ready for cautious classroom wording |
| Graphs over Time: Densification Laws, Shrinking Diameters and Possible Explanations (KDD 2005) | `presentation-ready-cautious` | ready for cautious classroom wording |
| Multitasking without compromise: a virtual machine evolution (OOPSLA 2001) | `presentation-ready-cautious` | ready for cautious classroom wording |
| Probabilistic Models of Indexing and Searching (SIGIR 1980) | `presentation-ready-cautious` | ready for cautious classroom wording |


## Report / defense wording boundaries

- Good: “In this dataset, high-breadth papers often appear across many sampled citing fields/institutions.”
- Avoid: “These papers won because they influenced industry.” Use that only when a manual evidence URL supports the specific case.
- Good: “Topic labels combine OpenAlex/API labels with manual labels for representative cases.”
- Avoid: treating API topic labels as ground truth for every paper.
- Good: “The coverage matrix shows what is presentation-ready and what remains a final human check.”
- Avoid: claiming every representative card has been fully expert-verified.

## Where this is wired

- Work board: `docs/work_board.md`
- Stretch routing: `docs/stretch_issue_assignment_board.md`
- Final QA: `docs/final_qa_checklist.md`
- E module handoff: `docs/citation_impact_handoff.md`
- Report skeleton: `docs/report/report_skeleton.md`
