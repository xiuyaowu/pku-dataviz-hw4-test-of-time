# Final evidence verification queue

Purpose: give the E owner and final report/PPT editors one last paper-claim queue before submission. It consolidates the Top 12 representative-paper coverage, risk register, and manual annotation files without adding new paper claims.

## Source files

- `docs/final_case_selection_risk_register.csv`
- `docs/top12_evidence_coverage_matrix.csv`
- `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`
- Machine-readable queue: `docs/final_evidence_verification_queue.csv`

## Current queue snapshot

| Bucket | Count | How to use |
|---|---:|---|
| `ready-cautious` | 6 | Best first choices for classroom/report examples, still requiring a final URL-open check. |
| `verify-before-final` | 5 | Useful backup cases; verify source page, one-sentence contribution, and proxy wording before use. |
| `avoid-without-extra-evidence` | 1 | Do not use as a named paper claim unless a teammate adds stronger evidence. |

## Recommended classroom/report set

| Bucket | Paper | Venue/year | Evidence links | Risk | Next action |
|---|---|---|---:|---|---|
| ready-cautious | `sigmod_1993_cda45823` · Mining Association Rules Between Sets of Items in Large Databases | SIGMOD 1993 | 6 | medium | Use cautiously; still open evidence URLs once before final report/PPT. |
| ready-cautious | `iccv_1987_56f24279` · Snakes: Active Contour Models | ICCV 1987 | 5 | medium | Use cautiously; still open evidence URLs once before final report/PPT. |
| ready-cautious | `iccv_1999_ac21b391` · Object Recognition from Local Scale-Invariant Features | ICCV 1999 | 5 | medium | Use cautiously; still open evidence URLs once before final report/PPT. |
| ready-cautious | `ieee_transactions_on_information_theory_2000_f5a20c28` · Network Information Flow | IEEE Transactions on Information Theory 2000 | 5 | medium | Use cautiously; still open evidence URLs once before final report/PPT. |
| ready-cautious | `kdd_1996_1b93ceb4` · A Density-Based Algorithm for Discovering Clusters in Large Spatial... | KDD 1996 | 4 | medium | Use cautiously; still open evidence URLs once before final report/PPT. |
| ready-cautious | `vldb_1994_ba6086d0` · Fast Algorithms for Mining Association Rules in Large Databases | VLDB 1994 | 4 | medium | Use cautiously; still open evidence URLs once before final report/PPT. |

## Backup verification queue

| Bucket | Paper | Venue/year | Evidence links | Risk | Next action |
|---|---|---|---:|---|---|
| verify-before-final | `kdd_2005_ebddb36d` · Graphs over Time: Densification Laws, Shrinking Diameters and Possi... | KDD 2005 | 6 | medium-high | Keep as backup; verify source page, contribution sentence, and proxy wording before final slides. |
| verify-before-final | `oopsla_2001_a9f21d83` · Multitasking without compromise: a virtual machine evolution | OOPSLA 2001 | 6 | medium-high | Keep as backup; verify source page, contribution sentence, and proxy wording before final slides. |
| verify-before-final | `sigir_1980_e20f7878` · Probabilistic Models of Indexing and Searching | SIGIR 1980 | 5 | medium-high | Keep as backup; verify source page, contribution sentence, and proxy wording before final slides. |
| verify-before-final | `wmcsa_1999_367b771d` · Ad-hoc On-Demand Distance Vector Routing | WMCSA 1999 | 5 | medium-high | Keep as backup; verify source page, contribution sentence, and proxy wording before final slides. |
| verify-before-final | `sigcomm_1998_d2b8808e` · Modeling TCP Throughput: A Simple Model and Its Empirical Validation | SIGCOMM 1998 | 4 | medium-high | Keep as backup; verify source page, contribution sentence, and proxy wording before final slides. |

## Avoid as named claim without extra evidence

| Bucket | Paper | Venue/year | Evidence links | Risk | Next action |
|---|---|---|---:|---|---|
| avoid-without-extra-evidence | `sigcomm_1974_5f7a35f6` · Research Areas in Computer Communication | SIGCOMM 1974 | 5 | high | Do not use as a named claim until evidence URL and contribution wording are verified. |

## Safe wording boundary

Use this queue to organize final human reading, not to create new factual claims. Citation count, citation trajectory, and `impact_breadth_score` are OpenAlex-derived descriptive/proxy metrics. They are not official award reasons, complete citation-network coverage, industrial-adoption proof, or paper-quality rankings.

A safe final-report sentence is:

> For representative-paper examples, we prioritize cases with available paper/DOI evidence links and use citation depth and impact breadth only as descriptive OpenAlex proxies; final paper-specific contribution wording still needs a short human source check.

## E-owner final checklist

- [ ] Pick 5-8 paper examples from `ready-cautious` before using backup cases.
- [ ] Open at least one evidence URL for every named paper in the final report/PPT.
- [ ] Keep contribution wording close to the paper title, abstract, DOI page, or existing manual annotation.
- [ ] Avoid claiming industrial adoption unless a specific external evidence URL is checked.
- [ ] Preserve the proxy boundary: breadth and citation metrics describe sampled public metadata, not official award rationale.

## Issue routing

This implements narrow stretch issue #124 and improves parent container #6. The parent E issue should remain open for final human evidence reading, case selection, and PPT/report wording checks.
