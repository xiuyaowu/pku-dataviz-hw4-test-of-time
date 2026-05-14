# F 模块交付：Network / Visual / Presentation

用途：给 F 同学和最终整合者一份可直接用于报告、PPT 和现场 demo 的交付说明。内容基于当前仓库中的 `data/institution_stats.csv`、`data/country_stats.csv`、`data/papers_enriched.csv` 和已生成页面截图。

## 1. Network 模块可写 findings

| 类型 | 可写结论 | 数据证据 | 报告边界 |
|---|---|---|---|
| Finding 1 | 长期影响论文在少数高频研究机构中高度可见，但不是单一机构垄断。 | `institution_stats.csv` 共 169 个机构节点；Top 4 为 UC Berkeley 17、CMU 15、Stanford 14、MIT 11；Top 10 机构约占机构 mention 的 29.0%。 | 机构字段来自 OpenAlex 元数据，存在缺失、归并和署名误差，不能写成完整机构排名。 |
| Finding 2 | 国家/地区层面呈现明显的美国集中，同时仍能看到加拿大、英国、德国等节点。 | `country_stats.csv` 共 23 个国家/地区；US 170、CA 20、GB 16、DE 11、IL 5；Top 10 国家/地区约占 country mention 的 93.0%。 | country 统计基于作者机构元数据，不代表所有作者贡献比例，也不是国家科研实力排名。 |
| Finding 3 | 大学与工业研究机构共同出现，适合解释 CS 长期影响的产学研混合生态。 | Top institutions 同时包含 UC Berkeley、CMU、Stanford、MIT、Cornell、UMass Amherst 和 IBM Research - Almaden / IBM 等。 | 是否产生工业落地影响需要单篇 evidence URL 支撑，不能只靠机构名推断。 |

推荐报告段落：

> Impact Network 模块把长期影响从单篇论文扩展到研究生态层面。当前数据中，UC Berkeley、CMU、Stanford、MIT 等大学，以及 IBM Research 等工业研究机构都出现在高频机构中，说明长期影响论文常常由稳定研究共同体持续沉淀。国家/地区分布以美国为主，同时也能看到加拿大、英国、德国等节点。由于机构和国家字段依赖 OpenAlex 元数据，这些结果应解释为当前数据集中的可见结构，而不是完整合作网络或机构排名。

## 2. Network 模块现场展示话术

60–70 秒版本：

1. 先指向 Network KPI cards：说明这里从“论文影响”切换到“研究生态”。
2. 指向 institution ranking：强调 Berkeley、CMU、Stanford、MIT 等高频机构代表稳定学术共同体。
3. 指向 country/region ranking：说明美国高度可见，但并非唯一节点，CA / GB / DE 等也有分布。
4. 用一句限制收束：这些是 metadata 可见分布，不是完整合作网络，也不能直接解释为获奖原因。
5. 回到结论：长期影响通常既有时间沉淀，也有跨机构、跨地区的共同体扩散。

可直接读的收束句：

> 因此，Test of Time 论文的长期影响不只体现在引用数字里，也体现在稳定研究机构、工业实验室和跨地区共同体对这些工作的持续吸收中；但这个模块的结论必须保留 metadata coverage 的边界。

## 3. 最终展示截图对应表

| 展示环节 | 推荐截图 / 页面位置 | 讲解重点 | 负责人 |
|---|---|---|---|
| Opening | `docs/demo/homepage-overview.png` | 数据规模、研究问题、整体路径 | A |
| Time | `docs/demo/time-and-timeline.png` | recognition lag 与延迟确认 | B |
| Venue / Field | `docs/demo/venue-and-field.png` | 学术共同体和 award history 边界 | C |
| Topic Evolution | `docs/demo/topic-evolution.png` | 主题迁移和代表论文 | D |
| Citation / Impact | `docs/demo/citation-and-impact.png` | citation depth vs impact breadth | E |
| Explorer | `docs/demo/explorer-evidence-index.png` | 从总体模式回到可检索案例 | A / D |
| Benchmark Lab | `docs/demo/benchmark-lab.png` | 单篇论文 percentile 与同领域比较 | A / E |
| Network | `docs/demo/network-diffusion.png` | 机构、国家/地区和研究生态扩散 | F |
| Methods / Limitations | `docs/methods_and_limitations.md` | 数据来源、proxy 指标和不能推出的结论 | A / F |
| Conclusion | 现场回到页面顶部或 summary slide | 延迟确认、跨领域扩散、共同体沉淀 | A |

## 4. 视觉 QA 记录

当前仓库已具备下列统一项，最终提交前只需复核截图是否为最新版本。完整截图清单、尺寸、PPT 裁剪规则和安全表述边界见 `docs/slide_visual_consistency_audit.md`：

- README 中的 demo image table 覆盖 homepage、Time、Venue、Topic、Citation、Explorer、Benchmark、Network。
- Presentation mode 已支持 `index.html?present=1` 和键盘 `P`，适合课堂投影。
- Live demo 失败时按 `docs/live_demo_fallback_script.md` 切换到截图路线，F 负责提前确认截图可读、顺序正确、PPT 备用页可打开。
- 页面模块顺序和报告骨架一致：Opening → Time → Venue → Topic → Citation → Explorer → Benchmark → Network → Conclusion。
- `src/app.js` 中 B-F 模块底部已有 claim cards，可把 `Finding / Evidence / Boundary` 直接迁移到报告。
- 术语已统一为 recognition lag、citation depth、impact breadth、same-field benchmark、OpenAlex proxy。

最终提交前建议 F 做一次人工视觉巡检：

- [ ] Network 截图是否来自 presentation mode。
- [ ] Tooltip、caption 和 reading note 是否没有遮挡。
- [ ] 所有截图分辨率适合 16:9 PPT。
- [ ] PPT 中不要把 institution / country 数量写成排名或因果解释。
- [ ] Methods / limitations 页明确提到 OpenAlex metadata coverage。

## 5. Issue #7 验收映射

| Issue #7 要求 | 当前仓库证据 |
|---|---|
| 总结 Top institutions 和 Top countries/regions | 本文第 1 节；`docs/report/report_skeleton.md` 4.7；页面 `#network` claim cards |
| 解释机构缺失、OpenAlex 归属、覆盖偏差 | 本文第 1、2、4 节；`docs/methods_and_limitations.md`；`docs/data_provenance_audit.md` |
| 全站视觉 QA | 本文第 4 节；`docs/final_qa_checklist.md`；README demo screenshots |
| 准备 PPT / demo flow | 本文第 2、3 节；`docs/presentation_pack.md`；`docs/final_presentation_blueprint.md` |
| 每个模块 1 张最终展示截图或演示位置 | 本文第 3 节 |

剩余人工项：最终 PPT 需要把这里的内容复制到 slides，并在展示前人工打开页面做一次 rehearsal。