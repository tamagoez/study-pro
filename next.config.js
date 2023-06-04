const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // 開発環境での設定
  devIndicators: {
    autoPrerender: false, // プリレンダリングの自動化を無効にする
  },
  minify: false, // minify（圧縮）を無効にする
});
