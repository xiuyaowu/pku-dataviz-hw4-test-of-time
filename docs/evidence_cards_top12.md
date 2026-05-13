# Top 12 代表论文证据卡

用途：给网页 detail card、报告案例和最终 PPT 提供可直接挑选的代表论文。本版已为 12 篇代表论文补入论文链接/DOI/公开页面、代表性理由和一句话贡献；最终报告前仍建议按 `checked` 字段做人工阅读复核。课堂展示优先级见 `docs/evidence_card_presentation_matrix.md`，其中已把 8 张展示优先卡和 4 张需复核备选卡分开。

## 覆盖情况

- 代表论文数量：12 篇。
- 已补 evidence URL 的论文：12 篇。
- 证据层级：`evidence_url_1` 优先作为论文 DOI/ACM/IEEE/正式页面；`evidence_url_2` 作为 PDF、出版商页面或辅助核查页面。
- 写作边界：这些卡片可以支撑“为什么选这篇作为案例”，但工业影响和获奖原因不能只凭 citation/breadth 推断。

## 1. Highest citation depth

**Paper**: A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise

**Year / Venue**: 1996 / KDD

**Topic / Area**: Data Mining / Clustering / DM/Web

**Metrics**: citation count ≈ 19133; recognition lag ≈ 18 years; breadth proxy ≈ 81.12

**Evidence 1**: https://dl.acm.org/doi/10.5555/3001460.3001507

**Evidence 2**: https://www.dbs.ifi.lmu.de/Publikationen/Papers/KDD-96.final.frame.pdf

**一句话贡献**：提出 DBSCAN 密度聚类方法，用密度可达和噪声点处理支持任意形状簇发现。

**代表性理由**：在高引用深度、较高 breadth proxy 和 KDD Test of Time 记录中同时突出，适合说明算法范式如何长期复用。

**复核状态**：partial-source-added

## 2. Highest citation depth

**Paper**: Snakes: Active Contour Models

**Year / Venue**: 1987 / ICCV

**Topic / Area**: Computer Vision / Segmentation / CV

**Metrics**: citation count ≈ 17009; recognition lag ≈ 26 years; breadth proxy ≈ 68.5

**Evidence 1**: https://doi.org/10.1007/BF00133570

**Evidence 2**: https://link.springer.com/article/10.1007/BF00133570

**一句话贡献**：提出 active contour（snakes）模型，把图像边界检测表述为能量最小化轮廓演化问题。

**代表性理由**：citation count 与 recognition lag 都很高，适合说明视觉基础模型经过长期使用后被持续确认。

**复核状态**：partial-source-added

## 3. Broadest influence proxy

**Paper**: Graphs over Time: Densification Laws, Shrinking Diameters and Possible Explanations

**Year / Venue**: 2005 / KDD

**Topic / Area**: Data Mining / Network Science / DM/Web

**Metrics**: citation count ≈ 847; recognition lag ≈ 11 years; breadth proxy ≈ 87.38

**Evidence 1**: https://doi.org/10.1145/1081870.1081893

**Evidence 2**: https://cs.stanford.edu/people/jure/pubs/powergrowth-kdd05.pdf

**一句话贡献**：总结大规模真实网络随时间演化的 densification laws 与 shrinking diameters 现象。

**代表性理由**：breadth proxy 为 Top 12 最高之一，适合说明长期影响也可体现为跨领域网络分析框架。

**复核状态**：partial-source-added

## 4. Broadest influence proxy

**Paper**: Multitasking without compromise: a virtual machine evolution

**Year / Venue**: 2001 / OOPSLA

**Topic / Area**: Programming Languages / Virtual Machines / Programming Languages

**Metrics**: citation count ≈ 2212; recognition lag ≈ 10 years; breadth proxy ≈ 86.5

**Evidence 1**: https://doi.org/10.1145/504311.504292

**Evidence 2**: https://dl.acm.org/doi/10.1145/504311.504292

**一句话贡献**：讨论虚拟机在多任务场景下的演进，强调隔离、资源管理与性能之间的折中。

**代表性理由**：在 breadth proxy 上表现突出，适合作为系统/语言方向长期影响案例，但自动匹配 DOI 曾出现误配，已标注需人工复核。

**复核状态**：doi-corrected-needs-human-final-check

## 5. Longest recognition lag

**Paper**: Probabilistic Models of Indexing and Searching

**Year / Venue**: 1980 / SIGIR

**Topic / Area**: Information Retrieval / Probabilistic Models / IR

**Metrics**: citation count ≈ 316; recognition lag ≈ 34 years; breadth proxy ≈ 58.62

**Evidence 1**: https://doi.org/10.5555/636669.636673

**Evidence 2**: https://dl.acm.org/doi/10.5555/636669.636673

**一句话贡献**：系统化讨论概率模型在 indexing 与 searching 中的作用，是早期概率 IR 传统的重要代表。

**代表性理由**：recognition lag 达 34 年，适合作为“基础思想很晚被重新确认”的长周期案例。

**复核状态**：partial-source-added

## 6. Longest recognition lag

**Paper**: Research Areas in Computer Communication

**Year / Venue**: 1974 / SIGCOMM

**Topic / Area**: Networking / Research Agenda / Networking

