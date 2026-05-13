# QR / Online Demo Handoff

在线 demo 目标地址：

```text
https://leejamesss.github.io/pku-dataviz-hw4-test-of-time/
```

用途：最终 PPT 中可以把这个链接转成二维码，放在 title slide 或 backup slide。

## 使用方式

1. 如果 GitHub Pages 已启用，打开上面的链接检查页面。
2. 若页面首次启用后短时间 404，等待 GitHub Pages build 完成后再刷新。
3. 若线上页面数据加载失败，优先检查相对路径：`src/app.js`、`data/*.csv`、`docs/demo/*.png`。
4. PPT 里保留本地备用方案：`python3 -m http.server 8765 --bind 127.0.0.1`。

## QR code 建议

可以用任意可信二维码生成工具，把上面的 URL 转为二维码。最终 PPT 建议同时放：

- QR code；
- 短链接或 GitHub Pages URL；
- GitHub repo URL。

当前已生成二维码图片：

```text
docs/demo/online-demo-qr.png
```

## Backup

如果课堂网络不稳定，使用 `docs/demo/*.png` 作为离线展示备份。
