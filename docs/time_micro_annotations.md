# Time module micro-annotations

Purpose: make the Time screenshot understandable even when the presenter is not explaining every mark.

## Added frontend annotations

The `Recognition Lag Distribution` chart now uses a chronological x-axis order and three embedded callouts:

| Annotation | Data anchor | What it should communicate | Safe wording |
|---|---:|---|---|
| Dense window · 5–10y | 106 papers | The largest visible cluster is early recognition after publication. | “In this dataset, many awards recognize work within roughly one decade.” |
| Median sits here · 12y | Median recognition lag = 12 years; `(10, 15]` bin has 67 papers | The typical case is not immediate, but also not multi-decade. | “Median lag is 12 years, so the award usually evaluates sustained relevance over time.” |
| Long tail · 30y+ | 6 papers in `(30, 40]`; longest lag = 34 years | A small set of papers are recognized only after very long delay. | “Long-lag cases exist, but they are a tail, not the main pattern.” |

## Screenshot / demo talking point

Use this 20-second reading route for Time-module screenshots:

> Start from the left: most papers are recognized within 5–10 years. The median sits in the 10–15 year band at about 12 years, which gives our project a concrete definition of “time-tested.” The 30+ year tail shows that some work is recognized much later, but the chart should be read as delayed recognition, not as proof that delay caused impact.

## Boundary statement

Recognition lag is `announcement_year − publication_year`. It measures award timing in the collected public dataset. It should not be described as an official causal measure of paper quality, adoption, or committee reasoning.

## Owner checklist for B

- [ ] Confirm the three labels still fit after any Time chart style changes.
- [ ] If using a PPT screenshot, crop so the three callouts are legible.
- [ ] In the report, pair the median-lag claim with the limitation sentence above.
- [ ] Human-check any paper-specific statement about the longest-lag case before naming it as a substantive example.
