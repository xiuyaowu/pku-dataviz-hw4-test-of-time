# Venue source traceability audit

This audit supports the Venue / Field module by turning the venue aggregate chart into a provenance-aware report asset. It is computed from `data/papers_enriched.csv` and exported as `docs/venue_source_traceability_audit.csv`.

## Coverage snapshot

- Paper rows checked: **250**
- Venue clusters checked: **27**
- Rows with upstream source URL: **250/250**
- Rows with paper URL: **245/250**
- Rows matched to OpenAlex: **248/250**

## Main venue clusters for report/PPT

| Venue | Area | Papers | Publication years | Award years | Source | OpenAlex | Safe use |
|---|---|---:|---|---|---:|---:|---|
| SIGIR | IR | 35 | 1980-2006 | 2014-2018 | 35/35 | 34/35 | core venue cluster for chart/report discussion |
| SIGCOMM | Networking | 33 | 1974-2008 | 2006-2018 | 33/33 | 33/33 | core venue cluster for chart/report discussion |
| ICSE | Software Engineering | 29 | 1975-2007 | 1989-2017 | 29/29 | 29/29 | core venue cluster for chart/report discussion |
| ICCV | CV | 24 | 1987-2005 | 2009-2017 | 24/24 | 24/24 | core venue cluster for chart/report discussion |
| SIGMOD | Database | 24 | 1988-2008 | 1999-2018 | 24/24 | 24/24 | core venue cluster for chart/report discussion |
| VLDB | Database | 20 | 1985-2004 | 1995-2014 | 20/20 | 20/20 | core venue cluster for chart/report discussion |

## Lower-count examples to use cautiously

| Venue | Area | Papers | Publication years | Award years | Source | OpenAlex | Safe use |
|---|---|---:|---|---|---:|---:|---|
| EMNLP | NLP | 2 | 2002-2002 | 2018-2018 | 2/2 | 2/2 | low-count example; use only as supporting context |
| ICML | ML | 2 | 2007-2008 | 2017-2018 | 2/2 | 2/2 | low-count example; use only as supporting context |
| ACL | CS | 1 | 2002-2002 | 2018-2018 | 1/1 | 1/1 | low-count example; use only as supporting context |
| ACM MobiCom | CS | 1 | 2002-2002 | 2018-2018 | 1/1 | 1/1 | low-count example; use only as supporting context |

## How C-owner should use this

1. Use the top venue rows as evidence anchors when explaining the Venue / Field chart.
2. Mention source coverage before interpretation: the dataset starts from a Test-of-Time award-history CSV and is enriched with public metadata.
3. Keep low-count venues as examples, not as ranking claims.
4. When citing average citation count or breadth, say it is an OpenAlex-derived descriptive proxy, not the award committee's reason.

## Copy-ready report paragraph

The venue distribution should be read as an award-history view rather than a universal ranking of conference quality. In the current 250-paper Test-of-Time sample, each venue row can be traced back to the upstream award dataset, and most rows also have OpenAlex metadata for citation and breadth proxies. This supports comparisons such as which venue clusters appear frequently and which fields are visible in the award history, while keeping the interpretation bounded: venue counts reflect coverage and award practices in this dataset, and citation/breadth values describe public metadata rather than proving why a paper received an award.

## C-owner final checks

- [ ] Pick 2-3 venue rows from `docs/venue_source_traceability_audit.csv` for final slides.
- [ ] Verify any quoted paper-specific URL before using it as a spoken example.
- [ ] Avoid wording such as “best conference ranking”; use “visible in this Test-of-Time award-history dataset.”
- [ ] If adding manual venue notes, keep them in a separate checked column or appendix so computed fields remain reproducible.
