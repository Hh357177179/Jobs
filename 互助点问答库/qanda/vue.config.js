module.exports = {
    devServer: {
        // port: 8080,
        proxy: {
            '/api': {
                target: 'http://huzhudian.zhaodaka.net',  // target host
                ws: true,  // proxy websockets 
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': '/api'  // rewrite path
                }
            },
        }
    }
};