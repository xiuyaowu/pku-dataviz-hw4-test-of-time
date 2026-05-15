# Stretch issue assignment board

Purpose: keep the six teammate workstreams open while adding meaningful extra tasks. Automated PRs may complete parts of these tasks, but the owner issues stay visible for human verification, report writing, and presentation rehearsal.

## Owner routing

| Owner | Core issue | New stretch issues | Main deliverable |
|---|---:|---|---|
| A · Integration / QA | #2 | #53, #54, #52, #92, #94, #108 | Final integration dry run, PR review rubric (`docs/pr_review_rubric.md`), contribution evidence ledger, final archive manifest (`docs/final_archive_manifest.md`), final report figure/evidence index (`docs/final_report_figure_evidence_index.md`), final report claim bank (`docs/final_report_claim_bank.md`) |
| B · Time | #3 | #55, #56, #46, #98, #112 | Recognition-lag outliers (`docs/recognition_lag_outlier_cases.md`), Time screenshot annotations (`docs/time_micro_annotations.md`), award lifecycle pre/post citation packet (`docs/award_lifecycle_analysis.md`), Time demo claim cards (`docs/time_module_demo_claim_cards.md`), award-era cohort comparison (`docs/award_era_cohort_comparison.md`) |
| C · Venue / Field | #4 | #57, #58, #50, #90, #96, #106 | Venue-field caveats (`docs/venue_field_imbalance_caveats.md`), venue-year examples (`docs/venue_year_case_studies.md`), venue-year evidence cards (`docs/venue_year_evidence_cards.md`), Best Paper vs Test-of-Time framing (`docs/best_paper_vs_test_of_time_framing.md`), venue source traceability audit (`docs/venue_source_traceability_audit.md`), venue normalization/count guide (`docs/venue_normalization_count_guide.md`) |
| D · Topic Evolution | #5 | #59, #60, #47, #100 | Manual topic audit (`docs/manual_topic_audit_top12.md`), topic-shift narrative (`docs/topic_shift_narrative.md`), research archetype taxonomy (`docs/research_archetype_taxonomy.md`), topic × venue crosswalk (`docs/topic_venue_crosswalk.md`) |
| E · Citation / Impact | #6 | #61, #62, #49, #86, #110 | Citation trajectory archetypes (`docs/citation_trajectory_archetypes.md`), impact breadth audit (`docs/impact_breadth_evidence_audit.md`), evidence coverage matrix (`docs/evidence_coverage_matrix.md`), uncertainty / proxy-confidence playbook (`docs/uncertainty_proxy_confidence_playbook.md`), final case-selection risk register (`docs/final_case_selection_risk_register.md`) |
| F · Visual / Presentation | #7 | #63, #64, #48, #51, #88, #102, #104 | Visual consistency (`docs/slide_visual_consistency_audit.md`), live-demo fallback, defense Q&A (`docs/defense_qa_pack.md`), metric glossary (`docs/glossary_metric_explainer.md` + page Glossary section), Network ecosystem cases (`docs/network_ecosystem_case_notes.md`), final demo rehearsal runbook (`docs/final_demo_rehearsal_runbook.md`), institution/country attribution audit (`docs/institution_country_attribution_audit.md`) |
| Cross-module | #2-#7 | #45 | Story Builder narrative board (`docs/story_builder_board.md`) linking all claims to evidence, boundaries, and owners |

## How to use this board

1. Each teammate starts from their core issue (#2-#7), then chooses one stretch issue from their row.
2. If an automated PR already adds a baseline document or chart, the teammate still owns final human verification and presentation wording.
3. Teammate PRs should mention both the core issue and stretch issue, for example: `Refs #5, improves #59`.
4. Do not close #2-#7 until the final submission is ready and the team agrees. Close stretch issues only when their acceptance criteria are fully satisfied.

## Suggested priority order

1. #45 Story Builder: `docs/story_builder_board.md` makes the final report/PPT coherent and gives B-F owners claim rows to verify.
2. #49 Evidence coverage matrix, #86 uncertainty playbook, #108 final report claim bank, and #110 final case-selection risk register: expose manual gaps, give the team safe proxy-confidence wording, convert evidence docs into copy-ready final report claims, and help E choose safer representative cases.
3. #90 Venue source traceability audit, #96 venue normalization/count guide, and #106 venue-year evidence cards: gives C provenance, denominator-aware language, and concrete report/PPT cases for venue-count and field-distribution defense.
4. #48 Defense Q&A: prepares answers for teacher questions.
5. #47 / #100 / #61 / #55 / #56 / #60 / #98 / #112: gives D/E/B stronger analytical findings, topic-to-venue bridge material, topic-shift narrative material, screenshot-ready explanations, and Time cohort-comparison context.
6. #63 / #64 / #102: reduces presentation risk and gives F a concrete live-demo rehearsal route.
7. #94 Final report figure/evidence index: use it before writing slides/report paragraphs so every chart claim points to a screenshot, data file, owner, and safe wording boundary.

## Public wording rule

Keep all issue comments and docs neutral: project quality, evidence, verification, presentation readiness. Do not include private motivational language or comments about teammate ability.
