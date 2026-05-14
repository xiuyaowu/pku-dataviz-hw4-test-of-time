# Stretch issue assignment board

Purpose: keep the six teammate workstreams open while adding meaningful extra tasks. Automated PRs may complete parts of these tasks, but the owner issues stay visible for human verification, report writing, and presentation rehearsal.

## Owner routing

| Owner | Core issue | New stretch issues | Main deliverable |
|---|---:|---|---|
| A · Integration / QA | #2 | #53, #54, #52 | Final integration dry run, PR review rubric (`docs/pr_review_rubric.md`), contribution evidence ledger |
| B · Time | #3 | #55, #56, #46 | Recognition-lag outliers (`docs/recognition_lag_outlier_cases.md`), Time annotations, award lifecycle view |
| C · Venue / Field | #4 | #57, #58, #50 | Venue-field caveats, venue-year examples (`docs/venue_year_case_studies.md`), Best Paper vs Test-of-Time framing |
| D · Topic Evolution | #5 | #59, #60, #47 | Manual topic audit, topic-shift narrative, research archetype taxonomy |
| E · Citation / Impact | #6 | #61, #62, #49 | Citation trajectory archetypes (`docs/citation_trajectory_archetypes.md`), impact breadth audit (`docs/impact_breadth_evidence_audit.md`), evidence coverage matrix |
| F · Visual / Presentation | #7 | #63, #64, #48, #51 | Visual consistency (`docs/slide_visual_consistency_audit.md`), live-demo fallback, defense Q&A, metric glossary |
| Cross-module | #2-#7 | #45 | Story Builder narrative board linking all claims to evidence and owners |

## How to use this board

1. Each teammate starts from their core issue (#2-#7), then chooses one stretch issue from their row.
2. If an automated PR already adds a baseline document or chart, the teammate still owns final human verification and presentation wording.
3. Teammate PRs should mention both the core issue and stretch issue, for example: `Refs #5, improves #59`.
4. Do not close #2-#7 until the final submission is ready and the team agrees. Close stretch issues only when their acceptance criteria are fully satisfied.

## Suggested priority order

1. #45 Story Builder: makes the final report/PPT coherent.
2. #49 Evidence coverage matrix: exposes the highest-value manual gaps.
3. #48 Defense Q&A: prepares answers for teacher questions.
4. #47 / #61 / #55: gives D/E/B stronger analytical findings.
5. #63 / #64: reduces presentation risk.
6. #52 / #53 / #54: makes contribution and integration evidence easy to show.

## Public wording rule

Keep all issue comments and docs neutral: project quality, evidence, verification, presentation readiness. Do not include private motivational language or comments about teammate ability.
