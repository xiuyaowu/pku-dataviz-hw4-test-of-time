# Final archive manifest

Purpose: give A and the whole group one fast packaging evidence map before the final coursework upload. Use this with `docs/final_submission_packaging_checklist.md` and `docs/final_submission_readiness_scorecard.md`; the checklist explains how to build and inspect the zip, the scorecard summarizes pass/warn/blocker readiness, and this manifest names the files that should survive into the archive.

Machine-readable companion: `docs/final_archive_file_manifest.csv`.

## Archive rule of thumb

Keep the submission archive focused on the runnable D3 page, local data, public documentation, report/presentation support, and teammate-facing evidence files. Exclude development history and local caches.

### Must include

| Category | Required evidence |
|---|---|
| Frontend | `index.html`, `src/app.js`, `src/styles.css` |
| Core data | all CSVs under `data/` listed in `docs/final_archive_file_manifest.csv` |
| Collaboration evidence | `docs/work_board.md`, `docs/stretch_issue_assignment_board.md`, `.github/pull_request_template.md` |
| Report support | `docs/report/report_skeleton.md`, `docs/story_builder_board.md`, `docs/final_report_figure_evidence_index.md`, `docs/final_report_claim_bank.md`, module handoff docs, `docs/contribution_evidence_ledger.md` |
| Presentation support | `docs/presentation_pack.md`, `docs/final_presentation_blueprint.md`, `docs/defense_qa_pack.md`, `docs/live_demo_fallback_script.md`, `docs/demo/*.png` |
| Data provenance and limitations | `docs/data_dictionary.md`, `docs/data_provenance_audit.md`, `docs/source_citation_appendix.md`, `docs/time_data_quality_audit.md`, `docs/evidence_coverage_matrix.md`, `docs/uncertainty_proxy_confidence_playbook.md`, `docs/final_evidence_verification_queue.md` |
| Final QA | `docs/final_qa_checklist.md`, `docs/final_submission_packaging_checklist.md`, `docs/final_submission_readiness_scorecard.md`, this manifest |

### Recommended but not blocking

- `docs/demo/online-demo-qr.png`, if the GitHub Pages demo is available.
- Top-60 and all-paper manual annotation templates, if the final zip is meant to help teammates continue evidence review rather than only submit the finished page/report.
- Module-specific CSV appendices such as venue, topic, citation, network, and lifecycle case packets when they are referenced by the report or PPT.

### Exclude from the final archive

Do not include these in the coursework zip:

- `.git/` and any GitHub credential/config artifacts.
- `.DS_Store`, `__pycache__/`, `.pytest_cache/`, browser screenshots outside `docs/demo/`, and temporary logs.
- Old zip files or nested submission archives.
- `*_local_only/`, private backups, scratch caches, or unreviewed local notes.
- Any file containing private process language rather than teammate-facing project language.

## How to validate the manifest

Run this from repo root before packaging:

```bash
python3 - <<'PY'
import csv, pathlib, sys
root = pathlib.Path('.')
manifest = root / 'docs/final_archive_file_manifest.csv'
missing = []
rows = list(csv.DictReader(manifest.open(encoding='utf-8')))
for row in rows:
    if row['required'] == 'yes' and not (root / row['path']).exists():
        missing.append(row['path'])
print(f'manifest rows: {len(rows)}')
print(f'missing required files: {len(missing)}')
for path in missing:
    print(f'  MISSING {path}')
if missing:
    sys.exit(1)
PY
```

Then run the normal page/data checks from `docs/final_qa_checklist.md`:

```bash
node --check src/app.js
git diff --check
```

If the page or screenshots changed, also run the local HTTP and presentation-mode browser check before creating the zip.

## Packaging decision checklist

Use this short decision table after validation:

| Status | Decision |
|---|---|
| Required manifest paths all exist, `node --check` passes, `git diff --check` passes, README screenshots exist | Archive is structurally ready. |
| Optional QR or manual templates missing | Still packageable if the final submission does not promise those optional materials. |
| Any required data CSV missing | Do not package; the D3 page or report evidence may break. |
| Any required screenshot missing | Either regenerate screenshots or remove the README/PPT reference before packaging. |
| Private/local-only files found in archive inspection | Rebuild the zip with exclusions before sharing. |

## Remaining human-owned checks

Refs #2: this manifest supports A's final integration work but does not replace final human review. Before the real submission, A still needs to:

- Open the local page and confirm the screenshots match the current UI.
- Confirm final report/PPT only cite evidence files that are included in the archive.
- Run archive inspection with Python `zipfile` after the zip is created.
- Keep #2 open until the team finishes final upload readiness.
