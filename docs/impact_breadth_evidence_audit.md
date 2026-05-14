# Impact breadth evidence audit

Purpose: give Issue #62 / E owner a safe wording layer for the Top 12 representative papers. The audit combines `docs/evidence_cards_top12.csv` with the current OpenAlex-derived breadth proxy fields, then separates what can be said from API metrics alone from what still needs human reading.

## Status rule used in this audit

| Status | Rule | Safe wording |
|---|---|---|
| `safe to say` | Has evidence URLs, no known DOI warning, and `impact_breadth_score >= 60` | “In the current OpenAlex sampled proxy, this paper shows broad cross-field / cross-institution diffusion.” |
| `proxy only` | Has evidence URLs but either breadth is mid-range or the card carries a human-check warning | “The proxy suggests broader diffusion, but the final report should verify the contribution and paper identity before using it as a main claim.” |
| `needs human evidence` | Breadth is low/mid and the contribution claim would rely on reading the paper or award text | “Use as a contrast or background case unless a teammate adds stronger paper-specific evidence.” |

Do not treat `impact_breadth_score` as an official award reason. It is a sampled OpenAlex proxy over citing works, fields, institutions, and countries.

## Top 12 audit table

| Status | Paper | Breadth | Fields | Institutions | Evidence note | Recommended report/PPT wording |
|---|---|---:|---:|---:|---|---|
| `safe to say` | A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise | 81.12 | 78 | 121 | DOI/PDF links present. | Strong depth + breadth case: DBSCAN can be described as a clustering paradigm that diffused beyond its original database/data-mining setting, with the proxy supporting broad later uptake. |
| `safe to say` | Snakes: Active Contour Models | 68.50 | 77 | 128 | DOI/Springer links present. | Use as a computer-vision case where a core formulation continued to be cited across many later vision and imaging communities. |
| `safe to say` | Graphs over Time: Densification Laws, Shrinking Diameters and Possible Explanations | 87.38 | 86 | 151 | DOI/PDF links present. | Best breadth example in the Top 12: phrase as “the proxy shows wide diffusion of a network-evolution lens,” not as complete citation-network coverage. |
| `proxy only` | Multitasking without compromise: a virtual machine evolution | 86.50 | 96 | 140 | High breadth, but card says DOI was corrected and needs final human check. | Do not make this a main slide until E verifies the paper identity and contribution. If used, say “candidate broad-diffusion systems/PL case.” |
| `proxy only` | Probabilistic Models of Indexing and Searching | 58.62 | 81 | 53 | Links present; breadth is mid-range. | Use mainly for long recognition lag; breadth can be mentioned only as a secondary proxy, not the headline. |
| `needs human evidence` | Research Areas in Computer Communication | 31.62 | 34 | 9 | Links present, but breadth/citation counts are low. | Use as an agenda-setting long-lag case only after reading the paper/award text; avoid claiming broad measured diffusion. |
| `proxy only` | Modeling TCP Throughput: A Simple Model and Its Empirical Validation | 56.12 | 64 | 45 | Links present; breadth is mid-range. | Safe as a shorter-lag networking model case; do not claim broad industrial impact without added evidence. |
| `safe to say` | Object Recognition from Local Scale-Invariant Features | 65.88 | 67 | 95 | DOI/PDF links present. | Good presentation case: SIFT/local features can be described as a reusable vision component with high citation depth and broad proxy diffusion. |
| `safe to say` | Mining Association Rules Between Sets of Items in Large Databases | 66.75 | 73 | 66 | DOI/ACM links present. | Use as a database/data-mining paradigm case; phrase the breadth claim as sampled diffusion across later fields/institutions. |
| `needs human evidence` | Ad-hoc On-Demand Distance Vector Routing | 44.25 | 44 | 42 | Links present; high citation count but lower breadth. | Good contrast case for “high citation depth does not always mean highest breadth.” Avoid broad-diffusion wording. |
| `proxy only` | Fast Algorithms for Mining Association Rules in Large Databases | 58.88 | 77 | 59 | DOI/PDF links present; breadth is mid-range. | Use together with the SIGMOD association-rule paper as a method-lineage case; breadth wording should stay cautious. |
| `safe to say` | Network Information Flow | 66.38 | 56 | 79 | DOI/IEEE links present. | Safe as a theory-to-networking diffusion case, but avoid saying the metric proves foundational status; the evidence supports a cautious representative example. |

## Copy-ready wording blocks

### Strong breadth case

> In the Top 12 representative set, papers such as DBSCAN, SIFT, and Graphs over Time combine high citation depth with high OpenAlex sampled breadth. This supports the interpretation that some Test of Time papers become reusable research infrastructure: later work cites them from multiple fields and institutions, not only from the original venue community.

### Proxy-only case

> For several papers, the breadth proxy is suggestive rather than conclusive. We use it to choose cases for discussion, but final claims about industrial or foundational impact require reading the paper page, award citation, or an additional evidence URL.

### Contrast case

> AODV is useful as a contrast: it has high citation depth, but its sampled breadth score is lower than the strongest breadth cases. This helps separate “many citations” from “wide cross-community diffusion.”

## Remaining E-owner checklist

- [ ] Open the evidence URLs for the final 2–4 E-module case studies and confirm each one-sentence contribution.
- [ ] Keep DBSCAN / SIFT / Graphs over Time as the safest breadth examples unless a teammate verifies stronger alternatives.
- [ ] Use AODV or Research Areas in Computer Communication only as contrast/long-lag cases unless stronger human evidence is added.
- [ ] If claiming industrial impact, add a separate evidence URL; do not infer it from `impact_breadth_score`.
- [ ] Link final report wording back to `docs/evidence_cards_top12.md` and the coverage work in Issue #49.
