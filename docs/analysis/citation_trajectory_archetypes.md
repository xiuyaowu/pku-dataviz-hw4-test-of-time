# Citation trajectory archetypes

Purpose: provide a report-ready classification of citation-trajectory shapes. The underlying data is `data/citation_trajectories.csv` plus citation depth/breadth fields from `data/papers_enriched.csv`. The machine-readable candidate table is `docs/analysis/citation_trajectory_archetypes.csv`.

## Method and careful wording

The current trajectory file uses the available OpenAlex yearly citation window, mostly 2012–2026. That means these labels are **observed-window archetypes**, not complete lifetime histories and not official award-committee reasons.

Thresholds used for the first-pass classification:

- **Early peak then sedimentation**: observed peak before 2018 and 2022–2026 share below 30%.
- **Long-tail sustained**: at least 10 active observed years, no single year above 22% of the observed window, and 2022–2026 still contributes 22–55%.
- **Late/current resurgence**: observed peak in 2022–2026 and recent-window share at least 45%.
- **Deep and broad diffusion**: above-median citation count (median 523.5) and above-median impact breadth (median 57.56), with at least 15 sampled citing fields.
- **Breadth over depth**: below-median citation count but above-median breadth proxy.

Safe sentence for reports:

> We use citation-trajectory archetypes as descriptive cues from the OpenAlex yearly citation window. They help compare patterns of long-term uptake, but they should not be read as complete lifetime citation histories or official explanations for why a paper won a Test of Time award.

## Archetype candidates

### 早期峰值后沉淀 (`early-peak-sedimentation`)

适合解释“先成为基准/范式，随后进入稳定引用沉淀”的论文。

| Candidate paper | Venue/year | Citation count | Breadth | Peak year / recent share | Why this archetype |
|---|---:|---:|---:|---:|---|
| Research Areas in Computer Communication | SIGCOMM 1974 | 9 | 31.6 | 2013 / 0% | observed peak occurs before 2018 and recent-window share is below 30% |
| The Design Philosophy of the DARPA Internet Procotols | SIGCOMM 1988 | 1 | 16.6 | 2014 / 0% | observed peak occurs before 2018 and recent-window share is below 30% |
| Quantifying the Inductive Bias in Concept Learning | AAAI 1986 | 21 | 34.8 | 2014 / 0% | observed peak occurs before 2018 and recent-window share is below 30% |
| The Unified Probabilistic Model for IR | SIGIR 1982 | 24 | 38.8 | 2012 / 0% | observed peak occurs before 2018 and recent-window share is below 30% |
| ARIES/NT: A Recovery Method Based on Write-Ahead Logging for Nested Transactions | VLDB 1989 | 69 | 56.9 | 2014 / 0% | observed peak occurs before 2018 and recent-window share is below 30% |

### 长尾稳定传播 (`long-tail-sustained`)

适合解释“多年持续被使用/引用，没有单一年份完全支配轨迹”的论文。

| Candidate paper | Venue/year | Citation count | Breadth | Peak year / recent share | Why this archetype |
|---|---:|---:|---:|---:|---|
| A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise | KDD 1996 | 19133 | 81.1 | 2021 / 27% | many active years, no single-year spike dominates, and recent citations remain visible |
| A Database of Human Segmented Natural Images and Its Application to Evaluating Segmentation Algorithms and Measuring Ecological Statistics | ICCV 2001 | 7941 | 62.9 | 2020 / 35% | many active years, no single-year spike dominates, and recent citations remain visible |
| YAGO: A Core of Semantic Knowledge Unifying WordNet and Wikipedia | WWW 2007 | 1186 | 85.9 | 2021 / 47% | many active years, no single-year spike dominates, and recent citations remain visible |
| A Unified Architecture for Natural Language Processing: Deep Neural Networks with Multitask Learning | ICML 2008 | 6709 | 66.1 | 2021 / 29% | many active years, no single-year spike dominates, and recent citations remain visible |
| A Look Back and a Look Forward | SIGIR 1988 | 5127 | 72.2 | 2019 / 27% | many active years, no single-year spike dominates, and recent citations remain visible |

### 近期仍在上升 / 后段增强 (`late-current-resurgence`)

适合提示某些长期贡献在近年仍被新任务或新领域继续吸收。

