# 项目方案

## 题目

**哪些计算机研究经得起时间检验？——基于 Test of Time Award 数据的论文长期影响力可视化分析**

英文副标题：

**What Research Stands the Test of Time? Visualizing Long-Term Impact in Computer Science**

## 核心问题

每年都有大量计算机论文发表，但只有一部分研究会在多年后仍被领域共同体认为重要。本项目希望通过可视化回答：

> 经得起时间检验的计算机研究，通常在时间、领域、主题、引用和合作网络上呈现出什么特征？

## 数据范围

数据集包含约 250 篇 Test of Time Award 论文，覆盖多个计算机领域会议和组织。当前仓库提供了可直接用于分析和前端展示的 CSV 文件，主要包括：

- 论文基础信息；
- 发表年份与获奖年份；
- recognition lag；
- 会议与领域分类；
- 主题分类；
- 引用量与逐年引用轨迹；
- 影响扩散近似指标；
- 作者、机构、国家/地区统计。

## 研究问题

### RQ1：时间检验奖通常在论文发表多少年后颁发？

重点字段：

- `year`
- `announcement_year`
- `recognition_lag`

建议图表：

- 发表年份 → 获奖年份 timeline；
- recognition lag 分布；
- 发表年份 vs 获奖年份散点图。

### RQ2：哪些会议和领域更容易产生长期影响论文？

重点字段：

- `venue`
- `venue_area`
- `paper_count`
- `avg_recognition_lag`

建议图表：

- 会议论文数量排名；
- 领域分布；
- 会议 × 年份热力图。

### RQ3：长期影响论文集中在哪些主题？主题是否随时间变化？

重点字段：

- `topic_label`
- `publication_year`
- `paper_count`
- `proportion`

建议图表：

- 主题分布图；
- 主题随年份变化的堆叠面积图；
- 会议 × 主题热力图；
- 代表论文详情卡。

### RQ4：高引用是否等于经得起时间检验？

重点字段：

- `citation_count`
- `citation_year`
- `yearly_citations`
- `cumulative_citations`
- `recognition_lag`

建议图表：

- 引用量排名；
- 逐年引用轨迹；
- 引用量 vs recognition lag 散点图；
- 发表后不同阶段的引用增长对比。

### RQ5：长期影响如何扩散？

重点字段：

- `impact_breadth_score`
- `citing_field_count`
- `citing_venue_count`
- `citing_institution_count`
- `citing_country_count`

建议图表：

- 影响深度/广度二维散点图；
- 高频机构排名；
- 国家/地区分布；
- 机构合作网络。

## 页面结构建议

1. **Opening**：项目引入、数据规模、年份跨度、核心问题；
2. **Time**：发表年份、获奖年份、recognition lag；
3. **Venue & Field**：会议和领域分布；
4. **Topic Evolution**：主题分布和主题演化；
5. **Citation & Recognition**：引用轨迹和获奖时间关系；
6. **Impact Network**：作者、机构、国家/地区和影响扩散；
7. **Conclusion**：总结长期影响论文的共同特征和数据局限。

## 展示原则

- 每个图表都要回答一个明确问题；
- 图表旁边要有一句 reading note，说明当前图表应该怎么看；
- tooltip 中尽量包含论文标题、年份、会议、引用量、recognition lag 等关键信息；
- 重点论文可以做 detail card；
- 数据来源、指标含义和局限要写清楚。