**Metrics**: citation count ≈ 9; recognition lag ≈ 32 years; breadth proxy ≈ 31.62

**Evidence 1**: https://doi.org/10.1145/1015660.1015661

**Evidence 2**: https://dl.acm.org/doi/10.1145/1015660.1015661

**一句话贡献**：概括计算机通信领域早期研究问题，为后续网络研究议程提供问题框架。

**代表性理由**：早期发表且 recognition lag 很长，适合说明 Test of Time 数据中存在研究议程类贡献。

**复核状态**：partial-source-added

## 7. Shortest recognition lag

**Paper**: Modeling TCP Throughput: A Simple Model and Its Empirical Validation

**Year / Venue**: 1998 / SIGCOMM

**Topic / Area**: Networking / TCP Performance Modeling / Networking

**Metrics**: citation count ≈ 36; recognition lag ≈ 9 years; breadth proxy ≈ 56.12

**Evidence 1**: https://dl.acm.org/doi/10.1145/285237.285291

**Evidence 2**: https://dl.acm.org/citation.cfm?id=897574

**一句话贡献**：给出 TCP throughput 的简洁模型并用实验验证，连接协议机制与可预测性能。

**代表性理由**：recognition lag 较短，适合对比“较快进入共同知识”的网络测量/模型类论文。

**复核状态**：partial-source-added

## 8. Topic representative · Computer Vision

**Paper**: Object Recognition from Local Scale-Invariant Features

**Year / Venue**: 1999 / ICCV

**Topic / Area**: Computer Vision / Local Features / CV

**Metrics**: citation count ≈ 16147; recognition lag ≈ 12 years; breadth proxy ≈ 65.88

**Evidence 1**: https://doi.org/10.1109/ICCV.1999.790410

**Evidence 2**: https://www.cs.ubc.ca/~lowe/papers/iccv99.pdf

**一句话贡献**：提出尺度、旋转等变化下稳定的局部特征方法，即后续广泛使用的 SIFT 思路。

**代表性理由**：高 citation count 且为视觉主题代表，适合说明方法组件如何成为领域工具链。

**复核状态**：partial-source-added

## 9. Topic representative · Database / Systems

**Paper**: Mining Association Rules Between Sets of Items in Large Databases

**Year / Venue**: 1993 / SIGMOD

**Topic / Area**: Database / Association Rules / Database

**Metrics**: citation count ≈ 14771; recognition lag ≈ 10 years; breadth proxy ≈ 66.75

**Evidence 1**: https://doi.org/10.1145/170035.170072

**Evidence 2**: https://dl.acm.org/doi/10.1145/170035.170072

**一句话贡献**：提出大规模交易数据库中的 association rule mining 问题和高效规则生成思路。

**代表性理由**：数据库方向高引用代表，适合说明从具体数据挖掘任务到通用分析范式的扩散。

**复核状态**：partial-source-added

## 10. Topic representative · Human-Computer Interaction

**Paper**: Ad-hoc On-Demand Distance Vector Routing

**Year / Venue**: 1999 / WMCSA

**Topic / Area**: Networking / Mobile Ad Hoc Routing / CS

**Metrics**: citation count ≈ 10309; recognition lag ≈ 19 years; breadth proxy ≈ 44.25

**Evidence 1**: https://doi.org/10.1109/MCSA.1999.749281

**Evidence 2**: https://ieeexplore.ieee.org/document/749281

**一句话贡献**：提出 AODV 按需路由协议，用于无基础设施移动自组织网络中的路径发现与维护。

**代表性理由**：citation count 很高且来自移动网络方向，适合说明网络协议类论文的长期复用。

**复核状态**：partial-source-added

## 11. Topic representative · Data Mining / Web

**Paper**: Fast Algorithms for Mining Association Rules in Large Databases

**Year / Venue**: 1994 / VLDB

**Topic / Area**: Data Mining / Association Rules / Database

**Metrics**: citation count ≈ 9384; recognition lag ≈ 10 years; breadth proxy ≈ 58.88

**Evidence 1**: https://dl.acm.org/doi/10.5555/645920.672836

**Evidence 2**: https://www.vldb.org/conf/1994/P487.PDF

**一句话贡献**：提出 Apriori 等快速 association rule mining 算法，推动大规模频繁项集挖掘。

**代表性理由**：高 citation count 且与 SIGMOD 1993 案例形成连续技术线索，适合讲数据挖掘方法成熟。

**复核状态**：partial-source-added

## 12. Topic representative · Machine Learning Theory

**Paper**: Network Information Flow

**Year / Venue**: 2000 / IEEE Transactions on Information Theory

**Topic / Area**: Information Theory / Network Coding / CS

**Metrics**: citation count ≈ 7857; recognition lag ≈ 18 years; breadth proxy ≈ 66.38

**Evidence 1**: https://doi.org/10.1109/18.850663

**Evidence 2**: https://ieeexplore.ieee.org/document/850663

**一句话贡献**：提出 network information flow / network coding 框架，说明网络中间节点编码可提升多播传输能力。

**代表性理由**：citation、breadth 与 recognition lag 都较高，适合作为理论思想跨网络与信息论扩散的案例。

**复核状态**：partial-source-added
