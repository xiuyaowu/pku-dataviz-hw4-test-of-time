# Slide visual consistency audit

Purpose: give F / visual-presentation owner one final, copyable pass over the screenshot-to-slide system before building the PPT. This document answers Issue #63: every major module has a slide purpose, owner, backup asset, and safe wording boundary.

## Screenshot inventory

All main module screenshots are currently `1440 × 1000` PNGs captured from the same D3 page style. The QR code is intentionally square and should be used only on an online-demo or appendix slide.

| Asset | Size | Slide purpose | Owner | Use in PPT | Safe wording boundary |
|---|---:|---|---|---|---|
| `docs/demo/homepage-overview.png` | 1440 × 1000 | Opening / dataset frame | A | Title or data-frame slide background; crop lightly to 16:9 if needed. | State the dataset scope; do not imply complete coverage of all CS awards. |
| `docs/demo/time-and-timeline.png` | 1440 × 1000 | Recognition lag explanation | B | Main Time slide visual. | Lag is a recognition delay, not a direct quality score. |
| `docs/demo/venue-and-field.png` | 1440 × 1000 | Venue / field distribution | C | Main Venue & Field slide visual. | Counts reflect award records and coverage history, not venue ranking. |
| `docs/demo/topic-evolution.png` | 1440 × 1000 | Topic shift and representative papers | D | Main Topic slide visual, paired with 1 evidence-card case. | Automatic topic labels need human-checked examples for final claims. |
| `docs/demo/citation-and-impact.png` | 1440 × 1000 | Citation depth vs impact breadth | E | Main Citation / Impact slide visual. | Impact breadth is an OpenAlex sampled proxy, not a complete citation graph. |
| `docs/demo/explorer-evidence-index.png` | 1440 × 1000 | Searchable evidence backup | A / D | Q&A or evidence-index slide. | Use it to locate cases; final contribution wording still needs evidence URLs. |
| `docs/demo/benchmark-lab.png` | 1440 × 1000 | Selected-paper comparison | A / E | Optional live-demo bridge after Explorer. | Percentiles explain relative position in this dataset, not official award causality. |
| `docs/demo/network-diffusion.png` | 1440 × 1000 | Institution / country-region diffusion | F | Main Network slide visual. | Institution/country counts are metadata-visible distributions, not full collaboration networks. |
| `docs/demo/online-demo-qr.png` | 410 × 410 | Online access | A / F | Small QR on title, appendix, or final slide only. | If GitHub Pages is unavailable, use local server / screenshot fallback. |

## Slide consistency rules

1. Keep one visual claim per slide: title + one sentence + one screenshot. Avoid stacking multiple module screenshots on the same slide except in a final overview.
2. Use the same screenshot frame treatment across slides: white or dark container, 8–12 px corner radius, no mixed drop-shadow styles.
3. Crop all `1440 × 1000` module screenshots consistently for 16:9 slides: preserve the module title, the primary chart, and the reading note; crop excess vertical whitespace from the bottom before cropping chart labels.
4. Keep labels parallel across slides: `Research question`, `Evidence`, `Boundary`, `Speaker owner`.
5. Put safe wording in speaker notes, not as dense slide text, unless the slide is Methods / Boundaries.
6. For live demo fallback, use the screenshot order in `docs/live_demo_fallback_script.md`; do not improvise a new order under time pressure.

## Stale / low-readability risk check

| Risk | Current status | Action before final PPT |
|---|---|---|
| Screenshot resolution mismatch | Main module screenshots share `1440 × 1000`; QR is separate square asset. | Use module screenshots at the same visual width in PPT; keep QR small. |
| Stale screenshots after frontend edits | No automatic guarantee after future CSS/JS changes. | If `src/app.js` or `src/styles.css` changes, recapture `docs/demo/*.png` in presentation mode. |
| Slide title drift | README, presentation pack, and blueprint use mostly aligned titles. | Prefer blueprint titles: Time, Venue & Field, Topic Evolution, Citation Depth × Impact Breadth, Evidence Index, Benchmark Lab, Network Diffusion. |
| Proxy metric overclaim | Methods docs and handoffs already state boundaries. | Repeat one boundary sentence on each relevant speaker note. |
| Network slide over-interpretation | Network handoff warns against treating institution/country counts as full networks. | F should keep the Network slide wording as `metadata-visible distribution`. |

## Final F-owner checklist

- [ ] Confirm PPT uses the eight main module screenshots plus optional QR.
- [ ] Confirm all module screenshots are cropped with the same frame style.
- [ ] Confirm every slide has exactly one main takeaway sentence.
- [ ] Confirm safe wording boundaries are in speaker notes for Venue, Citation, Benchmark, and Network.
- [ ] Confirm the screenshot fallback route still opens from `docs/live_demo_fallback_script.md`.
- [ ] Confirm no slide calls venue counts a ranking, impact breadth a complete citation graph, or institution counts a full collaboration network.

## Issue #63 acceptance mapping

| Acceptance item | Repo evidence |
|---|---|
| Review all `docs/demo/*.png` references | Inventory table above covers all 9 PNG assets. |
| Confirm each screenshot has a slide purpose and owner | Inventory table maps each asset to purpose and owner. |
| Identify stale / low-readability screenshot risks | Risk table lists recapture, title drift, overclaim, and crop/readability checks. |
| Add visual consistency note | This document is linked from README, presentation pack, final blueprint, work board, and final QA checklist. |

Remaining human work: F / PPT maker still needs to crop screenshots inside the actual slide software and do one projector rehearsal. This repo provides the mapping and wording guardrails; it does not replace final slide assembly.
