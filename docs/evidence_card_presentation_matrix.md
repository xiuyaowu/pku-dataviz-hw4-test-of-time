# 代表论文证据卡展示选用矩阵

用途：把 `docs/evidence_cards_top12.md` 中的 12 张代表论文卡拆成“可直接上报告/PPT”和“只作备选或需人工复核”两类，方便 D/E/F 模块在报告和展示中复用同一组案例。

## 选用原则

- 优先使用至少有一个稳定论文页、DOI、PDF 或出版商页面可核对的卡片。
- 只把 `citation count`、`recognition lag`、`impact breadth proxy` 写成数据集中的观察，不把它们直接写成官方获奖理由。
- 工业影响、基础性地位、具体应用范围需要额外证据；没有补证据时使用“适合作为……案例”这类谨慎表述。
- 课堂展示建议选 5–8 张即可，不必 12 张全讲。

## 推荐的 8 张展示卡

| 优先级 | 论文 | 建议使用模块 | 可讲的核心点 | 证据状态 | 展示用语边界 |
|---:|---|---|---|---|---|
| 1 | DBSCAN, KDD 1996 | Topic / Citation | 高引用深度 + 算法范式复用 | presentation-ready-cautious | 可讲“密度聚类方法长期被引用和复用”，不要扩展到具体工业场景，除非另补应用证据。 |
| 2 | Snakes, ICCV 1987 | Topic / Time | 高引用 + 长 recognition lag 的视觉基础模型案例 | presentation-ready-cautious | 可讲“视觉分割/轮廓建模基础案例”，具体应用范围需引用综述或教材再展开。 |
| 3 | Graphs over Time, KDD 2005 | Citation / Network | 高 breadth proxy，体现跨领域网络分析影响 | presentation-ready-cautious | 明确 breadth 是 OpenAlex 抽样 proxy，不是完整引用网络。 |
| 4 | SIFT local features, ICCV 1999 | Topic / Citation | 高引用视觉方法组件案例 | presentation-ready-cautious | 可讲“局部特征方法长期复用”，工业应用需另补证据。 |
| 5 | Association Rules, SIGMOD 1993 | Venue / Topic | 数据库与数据挖掘问题定义案例 | presentation-ready-cautious | 可和 VLDB 1994 成对展示“问题定义 → 算法优化”。 |
| 6 | AODV, WMCSA 1999 | Citation / Network | 网络协议类论文长期复用案例 | presentation-ready-cautious | 自动 topic 曾偏到 HCI，展示时使用人工修正标签 Networking。 |
| 7 | Fast Association Rules, VLDB 1994 | Topic / Citation | Apriori / 频繁项集算法成熟案例 | presentation-ready-cautious | 和 SIGMOD 1993 对照，不把两篇混成同一贡献。 |
| 8 | Network Information Flow, IEEE TIT 2000 | Citation / Network | 理论框架跨信息论与网络扩散案例 | presentation-ready-cautious | 可讲网络编码框架，获奖来源仍以 seed 字段和原始来源表为准。 |

## 4 张备选或需人工复核卡

| 论文 | 当前用途 | 为什么暂不作为主展示卡 | 下一步人工核查 |
|---|---|---|---|
| Multitasking without compromise, OOPSLA 2001 | Systems / PL 备选 | 之前自动匹配曾出现 DOI 风险；虽然已修正链接，但贡献表述仍适合人工读 ACM 页面后再定稿。 | 打开 ACM/OOPSLA 页面，核对标题、作者、摘要和 award citation。 |
| Probabilistic Models of Indexing and Searching, SIGIR 1980 | Long-lag 备选 | 当前 DOI/ACM 链接需要人工确认，自动 URL 检查不稳定。 | 从 SIGIR award 或 ACM 记录确认准确出版信息。 |
| Research Areas in Computer Communication, SIGCOMM 1974 | Research-agenda 备选 | 低 citation count，适合说明“议程类贡献”，但不适合单独支撑高影响论断。 | 补 SIGCOMM award citation 或历史说明。 |
| Modeling TCP Throughput, SIGCOMM 1998 | Short-lag 备选 | 当前链接多为 ACM 访问页，贡献表述可用但最好再找 PDF/作者页。 | 补公开 PDF 或 SIGCOMM Test of Time 页面。 |

## 推荐展示组合

- **5 张精简版**：DBSCAN、Snakes、Graphs over Time、SIFT、Network Information Flow。
- **8 张完整版**：在上面 5 张基础上加入 SIGMOD 1993、AODV、VLDB 1994。
- **报告写法**：每张卡只写一条 `数据观察 + 论文贡献 + 边界说明`，避免把证据卡写成论文综述。

## 已验证的结构性检查

- Top 12 卡片均有 `evidence_url_1` 和 `evidence_url_2` 字段。
- 推荐展示的 8 张均有可打开的 DOI、出版商页面或公开 PDF 之一作为最低证据入口。
- 仍需人工复核的内容已从主展示组中分离，避免在课堂展示中使用不稳证据。
