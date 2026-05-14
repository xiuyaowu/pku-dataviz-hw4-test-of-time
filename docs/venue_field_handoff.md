# C 模块 handoff：Venue & Field 会议和领域分布

用途：给 C 成员/报告作者一个可直接复核和扩写的 Venue & Field 模块材料包。它不把 venue 数量解释成会议质量排名，而是把它作为当前 Test of Time Award 数据集中“哪些社区更常被记录”的可见分布。

## 1. 模块问题

**哪些会议和研究领域更频繁地产生被 Test of Time Award 记录的论文？这种分布应该如何解释，哪些地方不能过度推断？**

页面位置：`#venue`  
主要数据：

- `data/venue_stats.csv`：27 个 venue 的论文数、年份范围、lag、citation / breadth 均值。
- `data/venue_area_stats.csv`：16 个 venue_area 的聚合统计。
- `data/papers_enriched.csv`：250 篇论文的单篇明细，可用于挑代表案例。

## 2. 已核对核心统计

### 2.1 Top venues

| Rank | Venue | Area | Paper count | Avg lag | Avg citation | Avg breadth |
|---:|---|---|---:|---:|---:|---:|
| 1 | SIGIR | IR | 35 | 19.8 | 951.1 | 53.6 |
| 2 | SIGCOMM | Networking | 33 | 15.2 | 1284.8 | 52.8 |
| 3 | ICSE | Software Engineering | 29 | 10.7 | 333.0 | 57.0 |
| 4 | ICCV | CV | 24 | 16.2 | 3314.9 | 62.4 |
| 5 | SIGMOD | Database | 24 | 10.2 | 1340.3 | 56.8 |
| 6 | VLDB | Database | 20 | 10.0 | 1562.5 | 56.4 |

可写解释：SIGIR、SIGCOMM、ICSE、ICCV、SIGMOD、VLDB 在当前数据中最可见，说明这些社区拥有较稳定的 Test of Time Award 记录和可追溯论文历史。写作时避免说“这些会议更强”，应写成“当前公开奖项数据中更高频地记录了长期影响论文”。

### 2.2 Top venue areas

| Rank | Area | Paper count | Avg lag | Avg citation | Avg breadth |
|---:|---|---:|---:|---:|---:|
| 1 | Database | 44 | 10.1 | 1441.3 | 56.6 |
| 2 | Networking | 38 | 14.6 | 1276.3 | 54.0 |
| 3 | IR | 35 | 19.8 | 951.1 | 53.6 |
| 4 | Software Engineering | 29 | 10.7 | 333.0 | 57.0 |
| 5 | CV | 24 | 16.2 | 3314.9 | 62.4 |
| 6 | AI | 19 | 18.6 | 585.1 | 55.6 |

可写解释：Database / Networking / IR / SE / CV 是当前数据里最主要的长期影响记录入口。Database 和 SE 的平均 lag 更接近 10 年，IR / CV / AI 更长，这可能同时受到奖项规则、设奖时间、领域吸收节奏和数据覆盖差异影响。

### 2.3 Field × decade 读图提示

| Decade | 可见度最高的 areas | 读法 |
|---|---|---|
| 1970s | Software Engineering 4, Networking 3, CS 1 | 样本量小，只适合作为早期基础社区的线索。 |
| 1980s | IR 11, Networking 10, AI 8, Software Engineering 8 | IR、网络、AI、SE 在早期 Test-of-Time 记录中较可见。 |
| 1990s | Database 24, IR 14, CV 13, Networking 10 | 数据库、IR、视觉在 1990s 形成较明显的长期影响记录。 |
| 2000s | Networking 15, Database 13, DM/Web 12, IR 10 | 网络、数据库和数据挖掘/Web 的记录继续增长。 |

报告写法：heatmap 不应写成“某年代只有这些领域重要”，而应写成“在当前可见奖项样本中，这些领域在对应年代更集中出现”。

## 3. 三条可直接写进报告的 findings

### Finding 1：Venue 分布高度集中，但不是会议质量榜

当前数据中，SIGIR 35 篇、SIGCOMM 33 篇、ICSE 29 篇，前三个 venue 已占 97 / 250 篇。这个集中度说明 Test of Time Award 记录并非均匀覆盖所有 CS 社区，而是与具体会议是否设奖、何时设奖、公开记录是否完整高度相关。

报告边界：不要写“SIGIR/SIGCOMM/ICSE 是最重要会议”。更稳妥的表述是：“这些 venue 在当前 Test of Time Award 数据集中具有最高可见度”。

### Finding 2：Database、Networking、IR 等社区形成主要观察入口

按 venue_area 聚合后，Database 44、Networking 38、IR 35、Software Engineering 29、CV 24 位于前列。这些方向通常有清晰顶会体系、长期论文归档和较稳定的 retrospective award 机制，因此更容易形成可量化的长期影响记录。

报告边界：数量多不能推出其他领域长期影响少，只能说明当前 award seed 对这些社区覆盖更充分。

### Finding 3：不同领域的 recognition lag 差异需要制度化解释

Database 平均 lag 约 10.1 年，SE 约 10.7 年；IR 约 19.8 年，AI 约 18.6 年，CV 约 16.2 年。这个差异可以作为“不同社区回看周期不同”的讨论入口，但需要同时说明奖项设立年份、评奖规则和数据源覆盖的影响。

