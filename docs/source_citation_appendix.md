# Source citation appendix

Purpose: give the final report and slides one compact, source-traceable citation layer. Use this together with `docs/data_provenance_audit.md`, `docs/methods_and_limitations.md`, and `docs/final_evidence_verification_queue.md` so source claims, proxy metrics, and manual evidence are not mixed together.

## Current coverage snapshot

| Source layer | Current coverage | Final report use | Safe wording boundary |
|---|---:|---|---|
| Award seed | 250 / 250 papers have `source_url` | Dataset introduction, award timing, venue/year coverage | Current public Test-of-Time award seed, not all CS long-term-impact papers |
| Paper / DOI pages | 245 / 250 papers have `paper_url`; 193 / 250 have DOI | Representative-paper citations and case cards | Links identify source records; they do not prove contribution or adoption claims by themselves |
| OpenAlex metadata | 248 / 250 papers have OpenAlex IDs | Citation depth, topics, institutions, countries, same-dataset comparisons | Public metadata proxy, not official award reason or complete citation graph |
| Citation trajectory / breadth | 3,077 yearly citation rows; breadth samples for 248 / 250 papers | Trajectory archetypes, impact breadth proxy, E-module case selection | Observed-window / sampled proxy, not causal award effect |
| Manual representative evidence | Top 12 rows have two evidence URLs each; final checked flags are still 0 / 12 | Contribution wording, paper-specific report/PPT cases | Human reading is still needed before final factual wording |

Machine-readable version: `docs/source_citation_appendix.csv`.

## Copy-ready source paragraph

This project uses a public Test of Time Awards seed as the award-membership source, then enriches the 250 usable papers with public scholarly metadata such as DOI or paper pages, OpenAlex IDs, citation counts, concepts, institutions, countries, yearly citation trajectories, and sampled citing-work breadth fields. These metadata fields support descriptive comparisons inside the dataset. Paper-specific claims about contribution, foundational role, or industrial impact should come from the manual evidence layer and should cite the attached evidence URLs after final human checking.

## How each owner should use it

| Owner | Use this appendix for | Human check before final submission |
|---|---|---|
| A | Keep report, README, archive manifest, and final QA wording consistent | Verify final report cites award seed, metadata proxy, and manual evidence as separate source layers |
| B | Explain recognition lag and award timing source | Do not describe lag as causal impact timing |
| C | Cite venue/year/field source coverage and denominator caveats | Verify selected venue examples against source or paper URLs |
| D | Distinguish automatic topic labels from manually checked topic labels | Prefer manual labels for representative cases and note API-label uncertainty |
| E | Cite citation depth, trajectory, and impact breadth as public-metadata proxies | Pair selected cases with evidence URLs before using strong contribution wording |
| F | Put short source notes into PPT speaker notes and demo defense answers | Keep live-demo claims within proxy and source-coverage boundaries |

## Recommended reference-list entries to prepare

1. Public Test of Time Awards seed / influence-dispersion repository source.
2. OpenAlex as the public scholarly metadata source for citations, concepts, affiliations, and works IDs.
3. DOI, ACM, IEEE, DBLP, or publisher pages for representative papers used as final case studies.
4. Evidence URLs listed in `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv` for contribution or impact claims.
5. This project’s generated derived tables: `citation_trajectories.csv`, `citing_breadth_metrics.csv`, and module aggregate CSVs, described as derived from public metadata rather than independent authority.

## Remaining teammate checklist

- [ ] C chooses the final 2-3 venue/year examples and confirms the source or paper URL opens.
- [ ] D/E confirm final representative paper claims use evidence URLs rather than only proxy metrics.
- [ ] F copies only the short source notes needed for slides; detailed caveats stay in Methods / Limitations.
- [ ] A verifies the final report bibliography separates award seed, metadata source, paper pages, and manual evidence.
