# Final submission readiness scorecard

Purpose: give A and the whole group one last-review page that separates verified structural readiness from human-owned final checks. Use it after `docs/final_archive_manifest.md` and before creating the real coursework zip.

Related issue: #122. Parent container: #2.

## Current status snapshot

| Area | Status | Evidence | What it means |
|---|---|---|---|
| Runnable D3 page | Pass, needs final live review | `index.html`, `src/app.js`, `src/styles.css`, `docs/final_integration_dry_run_log.md` | The repo has a validated single-page D3 baseline with presentation mode and documented dry-run checks. Re-run local HTTP and browser checks after any teammate PR. |
| Core dataset | Pass | `data/papers_enriched.csv` has 250 rows; `data/citation_trajectories.csv` has 3077 rows; `data/recognition_lag_distribution.csv` has 6 rows | The main Test-of-Time sample, citation trajectories, and recognition-lag bins are present for the page and report. |
| Report evidence | Pass, human wording still needed | `docs/final_report_figure_evidence_index.md` / `.csv` has 10 figure-evidence rows; `docs/final_report_claim_bank.md` / `.csv` has 12 copy-ready claim rows | Report assembly can start from mapped chart/data evidence instead of inventing claims late. |
| Representative paper evidence | Warning | `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv` has 12 rows; `docs/top12_evidence_coverage_matrix.csv` has 12 rows | The representative set is structured, but selected final cases still need human reading of evidence URLs and safe contribution wording. |
| Module evidence coverage | Pass with proxy boundaries | `docs/evidence_coverage_matrix.csv` has 5 B-F module rows; `docs/uncertainty_proxy_confidence_playbook.md`; `docs/citation_metric_sensitivity_notes.md` | Each analytical module has evidence and limitations docs. Citation, breadth, topic, and institution/country claims must remain proxy-aware. |
| Presentation support | Pass, needs final PPT copy/paste | `docs/presentation_pack.md`, `docs/final_presentation_blueprint.md`, `docs/final_demo_rehearsal_runbook.md`, `docs/defense_qa_pack.md`, 9 PNGs under `docs/demo/` | The live-demo and screenshot-fallback route is documented. Final slides still require human assembly and rehearsal. |
| Archive packaging | Pass structurally, not yet zipped | `docs/final_archive_file_manifest.csv` has 65 rows and 0 missing required paths; `docs/final_submission_packaging_checklist.md` | Required files are present in the repo. The actual zip still needs creation and Python `zipfile` inspection. |
| Collaboration evidence | Pass, owner containers remain open | `docs/work_board.md`, `docs/stretch_issue_assignment_board.md`, `docs/contribution_evidence_ledger.md` | A-F ownership is traceable. Issues #2-#7 should stay open until the team explicitly finishes final submission readiness. |

## Final go / no-go decision table

| Decision | Conditions |
|---|---|
| Ready to build final zip | `main` is clean, `node --check src/app.js` passes, local HTTP/browser check passes, manifest has 0 missing required files, and no private/cache files are present. |
| Ready to write final report | Figure-evidence index, claim bank, Story Builder, and module handoff docs are all referenced; B-F owners have chosen final cases and verified evidence URLs. |
| Ready to present | Presentation mode works, `docs/demo/*.png` screenshots match the current UI, final slides are assembled, and the team rehearses the live-demo fallback route. |
| Not ready | Any required archive path is missing, screenshots are stale, representative paper claims lack evidence URLs, or final report/PPT wording treats proxy metrics as official rankings or causal proof. |

## Short final-review route

1. A checks repository state and page structure: `git status --short`, `node --check src/app.js`, local HTTP 200, and presentation-mode browser check.
2. A runs manifest validation from `docs/final_archive_manifest.md` and confirms missing required paths remain 0.
3. B-F owners choose the final 1-2 cases per module from their handoff docs and evidence matrices.
4. E/F verify proxy wording in the final report/PPT: citation depth, impact breadth, topic labels, institution/country attribution, and OpenAlex coverage are descriptive public-metadata signals, not official award reasons.
5. A creates the final zip only after report/PPT files are placed, then inspects it with Python `zipfile` and confirms no `.git`, `.DS_Store`, `__pycache__`, old zip, or local-only backup is included.

## Remaining human-owned checks

- [ ] B-F verify selected evidence URLs and award/source pages for final representative cases.
- [ ] Final report paragraphs copy safe wording from `docs/final_report_claim_bank.md` rather than overstating proxy metrics.
- [ ] Final PPT uses screenshots from the current page and follows `docs/final_presentation_blueprint.md` / `docs/final_demo_rehearsal_runbook.md`.
- [ ] A reruns the final archive manifest and packaging checklist after all teammate PRs merge.
- [ ] Keep #2 open until the actual final upload package is inspected and the team agrees it is ready.

## Validation command used for this scorecard

```bash
python3 - <<'PY'
import csv, pathlib
root = pathlib.Path('.')
checks = [
  'data/papers_enriched.csv',
  'data/citation_trajectories.csv',
  'data/recognition_lag_distribution.csv',
  'docs/final_archive_file_manifest.csv',
  'manual_annotations/manual_paper_annotations_top12_evidence_ready.csv',
  'docs/final_report_claim_bank.csv',
  'docs/final_report_figure_evidence_index.csv',
  'docs/evidence_coverage_matrix.csv',
  'docs/top12_evidence_coverage_matrix.csv',
]
for rel in checks:
    rows = list(csv.DictReader((root / rel).open(encoding='utf-8', newline='')))
    print(f'{rel}: {len(rows)} rows')
missing = []
for row in csv.DictReader((root / 'docs/final_archive_file_manifest.csv').open(encoding='utf-8', newline='')):
    if row['required'] == 'yes' and not (root / row['path']).exists():
        missing.append(row['path'])
print(f'missing required manifest paths: {len(missing)}')
print(f'demo PNG count: {len(list((root / "docs/demo").glob("*.png")))}')
PY
```
