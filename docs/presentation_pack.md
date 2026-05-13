# Final Presentation Pack

用途：课堂展示前，把网页、截图、每个人的发言和备用材料统一起来。当前版本是可直接改成 PPT 的结构草稿。

## Recommended timing: 8–10 minutes

| Segment | Speaker | Time | Main message | Visual asset |
|---|---:|---:|---|---|
| Opening | A | 60s | 我们研究哪些 CS 论文经得起时间检验，以及这种长期影响力如何表现。 | README hero / homepage screenshot |
| Time | B | 70s | 长期影响力通常需要多年后重新确认。 | `docs/demo/time-and-timeline.png` |
| Venue / Field | C | 70s | 不同学术共同体产生长期影响的路径不同，但数量差异需要结合 award history 解释。 | `docs/demo/venue-and-field.png` |
| Topic | D | 90s | 长期影响主题随 CS 研究重心迁移，代表论文能解释统计背后的具体贡献。 | `docs/demo/topic-evolution.png` + evidence card |
| Citation / Impact | E | 90s | 高引用不是全部，citation depth 和 impact breadth 描述不同类型的长期影响。 | `docs/demo/citation-and-impact.png` |
| Paper Explorer | A or D | 50s | 可检索证据库把统计发现落回具体论文，便于展示和答疑。 | `docs/demo/explorer-evidence-index.png` |
| Benchmark Lab | A or D | 50s | 选中论文后展示 percentile 和解释视角，回答“这篇强在哪里”。 | `docs/demo/benchmark-lab.png` |
| Network | F | 70s | 长期影响也沉淀在机构、国家/地区和学术共同体结构中。 | `docs/demo/network-diffusion.png` |
| Methods / Limitations | A or F | 60s | 数据可信但有边界：award history、metadata coverage、sampled breadth。 | methods slide |
| Conclusion | A | 40s | 时间、主题、引用、证据案例、单篇基准和网络共同刻画“经得起时间检验”。 | summary slide |

## Slide outline

### Slide 1 / Title

**What Research Stands the Test of Time?**

Subtitle: Visualizing Long-Term Impact in Computer Science

Talking point:

> 我们关注论文当年热度之外的长期确认：哪些研究在多年后仍然被学术共同体重新评价为重要。

### Slide 2 / Data and question

Show:

- 250 Test of Time Award papers
- publication years / announcement years
- venue、topic、citation、institution metadata

Talking point:

> 核心问题是：一篇 CS 论文在多年后仍被认为重要，通常具有什么共同特征？

### Slide 3 / Time

Visual: `docs/demo/time-and-timeline.png`

Talking point:

> Recognition lag 展示了长期影响被正式确认的时间尺度。它提醒我们，Test of Time 关注的是延迟确认，而不是即时热度。

Need from B:

- 典型 lag 区间
- 最短/最长/典型 lag 代表论文

### Slide 4 / Venue & Field

Visual: `docs/demo/venue-and-field.png`

Talking point:

> Venue 和 field 分布展示哪些学术共同体更常通过 Test of Time Award 记录长期影响，但这不是会议排名，还要结合设奖历史和覆盖范围。

Need from C:

- Top venues / fields
- 1 条限制说明

### Slide 5 / Topic Evolution

Visual: `docs/demo/topic-evolution.png`

Talking point:

> Topic evolution 把长期影响放回 CS 研究重心变化中看。代表论文卡片则把抽象主题落回具体贡献。

Need from D:

- 5–8 篇代表论文解释
- evidence URL

### Slide 6 / Citation & Impact

Visual: `docs/demo/citation-and-impact.png`

Talking point:

> Citation depth 描述引用强度，impact breadth 描述扩散范围。长期影响可能是深的，也可能是广的，两者不完全相同。

Need from E:

- 四象限代表论文
- OpenAlex proxy 限制说明

### Slide 7 / Paper Explorer

Visual: `docs/demo/explorer-evidence-index.png`

Talking point:

> Paper Explorer 把全部论文做成可检索证据库。展示时可以按 title、venue、topic 搜索，也可以按 citation、breadth、lag、year 排序，用具体论文支撑前面每个统计发现。

Need from A/D:

- 展示时准备 1 个搜索关键词
- 准备 1 个代表论文点击示例

### Slide 8 / Benchmark Lab

Visual: `docs/demo/benchmark-lab.png`

Talking point:

> Benchmark Lab 会把选中论文和全数据集比较，用 percentile 说明 citation depth、impact breadth、recognition lag、国家和机构跨度分别强在哪里。它适合在展示中承接 Paper Explorer：先找到案例，再解释案例为什么有代表性。

Need from A/D:

- 准备一个从 Explorer 点击到 Benchmark 的现场演示路径
- 准备一句该论文的 percentile 解读

### Slide 9 / Network

Visual: `docs/demo/network-diffusion.png`

Talking point:

> Institution 和 country/region 分布让我们看到长期影响如何沉淀在研究生态中，但机构元数据存在缺失和归一化误差。

Need from F:

- Top institutions / countries
- 视觉统一检查

### Slide 10 / Methods & limitations

Use: `docs/methods_and_limitations.md`

Must mention:

- recognition lag definition
- citation depth / breadth distinction
- OpenAlex coverage
- award history bias
- causality boundary

### Slide 11 / Conclusion

Suggested wording:

> 这组可视化显示，经得起时间检验的研究需要用多维指标观察。它们往往经历延迟确认，在特定学术共同体中沉淀，并通过引用、主题、具体论文案例和机构网络扩散。Test of Time Award 因此提供了一个观察长期科学影响力的窗口。

## Backup assets

Use these if live demo fails:

- `docs/demo/homepage-overview.png`
- `docs/demo/time-and-timeline.png`
- `docs/demo/venue-and-field.png`
- `docs/demo/topic-evolution.png`
- `docs/demo/citation-and-impact.png`
- `docs/demo/explorer-evidence-index.png`
- `docs/demo/benchmark-lab.png`
- `docs/demo/network-diffusion.png`

## Speaker checklist

Each speaker should prepare:

- one main takeaway;
- one concrete number or visual pattern;
- one representative paper or limitation;
- one sentence connecting their module back to the core question.

## Final rehearsal checklist

- [ ] Page opens online or locally.
- [ ] Backup screenshots are available.
- [ ] Every speaker knows their exact slide.
- [ ] No speaker spends time explaining implementation details unless asked.
- [ ] Limitations are mentioned before Q&A.
- [ ] Conclusion returns to the research question.
