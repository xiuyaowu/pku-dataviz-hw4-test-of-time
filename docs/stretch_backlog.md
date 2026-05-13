# 额外增强 Backlog

用途：在 #2–#7 的基础任务之外，列出能显著提高完成度和展示观感的增强板块。它们作为每个人模块任务之外的加分项，在时间允许时推进。

## 优先级说明

- P0：强烈建议做，直接影响展示和评分感知。
- P1：有明显加分，但需要有人认领。
- P2：锦上添花，时间不够可以不做。

## Stretch 1 / GitHub Pages 在线部署与二维码

当前进展：已准备 `.nojekyll`、README 在线 demo 入口、`docs/qr_online_demo_handoff.md` 和 `docs/demo/online-demo-qr.png`。GitHub Pages 启用后检查线上页面。

优先级：P0

目标：让老师和同学不需要本地运行，也能直接打开完整交互页面。

交付：

- GitHub Pages 链接。
- README 顶部增加在线 demo 链接。
- 展示 PPT 放二维码。
- 本地和线上版本截图一致。

验收：

- 页面在线打开无数据加载错误。
- README 同时保留本地运行方式。
- 如果 GitHub Pages 路径导致相对路径问题，修好 `data/` 和 `src/` 引用。

## Stretch 2 / Evidence Cards：代表论文证据卡

当前进展：已更新 `docs/evidence_cards_top12.md` 和 `docs/evidence_cards_top12.csv`，12 张代表论文卡均包含论文 DOI/ACM/IEEE/PDF 等证据链接、一句话贡献和代表性理由。最终展示前需要队友打开链接核查 award citation 与 contribution wording。

优先级：P0

目标：把抽象统计结果落到具体论文案例，让展示更像研究分析。

交付：

- 8–12 张代表论文证据卡：标题、年份、venue、topic、citation、recognition lag、为什么经得起时间检验、evidence URL。
- 优先覆盖：最长 lag、高 citation、高 breadth、不同 topic、不同 venue。
- 可放在网页 detail card、报告附录或 PPT 中。

验收：

- 每张卡都有 evidence URL。
- 不夸大工业影响或奠基性影响。
- 至少 5 张卡能直接用于课堂展示。

## Stretch 3 / Methods & Limitations 页面或报告附录

当前进展：已生成 `docs/methods_and_limitations.md`，可直接压缩进报告或 PPT。

优先级：P0

目标：让项目显得可信、严谨，避免老师质疑数据来源和指标含义。

交付：

- 一页方法说明：数据来源、清洗流程、字段定义、指标计算。
- 一页限制说明：award history bias、OpenAlex coverage、missing affiliation、sampled breadth proxy、主题标签自动化误差。
- 可以放在报告，也可以在网页末尾增加 compact methodology section。

验收：

- recognition lag、citation depth、impact breadth 都有定义。
- 明确哪些结论不能推出。
- 与 `docs/data_dictionary.md` 和 `docs/grading_rubric_full_score_mapping.md` 一致。

## Stretch 4 / Interaction & Accessibility polish

优先级：P1

目标：让系统细节更像完成品，而不是课程 demo。

交付：

- SVG marks 支持 hover/focus 的一致反馈。
- 关键图表增加 legend / reference line / selected state 说明。
- 增加 `prefers-reduced-motion` 降低动效影响。
- 检查颜色对比和移动端/窄屏布局。

验收：

- 无 console error。
- 键盘 focus 不出现明显破图。
- 截图状态清晰，不依赖口头解释。

## Stretch 5 / Presentation Pack：最终展示包

当前进展：已生成 `docs/presentation_pack.md`，包含 8–10 分钟展示结构、slide outline、speaker checklist 和 backup assets。

优先级：P1

目标：把网页、报告和口头展示统一成一个故事。

交付：

- PPT 大纲或 slides 草稿。
- 每个模块一页：核心问题、图、发现、案例、限制。
- Opening / Conclusion 页。
- 备用截图：防止现场网络或页面加载问题。

验收：

- 8–10 分钟可以讲完。
- 每个人都知道自己讲哪一页。
- 结尾能回到核心问题，而不是只说“我们画了这些图”。

## Stretch 6 / Data Appendix：数据字典与可复现性补强

优先级：P2

目标：让项目在真实性和可复现性上更稳。

交付：

- 数据文件清单和 row counts。
- 每个派生字段的定义。
- API / public source 的引用说明。
- 如果有脚本，说明如何重新生成数据；如果没有，把当前静态数据的来源边界写清楚。

验收：

- 老师能看懂每个 CSV 用来做什么。
- 报告引用字段时不需要猜含义。

## 推荐执行顺序

1. GitHub Pages 在线部署。
2. Evidence Cards 代表论文证据卡。
3. Methods & Limitations。
4. Presentation Pack。
5. Interaction & Accessibility polish。
6. Data Appendix。

如果时间有限，优先做 1–3。它们最直接影响“完整度、可信度、展示观感”。
