# B-F 模块任务卡：在现有 baseline 上继续增强

说明：网页已经有一版可运行 baseline。每个人不需要从零搭页面，只需要在自己的模块里补分析、补展示解释、做小范围可视化增强，然后走 PR。

## 共用规则

1. 先 `git pull origin main`，再开自己的分支。
2. 只改自己模块相关文件；如果需要改公共 CSS 或全局数据加载，先在群里同步。
3. 每个 PR 至少包含：做了什么、用了哪些数据、得出哪些发现、如何验证。
4. 每个模块都尽量补齐“四件套”：2–3 条发现、1–3 个代表案例、1 条限制说明、1 张可展示截图或明确演示位置。
5. 合并前至少跑：

```bash
node --check src/app.js
python3 -m http.server 8765 --bind 127.0.0.1
```

打开 `http://127.0.0.1:8765/index.html` 检查页面。

---

## B / Time：recognition lag 与时间尺度

### 已有 baseline

- `Recognition Lag Distribution`
- `Publication → Award Timeline`
- `#time-note` reading note

### 主要数据

- `data/award_timeline.csv`
- `data/recognition_lag_distribution.csv`
- 可参考 `data/papers_enriched.csv` 中的 title、venue、year、announcement_year、recognition_lag

### 最低交付

- 写出 2-3 条时间发现，例如：典型 lag 区间、极长 lag 案例、不同年代获奖时间尺度差异。
- 为最短 lag / 最长 lag / 典型 lag 各找 1 篇代表论文，补一句解释。
- 在报告中说明：Test of Time 关注多年后重新确认的影响，和即时热度不同。
- 明确 `recognition_lag = announcement_year - publication_year`，避免读者误解。

### 想更高分可以做

- 在 timeline 上加关键案例 annotation。
- 增加 lag 区间筛选或 hover 高亮。
- 比较不同 venue_area 的 lag 中位数。

### 报告可写句式

> Recognition lag 显示，长期影响通常会在论文发表多年后才被奖项重新确认。分布中的高峰代表该领域普遍认可一个研究贡献所需的时间尺度，极长 lag 案例则说明部分基础性工作需要等待后续技术生态成熟后才被充分看见。

---

## C / Venue & Field：会议和领域分布

### 已有 baseline

- `Top Venues`
- `Field Map`
- `#venue-note` reading note

### 主要数据

- `data/venue_stats.csv`
- `data/venue_area_stats.csv`
- `data/papers_enriched.csv`

### 最低交付

- 写出 top venues 和 top fields 的 2-3 条发现。
- 解释为什么不能把数量榜直接写成“会议质量排名”。
- 补充奖项历史差异限制：不同会议设立 Test of Time Award 的时间和覆盖范围不同。

### 想更高分可以做

- 做 venue × decade 或 venue_area × decade 的热力图。
- 增加领域占比变化说明。
- 为每个高频领域选 1 篇代表论文。
- 写清“数量多”可能来自设奖历史、领域规模、数据覆盖差异，而非单纯学术质量。

### 报告可写句式

> Venue 与 field 分布回答“哪些学术社区更频繁地通过 Test of Time Award 记录长期影响”。由于不同会议设奖时间和评奖传统不同，数量差异需要和奖项历史一起解释，不能直接当作会议排名。

---

## D / Topic Evolution：主题演化与代表论文

### 已有 baseline

- `Topic Distribution`
- `Topic Evolution Over Publication Years`
- `Representative Papers` detail card

### 主要数据

- `data/topic_stats.csv`
- `data/topic_year_stats.csv`
- `data/papers_enriched.csv`
- `manual_annotations/manual_paper_annotations_top60_template.csv`
- `manual_annotations/*_12篇待补充.csv`

### 最低交付

- 校正 Top60 中优先展示论文的 topic label。
- 给 5-8 篇代表论文补：一句话贡献、为什么经得起时间检验、证据 URL。
- 写出 2-3 条主题演化发现。
- 对工业影响、奠基性影响等判断使用 evidence URL 或谨慎措辞。

### 想更高分可以做

- 把代表论文 detail card 的中文解释补完整。
- 给主题演化图加关键阶段标注。
- 将 topic label 合并成更稳定的展示类别，避免过碎。

### 报告可写句式

> Topic evolution 说明长期影响论文并不集中在单一主题，而是在不同年代随计算机领域的技术重心迁移。代表论文卡片用于把抽象主题重新落回具体贡献，避免可视化只停留在数量统计。

---

## E / Citation & Impact：引用轨迹、深度与广度

### 已有 baseline

- `Citation vs Recognition Lag`
- `Citation Trajectory`
- `Depth × Breadth`
- `#citation-note` reading note

### 主要数据

- `data/citation_trajectories.csv`
- `data/citing_breadth_metrics.csv`
- `data/papers_enriched.csv`
- 集中报告底稿：`docs/citation_impact_handoff.md`

### 最低交付

- 分析高引用是否总是对应短 lag 或更强长期影响。
- 区分 citation depth（引用总量）和 impact breadth（跨领域/机构/国家扩散近似指标）。
- 给四象限各找至少 1 篇代表论文。
- 写清 OpenAlex 指标是公开元数据近似值，不能替代完整引用网络或官方影响力评分。

### 想更高分可以做

- 给 top trajectory 增加 hover/legend 高亮。
- 找 2-3 个“高引用但 lag 长 / 引用不最高但 breadth 高”的对比案例。
- 做 citation growth pattern 的文字归类。

### 报告可写句式

> Citation depth 衡量论文被引用的强度，impact breadth 更接近影响扩散范围。两者结合后，可以区分“在一个社区内被反复引用”和“跨领域扩散”的不同长期影响形态。

当前 `docs/citation_impact_handoff.md` 已经补齐四象限代表论文、trajectory 类型说明、3 条 draft findings 和 60 秒展示话术；E 成员后续主要核查最终采用案例的 evidence URL，并把谨慎表述压缩进正式报告。

---

## F / Network + Visual + Presentation：机构国家、视觉统一与展示

### 已有 baseline

- `Institutions`
- `Countries / Regions`
- 全站 CSS 视觉系统
- README demo 截图入口

### 主要数据

- `data/institution_stats.csv`
- `data/country_stats.csv`
- `data/papers_enriched.csv`

### 最低交付

- 写出机构/国家分布的 2-3 条发现。
- 检查全站颜色、字体、tooltip、卡片风格是否统一。
- 准备展示讲解顺序，参考 `docs/demo_script.md`。
- 给每个模块选择 1 张最终展示截图或明确演示位置。

### 想更高分可以做

- 将 institution/country ranking 升级成合作网络或 geospatial map。
- 给 PPT 加主线：Time → Venue → Topic → Citation → Network → Conclusion。
- 统一所有图表的 legend、caption、reading note 语气。

### 报告可写句式

> Network 模块把论文长期影响从单篇论文扩展到学术组织和地区层面。机构与国家分布可以展示长期影响在研究生态中的集中与扩散，但由于机构元数据存在缺失和归一化误差，结论应作为结构性观察而非完整合作网络统计。
