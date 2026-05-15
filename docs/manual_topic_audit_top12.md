# Top 12 manual topic audit

Purpose: give D / Topic Evolution a report-ready audit of the Top 12 representative papers before final report and slides. The audit compares the current automatic/API topic label with the proposed human-readable topic label in `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`.

Related issues: Refs #5 and #59. This is a topic-label handoff, not a substitute for reading the final DOI/ACM/IEEE/PDF evidence before submission.

## Summary

| Audit result | Count | Meaning for report/PPT |
|---|---:|---|
| aligned | 7 | API label is broadly usable, while the manual label gives a more specific display phrase. |
| corrected | 4 | API label is visibly misleading for the representative case; use the manual label in report/PPT. |
| needs review | 1 | Manual label is plausible, but source/match verification should happen before using the case prominently. |

Main grading value: this turns Topic Evolution from a raw metadata chart into a defensible annotation workflow. The team can explicitly say that automatic topic labels were checked for representative papers, and that misleading labels were corrected before being used as evidence.

## Corrected cases to mention in methods or limitations

| Paper | API topic | Use instead | Why it matters |
|---|---|---|---|
| DBSCAN | Computer Vision | Data Mining / Clustering | Prevents the strongest clustering case from inflating a vision interpretation. |
| Probabilistic Models of Indexing and Searching | Natural Language Processing | Information Retrieval / Probabilistic Models | Keeps a SIGIR retrieval-theory paper in the IR framing. |
| AODV routing | Human-Computer Interaction | Networking / Mobile Ad Hoc Routing | Shows a clear API-topic mismatch and supports the manual-audit rationale. |
| Network Information Flow | Machine Learning Theory | Information Theory / Network Coding | Keeps a theory/network-coding case out of an overly broad ML-theory bucket. |

## One case requiring final verification

`Multitasking without compromise: a virtual machine evolution` should stay marked `needs review` until the ACM/OOPSLA page and award source are checked. The proposed manual topic, `Programming Languages / Virtual Machines`, is consistent with the title and venue, but the existing evidence notes already flag a match-verification risk. Use it only as a backup representative case unless the human check is completed.

## Recommended report wording

> Topic labels in the dashboard come from public metadata and rule-based normalization, so the final representative-paper discussion uses an additional manual audit for the Top 12 evidence cards. This audit corrected several visible mismatches, such as DBSCAN being better described as Data Mining / Clustering rather than Computer Vision, and AODV being better described as Networking / Mobile Ad Hoc Routing rather than Human-Computer Interaction. Therefore, topic-level charts should be read as dataset-level structure, while representative cases use manually checked labels and evidence links.

## D-owner final checklist

- [ ] Use `docs/manual_topic_audit_top12.csv` when selecting Topic Evolution examples for report/PPT.
- [ ] Prefer the four corrected cases when explaining why manual annotation is necessary.
- [ ] Do not use `Multitasking without compromise` as a main Topic slide case until the ACM/OOPSLA evidence check is complete.
- [ ] If a final chart or paragraph uses aggregate topic statistics, include the boundary that API labels can be noisy and representative papers were manually audited.
- [ ] Before final submission, open the DOI/ACM/IEEE/PDF links for every paper used in a spoken or written claim.

## Machine-readable audit file

See `docs/manual_topic_audit_top12.csv` for row-level fields:

- `paper_id`, `title`, `venue`, `year`
- `api_topic`, `proposed_manual_topic`
- `topic_audit_status`: `aligned`, `corrected`, or `needs review`
- `topic_confidence`
- `why_this_label`
- `safe_wording_boundary`
- `human_check_next_step`
