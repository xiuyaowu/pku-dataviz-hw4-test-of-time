# Uncertainty / proxy-confidence playbook

Purpose: give the E owner and final presenters one neutral page for explaining which claims are directly data-backed, which are proxy-based, and which still need human evidence review. Use this together with `docs/evidence_coverage_matrix.md`, `docs/impact_breadth_evidence_audit.md`, and `docs/glossary_metric_explainer.md`.

## 1. Current coverage snapshot

| Evidence layer | Current coverage | Confidence for report/PPT | Safe wording |
|---|---:|---|---|
| Award seed rows | 250 usable Test-of-Time papers | High for the current dataset | “In the collected Test-of-Time award seed…” |
| OpenAlex ID match | 248 / 250 papers | High, with small unmatched tail | “OpenAlex-matched metadata covers most papers, with a small unmatched remainder.” |
| Citation count | 250 / 250 papers | Good as a public-metadata signal | “Citation depth is an entry point for influence, not an official award reason.” |
| Citation trajectory rows | 3,077 yearly rows | Good for observed-window shapes | “The trajectory describes the available citation window, not a complete lifetime history.” |
| Impact breadth score | 250 / 250 papers | Medium: derived proxy | “Impact breadth is an OpenAlex sampled proxy for diffusion range.” |
| Citing breadth sample | 248 / 250 papers with sampled citing works | Medium: sampled metadata | “Breadth patterns are approximate and should be used for relative comparison/case selection.” |
| Abstract text | 233 / 250 papers | Medium-high for topic/context | “Topic labels are metadata-assisted and need manual checks for representative cases.” |
| Top 12 evidence URLs | 12 / 12 have at least two evidence links | Good for cautious presentation | “Use the Top 12 cards as case-entry points, then verify final contribution wording.” |
| Top 12 final human check | 0 / 12 marked fully final; 12 / 12 marked partial or needs final check | Requires teammate review | “Representative case wording remains draft until the owner checks paper/award evidence.” |

## 2. Main uncertainty types

| Uncertainty type | Where it appears | What can be claimed | What not to claim | Owner next check |
|---|---|---|---|---|
| Award-source coverage | Time, Venue/Field, opening stats | The dataset covers 250 visible Test-of-Time award records from the chosen public source. | Do not claim it covers every CS long-impact paper or every award history. | B/C verify any selected venue/year award citation. |
| Public metadata coverage | Citations, abstracts, institutions, countries | Public metadata gives useful structure for comparison and visualization. | Do not treat missing/merged metadata as exact ground truth. | A/E/F rerun data readiness checks before final archive. |
| Citation depth | Citation scatter, trajectory, benchmark | Citation count is a scale signal for scholarly uptake. | Do not write “high citation caused the award” or “citation count equals importance.” | E chooses 2–4 cases and verifies contribution text. |
| Impact breadth proxy | Depth × breadth scatter, benchmark, evidence audits | Breadth approximates diffusion across citing venues, fields, institutions, and countries in sampled OpenAlex metadata. | Do not call it a complete citation graph, official breadth score, or award-committee criterion. | E uses proxy wording in report and slides. |
| Topic-label ambiguity | Topic Evolution, Explorer, report matrix | Automatic topic labels reveal broad structure and search/filter entry points. | Do not rely on API topic for representative cases without manual topic audit. | D uses `manual_topic_label` for selected Top 12 cases. |
| Institution/country attribution | Network module | Institution/country counts show visible metadata distribution. | Do not write institutional ranking, national strength ranking, or exact collaboration network. | F checks final slide wording against network handoff. |
| Representative-paper evidence | Evidence cards, Story Builder, report case paragraphs | Top 12 cards provide DOI/paper/evidence starting points and cautious case candidates. | Do not claim industrial/foundational impact without reading the evidence URL. | D/E/F mark final checked status before submission. |
| Live demo / screenshot evidence | README demo, presentation pack | Screenshots are generated from the same D3 page/data and can support an offline route. | Do not present screenshots as a separate analysis source. | F rehearses live route and fallback route. |

## 3. Module-to-confidence guide

| Module | Strongest current evidence | Confidence level | Safe classroom sentence | Remaining human check |
|---|---|---|---|---|
| B · Time | `recognition_lag`, award timeline, outlier case packet, award lifecycle packet | High for lag distribution; medium for case interpretation | “Recognition lag measures the interval between publication and award announcement; it is not proof of when impact actually appeared.” | Verify 2–3 selected award citations and keep lifecycle language non-causal. |
| C · Venue / Field | venue counts, area counts, venue-year case studies, Best Paper framing | High for counts; medium for interpretation | “Venue and field counts show visibility in this award dataset, not a ranking of conferences or disciplines.” | Check selected venue-year case contribution wording. |
| D · Topic Evolution | topic stats, manual topic audit, topic-shift narrative, archetype taxonomy | Medium-high after manual audit | “Topic labels are useful for structure; representative cases should use the manual label when available.” | Confirm corrected / needs-review topic labels before final report. |
| E · Citation / Impact | citation counts, trajectories, breadth metrics, evidence coverage matrix | High for citation depth; medium for breadth proxy | “Citation depth and breadth are complementary public-metadata signals, not official explanations for awards.” | Choose final cases from safe / presentation-ready rows and read evidence URLs. |
| F · Network / Presentation | institution/country stats, demo screenshots, Q&A / fallback docs | Medium | “Network views summarize visible affiliation metadata and presentation routes, not complete collaboration history.” | Check screenshot readability and avoid institution/country ranking language. |

## 4. Copy-ready report paragraph

> Because the project relies on public award records and OpenAlex-style scholarly metadata, the visualizations should be read as a structured map of visible patterns rather than a complete causal explanation of long-term impact. Citation count captures depth, citation trajectories show observed-window movement, and impact breadth approximates diffusion across sampled citing venues, fields, institutions, and countries. These measures help identify representative cases and compare patterns within the dataset, but final claims about a paper’s contribution, foundational role, or industrial impact should be checked against paper pages, award citations, and the evidence-card URLs.

## 5. Fast Q&A wording

- If asked “Is breadth an official score?” answer: “No. It is a derived OpenAlex sampled proxy used to compare diffusion range inside this project.”
- If asked “Does higher citation mean more time-tested?” answer: “Not by itself. Citation depth is one signal; the project also checks trajectory shape, breadth, topic, and concrete evidence.”
- If asked “Why are some topics or institutions missing?” answer: “Those fields depend on public metadata coverage and normalization, so we treat them as visible structure, not exhaustive ground truth.”
- If asked “Have all papers been manually read?” answer: “No. The full dataset is metadata-driven. Representative Top 12 cases have evidence links and still require final human wording checks before the final report.”
- If asked “Can screenshots replace the live demo?” answer: “They are a fallback route generated from the same local D3 page and data, so they preserve the same analysis even if the browser/network demo fails.”

## 6. Final owner checklist

- [ ] E: every final `impact breadth` sentence includes `OpenAlex sampled proxy` or an equivalent boundary.
- [ ] D/E: selected representative papers use evidence-card links and manual topic labels when available.
- [ ] B: lifecycle / pre-post citation wording remains observational and non-causal.
- [ ] C: venue/field counts are not described as rankings.
- [ ] F: network slides avoid institutional/national ranking language and use screenshot fallback only as same-page evidence.
- [ ] A: final QA confirms this playbook is linked from README, work board, stretch board, final QA, report skeleton, and E handoff.
