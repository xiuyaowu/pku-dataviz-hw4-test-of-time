# Citation metric sensitivity notes

Owner: E · Citation / Impact (#6)  
Stretch issue: #116

## Why this packet exists

The Citation / Impact module uses several public-metadata proxies: raw citation depth, yearly citation trajectory, sampled impact breadth, citing-field counts, citing-institution counts, and recognition lag. This packet gives E a report-safe way to compare those metrics without implying that any single number explains why a paper received a Test of Time Award.

## Current data anchors

Source files:

- `data/papers_enriched.csv`: 250 Test-of-Time rows used by the D3 page.
- `data/citing_breadth_metrics.csv`: sampled OpenAlex citing-work breadth fields.
- `docs/citation_metric_sensitivity_notes.csv`: 10 representative sensitivity rows generated from the current master data.

Computed baseline from the current master table:

| Metric | Current anchor | How to say it safely |
|---|---:|---|
| Paper rows | 250 | The dataset covers 250 usable Test-of-Time award papers from the current source pipeline. |
| Median citation count | 523.5 | Raw citation count is a depth proxy from public metadata, not a full influence measure. |
| Median impact breadth score | 57.56 | Impact breadth is a sampled OpenAlex proxy built from visible citing venues, fields, institutions, and countries. |
| Median recognition lag | 12 years | Recognition lag is award timing metadata: `announcement_year - publication_year`. |

## Sensitivity case types

`docs/citation_metric_sensitivity_notes.csv` contains 10 rows across five case types:

| Case type | Use in report / PPT | Safe boundary |
|---|---|---|
| High depth + high breadth | Strongest examples where two proxy views point in the same direction. | Say both metrics are high in this dataset; do not say they caused the award. |
| High depth + moderate breadth | Shows raw citation count does not fully describe diffusion shape. | Do not imply lower sampled breadth means lower real-world influence. |
| Moderate depth + high breadth | Shows the breadth proxy can surface wide diffusion even when raw citation depth is not top-ranked. | Say sampled breadth, not complete citation network. |
| Long recognition lag | Connects Citation / Impact back to the Time module. | Do not equate longer recognition lag with higher quality or slower impact. |
| Proxy-limited / low metadata evidence | Gives honest limitations examples for Q&A. | Sparse public metadata is not evidence of low actual influence. |

## Copy-ready report paragraph

The citation module should be read as a sensitivity view rather than a single ranking. In the current dataset, some papers combine very high raw citation depth with high sampled breadth, while others show a mismatch: high citation counts but more moderate sampled breadth, or moderate citation counts with broad visible diffusion across fields and institutions. This distinction helps the project avoid treating citation count as the only signal of long-term impact. Because the breadth fields are derived from sampled OpenAlex metadata, we describe them as public-metadata proxies and keep paper-specific contribution claims tied to human-checked evidence URLs.

## 45-second E presentation route

1. Start from the Citation / Impact scatter and explain the two axes: depth and breadth are related but not identical.
2. Use one `high depth + high breadth` row as the safest example of agreement between metrics.
3. Use one mismatch row from `high depth + moderate breadth` or `moderate depth + high breadth` to show why the module is analytical rather than a simple leaderboard.
4. Close with the limitation sentence: “These are OpenAlex-derived descriptive proxies, so we use them to guide interpretation, not to declare official award reasons.”

## Recommended classroom examples

Use the CSV as a menu rather than a fixed claim list:

- Safe primary examples: choose one row from `high depth + high breadth` after opening its source / paper page.
- Contrast examples: choose one mismatch row to explain why citation depth and impact breadth answer different questions.
- Limitation examples: keep one `proxy-limited / low metadata evidence` row ready for Q&A about missing public metadata.

## E-owner final checklist

- [ ] Pick 2-3 final examples for slides from `docs/citation_metric_sensitivity_notes.csv`.
- [ ] Open the source / paper page for selected examples before writing contribution-specific claims.
- [ ] Keep `impact breadth` phrased as an OpenAlex sampled proxy.
- [ ] Do not rank paper quality, venue quality, or award worthiness by citation count alone.
- [ ] If the final report uses a mismatch case, include one sentence explaining why the mismatch is informative rather than contradictory.
