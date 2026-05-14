# Time 模块 handoff：recognition lag 可写发现

用途：给 B 模块负责人提供可直接写进报告和展示稿的 Time 分析材料。所有统计来自当前前端数据文件 `data/papers_enriched.csv` 和 `data/recognition_lag_distribution.csv`。

## 1. 统一定义

`recognition_lag = announcement_year - publication_year`

它表示论文发表后隔了多少年才被 Test of Time Award 公开确认。报告中应把它写成“获奖确认时间间隔 / 延迟确认窗口”，不要写成论文真正开始产生影响的年份，也不要推断评奖委员会动机。

## 2. 核心统计

| 指标 | 当前数值 | 可写解释 |
|---|---:|---|
| 可用论文数 | 250 | 过滤掉缺失发表年 / 获奖年的记录后，前端主数据使用 250 篇论文。 |
| 最短 recognition lag | 9 年 | 较短 lag 说明部分工作在一个约十年的回看窗口内已经形成稳定影响，但仍不是“即时热度”。 |
| 中位数 recognition lag | 12 年 | 典型 Test-of-Time 认可大约发生在发表十多年后。 |
| 平均 recognition lag | 14.0 年 | 平均值高于中位数，说明长尾案例会拉长总体等待时间。 |
| 最长 recognition lag | 34 年 | 少数基础性论文在三十多年后仍被追认，适合说明长期影响的长尾。 |

## 3. Lag 分布怎么讲

| Lag 区间 | 论文数 | 解读 |
|---|---:|---|
| `(10, 15]` | 67 | 最常见的分布区间之一，可作为“典型确认窗口”。 |
| `(15, 20]` | 55 | 说明 15 年以上确认也很常见。 |
| `(20, 25]` | 8 | 进入长尾，但仍有可见样本。 |
| `(25, 30]` | 8 | 适合结合具体案例解释“慢变量”式影响。 |
| `(30, 40]` | 6 | 极长 lag 案例，通常需要谨慎配合人工证据解释。 |

更细的 5 年组距统计显示，10–14 年附近最集中；因此报告里可以写成：**多数可见样本集中在 10–20 年之间，其中 10–15 年是最典型窗口之一。**

## 4. 代表论文候选

更多 short / typical / long lag 案例见 `docs/recognition_lag_outlier_cases.md` 和机器可读表 `docs/recognition_lag_outlier_cases.csv`；该补充文件专门服务 Issue #55 的 Time outlier 展示和报告段落。

Award lifecycle 的获奖前后引用窗口补充见 `docs/award_lifecycle_analysis.md`、`docs/award_lifecycle_prepost_metrics.csv` 和 `docs/award_lifecycle_relative_year_summary.csv`；它把 citation trajectory 对齐到 award announcement year (`t=0`)，用于说明“认可发生在引用生命周期的哪个阶段”，但不能写成奖项导致引用变化。

| 用途 | 论文 | Venue | Publication → Announcement | Lag | 推荐写法 | 注意边界 |
|---|---|---|---:|---:|---|---|
| 较短 lag 案例 | `Modeling TCP Throughput: A Simple Model and Its Empirical Validation` | SIGCOMM | 1998 → 2007 | 9 | 网络测量 / TCP throughput 模型在约十年窗口内被回看确认，可作为“较快形成稳定影响”的案例。 | 最终报告应补 award citation 或论文简介后再解释具体贡献。 |
| 典型 lag 案例 | `XORs in the air: practical wireless network coding` | SIGCOMM | 2006 → 2018 | 12 | lag 接近中位数，适合说明“典型 Test-of-Time 窗口约十多年”。 | 这里只用作时间尺度代表，不自动宣称贡献强弱。 |
| 极长 lag 案例 | `Probabilistic Models of Indexing and Searching` | SIGIR | 1980 → 2014 | 34 | 信息检索基础模型在三十多年后仍被追认，体现长期影响的长尾。 | 具体“为何经得起时间检验”需要人工阅读 award citation / 论文摘要。 |

备用极长 lag 案例：`The ALOHA system`、`Research Areas in Computer Communication`、`The Unified Probabilistic Model for IR`，lag 均为 32 年左右。

## 5. 年代差异草稿

| 发表年代组 | 样本数 | Median lag | Mean lag | 可写解释 |
|---|---:|---:|---:|---|
| 1970s–early 1980s | 19 | 19 | 21.4 | 早期论文的 lag 更长，部分原因可能是奖项制度和领域回看周期更晚形成。 |
| mid 1980s–early 1990s | 70 | 18.0 | 16.2 | 中期样本仍保留较长确认窗口。 |
| mid 1990s–2000s | 161 | 11 | 12.1 | 后期样本更接近 10–15 年窗口，也可能受到奖项规则和数据覆盖影响。 |

安全写法：当前样本提示，较早发表的论文往往有更长 recognition lag；但这不应被直接解释为早期研究“影响更慢”，因为奖项设立年份、会议规则和数据覆盖都会影响 lag。

## 6. 可直接复制到报告的段落

> Time 模块显示，Test of Time Award 更像一种延迟确认，而不是对论文发表当年热度的评价。当前 250 篇可用论文的 recognition lag 中位数约为 12 年，平均约为 14.0 年；多数样本集中在 10–20 年之间，其中 10–15 年是最典型的确认窗口之一。极端案例中，`Probabilistic Models of Indexing and Searching` 在发表 34 年后被追认，说明部分基础性贡献可能需要很长时间才会被制度化地回看和确认。需要注意的是，recognition lag 同时受会议奖项设置和数据覆盖影响，因此报告中应把它解释为“获奖确认时间间隔”，而不是论文真实影响开始或结束的时间。

## 7. 展示 punchline

**Test of Time 不是即时热度，而是延迟确认：典型窗口约十多年，少数基础性工作会进入三十年级别的长尾。**

## 8. B 模块最终人工检查

- [ ] 打开 3 篇代表论文或 award citation，确认一句话贡献描述。
- [ ] 如果使用年代差异结论，补一句“受奖项制度和覆盖时间影响”。
- [ ] 页面展示时指向 Time 模块的 lag histogram 和 publication → award timeline，而不是只读文字。
- [ ] 最终报告避免使用“证明”“导致获奖”等因果词。可用“显示”“提示”“在当前样本中呈现”。
