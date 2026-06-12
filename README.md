# 数据可视化 HW4 小组项目

## 项目题目

**哪些计算机研究经得起时间检验？——基于 Test of Time Award 数据的论文长期影响力可视化分析**

英文副标题：

**What Research Stands the Test of Time? Visualizing Long-Term Impact in Computer Science**

## 在线 Demo

GitHub Pages 地址：<https://leejamesss.github.io/pku-dataviz-hw4-test-of-time/>

如果在线页面暂时不可访问，请按下方"本地运行"启动静态服务器查看。

## 项目目标

本项目基于 Test of Time Award 论文数据，分析计算机领域中哪些研究在多年后仍然被认为具有重要影响。我们从时间跨度、会议领域、研究主题、引用轨迹、影响扩散、作者机构网络等角度进行可视化分析。

核心问题：

> 一篇计算机论文在多年后仍被认为重要，通常具有什么共同特征？

## Demo 预览图

不安装任何环境时，可以先通过下面几张截图了解网页效果。完整交互版请按"本地运行"部分启动静态服务器后查看。课堂投影或截图时可打开 `http://127.0.0.1:8765/index.html?present=1`，或在页面中按 `P` 切换 Presentation mode。

![Homepage overview](docs/demo/homepage-overview.png)

| Time / Timeline | Venue / Field |
|---|---|
| ![Time and timeline module](docs/demo/time-and-timeline.png) | ![Venue and field module](docs/demo/venue-and-field.png) |

| Topic Evolution | Citation / Impact |
|---|---|
| ![Topic evolution module](docs/demo/topic-evolution.png) | ![Citation and impact module](docs/demo/citation-and-impact.png) |

| Explorer / Evidence Index | Benchmark Lab |
|---|---|
| ![Explorer and evidence index module](docs/demo/explorer-evidence-index.png) | ![Benchmark lab module](docs/demo/benchmark-lab.png) |

| Network diffusion |
|---|
| ![Network diffusion module](docs/demo/network-diffusion.png) |

## 仓库结构

```text
.
├── README.md
├── index.html              # 主页面（8 个研究问题模块）
├── time.html               # 时间模块补充页：滞后时长排行
├── example.html            # 典型案例解读页
├── src/
│   ├── app.js
│   ├── styles.css
│   └── vendor/             # 本地化的 d3 依赖
├── data/                   # 预处理后的 CSV 数据
│   ├── papers_enriched.csv
│   ├── award_timeline.csv
│   ├── recognition_lag_distribution.csv
│   ├── venue_stats.csv / venue_area_stats.csv / venue_year_evidence_cards.csv
│   ├── topic_stats.csv / topic_year_stats.csv
│   ├── citation_trajectories.csv / citing_breadth_metrics.csv
│   └── institution_stats.csv / country_stats.csv
├── manual_annotations/     # 代表论文的人工补充标注
├── docs/
│   ├── demo/               # 模块截图
│   └── methodology/        # 数据字段说明、数据来源与处理方式、方法与限制、引用附录、术语表
└── 小组作业说明-20260415.pdf
```

## 网页模块

页面按研究问题展开：Opening → Time → Venue / Field → Topic Evolution → Citation / Impact → Paper Explorer → Benchmark Lab → Story Builder → Glossary → Impact Network。

1. **Time**：recognition lag 分布和核心时间尺度；
2. **Venue & Field**：会议与领域分布（不是会议质量排名）；研究问题转向说明见 `docs/methodology/best_paper_vs_test_of_time_framing.md`；
3. **Topic Evolution**：主题分布、主题随年份演化、代表论文详情卡和 contribution archetype 分类；
4. **Citation & Recognition**：引用量与 recognition lag 的关系、引用轨迹、影响深度/广度；
5. **Paper Explorer**：把 250 篇论文做成可检索、可排序、可点击联动详情卡的证据索引；
6. **Benchmark Lab**：把任意选中论文和全数据集/同领域中位数做 percentile 对比；
7. **Story Builder**：把每个模块转成"问题—证据—解读"的数据故事主线；
8. **Glossary**：recognition lag、citation depth、impact breadth、OpenAlex proxy 等术语速查；
9. **Impact Network**：机构和国家/地区分布。

## 本地运行

不要直接双击打开 `index.html`，因为浏览器可能拦截本地 CSV 读取。请在仓库根目录启动一个本地静态服务器：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

然后在浏览器打开：

```text
http://127.0.0.1:8765/index.html
```

页面支持键盘交互：按 Tab 聚焦主要 SVG marks，Enter/Space 可触发选中论文/更新 detail panel。

## 数据来源与真实性说明

- 原始数据：各会议 Test of Time Award 官方页面（award seed），论文元数据与引用数据来自 OpenAlex 等开放科学 API；
- 数据来源分层、proxy 指标边界和报告口径见 `docs/methodology/data_provenance_audit.md`；
- 字段说明见 `docs/methodology/data_dictionary.md`；
- 参考文献与逐层引用见 `docs/methodology/source_citation_appendix.md` / `.csv`；
- 方法与限制说明见 `docs/methodology/methods_and_limitations.md`。

报告与页面中，`citation_count`、`impact_breadth_score`、institution/country counts 均表述为公开元数据下的近似观察，而不是官方评奖原因、完整引用网络或跨领域绝对排名。

## 人工标注

`manual_annotations/` 中是 Top 12 代表论文的人工补充标注（DOI、论文页、一句话贡献、evidence URL），用于网页中的论文详情卡和展示案例。

## 小组分工

详细分工与各成员贡献见随作业提交的项目报告，概览如下。

| 成员 | 模块 | 主要任务 |
|---|---|---|
| A | 项目架构 / 全站 baseline / GitHub 协作与最终整合 | 仓库与协作流程、全站 D3 baseline、code review、最终整合和 QA |
| B | 时间线与 recognition lag | 分析发表年、获奖年、recognition lag，做时间线和分布图 |
| C | 会议 / 领域分布 | 分析 venue、venue_area，做会议排名、领域分布、热力图 |
| D | 主题演化 | 分析 topic_label / concepts，做主题演化和代表论文卡片 |
| E | 引用轨迹与影响深度/广度 | 分析 citation trajectory、citation count、impact breadth |
| F | 作者机构网络 / 视觉 / PPT | 做机构网络、国家分布、统一视觉风格、准备展示 PPT |

## 最终目标

最终作品呈现为一个完整的数据故事，而不是几个图表的拼接：

> 用可视化解释：哪些计算机研究真正经得起时间检验，以及这种长期影响力如何在时间、领域、主题、引用和合作网络中体现出来。
