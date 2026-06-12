# Network ecosystem case notes

Purpose: give F a small, report-ready bridge from aggregate institution/country rankings to concrete paper examples. The cases are computed from `data/papers_enriched.csv`, `data/institution_stats.csv`, and `data/country_stats.csv`.

## Current aggregate anchors

| Anchor | Current value | Recommended wording |
|---|---:|---|
| Institution nodes | 169 | OpenAlex-visible institution nodes, not a complete collaboration graph. |
| Top 10 institution mention share | 29.0% | A concentration signal inside available affiliation metadata, not an official institution ranking. |
| Country/region nodes | 23 | OpenAlex-visible country/region metadata, not a national contribution ranking. |
| US mention share | 66.4% | The dataset is US-heavy, but non-US nodes and international cases remain visible. |
| Papers with industry-affiliation signal | 80 / 250 | A first-pass metadata flag; industrial adoption still needs paper-specific evidence. |
| Papers with multi-country metadata | 35 / 250 | A useful collaboration proxy; not a complete author-contribution measurement. |
| Papers without institution metadata | 41 / 250 | Missing metadata should be treated as coverage uncertainty, not absence of collaboration. |

## Case shortlist for slides or report

Use the CSV table `docs/analysis/network_ecosystem_case_notes.csv` for machine-readable rows. A compact version is below.

| Case type | Paper | Venue/year | Visible metadata | Safe use |
|---|---|---|---|---|
| university-cluster example | Bilateral Filtering for Gray and Color Images | ICCV 1998 | Stanford University ; Apple (Germany) ; Apple (United States) | Safe: use as an example of visible institution metadata in this dataset, not as proof the institution caused the award. |
| university-cluster example | A Database of Human Segmented Natural Images and Its Application to Evaluating Segmentation Algorithms and Measuring Ecological Statistics | ICCV 2001 | University of California, Berkeley | Safe: use as an example of visible institution metadata in this dataset, not as proof the institution caused the award. |
| industry-lab visibility example | Snakes: Active Contour Models | ICCV 1987 | Schlumberger (United States) ; Schlumberger (British Virgin Islands) | Safe: say industry labs are visible in the metadata; do not claim industrial adoption unless a separate evidence URL supports it. |
| industry-lab visibility example | Mining Association Rules Between Sets of Items in Large Databases | SIGMOD 1993 | IBM Research - Almaden ; Rutgers, The State University of New Jersey | Safe: say industry labs are visible in the metadata; do not claim industrial adoption unless a separate evidence URL supports it. |
| international-collaboration example | Database replication: a tale of research across communities | VLDB 2000 | Michigan State University ; Indian Institute of Science Bangalore ; The Ohio State University | Safe: describe OpenAlex country metadata as visible affiliation spread, not complete author contribution shares. |
| international-collaboration example | Wake on Wireless: An Event Driven Energy Saving Strategy for Battery Operated Devices | ACM MobiCom 2002 | The University of Texas at Austin ; Università degli studi di Cassino e del Lazio Meridionale ; Consorzio Nazionale Interuniversitario per le Telecomunicazioni ; Korea Advanced Institute of Science and Technology ; Macquarie University | Safe: describe OpenAlex country metadata as visible affiliation spread, not complete author contribution shares. |
| non-US visibility example | A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise | KDD 1996 | Ludwig-Maximilians-Universität München | Safe: use to show diversity exists inside a US-heavy dataset; do not rank national research strength. |
| non-US visibility example | Object Recognition from Local Scale-Invariant Features | ICCV 1999 | University of British Columbia | Safe: use to show diversity exists inside a US-heavy dataset; do not rank national research strength. |
| metadata-boundary example | Fast Algorithms for Mining Association Rules in Large Databases | VLDB 1994 | metadata sparse | Safe: sparse metadata means absence from a network chart is not absence of influence or collaboration. |
| metadata-boundary example | Chord: A Scalable Peer-to-peer Lookup Service for Internet Applications | SIGCOMM 2001 | International Computer Science Institute | Safe: sparse metadata means absence from a network chart is not absence of influence or collaboration. |

## Copy-ready report paragraph

The Network module should be read as an ecosystem view rather than a leaderboard. In the current dataset, the top institution nodes include stable university research centers such as Berkeley, CMU, Stanford, and MIT, while industry-affiliated metadata also appears in selected cases. Country/region metadata is US-heavy, but Canada, the United Kingdom, Germany, Israel, Australia, China, Korea and other nodes still appear in the public metadata. These patterns support a cautious claim: long-term CS impact is often embedded in recognizable research communities and cross-region diffusion, but the chart cannot prove award causality, complete collaboration structure, or national research strength.

## 45-second presentation route

1. Start from the Network KPI cards: “this section shifts from paper-level impact to visible research ecosystem.”
2. Point to the institution chart: “the top nodes show repeated university/lab visibility, not an official ranking.”
3. Use one case row from `network_ecosystem_case_notes.csv`: connect a named paper to visible affiliation metadata.
4. Point to country/region distribution: “US-heavy, but not US-only.”
5. Close with the boundary: “OpenAlex metadata helps us see structure, but missing or sparse metadata means the chart is a proxy view.”

## module owner final checks

- Choose 2-3 case rows that match the final PPT screenshots.
- Open each `source_url` before naming a paper in slides.
- Keep industry examples as metadata visibility unless extra evidence supports adoption claims.
- Avoid writing institution/country bars as rankings of research strength.
- If a case has sparse metadata, use it as a limitations example rather than hiding it.

## Links

- Parent workstream: #7
- Page module: `#network`
