# Glossary and metric explainer

Purpose: give teammates and graders one shared vocabulary for the live demo, report, and Q&A. Use these terms consistently across the page, report skeleton, and presentation pack.

## Quick usage rule

When a metric is derived from public metadata rather than human reading, describe it as an observed pattern, proxy, or sample-based indicator. Do not describe it as an official award reason or causal proof.

| Term | Plain-language meaning | Where it appears | How to say it safely |
|---|---|---|---|
| Test of Time Award | A retrospective award given years after publication to recognize work that remains influential. | Project framing, all modules | “The dataset shows papers that were visible in public Test-of-Time award records, not all long-term-impact CS papers.” |
| Recognition lag | `announcement_year - publication_year`; the number of years between publication and award announcement. | Time module, timeline, report Section 4.1 | “Recognition lag measures delayed formal recognition, not the exact moment when impact began.” |
| Citation depth | The scale of citations a paper accumulated in public scholarly metadata. | Citation module, Benchmark Lab | “Citation depth is an influence signal, but it is not the only definition of importance.” |
| Citation trajectory | The shape of citations across years, such as sustained long-tail attention or recent resurgence. | Citation trajectory chart, archetype handoff | “Trajectory categories describe the OpenAlex-visible time window; they are not complete lifetime histories.” |
| Impact breadth | A derived proxy for how widely a paper diffuses across sampled citing fields, institutions, countries, and years. | Depth × Breadth chart, Benchmark Lab | “Impact breadth is an OpenAlex sampled proxy for diffusion range, not a complete citation graph.” |
| OpenAlex proxy | A metric or metadata field built from OpenAlex records rather than course-provided ground truth or manual paper reading. | Methods, limitations, Q&A | “OpenAlex proxy metrics are useful for visualization and comparison, but need manual evidence for strong paper-level claims.” |
| Venue area | A normalized field label assigned to venues, such as Database, Networking, IR, CV, or Software Engineering. | Venue and Field module | “Venue area helps group communities, but it should not be treated as a perfect taxonomy.” |
| Topic label | A first-pass topic category from API concepts and rule-based normalization, later improved by manual annotation for representative papers. | Topic module, evidence cards | “Automatic topic labels show broad patterns; representative cases should use manual topic checks before final writing.” |
| Same-field benchmark | A comparison between one selected paper and papers in the same venue area or topic neighborhood. | Benchmark Lab | “Same-field benchmarks reduce cross-field citation bias, but still depend on label quality and dataset coverage.” |
| Evidence card | A short paper-level card with title, venue/year, contribution summary, evidence links, representative reason, and human-check status. | Explorer, report, presentation | “Use presentation-ready cards first; if a card is marked for human check, keep the wording cautious.” |
| Coverage status | A readiness label such as `ready`, `presentation-ready-cautious`, `proxy only`, or `needs human check`. | Evidence coverage matrix | “Coverage status describes current evidence readiness, not paper quality.” |
| Award-history bias | Differences caused by which venues created Test-of-Time awards, when they started, and how complete public records are. | Venue, methods, limitations | “Venue counts are visible award-record counts, not a ranking of venue quality.” |

## Copy-ready metric wording

- Recognition lag: “We use recognition lag to describe the gap between publication and later formal recognition by a Test-of-Time award.”
- Citation depth: “Citation depth gives a scale of later scholarly uptake, while still needing context from field norms and paper content.”
- Impact breadth: “Impact breadth is a sampled OpenAlex proxy for diffusion across citing fields, institutions, countries, and years.”
- Same-field benchmark: “The benchmark compares a selected paper against the current dataset and similar-field peers, so it is a contextual comparison rather than a universal ranking.”
- Topic label: “Topic labels are useful for trend visualization; final representative-paper claims should use manual topic/evidence checks.”

## Terms to avoid

| Avoid | Use instead |
|---|---|
| “This proves the paper won because…” | “This pattern is consistent with…” |
| “Best venue / strongest country / top institution” | “Most visible in this award-record dataset” |
| “Complete citation network” | “OpenAlex sampled citation metadata” |
| “Industrial impact is obvious from citation count” | “Industrial impact requires separate evidence URL or award-citation support” |
| “Topic labels are ground truth” | “Topic labels are first-pass labels, with manual checks for representative papers” |

## Owner handoff

- A: keep README, report skeleton, and final QA using the same metric names.
- B: use `recognition lag` only for award timing, not causal impact timing.
- C: describe venue/field counts as award-record visibility, not rankings.
- D: prefer manual topic labels for Top 12 representative papers.
- E: always pair impact breadth with the OpenAlex proxy boundary.
- F: use these short safe phrases in PPT speaker notes and defense answers.
