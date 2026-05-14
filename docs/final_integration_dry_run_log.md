# Final integration dry-run log

Purpose: record one full local run-through before final coursework packaging. This is an A / integration-lead evidence artifact under issue #53 and supports the open A container issue #2.

## Run metadata

| Field | Value |
|---|---|
| Date | 2026-05-14 19:57:50 CST |
| Branch / commit checked | `main` / `54c07f9` (`docs: add metric glossary explainer (#79)`) |
| Local path | `/tmp/pku_hw4_repo` symlink to the teammate collaboration repo |
| Demo route | `http://127.0.0.1:8765/index.html?present=1` |
| Result | PASS with remaining human evidence/rehearsal checks listed below |

## Commands and results

| Check | Command | Result |
|---|---|---|
| Clean main / latest remote | `git checkout main && git pull --ff-only origin main` | PASS: already up to date |
| JavaScript syntax | `node --check src/app.js` | PASS: no syntax errors |
| Static server | `python3 -m http.server 8765 --bind 127.0.0.1` | PASS: server started locally |
| Homepage HTTP | `curl -I http://127.0.0.1:8765/index.html` | PASS: `HTTP/1.0 200 OK`, `Content-Length: 13197` |
| Presentation mode DOM | Playwright open `index.html?present=1`, assert `body.presentation-mode` | PASS |
| Major sections | Playwright selectors for `#time`, `#venue`, `#topic`, `#citation`, `#explorer`, `#benchmark`, `#storyboard`, `#glossary`, `#network` | PASS: all 9 sections present |
| Key UI counts | Playwright counts summary cards, claim cards, glossary cards | PASS: 4 summary cards, 10 claim cards, 6 glossary cards |
| Console / page errors | Playwright console and `pageerror` listeners | PASS: no JavaScript page errors |
| Core data row counts | Python `csv.DictReader` over core `data/*.csv` files | PASS: row counts listed below |
| Archive exclusion scan | Python recursive scan excluding `.git` | PASS: no `.DS_Store`, `__pycache__`, or `.zip` in repo tree |
| Whitespace diff check | `git diff --check` | PASS before writing this log |

## Core data row counts from this run

| File | Rows |
|---|---:|
| `data/papers_enriched.csv` | 250 |
| `data/award_timeline.csv` | 250 |
| `data/recognition_lag_distribution.csv` | 6 |
| `data/venue_stats.csv` | 27 |
| `data/venue_area_stats.csv` | 16 |
| `data/topic_stats.csv` | 22 |
| `data/topic_year_stats.csv` | 147 |
| `data/citation_trajectories.csv` | 3077 |
| `data/citing_breadth_metrics.csv` | 250 |
| `data/institution_stats.csv` | 169 |
| `data/country_stats.csv` | 23 |

## Presentation-mode section checklist

- PASS · Time: recognition lag and timeline containers exist; report claim cards are present.
- PASS · Venue & Field: venue, area, and decade heatmap sections exist.
- PASS · Topic Evolution: distribution, evolution, and representative-paper section exist.
- PASS · Citation & Recognition: scatter, trajectory, and breadth sections exist.
- PASS · Paper Explorer: explorer controls/list/chart section exists.
- PASS · Benchmark Lab: percentile comparison and interpretation lens section exists.
- PASS · Story Builder: narrative board section exists.
- PASS · Glossary: 6 metric/safe-wording cards exist for Q&A.
- PASS · Network: institution/country diffusion section exists.

## Archive readiness notes

Current scan found no generated archive blockers in the repo tree:

- `.DS_Store`: none found
- `__pycache__`: none found
- `.zip`: none found

Final archive should still exclude `.git`, any old local-only backup folders, and any new screenshots/zips generated after this log. Use `docs/final_submission_packaging_checklist.md` for the actual packaging command and `zipfile` inspection before submission.

## Remaining teammate-owned checks

Keep #2-#7 open until Jiatao explicitly closes the workstreams. This dry run confirms the current baseline runs, but the final submission still needs human checks:

- B / #3 Time: verify 2-3 selected recognition-lag case descriptions against award citations and confirm dense / median / long-tail screenshots are readable in the PPT.
- C / #4 Venue and Field: avoid treating venue counts as official venue rankings; manually check 2-3 representative venue-year cases before final report wording.
- D / #5 Topic Evolution: use `docs/manual_topic_audit_top12.md` labels for representative papers and manually verify evidence URLs for final topic/contribution wording.
- E / #6 Citation and Impact: keep citation depth, trajectory shape, and impact breadth separated; use proxy-only wording unless evidence cards support stronger claims.
- F / #7 Network / Visual / Presentation: copy presentation blueprint material into actual slides, rehearse live-demo fallback, and confirm projector crop/readability.
- A / #2 Integration: rerun this dry-run checklist after all teammate PRs are merged and before making the final archive.

## Safe wording for report / defense

This dry run supports a narrow claim: the current repository has a runnable D3 page, complete local data files, presentation-mode route, and linked documentation for report/PPT preparation. It does not mean every paper-level contribution claim has been manually verified. Any industrial impact, foundational-status, or award-reason statement still needs evidence-card or award-citation review before the final report.
