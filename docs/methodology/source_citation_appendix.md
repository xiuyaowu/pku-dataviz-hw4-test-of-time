# Source citation appendix

Purpose: document the project's citation layers so that source claims, proxy metrics, and manual evidence are kept separate. Read together with `docs/methodology/data_provenance_audit.md` and `docs/methodology/methods_and_limitations.md`.

## Current coverage snapshot

| Source layer | Coverage | Used for | Wording boundary |
|---|---:|---|---|
| Award seed | 250 / 250 papers have `source_url` | Dataset introduction, award timing, venue/year coverage | Current public Test-of-Time award seed, not all CS long-term-impact papers |
| Paper / DOI pages | 245 / 250 papers have `paper_url`; 193 / 250 have DOI | Representative-paper citations and case cards | Links identify source records; they do not prove contribution or adoption claims by themselves |
| OpenAlex metadata | 248 / 250 papers have OpenAlex IDs | Citation depth, topics, institutions, countries, same-dataset comparisons | Public metadata proxy, not official award reason or complete citation graph |
| Citation trajectory / breadth | 3,077 yearly citation rows; breadth samples for 248 / 250 papers | Trajectory archetypes, impact breadth proxy, case selection | Observed-window / sampled proxy, not causal award effect |
| Manual representative evidence | Top 12 rows have two evidence URLs each | Contribution wording and paper-specific case descriptions | Paper-specific factual wording is based on the linked evidence pages |

Machine-readable version: `docs/methodology/source_citation_appendix.csv`.

## Source description

This project uses a public Test of Time Awards seed as the award-membership source, then enriches the 250 usable papers with public scholarly metadata such as DOI or paper pages, OpenAlex IDs, citation counts, concepts, institutions, countries, yearly citation trajectories, and sampled citing-work breadth fields. These metadata fields support descriptive comparisons inside the dataset. Paper-specific claims about contribution, foundational role, or industrial impact should come from the manual evidence layer and cite the attached evidence URLs.


## Reference layers

1. Public Test of Time Awards seed / influence-dispersion repository source.
2. OpenAlex as the public scholarly metadata source for citations, concepts, affiliations, and works IDs.
3. DOI, ACM, IEEE, DBLP, or publisher pages for representative papers used as final case studies.
4. Evidence URLs listed in `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv` for contribution or impact claims.
5. This project’s generated derived tables: `citation_trajectories.csv`, `citing_breadth_metrics.csv`, and module aggregate CSVs, described as derived from public metadata rather than independent authority.

