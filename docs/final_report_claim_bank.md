# Final report claim bank

Purpose: give A and the module owners one compact bridge from the live D3 dashboard to final report prose. The existing handoff docs are detailed; this file selects the safest report-ready claims and points each one to the evidence file, owner, and wording boundary that should survive into the final submission.

Machine-readable companion: `docs/final_report_claim_bank.csv`.

Refs #2 and closes #108 when validated. The broad A owner container stays open for final report assembly, teammate PR review, archive inspection, and course-specific upload checks.

## How to use this bank

1. Start from the report section you are writing in `docs/report/report_skeleton.md`.
2. Pick the matching claim row below or in `docs/final_report_claim_bank.csv`.
3. Open the listed evidence source before copying the paragraph into the final report.
4. Keep the safe wording boundary next to the claim until the final editing pass.
5. If the claim names a paper, venue-year card, or institution/country case, do the remaining human check before presenting it as final evidence.

## Claim table

| Claim | Owner | Report section | Evidence source | Copy-ready claim | Safe wording boundary | Remaining human check |
|---|---|---|---|---|---|---|
| A1 | A | Introduction / narrative chain | `docs/story_builder_board.md` | The dashboard should be read as one evidence chain: delayed recognition, award-community visibility, topic evolution, citation and breadth proxies, paper-level evidence, and network metadata together describe how Test-of-Time work remains visible over time. | Use as a narrative frame, not a causal model for why papers win awards. | Confirm final report order matches the live page and screenshots. |
| B1 | B | Time / recognition lag | `docs/time_module_demo_claim_cards.md` | Recognition lag shows that Test-of-Time recognition is usually delayed rather than immediate; the current dataset centers around a roughly 10–15 year confirmation window while retaining shorter and much longer cases. | Recognition lag is announcement_year minus publication_year; do not write it as the moment impact was created or as a quality score. | Pick 2-3 final paper cases and verify award-citation wording. |
| B2 | B | Award lifecycle citation window | `docs/award_lifecycle_analysis.md` | Aligning citation trajectories around the award year gives a useful descriptive view of pre-award and post-award citation windows, helping separate mature recognition cases from papers still gaining visibility. | The pre/post window is observational metadata, not proof that the award caused citation changes. | Decide whether the lifecycle table stays in the main report or appendix. |
| C1 | C | Venue and field | `docs/venue_source_traceability_audit.md` | Venue and field patterns show where long-term impact is most visible in this award dataset, with several communities such as database, networking, IR, software engineering, and computer vision contributing many recorded cases. | Write raw counts as award-history visibility, not conference quality rankings or field importance rankings. | Verify 2-3 selected venue/source URLs before final slides. |
| C2 | C | Venue-year case evidence | `docs/venue_year_evidence_cards.md` | Venue-year evidence cards turn aggregate venue counts into specific clusters that can be explained in the report, such as a venue/year group with multiple time-tested papers and a shared methodological or systems context. | Call these representative clusters, not strongest years or best venues. | Choose final cards and confirm paper contribution language from source pages. |
| D1 | D | Topic evolution | `docs/topic_shift_narrative.md` | Topic evolution suggests a stable base of systems and data-oriented work alongside later visible growth in web/data mining, vision, language, and theory-related themes. | Topic labels are automatic or semi-automatic metadata and should be treated as a readable grouping layer, not an official taxonomy. | Prefer manually audited labels for Top 12 cases in final prose. |
| D2 | D | Topic / venue bridge | `docs/topic_venue_crosswalk.md` | The topic-by-venue crosswalk links technical themes to the award communities where they are recorded, helping the report connect topic evolution with venue and field visibility instead of treating them as separate charts. | Crosswalk rows describe current dataset intersections only; they are not venue rankings or proof of topic value. | Select 2-3 intersections and verify representative paper evidence. |
| E1 | E | Citation depth and impact breadth | `docs/citation_impact_handoff.md` | Citation depth and impact breadth provide two complementary proxy views: citation count captures scale of reuse, while breadth approximates how widely citing works spread across fields, institutions, and countries. | Impact breadth is an OpenAlex sampled proxy, not a complete citation graph or official award reason. | Use evidence coverage matrix before making strong contribution or industry-impact claims. |
| E2 | E | Citation trajectory archetypes | `docs/citation_trajectory_archetypes.md` | Trajectory archetypes help turn citation time series into report language, distinguishing sustained long-tail visibility, late resurgence, high-depth/high-breadth diffusion, and other observed citation-window patterns. | Archetypes describe the available OpenAlex window; avoid claiming complete lifetime histories. | Choose one archetype case per slide/report paragraph and verify evidence URLs. |
| F1 | F | Network and attribution | `docs/institution_country_attribution_audit.md` | Network and attribution materials show how public metadata makes some institutions, countries, and industry labs visible in the Test-of-Time corpus while also exposing sparse-affiliation cases. | Say metadata visibility and affiliation mentions; do not claim complete collaboration networks, institutional rankings, national rankings, or industrial adoption. | Pick final network cases and check screenshot/crop consistency. |
| F2 | F | Presentation and defense wording | `docs/defense_qa_pack.md` | The glossary and defense Q&A provide a shared vocabulary for explaining recognition lag, citation depth, impact breadth, OpenAlex proxy limits, and evidence-check boundaries during report writing and classroom questions. | Use cautious verbs such as shows, suggests, indicates, and avoid proves, causes, or determines. | Run a final wording pass across slides and report. |
| A2 | A | Final archive and QA | `docs/final_archive_manifest.md` | The final archive manifest and figure/evidence index make the submission auditable: every major page, data file, screenshot, and report-support document has a known place in the final package. | Structural readiness does not replace final human review of report claims and selected evidence URLs. | Run manifest validation and zip inspection after the final archive is built. |

## Suggested paragraph assembly route

1. **Opening paragraph:** Use A1 to introduce the project as an evidence chain rather than a gallery of separate charts.
2. **Data and limitations paragraph:** Combine F2 with the data-source paragraph already in `docs/report/report_skeleton.md` so proxy metrics are defined before results appear.
3. **Time paragraph:** Use B1 as the main Time finding, then add B2 only if the report has room for award-lifecycle nuance.
4. **Venue and field paragraph:** Start with C1 for aggregate visibility, then add C2 as one concrete case-card route.
5. **Topic paragraph:** Pair D1 with D2 so topic evolution and venue communities are read together.
6. **Citation and impact paragraph:** Use E1 for metric definitions and E2 for a trajectory-shaped example.
7. **Network and final QA paragraph:** Use F1 for network metadata and A2 for the final auditability / packaging evidence.

## Final wording checklist

- Use `shows`, `suggests`, `indicates`, or `is visible in this dataset`; avoid causal verbs such as `proves`, `causes`, or `determines`.
- Keep `impact breadth` tied to OpenAlex sampled citing-work metadata.
- Keep venue, institution, and country counts framed as visible distribution, not quality or contribution ranking.
- Do not turn representative paper claims into final statements until the evidence URL / award citation has been checked by the relevant owner.
- If a paragraph cites a CSV or screenshot, confirm that file is included by `docs/final_archive_manifest.md` before packaging.
