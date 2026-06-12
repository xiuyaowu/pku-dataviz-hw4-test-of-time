# Venue normalization count guide

Purpose: give C a defensible way to discuss venue counts without turning them into conference-quality rankings. The table is computed from `data/venue_stats.csv` and should be read as award-history visibility inside the current Test-of-Time dataset.

## What this adds

Raw venue count is useful for showing which communities are most visible in the seed data, but it mixes at least three effects:

- how many Test-of-Time records the upstream dataset contains for that venue;
- how long the venue appears in the covered publication years;
- how long the award window is visible in this dataset.

This guide adds two denominator-style proxies:

- `count_per_publication_span_year`: paper count divided by the covered publication-year span for that venue.
- `count_per_award_window_year`: paper count divided by the visible award-year window for that venue.

These are not official normalization metrics. They are quick interpretation checks for whether a high raw count mainly reflects a long visible window, or whether a smaller venue has dense records in a shorter visible window.

## Top views

### Raw count top venues

| Rank | Venue | Area | Count | Publication span | Award window | Count / pub-span year | Count / award-window year |
|---:|---|---|---:|---:|---:|---:|---:|
| 1 | SIGIR | IR | 35 | 27 | 5 | 1.296 | 7.000 |
| 2 | SIGCOMM | Networking | 33 | 35 | 13 | 0.943 | 2.538 |
| 3 | ICSE | Software Engineering | 29 | 33 | 29 | 0.879 | 1.000 |
| 4 | ICCV | CV | 24 | 19 | 9 | 1.263 | 2.667 |
| 5 | SIGMOD | Database | 24 | 21 | 20 | 1.143 | 1.200 |
| 6 | VLDB | Database | 20 | 20 | 20 | 1.000 | 1.000 |

### Publication-span-normalized top venues

| Rank | Venue | Area | Count | Publication span | Count / pub-span year | Raw rank | Safe reading |
|---:|---|---|---:|---:|---:|---:|---|
| 1 | FAST | Systems | 7 | 3 | 2.333 | 10 | Dense visible window, not venue quality. |
| 2 | EMNLP | NLP | 2 | 1 | 2.000 | 15 | Very narrow visible window; use cautiously. |
| 3 | NSDI | Systems/Networking | 7 | 5 | 1.400 | 11 | Compact systems/networking cluster. |
| 4 | SIGIR | IR | 35 | 27 | 1.296 | 1 | High raw visibility and dense award records. |
| 5 | ICCV | CV | 24 | 19 | 1.263 | 4 | Dense CV award-history cluster. |
| 6 | SIGMOD | Database | 24 | 21 | 1.143 | 5 | Stable database award-history cluster. |

### Award-window-normalized top venues

| Rank | Venue | Area | Count | Award window | Count / award-window year | Raw rank | Safe reading |
|---:|---|---|---:|---:|---:|---:|---|
| 1 | SIGIR | IR | 35 | 5 | 7.000 | 1 | Dense visible award records in this source. |
| 2 | ICCV | CV | 24 | 9 | 2.667 | 4 | Strong visible cluster, not official ranking. |
| 3 | SIGCOMM | Networking | 33 | 13 | 2.538 | 2 | Long-running networking visibility. |
| 4 | EMNLP | NLP | 2 | 1 | 2.000 | 15 | One-year window; use only as a cautionary example. |
| 5 | NSDI | Systems/Networking | 7 | 5 | 1.400 | 11 | Compact newer-venue cluster. |
| 6 | OOPSLA | Programming Languages | 14 | 11 | 1.273 | 8 | Visible PL award-history cluster. |

## Example interpretations for report or PPT

| Venue | Raw count rank | Normalized signal | Recommended wording | Human check |
|---|---:|---|---|---|
| SIGIR | 1 | 35 papers; 1.296 per publication-span year; 7.000 per award-window year | Use as a highly visible IR award-history cluster in this dataset. | Verify selected award citations before final slides. |
| SIGCOMM | 2 | 33 papers; 0.943 per publication-span year; 2.538 per award-window year | Use as a long-running networking visibility cluster, not as a venue-quality claim. | Verify selected paper links and contribution wording. |
| ICSE | 3 | 29 papers; 0.879 per publication-span year; 1.000 per award-window year | Use as a stable SE observation entrance with a broad visible award window. | Check final examples against award pages. |
| ICCV | 4 | 24 papers; 1.263 per publication-span year; 2.667 per award-window year | Use as a dense CV method cluster, while preserving citation-proxy limits. | Check whether selected cases are presentation-ready. |
| NSDI | 11 | 7 papers; 1.400 per publication-span year; 1.400 per award-window year | Use as a compact newer-venue example, not a cross-venue ranking. | Keep sample-size caveat visible. |
| FAST | 10 | 7 papers; 2.333 per publication-span year; 1.000 per award-window year | Use as a denominator caution: a small raw count can look dense over a short visible span. | Avoid overgeneralizing from 3 publication-span years. |

## Recommended report paragraph

> Venue counts in this project are best interpreted as award-history visibility within the current Test-of-Time dataset. Raw counts show where the upstream award records are concentrated, while publication-span and award-window denominators help check whether a venue has many records because it is visible across a long window or because records are dense in a shorter window. Therefore, the Venue and Field module should describe SIGIR, SIGCOMM, ICSE, ICCV, SIGMOD, VLDB and similar clusters as important observation entrances, not as an official ranking of conference quality or field value.

## Careful wording boundaries

- Use: “within the current Test-of-Time award dataset”, “visible award-history records”, “observation entrance”, “venue cluster”.
- Avoid: “official venue ranking”, “strongest conference”, “most valuable field”, “proves this venue has greater impact”.
- If a slide compares venues, include at least one denominator note: publication-year span, award-year window, or data coverage.
- If using a narrow-window venue such as EMNLP, FAST or NSDI, state that the normalized number is a density clue, not a stable long-run rate.

## module owner checklist

- Choose 2-3 venues for final slides and verify their paper or award links in `docs/analysis/venue_source_traceability_audit.csv`.
- When using a venue count, say “within the current Test-of-Time award dataset” or “award-history visibility”.
- Add one denominator sentence to the Venue and Field report paragraph.
- Avoid official-ranking language in PPT titles, captions and speaker notes.
