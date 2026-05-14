# Data Readiness Matrix / 最终数据就绪矩阵

用途：提交前快速确认每个可视化模块使用的静态数据文件、行数、关键字段和安全表述边界。它不是替代 `docs/data_dictionary.md`，而是给最终整合、报告写作和课堂答辩使用的检查页。

## 1. Core dataset inventory

| File | Rows | Main module(s) | Required fields checked | Use in report/demo | Safe wording boundary |
|---|---:|---|---|---|---|
| `data/papers_enriched.csv` | 250 | Opening, Paper Explorer, Benchmark Lab, all detail cards | `paper_id`, `title`, `year`, `venue`, `venue_area`, `topic_label`, `citation_count`, `recognition_lag`, `impact_breadth_score` | Master paper table; use for counts, filtering, selected-paper details, percentile comparisons. | Treat as public metadata enrichment of Test-of-Time award papers, not as an official award-committee rationale. |
| `data/award_timeline.csv` | 250 | Time / Timeline | `paper_id`, `year`, `announcement_year`, `recognition_lag`, `venue`, `topic_label`, `citation_count` | Publication-to-award timing, lag distribution, representative long/short lag cases. | Recognition lag describes award timing only; do not infer causal delay without paper-specific evidence. |
| `data/recognition_lag_distribution.csv` | 6 | Time / Timeline | `lag_bin`, `paper_count`, `avg_citation_count` | Fast histogram/summary of how long recognition usually takes. | Bin-level averages hide venue/topic differences; use as overview, not final explanation. |
| `data/venue_stats.csv` | 27 | Venue / Field | `venue`, `venue_area`, `paper_count`, `avg_recognition_lag`, `avg_citation_count`, `avg_impact_breadth_score` | Venue ranking and venue-level comparison. | Counts reflect the collected Test-of-Time award set, not total venue quality or acceptance difficulty. |
| `data/venue_area_stats.csv` | 16 | Venue / Field, Network bridge | `venue_area`, `paper_count`, `avg_recognition_lag`, `avg_citation_count`, `avg_impact_breadth_score` | Field-level overview and cross-module story bridge. | Area labels are normalized for visualization; mention mixed/overlapping CS fields when writing conclusions. |
| `data/topic_stats.csv` | 22 | Topic Evolution, Citation / Impact bridge | `topic_label`, `paper_count`, `avg_recognition_lag`, `avg_citation_count`, `avg_impact_breadth_score`, `avg_citing_field_count` | Topic distribution, topic-level citation/breadth comparisons, representative case selection. | Automatic topic labels are first-pass API/metadata labels; manually checked labels should override them for final case prose. |
| `data/topic_year_stats.csv` | 147 | Topic Evolution | `publication_year`, `topic_label`, `paper_count`, `avg_citation_count`, `proportion` | Topic migration over time and decade-level storytelling. | Use for trend signals; avoid over-reading years with very few papers. |
| `data/citation_trajectories.csv` | 3,077 | Citation / Impact | `paper_id`, `citation_year`, `yearly_citations`, `cumulative_citations`, `topic_label` | Longitudinal citation curves and selected-paper trajectory comparison. | Citation curves depend on OpenAlex yearly counts and coverage; compare patterns rather than claiming exact full citation history. |
| `data/citing_breadth_metrics.csv` | 250 | Citation / Impact, Benchmark Lab | `paper_id`, `citing_field_count`, `citing_institution_count`, `citing_country_count`, `citing_works_sampled`, `openalex_id` | Raw sampled breadth components for depth × breadth analysis; the combined `impact_breadth_score` used in the UI lives in `papers_enriched.csv`. | Breadth is an OpenAlex sampled proxy, not a complete citation graph or official interdisciplinary impact score. |
| `data/institution_stats.csv` | 169 | Impact Network | `name`, `country`, `paper_count`, `centrality` | Institution network nodes, institution count summaries. | Institution coverage depends on public metadata; missing affiliations should be reported as data limitation. |
| `data/country_stats.csv` | 23 | Impact Network | `country`, `paper_count`, `avg_citation_count` | Country/region overview and presentation backup numbers. | Country attribution follows available affiliation metadata and may undercount multi-affiliation papers. |

## 2. Manual annotation readiness

| File | Rows | Who should use it | Current status | Final human check |
|---|---:|---|---|---|
| `manual_annotations/manual_paper_annotations_top60_template.csv` | 60 | B-F module owners selecting representative cases | Priority template with stable IDs and blank manual fields. | Fill contribution wording, manual topic, evidence URLs, checked status. |
| `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv` | 12 | Report/PPT authors needing ready cases | DOI / paper page / supporting links already added for the representative subset. | Open links, confirm wording, and choose the final 5–8 classroom cases. |
| `manual_annotations/A_网络系统安全方向_12篇待补充.csv` to `E_SE_PL_HCI方向_12篇待补充.csv` | 12 each | Domain split workstreams | Balanced 5-way split of the Top 60 manual template. | Merge checked edits back into the shared template; keep evidence URLs for strong claims. |

## 3. Module-to-data map

