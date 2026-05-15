# Final case-selection risk register

Purpose: give E / Citation-Impact and the final report owner a last-mile case-selection table. The repo already has evidence cards, coverage matrices, claim banks, and module handoffs; this register answers the practical question: which representative papers can be used in the report/PPT first, and which ones still need human reading before stronger claims.

Source files:

- `docs/evidence_cards_top12.csv`
- `docs/top12_evidence_coverage_matrix.csv`
- `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`

Machine-readable register: `docs/final_case_selection_risk_register.csv` (12 rows).

## Quick decision rule

1. Use `low` / `medium` rows first for classroom slides and final report examples.
2. Use `medium-high` rows only after a quick evidence-link check by the owner.
3. Keep `high` rows as background or contrast cases unless a teammate reads the linked paper/award evidence.
4. For every row, citation count and impact breadth are OpenAlex-derived descriptive/proxy metrics, not official award reasons or proof of causal impact.

Current risk distribution: `medium`: 6, `medium-high`: 5, `high`: 1.

## Recommended classroom set

| Use | Owner | Paper | Risk | Evidence | Safe use |
|---|---|---|---|---:|---|
| presentation-ready cautious case | E | A Density-Based Algorithm for Discovering Clusters in Large Spatial Da… (KDD 1996) | medium | 4 links | Use as a highest citation depth example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |
| presentation-ready cautious case | D | Snakes: Active Contour Models (ICCV 1987) | medium | 5 links | Use as a highest citation depth example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |
| presentation-ready cautious case | D | Object Recognition from Local Scale-Invariant Features (ICCV 1999) | medium | 5 links | Use as a topic representative · computer vision example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |
| presentation-ready cautious case | E | Mining Association Rules Between Sets of Items in Large Databases (SIGMOD 1993) | medium | 6 links | Use as a topic representative · database / systems example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |
| presentation-ready cautious case | E | Fast Algorithms for Mining Association Rules in Large Databases (VLDB 1994) | medium | 4 links | Use as a topic representative · data mining / web example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |
| presentation-ready cautious case | E | Network Information Flow (IEEE Transactions on Information Theory 2000) | medium | 5 links | Use as a topic representative · machine learning theory example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |

## Backup / human-check set

| Use | Owner | Paper | Risk | Evidence | Safe use |
|---|---|---|---|---:|---|
| backup case after quick human check | E | Ad-hoc On-Demand Distance Vector Routing (WMCSA 1999) | medium-high | 5 links | Use as a topic representative · human-computer interaction example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |
| backup case after quick human check | E | Multitasking without compromise: a virtual machine evolution (OOPSLA 2001) | medium-high | 6 links | Use as a broadest influence proxy example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |
| backup case after quick human check | E | Graphs over Time: Densification Laws, Shrinking Diameters and Possible… (KDD 2005) | medium-high | 6 links | Use as a broadest influence proxy example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |
| backup case after quick human check | B | Probabilistic Models of Indexing and Searching (SIGIR 1980) | medium-high | 5 links | Use as a longest recognition lag example with OpenAlex citation/breadth metrics framed as descriptive proxies; verify paper-specific contribution wording before final report/PPT. |

## How to use this in the final report

A safe report move is to select 4-6 rows from the recommended set, then give each case only one job: citation-depth example, breadth-proxy example, long-lag example, topic/venue bridge, or contrast case. Avoid asking one paper to prove the whole story.

Copy-ready wording:

> The representative cases were selected from a Top-12 evidence register that combines citation depth, sampled impact breadth, evidence-link coverage, and manual-check status. We use these cases as descriptive examples of patterns visible in the dataset, while keeping paper-specific contribution and industrial-impact claims subject to final evidence reading.

## E-owner final checklist

- [ ] Choose 2-3 Citation/Impact examples from `low` or `medium` rows.
- [ ] Read the evidence URLs for any paper named in the final report.
- [ ] Keep `impact breadth` phrased as an OpenAlex sampled proxy.
- [ ] Do not present the register as a quality ranking of papers.
- [ ] If a backup row becomes a main slide, update `remaining_human_check` or add a note in the report/PPT speaker notes.

Refs #6 and #110.
