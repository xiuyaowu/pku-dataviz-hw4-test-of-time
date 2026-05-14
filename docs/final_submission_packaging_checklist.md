# 最终提交打包检查清单

用途：把当前 GitHub 协作仓库整理成可以交作业/课堂展示的最终材料时，逐项确认页面、数据、文档和压缩包没有遗漏。这个清单不替代老师的提交要求；如果课程平台另有命名或文件格式要求，以课程要求为准。

## 1. 打包前先确认 main 分支状态

```bash
git checkout main
git pull origin main
git status --short
```

期望结果：`git status --short` 没有未提交修改。若还有队友 PR 未合并，先不要把当前版本当作最终提交版。

## 2. 页面和截图确认

```bash
node --check src/app.js
python3 -m http.server 8765 --bind 127.0.0.1
```

打开：

```text
http://127.0.0.1:8765/index.html?present=1
```

检查：

- Opening summary cards 正常显示。
- Time / Venue / Topic / Citation / Explorer / Benchmark / Network 模块都能滚动到并正常渲染。
- 搜索、排序、field filter、paper detail、Benchmark Lab 选择逻辑可用。
- `docs/demo/*.png` 中的截图与当前页面大体一致；如果页面有明显视觉变化，先按 presentation mode 重新截图。

## 3. 数据与证据材料确认

最低应保留的核心数据：

- `data/papers_enriched.csv`
- `data/award_timeline.csv`
- `data/recognition_lag_distribution.csv`
- `data/venue_stats.csv`
- `data/venue_area_stats.csv`
- `data/topic_stats.csv`
- `data/topic_year_stats.csv`
- `data/citation_trajectories.csv`
- `data/citing_breadth_metrics.csv`
- `data/institution_stats.csv`
- `data/country_stats.csv`

人工证据和展示材料：

- `manual_annotations/manual_paper_annotations_top12_evidence_ready.csv`
- `docs/evidence_cards_top12.md`
- `docs/evidence_card_presentation_matrix.md`
- `docs/methods_and_limitations.md`
- `docs/final_presentation_blueprint.md`
- `docs/report/report_skeleton.md`

最终展示前，B-F 各模块负责人需要人工打开关键 evidence URL，确认论文贡献描述和展示话术没有超过证据范围。

## 4. 压缩包建议结构

如果老师要求上传完整项目文件夹，建议压缩以下内容：

```text
pku-dataviz-hw4-test-of-time/
├── README.md
├── index.html
├── src/
├── data/
├── manual_annotations/
├── docs/
├── 小组作业说明.md
└── 小组作业说明-20260415.pdf
```

不要放入：

- `.git/`
- `.DS_Store`
- `__pycache__/`
- 临时下载文件、浏览器缓存、旧压缩包
- 本地私有备份目录

## 5. 推荐打包命令

在仓库上一级目录执行，文件名可按课程要求改成学号/姓名/小组号格式：

```bash
cd ..
zip -r pku-dataviz-hw4-test-of-time-final.zip pku-dataviz-hw4-test-of-time \
  -x '*/.git/*' '*/.DS_Store' '*/__pycache__/*' '*.zip'
```

如果本地文件夹名不是 `pku-dataviz-hw4-test-of-time`，先复制一份干净目录再打包，避免把历史备份一起压进去。

## 6. 压缩包检查命令

```bash
python3 - <<'PY'
from pathlib import Path
from zipfile import ZipFile

zip_path = Path('pku-dataviz-hw4-test-of-time-final.zip')
required_suffixes = [
    'README.md',
    'index.html',
    'src/app.js',
    'src/styles.css',
    'data/papers_enriched.csv',
    'docs/final_qa_checklist.md',
    'docs/final_submission_packaging_checklist.md',
    'docs/final_presentation_blueprint.md',
]
blocked_parts = {'.git', '__pycache__'}
blocked_names = {'.DS_Store'}

with ZipFile(zip_path) as zf:
    names = zf.namelist()
    missing = [s for s in required_suffixes if not any(n.endswith(s) for n in names)]
    blocked = [n for n in names if any(p in blocked_parts for p in Path(n).parts) or Path(n).name in blocked_names]
    print(f'archive files: {len(names)}')
    print(f'missing required: {missing}')
    print(f'blocked entries: {blocked[:20]}')
    raise SystemExit(1 if missing or blocked else 0)
PY
```

期望结果：`missing required: []` 且 `blocked entries: []`。

## 7. 在线和离线展示 fallback

- 在线展示：优先使用 README 中的 GitHub Pages 地址。
- 离线展示：本地服务器打开 `http://127.0.0.1:8765/index.html?present=1`。
- PPT 展示：按 `docs/final_presentation_blueprint.md` 的 11 页结构复制内容，并使用 `docs/demo/*.png` 作为截图 fallback。
- 如果网络或 GitHub Pages 临时不可用，不影响本地静态页面运行；确保压缩包里包含 `data/`、`src/` 和 `docs/demo/`。

## 8. 最后人工确认

- [ ] 课程平台要求的文件名/小组信息已调整。
- [ ] 最终报告中的术语与网页一致：recognition lag / citation depth / impact breadth / OpenAlex proxy。
- [ ] 代表论文的 evidence URL 已人工打开核查。
- [ ] `docs/methods_and_limitations.md` 的限制说明已压缩进报告或展示。
- [ ] 压缩包已经用上面的 Python 脚本检查过。
