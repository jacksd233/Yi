# GitHub Pages 发布说明

这个目录是独立的静态站点发布包，不影响项目原有文件。

## 目录内容

- `index.html`
- `styles.css`
- `app.js`
- `hexagram-originals.js`
- `.nojekyll`

## 发布方式 A（推荐，最简单）

1. 在 GitHub 仓库新建分支：`gh-pages`。
2. 把本目录所有文件上传到 `gh-pages` 分支根目录。
3. 进入 GitHub 仓库 `Settings -> Pages`。
4. `Build and deployment` 选择：
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `/ (root)`
5. 保存后等待 1~3 分钟，访问：
   - `https://<你的用户名>.github.io/<仓库名>/`

## 发布方式 B（main 分支 docs 目录）

1. 把本目录整体复制为仓库下 `docs/` 内容。
2. `Settings -> Pages` 选择：
   - Branch: `main` / `/docs`
3. 等待发布完成后访问同上。

## 注意

- 如果 CSS/JS 没加载，先强刷浏览器缓存（Ctrl+F5）。
- 仓库名如果不是 `username.github.io`，访问路径会带仓库名。
