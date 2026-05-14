# Venue / Field imbalance caveats packet

Purpose: give C a compact, report-ready explanation for why venue and field counts are imbalanced, and how to describe that imbalance without turning it into a venue ranking. This closes the narrow stretch task #57 while leaving the broader C owner issue #4 open for final human case checks.

## Verified dataset anchors

- Current frontend dataset: **250** Test-of-Time papers from `data/papers_enriched.csv`.
- Venue table: **27** venues in `data/venue_stats.csv`.
- Venue-area table: **16** areas in `data/venue_area_stats.csv`.
- Top 3 venues contribute **97/250 papers (38.8%)**; top 6 venues contribute **165/250 papers (66.0%)**.
- Top 5 venue areas contribute **170/250 papers (68.0%)**.

## Top venue distribution

| Rank | Venue | Area | Papers | Year span | Award span | Avg lag | Safe reading |
|---:|---|---|---:|---|---|---:|---|
| 1 | SIGIR | IR | 35 | 1980-2006 | 2014-2018 | 19.8 | High visibility in this award seed; not a quality rank. |
| 2 | SIGCOMM | Networking | 33 | 1974-2008 | 2006-2018 | 15.2 | High visibility in this award seed; not a quality rank. |
| 3 | ICSE | Software Engineering | 29 | 1976-2006 | 1989-2016 | 10.7 | High visibility in this award seed; not a quality rank. |
| 4 | ICCV | CV | 24 | 1987-2005 | 2007-2017 | 16.2 | High visibility in this award seed; not a quality rank. |
| 5 | SIGMOD | Database | 24 | 1976-1996 | 2006-2014 | 10.2 | High visibility in this award seed; not a quality rank. |
| 6 | VLDB | Database | 20 | 1975-1998 | 2005-2008 | 10.0 | High visibility in this award seed; not a quality rank. |
| 7 | KDD | DM/Web | 13 | 1996-2004 | 2014-2015 | 15.2 | High visibility in this award seed; not a quality rank. |
| 8 | SIGGRAPH | Graphics | 12 | 1985-2001 | 2013-2018 | 19.4 | High visibility in this award seed; not a quality rank. |

## Top venue-area distribution

| Rank | Area | Papers | Share | Avg lag | Avg citation | Avg breadth | Caveat |
|---:|---|---:|---:|---:|---:|---:|---|
| 1 | Database | 44 | 17.6% | 10.1 | 1441.3 | 56.6 | Area labels are grouping aids, not complete field coverage. |
| 2 | Networking | 38 | 15.2% | 14.6 | 1276.3 | 54.0 | Area labels are grouping aids, not complete field coverage. |
| 3 | IR | 35 | 14.0% | 19.8 | 951.1 | 53.6 | Area labels are grouping aids, not complete field coverage. |
| 4 | Software Engineering | 29 | 11.6% | 10.7 | 333.0 | 57.0 | Area labels are grouping aids, not complete field coverage. |
| 5 | CV | 24 | 9.6% | 16.2 | 3314.9 | 62.4 | Area labels are grouping aids, not complete field coverage. |
| 6 | AI | 19 | 7.6% | 18.6 | 585.1 | 55.6 | Area labels are grouping aids, not complete field coverage. |
| 7 | DM/Web | 13 | 5.2% | 15.2 | 2860.5 | 62.2 | Area labels are grouping aids, not complete field coverage. |
| 8 | Graphics | 12 | 4.8% | 19.4 | 2745.4 | 54.7 | Area labels are grouping aids, not complete field coverage. |

## Three safe explanation bullets

1. **Award availability and history:** a venue can only appear frequently if it has a retrospective award, a long enough publication history, and public records that can be collected. High count therefore means high award-record visibility in this seed.
2. **Community archival style:** database, networking, IR, software engineering, and vision communities often maintain stable conference identities and retrievable proceedings, which makes long-term-impact records easier to trace.
3. **Sampling and source bias:** the seed comes from a curated public Test-of-Time list, then is enriched with OpenAlex metadata. Missing awards, renamed venues, incomplete source pages, or imperfect venue-area grouping can shift the apparent distribution.

## What not to infer

- Do **not** write that SIGIR/SIGCOMM/ICSE are objectively the “best” venues because they have the largest counts here.
- Do **not** infer that low-count or absent fields lack long-term-impact work; they may lack comparable awards or be underrepresented in this source.
- Do **not** interpret recognition lag as the actual time when impact happened. It is only `announcement_year - publication_year`.
- Do **not** compare raw citation means across fields as a value ranking; citation habits and field sizes differ.

## Copy-ready report paragraph

> Venue and field 分布应被解释为当前 Test of Time Award 数据中的“可见记录密度”，而不是会议或领域质量排名。当前 250 篇论文覆盖 27 个 venue，其中 SIGIR、SIGCOMM、ICSE 三个 venue 合计 97 篇，Top 6 venue 合计 165 篇；按领域聚合后，Database、Networking、IR、Software Engineering 和 CV 占据主要入口。这种集中度首先反映了各社区是否设有 retrospective award、奖项历史是否足够长、公开记录是否完整，以及论文元数据是否容易追溯。报告中更稳妥的写法是：这些 venue / field 在当前公开奖项 seed 中具有更高可见度，并为观察长期影响提供了可解释入口；但不能据此推出其他领域缺少长期影响论文，也不能把数量差异直接解释为学科价值差异。

## C-owner final checks

- [ ] 最终报告只使用“可见分布 / award-record visibility / current seed”一类表述。
- [ ] 若引用 2–3 个 venue-year 案例，先核对 `docs/venue_year_case_studies.md` 中对应论文页面或 award citation。
- [ ] PPT 展示 Top venue/field 图时，口头补一句“这不是会议排名”。
- [ ] 与 Topic 模块联动时，说明 `venue_area` 是会议分组，不等于论文的细粒度研究主题。
