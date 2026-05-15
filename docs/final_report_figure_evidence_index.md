# Final report figure/evidence index

Purpose: give the team one neutral crosswalk from each visible D3 module to the exact evidence files, screenshots, report sections, owner workstreams, and wording boundaries. Use this before writing the final report or building PPT slides so chart claims stay traceable.

Machine-readable table: [`docs/final_report_figure_evidence_index.csv`](final_report_figure_evidence_index.csv).

## Quick use

1. Pick the module you are writing or presenting.
2. Open the screenshot/page anchor and the supporting docs listed in the CSV.
3. Copy the safe wording boundary into report notes before drafting claims.
4. Complete the remaining human check for the selected representative papers or module.

## Figure-to-claim crosswalk

| Module | Owner | Page anchor | Visual evidence | Screenshot | Primary report use |
|---|---|---|---|---|---|
| Opening / project frame | A / #2 | `#top` | summary cards, insight deck, research question | `docs/demo/homepage-overview.png` | Abstract / Introduction |
| Time / recognition lag | B / #3 | `#time` | lag histogram, publication-to-award timeline, time claim cards | `docs/demo/time-and-timeline.png` | Finding 1: time scale and recognition lag |
| Venue / Field | C / #4 | `#venue` | top venue bars, venue area bars, venue-decade heatmap | `docs/demo/venue-and-field.png` | Finding 2: venue and field coverage |
| Topic Evolution | D / #5 | `#topic` | topic distribution, topic evolution chart, representative-paper detail | `docs/demo/topic-evolution.png` | Finding 3: topic patterns and research archetypes |
| Citation / Impact | E / #6 | `#citation` | citation-lag scatter, trajectory chart, depth-breadth scatter | `docs/demo/citation-and-impact.png` | Finding 4: citation depth, trajectory, and breadth |
| Paper Explorer | D / #5 | `#explorer` | searchable evidence index and selected-paper detail | `docs/demo/explorer-evidence-index.png` | Evidence appendix / representative cases |
| Benchmark Lab | E / #6 | `#benchmark` | selected-paper percentile and field-median comparison | `docs/demo/benchmark-lab.png` | Case comparison / methods appendix |
| Story Builder | A / #2 | `#storyboard` | question-evidence-interpretation-boundary-owner cards | live page section | Report structure / conclusion |
| Glossary | F / #7 | `#glossary` | metric cards and safe wording phrases | live page section | Methods / limitations / defense Q&A |
| Network diffusion | F / #7 | `#network` | institution/country bars, KPIs, network claim cards | `docs/demo/network-diffusion.png` | Finding 5: collaboration and metadata visibility |

## Safe wording boundaries to keep consistent

- **Dataset scope:** this is a curated Test-of-Time award sample enriched with public metadata, not all influential CS research.
- **Recognition lag:** `announcement_year - publication_year`; it describes award timing and should not be written as causal proof of impact.
- **Venue / field counts:** counts describe visible award-history coverage in this dataset, not conference quality rankings.
- **Topic labels:** API topics and manual topic checks coexist; use manually audited labels for representative cases when possible.
- **Citation depth and breadth:** OpenAlex-derived descriptive proxies, not complete citation graphs or official award-committee reasons.
- **Institution / country views:** affiliation metadata visibility, not institutional or national research-quality ranking.

## Owner checklist before final report/PPT

- **A:** confirm the report skeleton uses the same module order as the page and archive manifest.
- **B:** verify final Time examples against award/source links and keep lifecycle wording observational.
- **C:** choose final venue examples from the traceability audit and preserve “not a ranking” language.
- **D:** use `manual_topic_audit_top12` before writing representative-paper topic claims.
- **E:** use the evidence coverage matrix and uncertainty playbook before selecting citation/breadth cases.
- **F:** copy glossary wording into PPT speaker notes and keep network claims framed as metadata visibility.

## Remaining human work

This index is ready for drafting, but it does not replace final owner checks. Each module owner should still verify the 2-3 representative cases they choose for the final report, especially paper contribution wording, award citation wording, and evidence URLs.