报告边界：不能把 lag 长短直接解释成“这个领域成熟得慢/快”。Recognition lag 是发表年到获奖年之间的确认间隔，不等于影响实际产生的时间。

## 4. 代表论文候选

下面候选用于报告或展示时从 venue/field 总体分布落回具体案例。最终写入报告前，需要打开链接核对贡献表述和 award citation。

| Venue | Candidate | Year | Citation | Lag | Why useful |
|---|---|---:|---:|---:|---|
| SIGIR | Probabilistic Latent Semantic Indexing | 1999 | 3933 | 15 | 可连接 IR 的长期主题：检索模型、语义表示、后续文本/推荐系统影响。 |
| SIGCOMM | Chord: A Scalable Peer-to-peer Lookup Service for Internet Applications | 2001 | 6403 | 10 | 可说明网络/分布式系统论文如何通过协议和系统设计长期影响后续研究。 |
| ICSE | Who Should Fix This Bug | 2006 | 918 | 10 | 可说明软件工程长期影响不一定体现为最高引用，而是问题定义和工具链实践。 |
| ICCV | Object Recognition from Local Scale-Invariant Features | 1999 | 16147 | 10 | 可连接 CV 高引用、高扩散和方法范式案例。 |
| SIGMOD/VLDB | Mining Association Rules Between Sets of Items in Large Databases | 1993 | 14771 | 10 | 可连接数据库/数据挖掘如何成为跨场景分析工具。 |

## 5. Imbalance caveats and venue-year mini case studies

Issue #57 的专门说明包见：`docs/venue_field_imbalance_caveats.md`。

这份 caveats packet 把 venue / field 数量集中度单独整理成 report-ready 口径：Top 3 venues 占 97 / 250，Top 6 venues 占 165 / 250，Top 5 venue areas 占 170 / 250。它的核心用途是提醒 C 在报告和 PPT 中把数量榜解释为“当前 award seed 的可见记录密度”，而不是会议质量、领域价值或完整 CS 研究分布。

### Venue-year mini case studies

详细案例包：`docs/venue_year_case_studies.md` / `docs/venue_year_case_studies.csv`。

这些案例用于把 venue ranking 和 field × decade heatmap 落回具体证据：

| Case | Signal | Presentation use | Safe boundary |
|---|---|---|---|
| SIGCOMM 1988 | 6 篇 Networking 论文，平均 lag 18.0 年 | 早期网络协议、路由、DNS、Internet architecture 的密集可见 cluster | 只能说当前 award seed 中可见，不能说完整代表 1988 网络研究史。 |
| SIGIR 1999 | 3 篇 IR 论文，总引用 6,286 | 检索模型、协同过滤、统计翻译形成同一 venue-year 的多主题线索 | 不写成“SIGIR 最重要年份”，只写成一个适合展示的 IR case。 |
| ICCV 1999 | 4 篇 CV 论文，总引用 22,233，平均 breadth 62.3 | SIFT、texture synthesis、camera calibration 等方法型论文很适合课堂讲解 | citation / breadth 是 OpenAlex proxy，不是获奖原因证明。 |
| SIGMOD 1996 | 2 篇 Database 论文，平均 lag 10.0 年 | 对比 Database / Systems 社区较短 recognition window | lag 是 award timing，不等于影响真正产生的速度。 |
| NSDI 2005 | 2 篇 Systems/Networking 论文，平均 lag 10.0 年 | 展示较新 venue 也能提供 compact Test-of-Time 案例 | 样本小，只适合作为 bridge example。 |

推荐展示策略：最终 PPT 选 2–3 个即可，例如 `SIGCOMM 1988` 说明早期网络 cluster，`ICCV 1999` 说明高引用方法 cluster，`SIGMOD 1996` 或 `NSDI 2005` 说明较短 recognition-lag 对比。

## 6. 可复制报告段落

> Venue & Field 模块显示，Test of Time Award 论文在当前数据中并不是均匀分布在所有会议和领域。SIGIR、SIGCOMM、ICSE、ICCV、SIGMOD、VLDB 等 venue 的可见度较高，Database、Networking、IR、Software Engineering 和 CV 是主要观察入口。更准确的解释不是“这些会议或领域更好”，而是这些社区拥有较稳定的论文归档、奖项传统和可追溯的长期影响记录。Field × decade heatmap 进一步提示，不同年代的长期影响记录会随研究社区和技术议题迁移而变化，但这种变化仍受到奖项设立历史和数据覆盖范围的限制。为了避免只停留在数量榜，报告可以加入 SIGCOMM 1988、ICCV 1999、SIGIR 1999 等 venue-year 案例，把“哪些社区更可见”转化为“哪些具体论文 cluster 支撑这个读法”。

## 7. C 模块最终人工检查清单

- [ ] 打开 2–3 篇代表论文链接，核对题名、venue、年份和一句话贡献。
- [ ] 如果报告提到某 venue/area 的原因，补一句“当前数据可见分布 / award coverage”边界。
- [ ] 不使用“官方排名”“最强会议”“最有价值领域”等绝对化表述。
- [ ] 和 Topic 模块联动时，只说“领域入口”和“主题线索”，不要把 venue_area 等同于论文真实主题。
- [ ] 若展示 field × decade heatmap，口头说明早期年代样本量较小，不能过度比较。
