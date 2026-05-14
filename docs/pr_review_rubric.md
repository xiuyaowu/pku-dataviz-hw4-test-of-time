# PR review rubric and merge standard

Purpose: give every teammate a clear self-check before opening a Pull Request, and give A a consistent review standard that is about project quality rather than personal preference.

## 1. Minimum standard to merge

A teammate PR is ready to merge when all required checks below are satisfied.

| Check area | Minimum requirement | Evidence to include in PR |
|---|---|---|
| Issue linkage | PR references the relevant owner issue (#2-#7) and any stretch issue. | `Refs #N` or `Closes #N` only for narrow completed stretch issues; do not close #2-#7. |
| Data source | Any new data or claim names the source file and field. | Data file path, fields used, and source/provenance note. |
| Chart correctness | Chart encodings match the documented metric definitions. | Screenshot or short note explaining axes, units, filters, and selected default state. |
| Running check | Existing page still runs after the change. | `node --check src/app.js` if JS changed; local `index.html` check if page/CSS changed. |
| Wording safety | Claims avoid unsupported causality and official-award interpretation. | Use safe terms: “OpenAlex proxy”, “sampled citation breadth”, “metadata-based pattern”, “needs human evidence check” where relevant. |
| Report linkage | The change produces at least one report/demo-usable sentence, finding, or visual improvement. | Add or update a handoff doc, report skeleton row, caption, reading note, or PR summary finding. |
| File hygiene | No local paths, cache files, `.DS_Store`, old zips, or unrelated generated files. | `git diff --check`; PR file list is scoped to the task. |

## 2. Nice-to-have standard

These are not blockers for every PR, but they make the project stronger for grading and presentation.

- Add a compact screenshot or describe the exact viewport/section checked.
- Add one “boundary” sentence beside each analytical claim: what the chart can show, and what it cannot prove.
- If a representative paper is used, link to DOI / ACM / IEEE / PDF / award citation where possible.
- If a metric is non-obvious, add or link a definition from `docs/data_dictionary.md`, `docs/data_readiness_matrix.md`, or the relevant handoff doc.
- If the PR changes wording visible on the page, keep terminology consistent: Test of Time, recognition lag, citation depth, impact breadth, venue area, same-field benchmark.
- If the PR improves a module, add a report-ready sentence in the matching handoff/report file so the work is not trapped only in code.

## 3. Review sequence for A

1. Confirm the PR links the correct issue and does not accidentally close #2-#7.
2. Read the changed file list; ask for scope reduction if unrelated modules are mixed together.
3. Check data fields and metric definitions against `docs/data_dictionary.md` or the relevant CSV header.
4. Run the relevant verification command:
   - JS changed: `node --check src/app.js`
   - Page/CSS changed: local static server + browser/Playwright check when practical
   - CSV/docs claims changed: small Python CSV/header/row-count validation when practical
5. Review wording for safe claims and consistent terms.
6. Confirm the PR leaves a trace useful for the final report, presentation, or QA checklist.
7. Merge only after required checks are satisfied, then confirm `main` still points to a runnable version.

## 4. Neutral PR review comment template

```text
Thanks, this is aligned with the module direction. Before merge, please confirm:

- [ ] The PR references the relevant issue and does not close the owner container issue (#2-#7).
- [ ] Data files/fields used by the chart or claim are named in the PR body.
- [ ] If JS changed, `node --check src/app.js` passes.
- [ ] If page/CSS changed, the module was checked locally at `http://127.0.0.1:8765/index.html`.
- [ ] The main finding is written in report-ready wording, with a short limitation/boundary note.
- [ ] No `.DS_Store`, cache files, local paths, or unrelated generated files are included.

After these are checked, this can be merged into the shared baseline.
```

## 5. Safe wording reminders

Use careful wording when the evidence comes from public metadata:

- Prefer: “In this dataset, papers with higher sampled breadth tend to appear across more fields/countries.”
- Avoid: “These papers won because they influenced more fields.”
- Prefer: “OpenAlex citation breadth is an approximate proxy based on sampled citing works.”
- Avoid: “This is the complete citation network.”
- Prefer: “This representative paper is useful for presentation after checking the evidence URL.”
- Avoid: “This paper definitely caused industry adoption” unless a teammate adds explicit supporting evidence.

## 6. Where this rubric is used

- `docs/work_board.md`: PR merge standard for A and teammate owners.
- `docs/final_qa_checklist.md`: final collaboration and review audit.
- `.github/pull_request_template.md`: teammate self-check before opening PR.
- `docs/report/contribution_A.md`: evidence that A’s review work was systematic and verifiable.
