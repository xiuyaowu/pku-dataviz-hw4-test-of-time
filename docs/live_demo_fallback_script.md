# Live Demo Fallback Script

用途：如果课堂现场遇到网络、GitHub Pages、本地静态服务器、浏览器投影或电脑性能问题，团队可以直接改用已有截图完成 2 分钟压缩展示。这个 fallback 不替代正式网页，只保证展示风险可控。

## 1. 触发条件

出现以下任一情况时，直接切到截图方案，不在现场排查超过 30 秒：

- GitHub Pages 或本地 `http://127.0.0.1:8765/index.html?present=1` 打不开。
- 投影分辨率导致页面文字明显看不清。
- 浏览器卡顿、缩放异常或控制台报错影响讲解。
- 时间被压缩，无法完成 Explorer → Benchmark 的现场点击路径。

过渡句：

> 为了保证展示节奏，我们改用同一页面提前导出的 presentation-mode 截图。截图来自当前 D3 页面，数据、图表和讲解顺序与 live demo 一致。

## 2. 2 分钟截图展示路线

| 顺序 | 时间 | 截图 / 资产 | Speaker | 要讲的 claim | Safe wording boundary |
|---:|---:|---|---|---|---|
| 1 | 15s | `docs/demo/homepage-overview.png` | A | 数据集包含 250 篇 Test of Time Award 论文，项目问题是观察长期影响的共同特征。 | 不说数据覆盖所有 CS 论文，只说覆盖当前 award seed。 |
| 2 | 20s | `docs/demo/time-and-timeline.png` | B | Recognition lag 让“时间检验”变成可观察尺度，长期价值往往经过多年后确认。 | 不把 lag 解释成质量因果，只说正式确认的时间差。 |
| 3 | 20s | `docs/demo/venue-and-field.png` | C | Venue / field 分布展示不同学术共同体如何记录长期影响。 | 不写成会议质量排名，强调 award history 和覆盖差异。 |
| 4 | 25s | `docs/demo/topic-evolution.png` | D | Topic evolution 说明长期影响主题会随 CS 研究重心迁移，代表论文卡用于解释统计背后的贡献。 | 只使用 evidence-ready 或已人工复核的代表论文表述。 |
| 5 | 25s | `docs/demo/citation-and-impact.png` | E | Citation depth 与 impact breadth 分开看，可以区分高引用和广扩散两种影响形态。 | breadth 是 OpenAlex sampled proxy，不是完整引用网络。 |
| 6 | 20s | `docs/demo/explorer-evidence-index.png` + `docs/demo/benchmark-lab.png` | A / D | Explorer 和 Benchmark Lab 把总体趋势落回具体论文，并解释单篇论文相对全数据/同领域的位置。 | 不临时编造论文贡献；只讲已准备案例。 |
| 7 | 20s | `docs/demo/network-diffusion.png` | F | Network 模块展示长期影响在机构和国家/地区元数据中的可见结构。 | 不把机构/国家计数写成完整合作网络或实力排名。 |
| 8 | 15s | `docs/methods_and_limitations.md` 或结论页 | A / F | 结论基于 award seed、OpenAlex metadata 和 derived proxy，适合观察模式但不声称官方评奖因果。 | 先讲边界，再回到核心问题。 |

压缩版合计约 2 分钟 40 秒；如果必须压到 2 分钟，合并第 6 步，只展示 `benchmark-lab.png` 并用一句话说明 Explorer 是证据索引。

## 3. 等价性说明

可直接放进展示备注：

> 这些截图是从同一个 D3 页面在 presentation mode 下导出的静态视图；它们保留了页面的数据、图表编码、reading notes 和模块顺序，只是不展示 hover、search 和点击联动，因此适合作为 live demo 的离线替代。

## 4. 现场文件打开顺序

建议提前把下面文件加入 PPT 或放在同一文件夹中，避免现场临时找路径：

1. `docs/demo/homepage-overview.png`
2. `docs/demo/time-and-timeline.png`
3. `docs/demo/venue-and-field.png`
4. `docs/demo/topic-evolution.png`
5. `docs/demo/citation-and-impact.png`
6. `docs/demo/explorer-evidence-index.png`
7. `docs/demo/benchmark-lab.png`
8. `docs/demo/network-diffusion.png`
9. `docs/methods_and_limitations.md`

## 5. F owner final check

- [ ] 确认 README 中所有 `docs/demo/*.png` 文件能打开。
- [ ] 确认 PPT 中截图来自 presentation mode，文字可读。
- [ ] 准备一句“截图来自同一 D3 页面”的等价性说明。
- [ ] 每位 speaker 只讲自己模块的一条 claim 和一条 boundary。
- [ ] 如果 live demo 恢复正常，仍保留截图作为 Q&A 备用材料。

Issue routing: completes narrow fallback-script task #64 and supports F owner container #7 without closing #7.
