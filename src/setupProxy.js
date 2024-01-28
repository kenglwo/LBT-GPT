// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api', // 这是前端发起请求时的基础路径
//     createProxyMiddleware({
//       target: 'https://hkust.azure-api.net', // 目标服务器
//       changeOrigin: true,
//       pathRewrite: {'^/api': ''}, // 重写路径：移除请求路径中的 '/api'
//     })
//   );
// };
