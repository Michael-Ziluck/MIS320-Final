/**
 * prevent browser call
 *
 * @param {any} req
 * @param {any} res
 * @param {any} proxyOptions
 * @returns
 */
const preventBrowserCalls = function (req, res, proxyOptions) {
    if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
        return '/index.html';
    }
    req.headers['X-Custom-Header'] = 'yes';
};

const PROXY_CONFIG = [
    {
        context: ['/noauth'],
        target: 'http://localhost:8080'
    }
];
module.exports = PROXY_CONFIG;
