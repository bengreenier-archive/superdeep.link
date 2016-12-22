const finalhandler = require('finalhandler')
const http         = require('http')
const Router       = require('router')
const ss           = require('serve-static')
 
const router = Router()

router.use(ss('public'))
router.get('/*', (req, res) => {
    // the first char is stripped, as it is a /
    let url = req.url.substr(1)

    if (url.startsWith('http') || url.startsWith('https')) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        return res.end(JSON.stringify({
            error: 'http(s) protocols are not supported'
        }))
    }

    res.statusCode = 301
    res.setHeader('Location', url)
    res.end()
})

module.exports = http.createServer((req, res) => {
    router(req, res, finalhandler(req, res))
})