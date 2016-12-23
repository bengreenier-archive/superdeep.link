const finalhandler = require('finalhandler')
const http         = require('http')
const url          = require('url')
const Router       = require('router')
const ss           = require('serve-static')
 
const router = Router()
router.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'nodejs')
    next()
})
router.use(ss('public'))
router.get('/*', (req, res) => {
    // the first char is stripped, as it is a /
    let uri = req.url.substr(1)
    let parsedUri = url.parse(uri)

    if (!parsedUri.protocol) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        return res.end(JSON.stringify({
            error: 'no protocol found'
        }))
    }

    if (parsedUri.protocol == 'http:' || parsedUri.protocol == 'https:') {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        return res.end(JSON.stringify({
            error: 'http(s) protocols are not supported'
        }))
    }

    res.statusCode = 301
    res.setHeader('Location', uri)
    res.end()
})

module.exports = http.createServer((req, res) => {
    router(req, res, finalhandler(req, res))
})