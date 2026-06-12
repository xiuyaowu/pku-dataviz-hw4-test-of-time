# Topic × Venue crosswalk

Purpose: give D/Topic and C/Venue a shared evidence packet for explaining how automatic topic labels appear inside venue areas. This is a bridge between modules, not a new ranking table.

## Coverage snapshot

| Metric | Current value | Safe reading |
|---|---:|---|
| Papers covered | 250 | Current Test-of-Time award seed with public metadata enrichment. |
| Venue areas | 16 | Coarse venue grouping used for visualization, not official discipline taxonomy. |
| Topic labels | 22 | Automatic rule/API labels; representative cases still need manual topic review. |
| Observed area-topic intersections | 83 | Each row means at least one paper with that area and topic label. |
| Intersections with at least 3 papers | 26 | Better candidates for report discussion than one-paper intersections. |

## Top visible intersections

| Venue area | Topic label | Papers | Venues | Avg citation | Avg breadth | Representative papers |
|---|---|---:|---:|---:|---:|---|
| Database | Database / Systems | 29 | 2 | 966.0 | 55.5 | Mining Association Rules Between Sets of Items in Large Databases (SIGMOD 1993); A Case for Redundant Arrays of Inexpensive Disks (RAID) (SIGMOD 1988); Order-Preserving Encryption for Numeric Data (SIGMOD 2004) |
| CV | Computer Vision | 23 | 1 | 3432.6 | 62.5 | Snakes: Active Contour Models (ICCV 1987); Object Recognition from Local Scale-Invariant Features (ICCV 1999); Bilateral Filtering for Gray and Color Images (ICCV 1998) |
| IR | Natural Language Processing | 13 | 1 | 1240.1 | 54.7 | Probabilistic Latent Semantic Indexing (SIGIR 1999); Beyond independent relevance: methods and evaluation metrics for subtopic retrieval (SIGIR 2003); The use of MMR, Diversity-based Reranking for Reordering Documents and Producing Summaries (SIGIR 1998) |
| Networking | Database / Systems | 11 | 2 | 2350.5 | 54.4 | Chord: A Scalable Peer-to-peer Lookup Service for Internet Applications (SIGCOMM 2001); A Scalable Content-addressable Network (SIGCOMM 2001); A Scalable, Commodity Data Center Network Architecture (SIGCOMM 2008) |
| Database | Data Mining / Web | 9 | 2 | 1992.0 | 56.6 | Fast Algorithms for Mining Association Rules in Large Databases (VLDB 1994); BIRCH: An Efficient Data Clustering Method for Very Large Databases (SIGMOD 1996); Generic Schema Matching With Cupid (VLDB 2001) |
| Software Engineering | Database / Systems | 9 | 1 | 274.1 | 57.5 | The Source Code Control System (ICSE 1975); Architecture-Based Runtime Software Evolution (ICSE 1998); Designing Distributed Applications with Mobile Code Paradigms (ICSE 1997) |
| IR | Data Mining / Web | 8 | 1 | 700.8 | 55.0 | Some Simple Effective Approximation to the 2-Poisson Model for Probabilistic Weighted Retrieval (SIGIR 1994); Improving web search ranking by incorporating user behavior information (SIGIR 2006); Query Expansion using Local and Global Document Analysis (SIGIR 1996) |
| Software Engineering | Data Mining / Web | 8 | 1 | 452.6 | 58.6 | Software Processes are Software Too (ICSE 1987); Is Mutation an Appropriate Tool for Testing Experiments? (ICSE 2005); Program Slicing (ICSE 1981) |
| DM/Web | Data Mining / Web | 6 | 2 | 1927.5 | 63.6 | Optimizing Search Engines using Clickthrough Data (KDD 2002); Collaborative Filtering for Implicit Feedback Datasets (ICDM 2008); gSpan: Graph-Based Substructure Pattern Mining (ICDM 2002) |
| Networking | Data Mining / Web | 6 | 2 | 1502.2 | 52.3 | On Power-Law Relationships of the Internet Topology (SIGCOMM 1999); Measurement and analysis of online social networks (IMC 2007); A Digital Fountain Approach to Reliable Distribution of Bulk Data (SIGCOMM 1998) |

## How to use this in the report

1. Start from Topic Evolution: topic labels show recurring technical themes among long-term-recognized papers.
2. Connect to Venue/Field: venue areas show which award communities make those themes visible in this dataset.
3. Move to cases: pick one representative paper from the CSV row and verify its evidence URL before writing contribution-level claims.

Copy-ready paragraph:

> The topic-by-venue crosswalk shows that long-term impact is not only a topic distribution or a venue distribution. Some themes, such as systems/data management or vision methods, become visible through specific award communities, while the same broad venue area can contain multiple technical themes. We therefore read `topic_label` and `venue_area` as complementary metadata: topic labels help describe the technical idea, and venue areas describe the award community in which that idea was recorded. The crosswalk is descriptive for the current Test-of-Time dataset and should not be used as a venue-quality ranking or an official topic taxonomy.

## Representative routes for D and C

| Route | Suggested use | Human check |
|---|---|---|
| Database → Database / Systems | Use `Mining Association Rules Between Sets of Items in Large Databases (SIGMOD 1993)` as a possible bridge case. | Verify paper page/award citation and manual topic wording before final report. |
| Networking → Database / Systems | Use `Chord: A Scalable Peer-to-peer Lookup Service for Internet Applications (SIGCOMM 2001)` as a possible bridge case. | Verify paper page/award citation and manual topic wording before final report. |
| IR → Natural Language Processing | Use `Probabilistic Latent Semantic Indexing (SIGIR 1999)` as a possible bridge case. | Verify paper page/award citation and manual topic wording before final report. |
| Software Engineering → Database / Systems | Use `The Source Code Control System (ICSE 1975)` as a possible bridge case. | Verify paper page/award citation and manual topic wording before final report. |
| CV → Computer Vision | Use `Snakes: Active Contour Models (ICCV 1987)` as a possible bridge case. | Verify paper page/award citation and manual topic wording before final report. |
| AI → Computer Vision | Use `Monte Carlo Localization: Efficient Position Estimation for Mobile Robots (AAAI 1999)` as a possible bridge case. | Verify paper page/award citation and manual topic wording before final report. |
| Programming Languages → Machine Learning Theory | Use `Call Graph Construction in Object-Oriented Languages (OOPSLA 1997)` as a possible bridge case. | Verify paper page/award citation and manual topic wording before final report. |
| DM/Web → Data Mining / Web | Use `Optimizing Search Engines using Clickthrough Data (KDD 2002)` as a possible bridge case. | Verify paper page/award citation and manual topic wording before final report. |

## Careful wording boundaries

- Say: "In the current Test-of-Time award dataset, this venue area-topic intersection is visible."
- Do not say: "This venue area is better" or "this topic is objectively more important."
- Treat `venue_area` as an award-community grouping and `topic_label` as automatic metadata.
- If a representative paper is in the Top 12 manual audit, prefer the corrected manual topic label over the API-derived label.
- Citation and breadth values are OpenAlex-derived descriptive proxies, not official award reasons.

## Final D/C checklist

- D chooses 2-3 crosswalk rows that reinforce the final Topic Evolution paragraph.
- C checks that any venue/field sentence keeps the denominator and award-history caveat.
- For each selected row, open at least one paper URL / evidence URL before making contribution claims.
- If an automatic topic looks suspicious, record the corrected label in the manual annotation table rather than silently using the API label.

Data file: `docs/analysis/topic_venue_crosswalk.csv`.
