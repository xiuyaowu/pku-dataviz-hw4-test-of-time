# Contribution evidence ledger

Purpose: give the final report and presentation a neutral, file-based record of what each workstream owns. This is not a ranking of effort. It is a checklist for making each member's contribution visible, verifiable, and easy to summarize.

Use this together with `docs/work_board.md`, `docs/report/report_skeleton.md`, and `docs/final_qa_checklist.md`. The six owner issues #2-#7 should stay open as workstream containers until final submission; narrow stretch issues can be closed when their acceptance criteria are complete.

## Quick evidence map

| Owner | Core issue | Workstream | Main contribution evidence | Report / presentation slot | Final owner check |
|---|---:|---|---|---|---|
| A | #2 | Integration, D3 baseline, PR workflow, final QA | `index.html`, `src/app.js`, `src/styles.css`, `README.md`, `.github/pull_request_template.md`, `docs/work_board.md`, `docs/pr_review_rubric.md`, `docs/final_integration_dry_run_log.md`, this ledger | Opening, project methods, collaboration/QA appendix | Verify final main branch, rerun page/data checks, summarize merged PR/review evidence |
| B | #3 | Time and recognition lag | `data/award_timeline.csv`, `data/recognition_lag_distribution.csv`, `docs/time_recognition_lag_handoff.md`, `docs/recognition_lag_outlier_cases.md`, `docs/time_micro_annotations.md` | Time section: publication-award timeline, lag distribution, short/typical/long cases | Check 2-3 selected paper pages or award citations before final wording |
| C | #4 | Venue and field distribution | `data/venue_stats.csv`, `data/venue_area_stats.csv`, `docs/venue_field_handoff.md`, `docs/venue_field_imbalance_caveats.md`, `docs/venue_year_case_studies.md`, `docs/venue_year_case_studies.csv` | Venue / field section: concentration, field coverage, venue-year examples | Keep venue counts as dataset coverage, not official venue quality rankings |
| D | #5 | Topic evolution and representative papers | `data/topic_stats.csv`, `data/topic_year_stats.csv`, `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`, `docs/topic_evolution_handoff.md`, `docs/manual_topic_audit_top12.md`, `docs/topic_shift_narrative.md` | Topic section: top topics, decade shifts, corrected manual-topic examples | Prefer manual-topic labels for Top 12 cases; verify contribution text from evidence URLs |
| E | #6 | Citation depth, trajectory, and impact breadth | `data/citation_trajectories.csv`, `data/citing_breadth_metrics.csv`, `docs/citation_impact_handoff.md`, `docs/citation_trajectory_archetypes.md`, `docs/impact_breadth_evidence_audit.md`, `docs/evidence_coverage_matrix.md` | Citation / impact section: trajectory archetypes, depth-vs-breadth examples, proxy limitations | State impact breadth as OpenAlex sampled proxy, not complete citation graph or award reason |
| F | #7 | Network, visual consistency, and presentation readiness | `data/institution_stats.csv`, `data/country_stats.csv`, `docs/network_visual_presentation_handoff.md`, `docs/presentation_pack.md`, `docs/final_presentation_blueprint.md`, `docs/slide_visual_consistency_audit.md`, `docs/live_demo_fallback_script.md`, `docs/defense_qa_pack.md`, `docs/glossary_metric_explainer.md` | Network section, slide production, Q&A, live-demo fallback | Confirm screenshot crop/readability, speaker notes, and safe wording before class demo |

## Evidence by workstream

### A · Integration / QA

Evidence files:
- Page and code: `index.html`, `src/app.js`, `src/styles.css`.
- Collaboration system: `.github/pull_request_template.md`, `docs/work_board.md`, `docs/stretch_issue_assignment_board.md`, `docs/pr_review_rubric.md`.
- Final checks: `docs/final_qa_checklist.md`, `docs/final_integration_dry_run_log.md`, `docs/final_submission_packaging_checklist.md`.
- Report contribution record: `docs/report/contribution_A.md`.

Relevant issue / PR evidence:
- Core owner issue: #2.
- Recent QA / process PRs: #66 PR review rubric, #80 final integration dry run log, and this ledger for #52.

Report-ready contribution sentence:
> A handled the project architecture, initial D3 baseline, issue/PR workflow, integration review standard, and final QA artifacts, making the page runnable as one coherent Test-of-Time story while giving B-F stable modules to extend.

Remaining checkboxes:
- [ ] After all teammate PRs merge, rerun the final integration dry run.
- [ ] Summarize final merged PR evidence in the report contribution section.
- [ ] Confirm this ledger still matches the final repo tree.

### B · Time / recognition lag

Evidence files:
- `data/award_timeline.csv`
- `data/recognition_lag_distribution.csv`
- `docs/time_recognition_lag_handoff.md`
- `docs/recognition_lag_outlier_cases.md` / `.csv`
- `docs/time_micro_annotations.md`

Relevant issue / PR evidence:
- Core owner issue: #3.
- Stretch issues: #55 recognition-lag outliers, #56 screenshot micro-annotations, #46 award lifecycle view.
- Merged PRs: #37 time handoff, #71 recognition-lag outlier cases, #74 time chart micro-annotations.

Report / presentation slot:
- Define `recognition_lag = announcement_year - publication_year`.
- Explain the distribution and use one short-lag, one typical-lag, and one long-tail case.

