# 最终提交 QA 清单

负责人：A · 项目负责人 / 初版网页实现 / GitHub 协作与代码整合

## 1. GitHub 协作检查

- [x] GitHub repo 已建立。
- [x] `main` 已配置 PR-based 协作规则。
- [x] Issues #2–#7 已创建，覆盖六个成员/模块。
- [x] `docs/work_board.md` 已维护 issue 对照表。
- [x] PR 模板已添加：`.github/pull_request_template.md`。
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
- [x] `docs/data_provenance_audit.md` 已统一 award seed / public metadata / derived metrics / manual annotation 的来源边界。
- [x] citation depth、impact breadth、institution/country counts 已在 data dictionary、methods 和 report skeleton 中写成近似指标而非官方评价。
- [ ] B-F 已人工核查各自模块的代表案例、贡献解释和 evidence URL。
- [ ] `docs/quality_upgrade_plan.md` 中的模块级优化目标已检查。
- [ ] 如时间允许，`docs/stretch_backlog.md` 中 P0 增强板块已认领或明确暂缓。
- [ ] `docs/evidence_cards_top12.md` 中代表论文卡已由队友核查关键论断。
- [ ] `docs/methods_and_limitations.md` 已压缩进最终报告或展示。
- [ ] `docs/presentation_pack.md` 已转成 PPT 或口头展示分工。
- [ ] `docs/grading_rubric_full_score_mapping.md` 中的评分点覆盖表已逐项确认。
- [x] 报告骨架中术语已统一：recognition lag / citation depth / impact breadth / same-field benchmark / OpenAlex proxy。
- [ ] 最终报告和展示讲稿中术语一致：recognition lag / citation depth / impact breadth。
- [ ] 手工补充的工业影响/代表性判断必须有 evidence URL。

## 4. 提交前文件检查

- [ ] 无 `.DS_Store`。
- [ ] 无 `__pycache__` / 临时缓存。
- [ ] 无本地绝对路径。
- [ ] README、本地运行方式、分工表保持同步。
- [ ] `main` 是最终可提交版本。
