# 最终提交 QA 清单

负责人：A · 项目负责人 / 初版网页实现 / GitHub 协作与代码整合

## 1. GitHub 协作检查

- [x] GitHub repo 已建立。
- [x] `main` 已配置 PR-based 协作规则。
- [x] Issues #2–#7 已创建，覆盖六个成员/模块。
- [x] `docs/work_board.md` 已维护 issue 对照表。
- [x] PR 模板已添加：`.github/pull_request_template.md`。
- [ ] 队友 PR 均已 review / approve / merge。
- [ ] 每个成员的贡献记录已写入报告或展示材料。

## 2. 页面运行检查

本地运行：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

浏览器打开：

```text
http://127.0.0.1:8765/index.html
```

检查项：

- [x] `index.html` 能正常打开。
- [x] CSV 数据均使用相对路径加载。
- [x] `src/app.js` 通过语法检查。
- [x] 页面无 `Data loading failed`。
- [x] 浏览器 console 无 JavaScript error。
- [x] summary cards 正常渲染。
- [x] Time / Venue / Topic / Citation / Network 模块均有图表。
- [x] tooltip 和代表论文 detail card 正常工作。
- [ ] 最终提交前截图备份关键页面。

## 3. 内容质量检查

- [x] 页面围绕同一个核心问题展开：哪些计算机研究经得起时间检验。
- [x] 每个模块都有研究问题和 reading note。
- [x] 图表不是孤立堆叠，而是按 Time → Venue/Field → Topic → Citation/Impact → Network 组织。
- [x] 数据来源和指标局限在 README/footer 中有说明。
- [ ] 队友补充后的发现需要避免过度因果解释。
- [ ] 手工补充的工业影响/代表性判断必须有 evidence URL。

## 4. 提交前文件检查

- [ ] 无 `.DS_Store`。
- [ ] 无 `__pycache__` / 临时缓存。
- [ ] 无本地绝对路径。
- [ ] README、本地运行方式、分工表保持同步。
- [ ] `main` 是最终可提交版本。
