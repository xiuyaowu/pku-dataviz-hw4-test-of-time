# Venue-year mini case studies

Purpose: give the C / Venue & Field owner concrete examples that can be used in the report or oral presentation. These cases turn the venue ranking and field heatmap into specific `venue + publication year` evidence without implying an official conference ranking.

Source table: `docs/venue_year_case_studies.csv`  
Primary data source: `data/papers_enriched.csv` joined back to the award seed source URL from `LCS2-IIITD/influence-dispersion`.

## How to read these cases

- `paper_count` counts Test-of-Time award rows in the current 250-paper dataset for that exact venue/year.
- `total_citation_count` and `avg_impact_breadth_score` are OpenAlex-derived proxy metrics from the current local data.
- A venue-year cluster is evidence of current dataset visibility, award history, and public metadata coverage. It is not proof that the year or venue is objectively more important than others.

## Case shortlist

| Case | Dataset signal | What it helps explain | Presentation wording |
|---|---|---|---|
| SIGCOMM 1988 | 6 papers, all recognized in 2006, average lag 18.0 years | Early networking has a dense visible cluster around congestion control, multicast routing, DNS, and Internet architecture. | “SIGCOMM 1988 is useful as a compact networking case: several protocol and architecture papers later reappear together in the Test-of-Time seed.” |
| SIGIR 1999 | 3 papers, 6,286 total citations, average lag 15.0 years | IR cases can connect retrieval models, collaborative filtering, and statistical translation rather than only one subtopic. | “SIGIR 1999 shows that one venue-year can carry multiple long-run information-access themes.” |
| ICCV 1999 | 4 papers, 22,233 total citations, average breadth 62.3 | CV has a high-citation method cluster, anchored by SIFT plus texture synthesis, calibration, and graph-cut optimization examples. | “ICCV 1999 is a strong visual case because the papers are method-oriented and easy to explain through later reuse.” |
| SIGMOD 1996 | 2 papers, 10-year average lag, average breadth 59.5 | Database examples help discuss shorter recognition cadence and infrastructure-style methods. | “SIGMOD 1996 is a good contrast case: fewer papers, but a clear 10-year recognition window and concrete data-management methods.” |
| NSDI 2005 | 2 papers, 10-year average lag, systems/networking bridge | Newer systems venues can still provide concise case studies, but the row count is small. | “NSDI 2005 is best used as a small bridge example, not as a broad ranking claim.” |

## Report-ready paragraph

Venue-year examples make the Venue & Field module more concrete. For instance, SIGCOMM 1988 appears as a dense early networking cluster in the current award seed, while ICCV 1999 highlights a high-citation computer-vision method cluster. SIGMOD 1996 and NSDI 2005 provide shorter 10-year recognition-lag contrasts, and SIGIR 1999 shows how one venue-year can connect several information-access themes. These cases should be described as visible clusters in the current Test-of-Time dataset, not as official rankings of venues or complete histories of each research community.

## Safe wording boundaries

- Use “current Test-of-Time award seed” / “visible cluster” / “representative case” rather than “best year” or “strongest venue.”
- Do not infer causal award reasons from citation counts or breadth scores alone.
- If a slide names a specific paper contribution, verify the award citation or paper abstract before final submission.
- When comparing SIGMOD/NSDI 10-year lag with SIGCOMM/SIGIR longer lag, say this reflects award timing in the dataset, not necessarily when impact happened.

## C owner final checks

- [ ] Pick 2–3 of the cases above for the final report or presentation.
- [ ] Open the source URL / paper page for those cases and verify one-sentence contribution wording.
- [ ] Keep at least one sentence about award coverage and venue-history limitations.
- [ ] If adding slide bullets, copy the safe wording from this page rather than rewriting as a venue ranking.
