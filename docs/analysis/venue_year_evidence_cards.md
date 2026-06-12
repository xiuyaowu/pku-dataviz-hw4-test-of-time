# Venue-year evidence cards

Purpose: give the C / Venue and Field owner a short, source-traceable card set for turning aggregate venue charts into concrete report and presentation examples. This extends the earlier mini case-study page with a machine-readable card table and explicit careful wording for each case.

Source table: `docs/analysis/venue_year_evidence_cards.csv`  
Primary data: `data/papers_enriched.csv` grouped by `venue + publication_year`.

## How to use this packet

- Pick 2-3 cases for the final report or PPT; do not use all eight unless there is time.
- Use the cards to explain visible clusters in the current Test-of-Time Award seed, not official venue rankings.
- Before naming a specific paper contribution in final prose, open the `paper_url_sample` or source/award page and verify the wording.
- Keep citation depth and impact breadth as OpenAlex-derived descriptive proxies.

## Card shortlist

| Case | Card type | Papers | Total citations | Avg lag | Best use |
|---|---|---:|---:|---:|---|
| SIGCOMM 1988 | early-era dense cluster | 6 | 3,035 | 18.0 | Field-by-decade visibility in early Networking. |
| SIGIR 1988 | long-lag IR cluster | 3 | 5,505 | 26.0 | Longer retrospective window for information-access work. |
| ICCV 1999 | high-citation method cluster | 4 | 22,233 | 13.0 | Slide-friendly CV example for method reuse and citation depth. |
| ICCV 2003 | multi-paper vision cluster | 5 | 10,637 | 14.0 | Later CV comparison with multiple visual-recognition themes. |
| FAST 2002 | systems storage compact cluster | 4 | 2,339 | 12.2 | Broaden Venue/Field beyond only the largest venues. |
| SIGIR 1999 | multi-theme IR cluster | 3 | 6,286 | 15.0 | One venue-year carrying several information-access themes. |
| SIGMOD 1996 | shorter-lag database contrast | 2 | 4,947 | 10.0 | Denominator and award-window contrast for Database. |
| NSDI 2005 | newer-venue bridge case | 2 | 2,980 | 10.0 | Small systems/networking bridge example for newer venue histories. |

## Suggested report paragraph

Venue-year evidence cards help connect the Venue and Field module to concrete examples. Instead of only saying that SIGIR, SIGCOMM, ICCV, SIGMOD, FAST, or NSDI are visible in the dataset, the report can cite specific clusters: SIGCOMM 1988 as an early networking cluster, ICCV 1999 as a high-citation computer-vision method cluster, SIGIR 1999 as a multi-theme information-access cluster, and SIGMOD 1996 or NSDI 2005 as shorter recognition-window contrast cases. These examples should be framed as visible clusters in the current Test-of-Time Award seed, not as official rankings of venues, years, or fields.

## Careful wording boundaries

- Say: “visible venue-year cluster in the current award-history dataset.”
- Avoid: “best venue year,” “strongest conference,” “most important field,” or “award caused citation growth.”
- For lag comparisons, say recognition lag is `announcement_year - publication_year`; it is not the true time when impact began.
- For citation and breadth comparisons, say they are OpenAlex-derived proxies from the current local data.
- For smaller cases such as NSDI 2005 or SIGMOD 1996, describe them as compact examples rather than trends.

## module owner checklist

- Select 2-3 cards for final slides or report prose.
- Open the linked paper/source pages for selected cards and verify one-sentence contribution wording.
- Pair each selected card with one visible chart: venue ranking, field heatmap, or report figure/evidence index.
- Keep at least one denominator caveat from `docs/analysis/venue_normalization_count_guide.md` when discussing raw venue counts.
- If using a CV or IR high-citation case, include one sentence that citation/breadth are descriptive proxy metrics.

## Related files

- `docs/analysis/venue_year_case_studies.md`: earlier shorter case-study shortlist.
- `docs/analysis/venue_source_traceability_audit.md`: venue-level source and coverage checks.
- `docs/analysis/venue_normalization_count_guide.md`: denominator caveats for raw counts.

Refs #4, closes #106.