| Candidate paper | Venue/year | Citation count | Breadth | Peak year / recent share | Why this archetype |
|---|---:|---:|---:|---:|---|
| Multitasking without compromise: a virtual machine evolution | OOPSLA 2001 | 2212 | 86.5 | 2024 / 92% | observed peak is in 2022–2026 and recent-window share is high |
| BIRCH: An Efficient Data Clustering Method for Very Large Databases | SIGMOD 1996 | 3781 | 66.9 | 2025 / 61% | observed peak is in 2022–2026 and recent-window share is high |
| Extensible/Rule Based Query Rewrite Optimization in Starburst | SIGMOD 1992 | 313 | 51.0 | 2026 / 49% | observed peak is in 2022–2026 and recent-window share is high |

### 高深度 + 高广度扩散 (`deep-and-broad-diffusion`)

适合课堂展示 depth 与 breadth 同时很强的代表案例。

| Candidate paper | Venue/year | Citation count | Breadth | Peak year / recent share | Why this archetype |
|---|---:|---:|---:|---:|---|
| A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise | KDD 1996 | 19133 | 81.1 | 2021 / 27% | above-median citation depth and breadth with broad sampled citing fields |
| Snakes: Active Contour Models | ICCV 1987 | 17009 | 68.5 | 2013 / 17% | above-median citation depth and breadth with broad sampled citing fields |
| Database replication: a tale of research across communities | VLDB 2000 | 13125 | 81.1 | 2013 / 19% | above-median citation depth and breadth with broad sampled citing fields |
| Object Recognition from Local Scale-Invariant Features | ICCV 1999 | 16147 | 65.9 | 2016 / 21% | above-median citation depth and breadth with broad sampled citing fields |
| Mining Association Rules Between Sets of Items in Large Databases | SIGMOD 1993 | 14771 | 66.8 | 2012 / 13% | above-median citation depth and breadth with broad sampled citing fields |

### 广度高于引用深度 (`breadth-over-depth`)

适合反直觉说明：总引用不是最高，但 sampled breadth 显示扩散范围较宽。

| Candidate paper | Venue/year | Citation count | Breadth | Peak year / recent share | Why this archetype |
|---|---:|---:|---:|---:|---|
| CarTel: A Distributed Mobile Sensor Computing System | ACM SenSys 2006 | 225 | 77.0 | 2019 / 18% | below-median citation count but above-median breadth proxy |
| Improving Round-Trip Time Estimates in Reliable Transport Protocols | SIGCOMM 1987 | 194 | 66.4 | 2014 / 28% | below-median citation count but above-median breadth proxy |
| F-Logic: A Higher-Order Language for Reasoning About Objects, Inheritance, and Scheme | SIGMOD 1989 | 359 | 67.6 | 2015 / 23% | below-median citation count but above-median breadth proxy |
| Information Retrieval using a Singular Value Decomposition Model of Latent Semantic Structure | SIGIR 1988 | 257 | 66.2 | 2024 / 22% | below-median citation count but above-median breadth proxy |
| A framework for the robust estimation of optical flow | ICCV 1993 | 449 | 58.1 | 2024 / 30% | below-median citation count but above-median breadth proxy |

## How E can use this in the report

1. Pick two high-contrast examples: one `deep-and-broad-diffusion` case and one `breadth-over-depth` or `late-current-resurgence` case.
2. Use the page's Citation / Impact module to show the selected trajectory, then add one sentence explaining the observed-window archetype.
3. Before final submission, manually open the paper/evidence URL for any case described with a substantive contribution claim.

Copy-ready paragraph:

> Citation trajectories reveal that Test-of-Time impact is not a single shape. Some papers show early peaks followed by stable sedimentation, some maintain long-tail citation flow across many years, and others show strong recent-window activity. Combining these shapes with citation depth and OpenAlex sampled breadth lets us distinguish “highly cited within a concentrated community” from “widely diffused across fields and institutions.” The classification remains descriptive because the yearly citation window and breadth metrics are public-metadata proxies.

## Remaining human checks

- Choose 2–3 archetypes to include in final slides; do not show all tables.
- Open evidence URLs for selected cases and verify one-sentence contribution wording.
- Keep the phrase “observed OpenAlex window” or “sampled proxy” near trajectory/breadth claims.
- If adding industrial/foundational claims, require explicit evidence URLs rather than deriving them from citation metrics.
