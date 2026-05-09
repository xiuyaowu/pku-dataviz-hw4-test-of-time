# A 贡献记录：项目负责人 / 初版网页实现 / GitHub 协作与代码整合

## 贡献概述

负责项目仓库与代码整合工作：搭建 GitHub 协作仓库并配置 PR 工作流，根据研究问题创建 Issues 分工；先实现完整的 D3 网页 baseline，包括页面结构、数据加载、多个核心图表、tooltip 交互、论文详情卡和统一视觉样式；后续负责 review 队友 PR，检查代码运行、数据路径、图表解释和最终整合质量。

## 具体工作

1. **GitHub 协作与分工管理**
   - 建立小组协作仓库。
   - 设置 `main` 分支保护和 PR-based 工作流。
   - 创建 Issues #2–#7，对应六个成员的模块任务。
   - 维护 `docs/work_board.md` 分工表和 README 协作说明。

2. **初版网页和代码实现**
   - 实现 `index.html` 页面结构。
   - 实现 `src/app.js` 中的数据加载、D3 图表绘制和交互逻辑。
   - 实现 `src/styles.css` 中的整体视觉风格、卡片布局、tooltip 和响应式样式。
   - 为 Time / Venue / Topic / Citation / Network 五个研究模块均先产出可运行版本。

3. **代码审查与最终整合**
   - 后续负责 review 队友 PR。
   - 检查 JS 是否能通过 `node --check`。
   - 检查数据路径是否为相对路径。
   - 检查图表是否回答对应研究问题。
   - 负责最终运行测试和提交前 QA。

## 对应文件 / 记录

- `index.html`
- `src/app.js`
- `src/styles.css`
- `README.md`
- `docs/team_division.md`
- `docs/work_board.md`
- `docs/final_qa_checklist.md`
- `.github/pull_request_template.md`
- GitHub Issues #2–#7
- GitHub PR review / merge 记录
