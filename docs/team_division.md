# 小组分工

这版分工按“模块并行”设计。每个人都可以基于 `data/` 目录下的现有 CSV 文件先独立推进，最后再统一页面风格和故事线。

GitHub Issue 对照表见：`docs/work_board.md`。组长可以把对应 issue assign 给具体成员；每个成员从自己的 issue 开分支和 PR。

## A：总负责人 / 页面整合

负责内容：

- 维护项目主线和页面结构；
- 搭建网页整体框架；
- 整合各成员图表模块；
- 统一 README、报告结构和最终提交材料；
- 检查数据路径、页面运行和提交格式。

交付内容：

- 网页主框架；
- 页面导航和章节顺序；
- 报告总稿；
- 最终提交检查清单。

## B：时间线与 Recognition Lag 模块

负责内容：

- 分析发表年份、获奖年份、recognition lag；
- 统计 recognition lag 的均值、中位数和分布；
- 比较不同会议/领域的 recognition lag 差异；
- 找出间隔较短、较长的代表案例。

建议图表：

- publication year → announcement year timeline；
- recognition lag histogram；
- 发表年份 vs 获奖年份散点图。

交付内容：

- 1–2 个时间模块图表；
- 2–3 条主要发现；
- 对应网页文案。

## C：会议 / 领域分布模块

负责内容：

- 统计各 venue 的论文数量；
- 分析 venue_area 的领域分布；
- 观察不同年代中领域占比是否变化；
- 找出高频会议和代表领域。

建议图表：

- venue ranking bar chart；
- venue_area 分布图；
- venue × year heatmap。

交付内容：

- 1–2 个会议/领域模块图表；
- 2–3 条主要发现；
- 对应网页文案。

## D：主题演化与代表论文模块

负责内容：

- 检查和整理 topic_label；
- 分析主题随年份变化的趋势；
- 找出每个主题下适合展示的代表论文；
- 补充代表论文的简短说明。

建议图表：

- topic distribution；
- topic-year stacked area / river chart；
- 代表论文 detail card。

交付内容：

- 主题模块图表；
- 主题分类说明；
- 代表论文卡片内容。

## E：引用轨迹与影响深度/广度模块

负责内容：

- 分析 citation_count 和 citation trajectory；
- 比较不同论文的引用增长轨迹；
- 分析 citation count 和 recognition lag 的关系；
- 使用 impact_breadth_score 等字段展示影响扩散。

建议图表：

- citation trajectory line chart；
- citation count ranking；
- citation count vs recognition lag scatter；
- impact depth vs impact breadth scatter。

交付内容：

- 引用与影响模块图表；
- 2–3 条主要发现；
- 对应网页文案。

## F：作者机构网络 / 视觉统一 / 展示材料

负责内容：

- 分析作者、机构、国家/地区分布；
- 做机构排名、国家/地区分布或合作网络；
- 统一网页视觉风格，包括颜色、字体、卡片、tooltip、图例；
- 准备最终展示材料和讲解顺序。

建议图表：

- institution ranking；
- institution collaboration network；
- country/region ranking；
- 高频作者/机构卡片。

交付内容：

- 作者机构网络模块图表；
- 视觉规范；
- 展示材料和讲解路线。

## 每个人提交 PR 时需要说明

```markdown
## 做了什么
- 

## 使用的数据
- 

## 主要发现
- 

## 需要其他人注意的地方
- 
```
