# Institution / Country attribution audit

Purpose: give the F / Network owner a fast, defensible page for explaining institution and country signals in the live network module. The audit uses the current static data files only: `data/papers_enriched.csv`, `data/institution_stats.csv`, and `data/country_stats.csv`.

## Coverage snapshot

| Check | Current value | How to say it safely |
|---|---:|---|
| Papers in master table | 250 | Current Test-of-Time dataset after enrichment. |
| Papers with OpenAlex IDs | 248 (99.2%) | Public metadata coverage is high enough for descriptive analysis, but not a complete bibliographic authority. |
| Papers with visible institution metadata | 209 (83.6%) | Institution counts are visible affiliation mentions, not a complete collaboration graph. |
| Papers with visible country metadata | 209 (83.6%) | Country counts come from author-affiliation metadata; they are not national contribution shares. |
| Papers flagged as international collaboration | 35 (14.0%) | Use as a metadata-visible collaboration signal only. |
| Papers flagged with industry author metadata | 80 (32.0%) | Industry visibility is not the same as industrial deployment or commercial impact. |
| Institution nodes in aggregate table | 169 | Node frequency supports network context, not institutional ranking. |
| Country / region nodes in aggregate table | 23 | Good for showing geographic spread with coverage caveats. |

Top visible institutions by paper mentions: University of California, Berkeley (17), Carnegie Mellon University (15), Stanford University (14), Massachusetts Institute of Technology (11), Cornell University (8).

Top visible countries / regions by paper mentions: US (170), CA (20), GB (16), DE (11), IL (5).

## Case rows for PPT / report use

Machine-readable table: `docs/institution_country_attribution_audit.csv`.

| Case type | Paper id | Title | Venue/year | Why notable | Safe wording |
|---|---|---|---|---|---|
| multi-institution visible | `oopsla_2006_5186c94c` | The DaCapo benchmarks: Java benchmarking development and analysis | OOPSLA 2006 | High visible institution count in OpenAlex metadata; useful for showing ecosystem breadth. | Say visible affiliation breadth, not complete collaboration network. |
| multi-institution visible | `acm_mobicom_2002_e34a4638` | Wake on Wireless: An Event Driven Energy Saving Strategy for Battery O | ACM MobiCom 2002 | High visible institution count in OpenAlex metadata; useful for showing ecosystem breadth. | Say visible affiliation breadth, not complete collaboration network. |
| international metadata visible | `acm_mobicom_2002_e34a4638` | Wake on Wireless: An Event Driven Energy Saving Strategy for Battery O | ACM MobiCom 2002 | Multiple visible countries in author-affiliation metadata. | Use as an example of cross-country metadata visibility, not national contribution share. |
| international metadata visible | `icdm_2005_1767506e` | Supervised Tensor Learning | ICDM 2005 | Multiple visible countries in author-affiliation metadata. | Use as an example of cross-country metadata visibility, not national contribution share. |
| industry-lab metadata visible | `iccv_1987_56f24279` | Snakes: Active Contour Models | ICCV 1987 | Industry-affiliated author metadata is visible for this paper. | Do not infer industrial adoption unless evidence URLs support it. |
| industry-lab metadata visible | `sigmod_1993_cda45823` | Mining Association Rules Between Sets of Items in Large Databases | SIGMOD 1993 | Industry-affiliated author metadata is visible for this paper. | Do not infer industrial adoption unless evidence URLs support it. |
| sparse affiliation metadata | `vldb_1994_ba6086d0` | Fast Algorithms for Mining Association Rules in Large Databases | VLDB 1994 | High-impact paper with sparse or missing visible affiliation fields. | Use as a limitation example: missing affiliations do not mean no institutional contribution. |
| sparse affiliation metadata | `iccv_2003_1e9d06bc` | Space-time interest points | ICCV 2003 | High-impact paper with sparse or missing visible affiliation fields. | Use as a limitation example: missing affiliations do not mean no institutional contribution. |

## Copy-ready report paragraph

The Network module uses institution and country fields to describe the research ecosystem around Test-of-Time papers. In the current 250-paper table, 209 papers have visible institution metadata and 209 have visible country metadata. This supports a cautious descriptive claim: long-term CS influence is often visible through recurring universities, industrial labs, and cross-country metadata signals. The result should not be written as a complete collaboration graph, an institutional ranking, or a national research-strength ranking, because OpenAlex affiliation metadata can be incomplete, merged differently across papers, or missing for older publications.

## 45-second presentation route for F

1. Start from the Network screenshot or live section and say the module shifts from paper-level impact to ecosystem visibility.
2. Use one aggregate sentence: high-frequency institutions and countries are visible, but they are metadata-derived mentions.
3. Pick one case from `multi-institution visible` or `international metadata visible` to make the pattern concrete.
4. Pick one `sparse affiliation metadata` case as the limitation, not as a failure.
5. Close with: these signals help explain where long-term research communities appear in public metadata, while citation and manual evidence remain necessary for paper-level contribution claims.

## Safe wording boundaries

- Say “visible affiliation metadata,” “institution mentions,” or “country / region metadata,” not “complete collaboration network.”
- Do not call the country table a national ranking.
- Do not infer industrial adoption from `has_industry_author` alone; require evidence URLs for deployment or product claims.
- For older papers, missing affiliation metadata is a data-coverage limitation, not evidence that the paper lacked institutional support.
- Use this audit together with `docs/network_ecosystem_case_notes.md`, `docs/uncertainty_proxy_confidence_playbook.md`, and `docs/data_readiness_matrix.md`.

## F-owner final checks

- [ ] Choose 2-3 case rows for slides and open their `source_url` before final wording.
- [ ] Keep institution/country phrasing descriptive and metadata-based.
- [ ] If a slide mentions industry, add a separate evidence URL or weaken the claim to “industry-lab metadata visible.”
- [ ] Confirm the Network screenshot in PPT still matches the current page.
