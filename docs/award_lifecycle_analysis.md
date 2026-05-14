# Award lifecycle pre/post recognition packet

Purpose: support Issue #46 with a small, report-ready view of citation windows around Test-of-Time recognition. The analysis aligns papers by award announcement year (`t = 0`) and compares available yearly citation metadata before and after public recognition.

## Metric definition

- `relative_year_to_award = citation_year - announcement_year`
- `avg_yearly_citations_5y_before_award` averages available citation years from `t = -5` to `t = -1`.
- `yearly_citations_award_year` uses `t = 0` when available.
- `avg_yearly_citations_5y_after_award` averages available citation years from `t = +1` to `t = +5`.
- `post_minus_pre_avg` is the post-award five-year average minus the pre-award five-year average.

Safe wording boundary: these are OpenAlex-derived citation trajectory windows around announcement year. They can describe whether attention was rising, sustained, or cooling in the available metadata, but they do **not** prove that the award caused a citation change.

## Generated files

| File | Rows | Use |
|---|---:|---|
| `docs/award_lifecycle_prepost_metrics.csv` | 180 | Paper-level before / award-year / after citation-window metrics. |
| `docs/award_lifecycle_relative_year_summary.csv` | 15 | Relative-year aggregate table for an aligned mini-line chart or report table. |

## Current computed statistics

| Statistic | Value | Reading note |
|---|---:|---|
| Papers with any award-window citation data | 180 | Enough for a cautious lifecycle appendix / small aligned chart. |
| Papers with at least 3 available years before and after award | 64 | Use this stricter subset for pre/post comparison to avoid one-year noise. |
| Stricter subset with higher post-award average | 12 | These are candidates for sustained or rising attention cases. |
| Stricter subset with lower post-award average | 52 | These are candidates for already-mature work whose citation peak came earlier. |
| Median pre-award yearly citation average | 55.36 | Median over the stricter comparable subset. |
| Median post-award yearly citation average | 33.80 | Lower than pre-award median in this subset, which should be framed descriptively. |
| Median post-minus-pre change | -12.96 | Suggests many awarded papers had already accumulated strong attention before recognition. |

## Relative-year aggregate table

| t relative to award | Papers with data | Mean yearly citations | Median yearly citations |
|---:|---:|---:|---:|
| -5 | 41 | 122.51 | 56.0 |
| -4 | 54 | 118.46 | 62.0 |
| -3 | 64 | 118.64 | 55.0 |
| -2 | 106 | 99.38 | 48.0 |
| -1 | 126 | 101.86 | 37.5 |
| 0 | 136 | 98.6 | 39.5 |
| 1 | 144 | 105.42 | 37.5 |
| 2 | 152 | 106.38 | 32.5 |
| 3 | 160 | 96.58 | 29.0 |
| 4 | 166 | 85.63 | 25.0 |
| 5 | 172 | 76.12 | 20.5 |

Reading note: the number of papers differs by relative year because OpenAlex yearly citation histories are incomplete and because newer award years have shorter post-award windows. Do not compare distant relative years without noting coverage.

## Representative lifecycle cases

| Case type | Paper | Venue / years | Pre avg | Award year | Post avg | Safe interpretation |
|---|---|---|---:|---:|---:|---|
| Rising after recognition window | `A Unified Architecture for Natural Language Processing: Deep Neural Networks with Multitask Learning` | ICML · 2008 → 2018 | 311.6 | 710.0 | 731.6 | Citation attention is still high or rising around recognition; use as a candidate, then verify paper contribution wording manually. |
| Mature / cooling after recognition window | `Ad-hoc On-Demand Distance Vector Routing` | WMCSA · 1999 → 2018 | 493.6 | 210.0 | 132.4 | Recognition can occur after a paper has already passed its yearly-citation peak; do not describe this as declining importance without qualitative evidence. |

## Copy-ready report paragraph

A lifecycle view adds one more time axis beyond recognition lag: instead of only asking how long a paper waited for Test-of-Time recognition, it aligns citation trajectories at the award announcement year. In the current metadata, 64 papers have at least three available yearly citation observations on both sides of the award window. Their median yearly citation average is 55.4 before recognition and 33.8 after recognition, with a median post-minus-pre change of -13.0. This pattern should be read cautiously: it suggests that many Test-of-Time papers had already built substantial citation attention before formal recognition, while a smaller set still shows rising attention afterward. Because the award date and citation trajectory are both observational metadata, the chart describes lifecycle context rather than a causal award effect.

## B / E module handoff checklist

- [ ] B Time owner: if adding a small chart, align x-axis by `relative_year_to_award` and label `t = 0` as award announcement year.
- [ ] E Citation owner: use `post_minus_pre_avg` only as a descriptive trajectory feature; pair it with citation/breadth modules, not as a quality ranking.
- [ ] Final report: keep the causal boundary sentence visible near any pre/post table or figure.
- [ ] Presentation: use one rising case and one mature/cooling case as contrast examples only after checking contribution wording/evidence URLs.
