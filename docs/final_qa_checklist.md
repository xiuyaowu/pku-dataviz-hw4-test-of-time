# 最终提交 QA 清单

负责人：A · 项目负责人 / 初版网页实现 / GitHub 协作与代码整合

## 1. GitHub 协作检查

- [x] GitHub repo 已建立。
- [x] `main` 已配置 PR-based 协作规则。
- [x] Issues #2–#7 已创建，覆盖六个成员/模块。
- [x] `docs/work_board.md` 已维护 issue 对照表。
- [x] PR 模板已添加：`.github/pull_request_template.md`。
- [x] PR review rubric 已添加：`docs/pr_review_rubric.md`，包含 minimum to merge、nice-to-have 和中性 review comment 模板。
- [x] Contribution evidence ledger 已添加：`docs/contribution_evidence_ledger.md`，把 A-F owner、核心文件、展示/报告位置和最终人工检查项对应起来。
- [ ] 队友 PR 均已 review / approve / merge。
- [ ] 每个成员的贡献记录已写入报告或展示材料。

## 2. 页面运行检查

本地运行：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

浏览器打开：

```text
http://127.0.0.1:8765/index.html
```

检查项：

- [x] `index.html` 能正常打开。
- [x] CSV 数据均使用相对路径加载。
- [x] `src/app.js` 通过语法检查。
- [x] 页面无 `Data loading failed`。
- [x] 浏览器 console 无 JavaScript error。
- [x] summary cards 正常渲染。
- [x] Time / Venue / Topic / Citation / Explorer / Benchmark / Network 模块均有图表或交互组件。
- [x] Glossary 区已加入页面导航和正文，可快速解释 recognition lag / citation depth / impact breadth / OpenAlex proxy 等术语。
- [x] Explorer 的 search / sort / field filter / paper list 正常工作。
- [x] Benchmark Lab 的 percentile bars / interpretation lens / same-field peers 正常工作。
- [x] B-F 主要模块末尾有 report claim cards，可复制为最终报告发现。
- [ ] 最终提交前用 presentation mode 备份关键页面截图：`http://127.0.0.1:8765/index.html?present=1`，或进入页面后按 `P`。

## 3. 内容质量检查

