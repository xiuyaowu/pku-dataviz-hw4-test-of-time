# Award-era cohort comparison for recognition lag

Purpose: give the B / Time owner a compact, report-ready comparison of recognition lag across publication-era cohorts. The table is generated from `data/papers_enriched.csv` and should be read as descriptive timing metadata, not as a causal explanation of when papers became important.

## Metric boundary

`recognition_lag = announcement_year - publication_year`. Cohort differences may reflect award creation dates, venue award rules, source coverage, and right-censoring for newer papers. Safe language: “in the current Test-of-Time dataset, earlier publication cohorts have longer observed recognition windows,” not “older research took longer to matter.”

## Cohort summary

| Cohort | Years | Papers | Median lag | Mean lag | Min–max lag | Avg citations | Avg breadth proxy |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1970s–early 1980s | 1974–1984 | 19 | 19 | 21.4 | 11–34 | 337.9 | 52.242 |
| mid 1980s–early 1990s | 1985–1994 | 70 | 18.0 | 16.2 | 10–29 | 1109.5 | 55.442 |
| late 1990s | 1995–2000 | 64 | 12.0 | 13.3 | 9–19 | 2046.2 | 57.005 |
| 2000s | 2001–2008 | 97 | 10 | 11.4 | 9–17 | 1444.3 | 59.159 |

Machine-readable version: `docs/analysis/award_era_cohort_comparison.csv`.

## Safe observations

1. The earliest cohort has the longest observed lag window, with a median lag above the later cohorts. This is useful for explaining long-tail recognition, but the report should mention award-history and coverage effects.
2. The mid-1980s to early-1990s cohort acts as a transition group: it still has long recognition windows, but it is closer to the later 10–20 year concentration shown in the histogram.
3. The 2000s cohort has shorter observed windows partly because the dataset ends around the award years currently visible; do not compare it as a complete lifetime opportunity window.

## Representative cases to verify before final writing

| Cohort | Candidate papers | Human check |
|---|---|---|
| 1970s–early 1980s | The Modular Structure of Complex Systems (ICSE 1984→1995, lag 11); A Variational Approach to Edge Detection (AAAI 1983→2002, lag 19); Probabilistic Models of Indexing and Searching (SIGIR 1980→2014, lag 34) | Verify 1-2 representative award pages before using paper-specific contribution claims. |
| mid 1980s–early 1990s | Mining Association Rules Between Sets of Items in Large Databases (SIGMOD 1993→2003, lag 10); Solving Large-Scale Constraint Satisfaction and Scheduling Problems Using a Heuristic Repair Method (AAAI 1990→2008, lag 18); The Cluster Hypothesis Revisited (SIGIR 1985→2014, lag 29) | Verify 1-2 representative award pages before using paper-specific contribution claims. |
| late 1990s | Modeling TCP Throughput: A Simple Model and Its Empirical Validation (SIGCOMM 1998→2007, lag 9); Fast Approximate Energy Minimization via Graph Cuts (ICCV 1999→2011, lag 12); Dynamically Exploiting Narrow Width Operands to Improve Processor Power and Performance (HPCA 1999→2018, lag 19) | Verify 1-2 representative award pages before using paper-specific contribution claims. |
| 2000s | Collaborative Filtering for Implicit Feedback Datasets (ICDM 2008→2017, lag 9); X10: An Object-Oriented Approach to Non-Uniform Cluster Computing (OOPSLA 2005→2015, lag 10); Pervasive Computing: Vision and Challenges (IEEE Personal Communications 2001→2018, lag 17) | Verify 1-2 representative award pages before using paper-specific contribution claims. |

## Copy-ready report paragraph

> To avoid treating recognition lag as one uniform number, we also grouped papers by publication era. In the current 250-paper Test-of-Time dataset, earlier cohorts show longer observed recognition windows, while later cohorts are closer to the 10–20 year concentration visible in the Time histogram. This pattern should be interpreted cautiously: publication-era differences combine research history with award creation dates, venue rules, public metadata coverage, and right-censoring for newer papers. Therefore, the Time module uses cohort comparison as a context layer for the lag distribution, not as proof that earlier work objectively needed more time to become influential.

## module owner final checks

- Choose 1-2 representative papers from the CSV and verify their award pages before using contribution-level wording.
- Keep the phrase “observed recognition window” when comparing cohorts.
- Add one sentence about award-history / right-censoring if this comparison appears in the report or PPT.
- Link this cohort packet to the Time histogram rather than presenting it as a separate ranking.
