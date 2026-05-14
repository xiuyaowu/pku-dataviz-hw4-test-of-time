# Final demo rehearsal runbook

Purpose: give F and the final presenter one concrete rehearsal route for the live D3 page, screenshot fallback, speaker handoff, and safe wording checks. Use this after the PPT draft exists and before the classroom presentation.

Linked core issue: #7. Stretch issue: #102.

## 1. Setup before rehearsal

| Check | Expected state | Owner |
|---|---|---|
| Browser route | Open `http://127.0.0.1:8765/index.html?present=1` | F / A |
| Local server | `python3 -m http.server 8765 --bind 127.0.0.1` from repo root | A |
| Backup screenshots | `docs/demo/*.png` are accessible in the PPT folder or repo | F |
| Speaking order | A → B → C → D → E → A/D → A/E → F → A/F → A | A / F |
| Safe wording sheet | Keep `docs/glossary_metric_explainer.md` and `docs/defense_qa_pack.md` open | F |

If the live page does not load within 20 seconds, switch to `docs/live_demo_fallback_script.md` instead of troubleshooting during the presentation.

## 2. Ten-minute rehearsal route

| Time | Speaker | Live page action | Backup screenshot | Main claim | Safe wording boundary |
|---:|---|---|---|---|---|
| 0:00–1:00 | A | Start at hero / summary cards | `docs/demo/homepage-overview.png` | The project studies long-term recognition of CS research through Test of Time Award papers. | Dataset is a curated award dataset, not all CS papers. |
| 1:00–2:10 | B | Scroll to Time; point to recognition lag and timeline | `docs/demo/time-and-timeline.png` | Recognition lag shows delayed formal recognition. | Lag is timing metadata, not a causal quality score. |
| 2:10–3:20 | C | Scroll to Venue / Field | `docs/demo/venue-and-field.png` | Venue and field views show award-history visibility across communities. | Raw counts are not venue rankings or quality rankings. |
| 3:20–4:40 | D | Scroll to Topic Evolution and representative paper cards | `docs/demo/topic-evolution.png` | Topic patterns connect aggregate shifts to representative papers. | Automatic topic labels should defer to manual labels when checked. |
| 4:40–6:00 | E | Scroll to Citation / Impact | `docs/demo/citation-and-impact.png` | Citation depth and impact breadth capture different influence shapes. | Impact breadth is an OpenAlex sampled proxy, not a complete citation graph. |
| 6:00–6:50 | A / D | Open Explorer and search one prepared keyword | `docs/demo/explorer-evidence-index.png` | Explorer moves from patterns back to paper-level evidence. | Do not improvise contribution claims without evidence URLs. |
| 6:50–7:40 | A / E | Open Benchmark Lab for the selected paper | `docs/demo/benchmark-lab.png` | Benchmark Lab compares one paper against same-field/context metrics. | Percentiles are descriptive within the current dataset. |
| 7:40–8:50 | F | Scroll to Network | `docs/demo/network-diffusion.png` | Network view shows visible institution/country metadata patterns. | Institution/country counts are metadata visibility, not full collaboration or national strength rankings. |
| 8:50–9:30 | A / F | Methods / limitations slide or glossary anchor | PPT methods slide | Main limitations are award history, metadata coverage, and proxy metrics. | Say what the dashboard can and cannot prove. |
| 9:30–10:00 | A | Return to conclusion / summary | Homepage or conclusion slide | Long-term impact appears across time, topics, citations, cases, benchmarks, and research ecosystems. | Keep final claim synthetic, not causal. |

## 3. Speaker handoff script

- A to B: “We first ask how long recognition takes, then B shows the time scale.”
- B to C: “After timing, the next question is which communities are visible in the award history.”
- C to D: “Venue and field patterns are broad; D connects them to topic shifts and representative work.”
- D to E: “Topic labels explain what the work is about; E shows how influence appears in citation depth and breadth.”
- E to A/D: “These aggregate patterns need paper-level evidence, so we move into Explorer.”
- A/D to A/E: “For a selected paper, Benchmark Lab gives a compact comparison view.”
- A/E to F: “Finally, F expands the lens from papers to the visible research ecosystem.”
- F to A: “The network view has clear metadata boundaries, so A closes with methods and limitations.”

## 4. Live-demo fallback triggers

Switch to screenshot-only mode if any of these happen:

- The local server fails or the page shows a loading error after 20 seconds.
- Browser zoom, projector resolution, or scrolling makes labels unreadable.
- A tooltip or interaction state covers important text during the live demo.
- The speaker loses the selected paper / filter state and cannot reset within 10 seconds.

Fallback sentence:

> These screenshots are captured from the same D3 page in presentation mode using the same local data files, so we will use the screenshot route to keep the explanation readable.

## 5. Final rehearsal checklist

### F owner checks

- [ ] Network screenshot is from presentation mode and is readable on 16:9 slides.
- [ ] `docs/network_ecosystem_case_notes.md` has 1–2 candidate cases selected for optional mention.
- [ ] No slide calls institution/country counts “rankings” without metadata caveat.
- [ ] The live-demo fallback screenshots are ordered the same way as the speaking route.
- [ ] `docs/defense_qa_pack.md` has answers ready for proxy metrics and metadata coverage.

### A integration checks

- [ ] Server starts from repo root and `index.html?present=1` opens successfully.
- [ ] The speaker route matches `docs/presentation_pack.md` and `docs/final_presentation_blueprint.md`.
- [ ] Time / Venue / Topic / Citation claims are copied from their handoff docs, not improvised.
- [ ] Evidence-card claims selected for slides have human-reviewed evidence URLs where needed.
- [ ] The final PPT has a screenshot-only fallback path and a methods / limitations slide.

## 6. Documents to keep open during final preparation

| Need | Document |
|---|---|
| Overall slide sequence | `docs/presentation_pack.md` |
| Copy-paste slide blueprint | `docs/final_presentation_blueprint.md` |
| F network talking points | `docs/network_visual_presentation_handoff.md` |
| Screenshot fallback | `docs/live_demo_fallback_script.md` |
| Teacher Q&A | `docs/defense_qa_pack.md` |
| Metric safe wording | `docs/glossary_metric_explainer.md` |
| Figure-to-evidence traceability | `docs/final_report_figure_evidence_index.md` |

## 7. Remaining human work

This runbook is ready for rehearsal, but it does not replace human practice. Before the final presentation, each owner should rehearse their 60–90 second segment, choose the exact case examples, verify any evidence URLs used in slides, and confirm that the final PPT wording preserves the safe boundaries above.