- [x] 页面围绕同一个核心问题展开：哪些计算机研究经得起时间检验。
- [x] 每个模块都有研究问题和 reading note。
- [x] 图表按 Time → Venue/Field → Topic → Citation/Impact → Explorer → Benchmark → Network 组织，避免孤立堆叠。
- [x] 数据来源和指标局限在 README/footer 中有说明。
- [ ] 队友补充后的发现需要避免过度因果解释。
- [x] `docs/report/report_skeleton.md` 已有每个模块的 draft findings matrix：2-3 条发现、至少 1 个代表案例、1 条限制说明。
- [x] `docs/story_builder_board.md` 已将 Time / Venue / Topic / Citation / Explorer / Benchmark / Network 串成 10 条 report-ready claim，并为每条 claim 标出 evidence source、owner issue、safe wording boundary 和最终人工检查项。
- [x] `docs/award_lifecycle_analysis.md` 已补充获奖年前后 citation-window 指标、相对获奖年汇总表和非因果表述边界，可作为 B Time 与 E Citation 的连接材料。
- [x] `docs/venue_field_handoff.md` 已补齐 C 模块的 venue / area 核心统计、field × decade 读法、代表论文候选和避免过度解释的写作边界；`docs/venue_field_imbalance_caveats.md` 已补齐 Issue #57 的 Top venue / field 集中度解释、3 条 safe explanation bullets 和 copy-ready caveat paragraph，可作为 Issue #4 的阶段性验收材料。
- [x] `docs/venue_year_case_studies.md` / `.csv` 已补齐 Issue #58 的 Venue-year mini case studies，覆盖 SIGCOMM 1988、SIGIR 1999、ICCV 1999、SIGMOD 1996、NSDI 2005；最终报告使用前仍需人工核查选中案例的 award citation / 贡献表述。
- [x] `docs/topic_evolution_handoff.md` 已补齐 D 模块的 Top topics、decade-level 主题迁移、代表论文人工 topic 修正、展示话术和 topic label 边界，可作为 Issue #5 的阶段性验收材料；`docs/manual_topic_audit_top12.md` / `.csv` 已补齐 Issue #59 的 Top 12 API topic vs manual topic audit；`docs/topic_shift_narrative.md` / `.csv` 已补齐 Issue #60 的 decade-level topic-shift narrative、代表论文候选和安全写作边界。
- [x] `docs/citation_impact_handoff.md` 已补齐 E 模块的 citation depth / trajectory / impact breadth 统计、四象限代表案例、展示话术和 OpenAlex proxy 边界，可作为 Issue #6 的验收材料。
- [x] `docs/citation_trajectory_archetypes.md` / `.csv` 已补齐 Issue #61 的 citation trajectory archetype 候选表，最终报告使用前仍需人工核查选中案例的 evidence URL。
- [x] `docs/recognition_lag_outlier_cases.md` / `.csv` 已补齐 Issue #55 的 Time outlier cases，覆盖 short / typical / long lag、展示话术和 safe wording；`docs/time_micro_annotations.md` 已补齐 Issue #56 的 Time 截图微注释、dense / median / long-tail 讲法和限制边界；最终报告使用前仍需人工核查 2-3 个选中案例的 award citation。
- [x] `docs/data_provenance_audit.md` 已统一 award seed / public metadata / derived metrics / manual annotation 的来源边界。
- [x] `docs/data_readiness_matrix.md` 已列出核心数据文件、行数、模块用途、必备字段和提交前验证命令。
- [x] citation depth、impact breadth、institution/country counts 已在 data dictionary、methods 和 report skeleton 中写成近似指标而非官方评价。
- [ ] B-F 已人工核查各自模块的代表案例、贡献解释和 evidence URL。
- [ ] `docs/quality_upgrade_plan.md` 中的模块级优化目标已检查。
- [ ] 如时间允许，`docs/stretch_backlog.md` 中 P0 增强板块已认领或明确暂缓。
- [x] `docs/evidence_cards_top12.md` 中 Top 12 代表论文均有 DOI/论文页/辅助证据链接；`docs/evidence_card_presentation_matrix.md` 已标出 8 张展示优先卡和 4 张需人工复核备选卡。
- [x] `docs/impact_breadth_evidence_audit.md` 已将 Top 12 impact breadth 案例分为 `safe to say` / `proxy only` / `needs human evidence`，并给出可复制的安全表述。
- [x] `docs/evidence_coverage_matrix.md` / `.csv` 已把 B-F 模块证据和 Top 12 代表论文覆盖状态分级，标出 final human check、proxy-only 和展示前需补的 gap。
- [ ] 最终展示前由队友核查关键论断与 award citation，尤其是未列入展示优先组的备选卡。
- [ ] `docs/methods_and_limitations.md` 已压缩进最终报告或展示。
- [x] `docs/presentation_pack.md` 已补齐展示结构；`docs/final_presentation_blueprint.md` 已提供 11 页 PPT 蓝图、speaker notes、截图 fallback 和角色发言边界。最终 PPT 导出仍需人工复制到 slides。
- [x] `docs/defense_qa_pack.md` 已补齐答辩问答准备，覆盖数据来源、proxy 指标、人工核查、因果边界、分工贡献和 live demo fallback。
- [x] `docs/slide_visual_consistency_audit.md` 已列出所有 `docs/demo/*.png` 的 slide purpose、owner、尺寸、裁剪/框架规则和 safe wording boundary，可作为 F 的最终视觉一致性检查。
- [x] `docs/live_demo_fallback_script.md` 已补齐 live demo 失败时的 2 分钟截图路线、speaker/claim 映射、等价性说明和 F owner 现场检查项。
- [x] `docs/final_submission_packaging_checklist.md` 已补齐最终打包流程、压缩包结构、archive inspection 命令和在线/离线展示 fallback。
- [x] `docs/final_integration_dry_run_log.md` 已记录一次完整本地 dry run：clean main、HTTP 200、presentation mode、DOM section checks、核心数据行数和 archive exclusion scan。
- [x] `docs/network_visual_presentation_handoff.md` 已补齐 F 模块的 Network findings、展示话术、截图映射和视觉 QA，可作为 Issue #7 的验收材料。
- [ ] `docs/grading_rubric_full_score_mapping.md` 中的评分点覆盖表已逐项确认。
- [x] 报告骨架中术语已统一：recognition lag / citation depth / impact breadth / same-field benchmark / OpenAlex proxy。
- [x] `docs/glossary_metric_explainer.md` 已补齐至少 8 个关键术语、proxy 指标安全说法和展示/报告用词替代表。
- [ ] 最终报告和展示讲稿中术语一致：recognition lag / citation depth / impact breadth。
- [ ] 手工补充的工业影响/代表性判断必须有 evidence URL。

## 4. 提交前文件检查

- [ ] 无 `.DS_Store`。
- [ ] 无 `__pycache__` / 临时缓存。
- [ ] 无本地绝对路径。
- [ ] README、本地运行方式、分工表保持同步。
- [ ] `docs/contribution_evidence_ledger.md` 已按最终 PR / 文件状态更新，并能支撑报告贡献说明。
- [ ] 最终提交前重新运行并更新 `docs/final_integration_dry_run_log.md`，确认所有队友 PR 合并后的页面和数据仍然通过检查。
- [ ] 提交前按 `docs/data_readiness_matrix.md` 重新运行数据就绪验证，确认核心 CSV 和 manual annotation 模板行数/字段未被误改。
- [ ] 按 `docs/final_submission_packaging_checklist.md` 检查最终 zip，确认必需文件存在且无 `.git` / `.DS_Store` / `__pycache__`。
- [ ] `main` 是最终可提交版本。

- [ ] `docs/stretch_issue_assignment_board.md` 已用于确认 A-F 每个 owner 至少有一个核心 issue 和一个 stretch issue 可做。
