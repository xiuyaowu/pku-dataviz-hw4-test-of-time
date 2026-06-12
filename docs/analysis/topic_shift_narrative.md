# Topic-shift narrative packet

Purpose: give the Topic Evolution module a report-ready answer to: what changes across decades in the current Test-of-Time sample, which observations are safe, and which representative papers can be used as cases.

Data used: `data/papers_enriched.csv`, `data/topic_year_stats.csv`, and `data/topic_stats.csv` from the current repository. The companion machine-readable case table is `docs/analysis/topic_shift_narrative_cases.csv`.

## Metric boundary

`topic_label` is an automatic metadata/rule label, not an official taxonomy. Decade patterns are descriptive counts in the current 250-paper Test-of-Time award seed. They should be written as observable shifts in this dataset, not as proof that a field became more important or caused awards.

## Decade-level topic snapshot

| Decade | Papers | Top visible topics | Avg citation | Avg breadth proxy |
| --- | --- | --- | --- | --- |
| 1970s | 8 | Database / Systems (2); Computer science (2); Data Mining / Web (1); Machine Learning Theory (1) | 413.2 | 46.70 |
| 1980s | 48 | Database / Systems (13); Computer Vision (11); Natural Language Processing (6); Data Mining / Web (5) | 879.1 | 56.13 |
| 1990s | 88 | Database / Systems (22); Computer Vision (18); Data Mining / Web (17); Natural Language Processing (8) | 1649.6 | 55.46 |
| 2000s | 106 | Database / Systems (30); Data Mining / Web (23); Computer Vision (14); Natural Language Processing (12) | 1551.5 | 59.55 |

## Observation 1: stable infrastructure themes remain visible across the whole window

Database / Systems is visible from the earliest part of the dataset through the 2000s, and several adjacent infrastructure themes also span multiple decades. This supports a safe narrative: long-term impact often comes from reusable infrastructure, query/system designs, protocols, and data-management methods that later work can build on.

Persistent large-topic coverage:

| Topic | Papers | Decades visible | Publication span | Decades |
| --- | --- | --- | --- | --- |
| Database / Systems | 67 | 4 | 1974-2008 | 1970s, 1980s, 1990s, 2000s |
| Data Mining / Web | 46 | 4 | 1974-2008 | 1970s, 1980s, 1990s, 2000s |
| Machine Learning Theory | 18 | 4 | 1975-2007 | 1970s, 1980s, 1990s, 2000s |
| Human-Computer Interaction | 13 | 4 | 1978-2006 | 1970s, 1980s, 1990s, 2000s |
| Real-Time / Embedded Systems | 5 | 4 | 1979-2007 | 1970s, 1980s, 1990s, 2000s |
| Computer Vision | 43 | 3 | 1982-2006 | 1980s, 1990s, 2000s |
| Natural Language Processing | 26 | 3 | 1980-2008 | 1980s, 1990s, 2000s |
| Reinforcement Learning | 8 | 3 | 1987-2006 | 1980s, 1990s, 2000s |

Report-ready wording:

> In this dataset, topic evolution is not a replacement of old themes by new ones. Database / Systems and related infrastructure topics remain visible across several decades, suggesting that long-term impact often comes from work that becomes reusable technical substrate. This is a descriptive pattern in the award dataset, not a claim that infrastructure papers are intrinsically more valuable.

## Observation 2: 1990s-2000s make data, web, and scalable methods more visible

The later sample contains more Data Mining / Web and large-scale data/network papers. A safe interpretation is that the web era and large-data research ecosystem created more visible routes for reusable algorithms, graph/search methods, and scalable systems to become time-tested.

Later-visible topic counts:

| Topic | Papers in 2000s | Papers before 1990 | Safe label |
| --- | --- | --- | --- |
| Database / Systems | 30 | 15 | expanded in later sample |
| Data Mining / Web | 23 | 6 | expanded in later sample |
| Computer Vision | 14 | 11 | expanded in later sample |
| Natural Language Processing | 12 | 6 | expanded in later sample |
| Machine Learning Theory | 7 | 3 | expanded in later sample |
| Human-Computer Interaction | 4 | 4 | expanded in later sample |
| Reinforcement Learning | 4 | 1 | expanded in later sample |

Report-ready wording:

> From the 1990s into the 2000s, the topic mix gives more space to data mining, web/search, graph analysis, and scalable systems. The safest explanation is ecological rather than causal: as large-scale data and online systems became central CS problems, Test-of-Time records also contain more papers whose long-term value is expressed through reusable methods for data-rich settings.

## Observation 3: case cards should correct automatic topic labels where needed

The topic chart is useful for structure, but the final report should land on individual papers. Some high-impact cases, such as DBSCAN, can be misclassified by automatic metadata. That mismatch is a strength if written honestly: it shows the project separates automatic topic proxies from human-checked representative evidence.

Representative case candidates:

| Case | Year | Venue | Auto topic | Citation | Breadth | Use |
| --- | --- | --- | --- | --- | --- | --- |
| The ALOHA system | 1974 | SIGCOMM | Database / Systems | 2029 | 53.12 | representative case candidate; verify contribution wording before final report |
| Probabilistic Models of Indexing and Searching | 1980 | SIGIR | Natural Language Processing | 316 | 58.62 | representative case candidate; verify contribution wording before final report |
| Snakes: Active Contour Models | 1987 | ICCV | Computer Vision | 17009 | 68.50 | representative case candidate; verify contribution wording before final report |
| Mining Association Rules Between Sets of Items in Large Databases | 1993 | SIGMOD | Database / Systems | 14771 | 66.75 | representative case candidate; verify contribution wording before final report |
| Fast Algorithms for Mining Association Rules in Large Databases | 1994 | VLDB | Data Mining / Web | 9384 | 58.88 | representative case candidate; verify contribution wording before final report |
| A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise | 1996 | KDD | Computer Vision | 19133 | 81.12 | representative case candidate; verify contribution wording before final report |

The full case table is `docs/analysis/topic_shift_narrative_cases.csv`.

## Presentation punchline

> Topic evolution tells a migration story: time-tested CS research keeps a stable infrastructure layer, then adds data/web/vision/language methods as the research ecosystem changes. The chart gives the pattern; the paper cards provide the evidence; automatic topic labels remain proxies that need human checking before final claims.

## module owner remaining checks

- Choose 2-3 cases from `docs/analysis/topic_shift_narrative_cases.csv` for the final report.
- Open the DOI / paper page for each selected case and verify the one-sentence contribution.
- If an automatic topic label is wrong or too broad, record the corrected label in the manual annotation table.
- Use cautious verbs: “shows”, “suggests”, “is visible in this dataset”; avoid “proves”, “causes”, or “officially ranks”.
