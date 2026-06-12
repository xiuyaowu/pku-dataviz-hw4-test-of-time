# Time data quality audit

Purpose: give the Time owner a fast, evidence-backed checkpoint for writing recognition-lag claims without overstating what the dataset proves.

## Coverage snapshot

| Check | Current result | Status | Use in report/PPT |
|---|---:|---|---|
| Master paper rows | 250 | ready | Current Test-of-Time dataset size |
| Usable timing rows | 250 / 250 | ready | All rows can support publication-year, announcement-year, and recognition-lag calculations |
| Publication-year span | 1974–2008 | ready | Use as observed dataset span |
| Announcement-year span | 1989–2018 | ready | Use as observed award-announcement window |
| Recognition-lag range | 9–34 years | ready | Good for explaining short / typical / long lag cases |
| Median recognition lag | 12.0 years | ready | Prefer median for the main Time claim |
| Mean recognition lag | 14.0 years | ready | Pair with median because long-tail cases can pull the mean upward |
| Source URL coverage | 250 / 250 | ready | Every row keeps a seed/source trace |
| Paper URL or DOI coverage | 245 / 250 | presentation-ready-cautious | Enough for case follow-up, but selected papers still need human reading |
| OpenAlex match coverage | 248 / 250 | presentation-ready-cautious | Supports public metadata and proxy metrics, not official award reasoning |
| Timing sanity-check issues | 0 | ready | No stored lag mismatch, missing year, or negative lag found in the current table |

Machine-readable audit table: `docs/analysis/time_data_quality_audit.csv`.

## Timing sanity checks

The audit recomputes `announcement_year - year` for every row in `data/papers_enriched.csv` and compares it with `recognition_lag`. In the current data, all 250 rows have usable publication year, announcement year, and nonnegative matching lag.

This makes the Time-module distribution and cohort docs safe to use as dataset-level observations. It does not mean the dataset is a complete census of every Test-of-Time-style award, nor does it prove why a paper won.

## Copy-ready report wording

In the current 250-row Test-of-Time dataset, all records contain usable publication-year and award-announcement-year metadata, so the recognition-lag analysis can be computed consistently as `announcement_year - publication_year`. The observed lag spans 9–34 years, with a median of 12 years and a mean of about 14 years. We therefore describe recognition lag as an observed award-timing window in this dataset, not as a causal measure of paper quality or as proof that longer-delayed papers are more influential.

## Careful wording boundaries

- Say: “observed recognition window in the current Test-of-Time dataset.”
- Say: “median recognition lag is 12 years in this dataset.”
- Say: “OpenAlex coverage supports public metadata and citation/breadth proxy metrics.”
- Avoid: “longer lag means better paper.”
- Avoid: “the dataset covers every Test-of-Time award.”
- Avoid: “OpenAlex proves the award committee’s reason.”

## module owner final checklist

- Use the median-lag sentence in the final Time paragraph.
- Choose 2–3 short / typical / long cases from `docs/analysis/recognition_lag_outlier_cases.md` for slides.
- Check source or paper URLs for any final named examples.
- Keep lifecycle language non-causal when using `docs/analysis/award_lifecycle_analysis.md`.
- If data changes, regenerate `docs/analysis/time_data_quality_audit.csv` and update the snapshot numbers here.
