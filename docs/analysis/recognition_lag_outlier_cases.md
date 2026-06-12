# Recognition-lag outlier case notes

Purpose: give the B / Time module a small, report-ready set of cases for explaining why `recognition_lag` is analytically useful. The cases below are computed from `data/papers_enriched.csv` and exported as a machine-readable companion table: `docs/analysis/recognition_lag_outlier_cases.csv`.

## Metric definition

`recognition_lag = announcement_year - publication_year`

Use this as the award-confirmation interval. It should not be written as the true start, peak, or end of a paper's influence.

## Current distribution anchors

| Anchor | Value | Report use |
|---|---:|---|
| Usable papers | 250 | Same front-end table used by the Time charts. |
| Shortest observed lag | 9 years | Short-window contrast cases. |
| Median lag | 12 years | Typical Test-of-Time confirmation window in this dataset. |
| Longest observed lag | 34 years | Long-tail delayed-recognition case. |

## Case shortlist

| Case type | Paper | Venue | Year → Award | Lag | Why it is useful | Careful wording boundary |
|---|---|---|---:|---:|---|---|
| Long lag | `Probabilistic Models of Indexing and Searching` | SIGIR | 1980 → 2014 | 34 | Longest lag in the current table; demonstrates that the Time chart has a real long tail, not only a 10-year cluster. | Say it is an extreme award-confirmation interval; do not infer the award committee's motivation without reading the citation. |
| Long lag | `The ALOHA system` | SIGCOMM | 1974 → 2006 | 32 | Early networking example with a very long lag and high citation count among long-lag papers. | Safe as a foundational-networking example only after human contribution wording is checked. |
| Short lag | `Collaborative Filtering for Implicit Feedback Datasets` | ICDM | 2008 → 2017 | 9 | Shortest observed lag group, with high citation count; useful for contrast against 30-year cases. | Write as a fast-recognition case within the award mechanism, not as proof of immediate impact in 2008. |
| Short lag | `gSpan: Graph-Based Substructure Pattern Mining` | ICDM | 2002 → 2011 | 9 | Shows short-lag cases are not isolated and can still have broad follow-on citation traces. | Avoid ranking its importance using citation count alone. |
| Typical lag | `Object Recognition from Local Scale-Invariant Features` | ICCV | 1999 → 2011 | 12 | Exactly median lag while also being a high-citation case; bridges Time and Citation modules. | Citation depth is a clue for later discussion, not an official award reason. |
| Typical lag | `XORs in the air: practical wireless network coding` | SIGCOMM | 2006 → 2018 | 12 | Stable median-lag example used in the Time module. | Final wording should verify the paper's contribution from award citation or paper abstract. |

## Chart reference

Use the Time module in the D3 page:

1. Recognition-lag histogram: use this to show the 9-year floor, the 10–15-year concentration, and the sparse 30-year tail.
2. Publication → award timeline: use this to point at why two papers can both be Test-of-Time winners while sitting in very different historical windows.
3. If the presenter needs a cross-module bridge, select SIFT or another representative case in Explorer / Benchmark after showing the Time distribution.

## Report-ready paragraph

> Recognition lag turns the phrase “test of time” into a measurable interval. In the current 250-paper dataset, the median lag is 12 years, but the range is wide: short-window cases such as `Collaborative Filtering for Implicit Feedback Datasets` and `gSpan` were recognized after 9 years, while long-tail cases such as `Probabilistic Models of Indexing and Searching` and `The ALOHA system` were recognized after more than 30 years. This contrast supports a cautious interpretation: Test-of-Time awards combine a typical decade-plus review window with a smaller set of much older works that remain visible to the research community. The lag metric should be treated as an award-confirmation interval rather than a direct measure of when influence began.

## Presentation talking point

> “The Time module is not just saying papers wait about 12 years. It shows two different stories at once: a common decade-plus confirmation window, and a long tail where older foundational work is still being recognized thirty years later. That is why we treat recognition lag as a timeline lens, then use citation and evidence cards to explain individual papers.”

## Remaining module owner checks

- Open the award citation or paper page for 3–4 selected cases before using them in final prose.
- Choose only 2–3 cases for the final report to avoid turning the Time section into a paper list.
- Keep the wording causal-light: use “shows”, “suggests”, and “in this dataset”, not “proves” or “because”.
- If using SIFT as a bridge into Citation / Benchmark, reuse the careful wording from evidence-card docs instead of inventing a new contribution claim.
