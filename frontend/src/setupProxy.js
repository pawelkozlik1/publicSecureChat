const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/1',
        createProxyMiddleware({
            target: 'https://backend_auth:5000',
            changeOrigin: true,
            secure: false,
        })
    );
    app.use(
        '/api/2',
        createProxyMiddleware({
            target: 'https://backend_be:5001',
            changeOrigin: true,
            secure: false,
        }),
    );
};