Remaining checkboxes:
- [ ] Open award/paper links for the final 2-3 Time cases.
- [ ] Avoid causal wording such as “long lag caused impact.”
- [ ] Confirm the `Dense window`, `Median sits here`, and `Long tail` annotations are legible in screenshots.

### C · Venue / field

Evidence files:
- `data/venue_stats.csv`
- `data/venue_area_stats.csv`
- `docs/venue_field_handoff.md`
- `docs/venue_field_imbalance_caveats.md`
- `docs/venue_year_case_studies.md` / `.csv`

Relevant issue / PR evidence:
- Core owner issue: #4.
- Stretch issues: #57 venue-field caveats, #58 venue-year case studies, #50 Best Paper vs Test-of-Time framing.
- Merged PRs: #38 venue field handoff, #72 venue-year case studies, #76 venue field imbalance caveats.

Report / presentation slot:
- Describe which venues/areas are most visible in this dataset and why award-history coverage matters.
- Use venue-year examples as case prompts, not as proof of venue superiority.

Remaining checkboxes:
- [ ] Check selected venue-year examples against paper/award pages.
- [ ] Keep “more awards in dataset” separate from “better venue.”
- [ ] Decide whether #50 is needed for final comparison wording.

### D · Topic evolution

Evidence files:
- `data/topic_stats.csv`
- `data/topic_year_stats.csv`
- `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`
- `docs/topic_evolution_handoff.md`
- `docs/manual_topic_audit_top12.md` / `.csv`
- `docs/topic_shift_narrative.md` / `.csv`

Relevant issue / PR evidence:
- Core owner issue: #5.
- Stretch issues: #59 manual topic audit, #60 topic-shift narrative, #47 research archetype taxonomy.
- Merged PRs: #40 topic evolution handoff, #75 topic shift narrative packet, #77 manual topic audit for top papers.

Report / presentation slot:
- Use automatic topic labels for broad distribution, then use Top 12 manual topic audit to show how representative cases were checked.
- Present topic shifts as observed metadata patterns, not a complete history of CS.

Remaining checkboxes:
- [ ] Use corrected/manual topic labels for selected representative papers.
- [ ] Verify evidence URLs before writing strong contribution descriptions.
- [ ] If #47 is completed later, cross-link archetypes to topic-shift cases.

### E · Citation / impact

Evidence files:
- `data/citation_trajectories.csv`
- `data/citing_breadth_metrics.csv`
- `docs/citation_impact_handoff.md`
- `docs/citation_trajectory_archetypes.md` / `.csv`
- `docs/impact_breadth_evidence_audit.md` / `.csv`
- `docs/evidence_coverage_matrix.md` / `.csv`
- `docs/top12_evidence_coverage_matrix.csv`

Relevant issue / PR evidence:
- Core owner issue: #6.
- Stretch issues: #61 citation trajectory archetypes, #62 impact breadth evidence audit, #49 evidence coverage matrix.
- Merged PRs: #39 citation impact handoff, #68 impact breadth evidence audit, #70 citation trajectory archetypes, #73 evidence coverage matrix.

Report / presentation slot:
- Separate citation depth, trajectory shape, and breadth proxy.
- Use evidence coverage matrix to decide which Top 12 paper claims are presentation-ready.

Remaining checkboxes:
- [ ] For each selected paper, classify claim strength as safe, proxy-only, or needs human evidence.
- [ ] Do not describe OpenAlex sampled breadth as a complete citation network.
- [ ] Keep trajectory archetypes as observed-window categories.

### F · Network / visual / presentation

Evidence files:
- `data/institution_stats.csv`
- `data/country_stats.csv`
- `docs/network_visual_presentation_handoff.md`
- `docs/presentation_pack.md`
- `docs/final_presentation_blueprint.md`
- `docs/slide_visual_consistency_audit.md`
- `docs/live_demo_fallback_script.md`
- `docs/defense_qa_pack.md`
- `docs/glossary_metric_explainer.md`
- `docs/demo/*.png`

Relevant issue / PR evidence:
- Core owner issue: #7.
- Stretch issues: #63 slide visual consistency, #64 live demo fallback, #48 defense Q&A, #51 metric glossary.
- Merged PRs: #36 network presentation handoff, #67 live demo fallback script, #69 slide visual consistency audit, #78 defense Q&A pack, #79 metric glossary explainer.

Report / presentation slot:
- Explain network/institution/country views as metadata coverage and collaboration signals.
- Own the final slide flow, screenshot fallback, Q&A routing, and glossary safe wording.

Remaining checkboxes:
- [ ] Confirm all README screenshot paths resolve before PPT production.
- [ ] Use `?present=1` for final screenshot refresh if screenshots are updated.
- [ ] Rehearse fallback route from `docs/live_demo_fallback_script.md`.

## Final contribution QA

Before submission, check:

- [ ] Each owner has at least one file/doc/chart named in the final report contribution paragraph.
- [ ] Every strong paper-level claim has an evidence URL or is explicitly marked as proxy-only.
- [ ] The report cites owner issues #2-#7 as workstream containers, not as proof that all human checks are finished.
- [ ] `docs/work_board.md`, `docs/stretch_issue_assignment_board.md`, and this ledger agree on issue routing.
- [ ] The final presentation uses the same owner labels A-F as the report and GitHub issues.
