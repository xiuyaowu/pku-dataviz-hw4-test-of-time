# Final Presentation Pack

用途：课堂展示前，把网页、截图、每个人的发言和备用材料统一起来。当前版本是可直接改成 PPT 的结构草稿；逐页可粘贴版本见 `docs/final_presentation_blueprint.md`，答辩问答准备见 `docs/defense_qa_pack.md`，术语和指标安全讲法见 `docs/glossary_metric_explainer.md`，截图/幻灯片视觉一致性检查见 `docs/slide_visual_consistency_audit.md`。

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
| Network | F | 70s | 长期影响也沉淀在机构、国家/地区和学术共同体结构中；具体案例可从 `docs/network_ecosystem_case_notes.md` 选择。 | `docs/demo/network-diffusion.png` |
| Methods / Limitations | A or F | 60s | 数据可信但有边界：award history、metadata coverage、sampled breadth。 | methods slide |
| Conclusion | A | 40s | 时间、主题、引用、证据案例、单篇基准和网络共同刻画“经得起时间检验”。 | summary slide |

## Slide outline

### Slide 1 / Title

**What Research Stands the Test of Time?**

Subtitle: Visualizing Long-Term Impact in Computer Science

Talking point:

> 我们关注论文当年热度之外的长期确认：Best Paper 更像发表当下的优秀信号，而 Test of Time Award 追问多年后哪些研究仍被重新评价为重要。

### Slide 2 / Data and question

Show:

- 250 Test of Time Award papers
- publication years / announcement years
- venue、topic、citation、institution metadata

Talking point:

> 核心问题是：一篇 CS 论文在多年后仍被认为重要，通常具有什么共同特征？

Opening contrast source: `docs/best_paper_vs_test_of_time_framing.md` gives a 40-second safe wording paragraph and 3 contrast bullets. Use it qualitatively only unless a complete Best Paper baseline is later added.

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

Optional bridge: mention that this is a retrospective award visibility map, not a Best Paper count or venue-quality ranking; see `docs/best_paper_vs_test_of_time_framing.md`.

Need from C:

- Top venues / fields
- 1 条限制说明

### Slide 5 / Topic Evolution

Visual: `docs/demo/topic-evolution.png`

Talking point:

> Topic evolution 把长期影响放回 CS 研究重心变化中看。代表论文卡片和 archetype taxonomy 则把抽象主题落回具体贡献类型：算法、模型、测量、系统、理论或研究议程。

Need from D:

- 优先从 `docs/evidence_card_presentation_matrix.md` 选择 5–8 张 presentation-ready-cautious 卡。
- 用 `docs/research_archetype_taxonomy.md` 选择 2–3 个 contribution archetype 作为“什么类型的贡献留下来”的解释。
- evidence URL
- 对未列入主展示组的卡片，只作为备选或待复核材料。

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

Detailed handoff: `docs/network_visual_presentation_handoff.md` contains the F-module Network findings, a 60–70 second speaking route, screenshot mapping, and visual QA checklist.

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

Use `docs/glossary_metric_explainer.md` as the wording source for recognition lag, citation depth, impact breadth, OpenAlex proxy, same-field benchmark, topic label, and evidence-card readiness. The live page also has a Glossary section for quick Q&A reference.

### Slide 11 / Conclusion

Suggested wording:

> 这组可视化显示，经得起时间检验的研究需要用多维指标观察。它们往往经历延迟确认，在特定学术共同体中沉淀，并通过引用、主题、具体论文案例和机构网络扩散。Test of Time Award 因此提供了一个观察长期科学影响力的窗口。

## Live demo mode

For classroom projection, use the projector-friendly mode before taking screenshots or presenting live:

```text
http://127.0.0.1:8765/index.html?present=1
```

You can also press `P` on the page to toggle this mode. It increases section spacing, keeps navigation visible, and improves chart-card readability on 16:9 projector screenshots.

Suggested live route:

1. Open the hero in presentation mode and state the core research question.
2. Use the top nav anchors in order: Time → Venue → Topic → Citation → Explorer → Benchmark → Network.
3. In Explorer, search or sort for one representative paper, click it, then move to Benchmark Lab to explain its percentile profile.
4. Close with Methods / Limitations and the conclusion slide.

## Backup assets

Use `docs/live_demo_fallback_script.md` as the source-of-truth if the live demo fails. It gives a 2-minute screenshot route, speaker/claim mapping, and the exact sentence for explaining why presentation-mode screenshots are equivalent to the live D3 view.

Use these screenshot assets in that order:

- `docs/demo/homepage-overview.png`
- `docs/demo/time-and-timeline.png`
- `docs/demo/venue-and-field.png`
- `docs/demo/topic-evolution.png`
- `docs/demo/citation-and-impact.png`
- `docs/demo/explorer-evidence-index.png`
- `docs/demo/benchmark-lab.png`
- `docs/demo/network-diffusion.png`

## PPT production handoff

If the team needs to create slides quickly, use `docs/final_presentation_blueprint.md` as the source of truth. It contains:

- 11-slide structure with speaker, timing, title, main takeaway and backup asset;
- exact slide bullets and speaker notes for each page;
- module-owner handoff requirements for B–F;
- safe wording boundaries for proxy metrics and evidence-card claims;
- offline screenshot checklist matching the files in `docs/demo/`.

Before exporting the PPT, run the visual consistency pass in `docs/slide_visual_consistency_audit.md`: keep one main claim per slide, use the same screenshot frame style, crop all `1440 × 1000` module screenshots consistently, and preserve the safe wording boundary for each module.

Recommended build path:

1. Create a blank 16:9 PPT.
2. Copy Slide 1–11 titles and bullets from `docs/final_presentation_blueprint.md`.
3. Insert the matching `docs/demo/*.png` screenshot on each module slide.
4. Put speaker notes into presenter notes, not on the visual slide.
5. Before export, run the final rehearsal route in presentation mode: `index.html?present=1`.

## Speaker checklist

Each speaker should prepare:

- one main takeaway;
- one concrete number or visual pattern;
- one representative paper or limitation;
- one sentence connecting their module back to the core question.

## Final rehearsal checklist

- [ ] Page opens online or locally.
- [ ] Backup screenshots are available.
- [ ] Q&A owner rehearses likely data / metric / limitation questions from `docs/defense_qa_pack.md`.
- [ ] Every speaker knows their exact slide.
- [ ] No speaker spends time explaining implementation details unless asked.
- [ ] Limitations are mentioned before Q&A.
- [ ] Conclusion returns to the research question.
