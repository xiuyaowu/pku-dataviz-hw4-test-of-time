# 高完成度优化路线图

用途：把当前可运行 baseline 继续推进到更像完整课程项目的状态。这里不增加私下管理口吻，只记录可公开给队友看的质量目标。

## 当前状态

- 已有完整 D3 单页 baseline：Opening、Time、Venue、Topic、Citation、Network。
- 已有真实数据：250 篇 Test of Time Award 论文、citation trajectories、venue/field/topic/institution/country/breadth 指标。
- 已有 GitHub Issues：#2–#7，每位成员有独立模块任务。
- 已有 README demo 截图、报告骨架、展示脚本、QA 清单。

## 最高优先级：每个模块补“发现”而不是只补图

每位成员最终至少交付：

1. 2–3 条可写进报告的发现；
2. 1–3 个可在展示中讲的代表案例；
3. 1 条数据或方法限制；
4. 若改前端，提供截图和本地验证说明；
5. PR 必须链接自己的 Issue。

## 模块级优化清单

### B / Time

- 解释 recognition lag 的典型区间、极端值和阶段差异。
- 找出最短、最长、最典型 lag 的代表论文。
- 展示主线：长期影响力通常是延迟确认，不是即时热度。

### C / Venue & Field

- 解释 Top venues / fields 的分布，不把数量榜写成会议排名。
- 把 venue、field 和 decade heatmap 连成结构性解释。
- 加入奖项设立历史和覆盖范围差异的限制说明。

### D / Topic Evolution

- 补 5–8 篇代表论文的人工解释和 evidence URL。
- 修正/合并过碎 topic label，让主题故事更清楚。
- 解释长期影响主题如何随年代迁移。

### E / Citation & Impact

- 区分 citation depth、citation trajectory、impact breadth。
- 给四象限各找代表论文。
- 强调 OpenAlex breadth 是 sampled proxy，不是完整引用网络。

### F / Network / Visual / Presentation

- 总结机构与国家/地区分布，并说明元数据限制。
- 统一全站视觉、截图、caption、tooltip 和术语。
- 把展示组织成一个故事：Time → Venue → Topic → Citation → Network → Conclusion。

## 报告与展示加分项

- 增加 Methods / Data Limitations 小节：数据来源、API 匹配、OpenAlex 指标、award history bias。
- 每个模块至少有一条 “so what” 结论，说明为什么这个观察支持长期影响力分析。
- 展示时每个模块只讲 1 个核心结论 + 1 个代表案例，避免堆表格。
- 最后一页总结三点：延迟确认、跨领域扩散、学术共同体沉淀。

## PR 验收标准

每个 PR 合并前检查：

- 页面本地运行正常；
- `node --check src/app.js` 通过；
- README 或报告中引用的数据文件存在；
- 图表 caption / tooltip / reading note 能独立读懂；
- 发现、案例、限制三类内容齐全；
- 没有绝对路径、缓存文件、无关大文件。

## 最终整合标准

最终提交前由 A 做一次整合：

1. 检查 #3–#7 是否都有可用发现和代表案例；
2. 更新 README demo 截图；
3. 更新 report skeleton 中各模块内容；
4. 跑本地页面和控制台检查；
5. 按 `docs/final_qa_checklist.md` 做最终 QA；
6. 重新打包 shareable zip。
