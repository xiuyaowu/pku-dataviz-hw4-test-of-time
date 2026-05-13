# Feature Iteration System：持续提 feature、开 Issue、完成、合并

用途：把“继续卷”变成可执行循环，而不是临时想到什么做什么。每一轮只挑最高收益的 feature，先写成 GitHub Issue，再用 PR 完成并验证。

## 循环规则

每一轮按 5 步走：

1. **发现机会**：从评分标准、展示效果、报告可写性、队友减负四个角度找缺口。
2. **写成 Issue**：每个 feature 必须有目标、改动文件、验收标准、展示/报告价值。
3. **分配 owner**：能落到 B-F 模块的交给对应成员；跨模块、工程底座、最终整合归 A。
4. **PR 完成**：一个 feature 一个分支，一个 PR；PR body 写清验证方式。
5. **回填文档**：合并后更新 `README.md`、`docs/work_board.md`、`docs/report/contribution_A.md` 或对应模块任务卡。

## Feature 评价标准

优先做同时满足以下条件的功能：

- 能让网页看起来更像完整项目，而不是几张图拼起来；
- 能产生报告里可写的发现、案例或限制；
- 能让展示现场有可操作的交互；
- 不会大幅增加队友 merge 冲突；
- 1 个 PR 内可以验证完。

## 当前已完成的高收益 feature

| Feature | 价值 | 对应页面 / 文档 |
|---|---|---|
| Demo 截图入口 | 未运行代码也能快速看到成果 | `README.md`, `docs/demo/*` |
| Field × Decade Heatmap | C 模块从静态分布升级为年代结构解释 | `#venue` |
| Citation Quadrants | E 模块能讲 depth/breadth 的四象限解释 | `#citation` |
| Paper Explorer | 250 篇论文变成可检索证据库 | `#explorer` |
| Benchmark Lab | 单篇论文可做 percentile 案例解释 | `#benchmark` |
| Story Builder | 把每个模块转成“问题-证据-so what-owner”的报告展示主线 | `#storyboard` |
| Network KPIs | F 模块开头有机构/国家总结卡 | `#network` |
| Methods & Limitations | 避免把 proxy 指标写成因果结论 | `docs/methods_and_limitations.md` |
| Presentation Pack | 展示脚本、备选问答、收尾总结可直接用 | `docs/presentation_pack.md` |

## 下一批已开 Issue 的候选 feature

| Issue | Feature | Owner 建议 | 目标 |
|---|---|---|---|
| [#23](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/23) | Module Claim Cards | B-F 各自模块，A review | 每个模块补发现、代表案例、限制卡 |
| [#24](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/24) | Evidence URL Completion | D + E | 至少 12 篇代表论文补来源链接 |
| [#25](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/25) | Presentation Mode Polish | F + A | 投影可读性、截图和展示包升级 |
| [#26](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/26) | Final Report Findings Matrix | A | 把报告骨架填成可扩写半成品 |
| [#27](https://github.com/leejamesss/pku-dataviz-hw4-test-of-time/issues/27) | Data Provenance Audit | A + 各模块 | 统一数据来源、proxy 指标和限制口径 |

### 1. Module Claim Cards

- **Owner**：B-F 各自模块；A review。
- **目标**：每个模块底部增加 2-3 张 claim card：发现、代表案例、限制。
- **验收**：每张卡都有一句能进报告的 conclusion；不只写图表描述。

### 2. Evidence URL Completion

- **Owner**：D + E。
- **目标**：补齐 Top representative papers 的 evidence URL / DOI / award page。
- **验收**：至少 12 篇代表论文有可追溯来源，报告引用不悬空。

### 3. Presentation Mode Polish

- **Owner**：F + A。
- **目标**：增加适合课堂投影的视觉细节：更大标题、截图检查、移动端/投影比例 QA。
- **验收**：README demo 截图更新；本地页面无横向溢出；关键卡片可读。

### 4. Final Report Findings Matrix

- **Owner**：A。
- **目标**：在 `docs/report/report_skeleton.md` 中回填每个模块的发现、案例、限制。
- **验收**：最终报告不是空骨架，而是可以直接扩写的半成品。

### 5. Data Provenance Audit

- **Owner**：A + 各模块。
- **目标**：检查所有数据文件和指标解释，统一 OpenAlex / award records / manual annotations 的口径。
- **验收**：`docs/data_dictionary.md` 和 `docs/methods_and_limitations.md` 一致；报告限制说明可直接引用。

## Issue 模板

```md
## Goal
这个 feature 要解决什么展示/报告问题？

## Why it matters for full score
它如何提高完整性、交互性、分析深度或可解释性？

## Files to touch
- `index.html`
- `src/app.js`
- `src/styles.css`
- `docs/...`

## Acceptance criteria
- [ ] 页面或文档有可见交付
- [ ] 至少产出 1 条可写进报告的 finding
- [ ] 说明数据/方法限制
- [ ] `node --check src/app.js` 通过（如改 JS）
- [ ] 本地静态服务器检查通过（如改页面）
```

## A 的执行口径

A 可以不断重复这个循环：先找当前最高收益 feature，再开 Issue，再完成 PR，再把变化回填到协作文档。这样 A 的贡献不是“催进度”，而是持续把项目从 baseline 推到更完整、更可展示、更可评分的版本。