| Module | Primary data | Secondary data | Submission-ready claim type |
|---|---|---|---|
| Opening / overview | `papers_enriched.csv` | `venue_area_stats.csv`, `topic_stats.csv` | Dataset size, year span, venue/field/topic coverage. |
| Time / Timeline | `award_timeline.csv` | `recognition_lag_distribution.csv`, `papers_enriched.csv` | Recognition lag patterns and long/short lag cases. |
| Venue / Field | `venue_stats.csv`, `venue_area_stats.csv` | `papers_enriched.csv` | Which venues/areas appear frequently and how their timing/citation profiles differ. |
| Topic Evolution | `topic_stats.csv`, `topic_year_stats.csv` | `papers_enriched.csv`, manual annotations | Topic distribution and time migration, with representative cases after human topic check. |
| Citation / Impact | `citation_trajectories.csv`, `citing_breadth_metrics.csv` | `papers_enriched.csv`, `topic_stats.csv` | Citation depth, trajectory shape, and sampled breadth proxy; always state proxy boundary. |
| Paper Explorer / Evidence Index | `papers_enriched.csv` | `manual_paper_annotations_top12_evidence_ready.csv`, `docs/evidence_cards_top12.md` | Searchable evidence index and safe representative-card selection. |
| Benchmark Lab | `papers_enriched.csv`, `citing_breadth_metrics.csv` | `venue_area_stats.csv`, `topic_stats.csv` | Selected paper vs dataset/field percentile framing. |
| Impact Network | `institution_stats.csv`, `country_stats.csv` | `papers_enriched.csv` | Collaboration/geographic distribution from available affiliation metadata. |

## 4. Final report wording guardrails

- Write `citation_count`, citation trajectories and `impact_breadth_score` as public-metadata observations.
- Use “proxy / 近似指标 / sampled OpenAlex metadata” for breadth and network conclusions.
- Do not write that a metric is the reason a paper won an award unless the award citation or paper-specific evidence says so.
- For representative cases, prefer the Top 12 evidence-ready file first, then expand to Top 60 only after evidence URLs are checked.
- When a manual annotation conflicts with automatic `topic_label`, explain it as a metadata-quality limitation instead of silently treating the automatic label as ground truth.

## 5. Reproducible validation command

Run this from the repository root before final packaging:

```bash
python3 - <<'PY'
import csv, pathlib
required = {
    'data/papers_enriched.csv': ['paper_id','title','year','venue','venue_area','topic_label','citation_count','recognition_lag','impact_breadth_score'],
    'data/award_timeline.csv': ['paper_id','year','announcement_year','recognition_lag','venue','topic_label','citation_count'],
    'data/recognition_lag_distribution.csv': ['lag_bin','paper_count','avg_citation_count'],
    'data/venue_stats.csv': ['venue','venue_area','paper_count','avg_recognition_lag','avg_citation_count','avg_impact_breadth_score'],
    'data/venue_area_stats.csv': ['venue_area','paper_count','avg_recognition_lag','avg_citation_count','avg_impact_breadth_score'],
    'data/topic_stats.csv': ['topic_label','paper_count','avg_recognition_lag','avg_citation_count','avg_impact_breadth_score','avg_citing_field_count'],
    'data/topic_year_stats.csv': ['publication_year','topic_label','paper_count','avg_citation_count','proportion'],
    'data/citation_trajectories.csv': ['paper_id','citation_year','yearly_citations','cumulative_citations','topic_label'],
    'data/citing_breadth_metrics.csv': ['paper_id','citing_field_count','citing_institution_count','citing_country_count','citing_works_sampled','openalex_id'],
    'data/institution_stats.csv': ['name','country','paper_count','centrality'],
    'data/country_stats.csv': ['country','paper_count','avg_citation_count'],
    'manual_annotations/manual_paper_annotations_top60_template.csv': ['paper_id','title','manual_topic_label','one_sentence_contribution_zh','evidence_url_1','checked'],
    'manual_annotations/manual_paper_annotations_top12_evidence_ready.csv': ['paper_id','title','one_sentence_contribution_zh','evidence_url_1','evidence_url_2','checked'],
}
expected_rows = {
    'data/papers_enriched.csv': 250,
    'data/award_timeline.csv': 250,
    'data/citation_trajectories.csv': 3077,
    'data/citing_breadth_metrics.csv': 250,
    'manual_annotations/manual_paper_annotations_top60_template.csv': 60,
    'manual_annotations/manual_paper_annotations_top12_evidence_ready.csv': 12,
}
for path, cols in required.items():
    p = pathlib.Path(path)
    assert p.exists(), f'missing {path}'
    with p.open(newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    missing = [c for c in cols if c not in (reader.fieldnames or [])]
    assert not missing, f'{path} missing columns: {missing}'
    if path in expected_rows:
        assert len(rows) == expected_rows[path], f'{path} row count {len(rows)} != {expected_rows[path]}'
    print(f'OK {path}: {len(rows)} rows')
print('data readiness validation passed')
PY
```

Expected core counts at this checkpoint: 250 enriched papers, 3,077 yearly citation trajectory rows, 250 breadth-metric rows, 60 top-priority manual rows, and 12 evidence-ready representative rows.
