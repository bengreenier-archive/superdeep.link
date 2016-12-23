const assert = require('assert')
const request = require('supertest')

const server = require('../lib/server')

describe("server", () => {
    it("should serve a static root page", (done) => {
        request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200, done)
    })

    it("should serve a favicon", (done) => {
        request(server)
            .get('/images/favicon.png')
            .expect('Content-Type', /image\/png/)
            .expect(200, done)
    })

    it("should block http", (done) => {
        request(server)
            .get('/http://blocked.unittest')
            .expect(400)
            .expect('Content-Type', /json/)
            .expect(JSON.stringify({
                error: "http(s) protocols are not supported"
            }), done)
    })

    it("should block https", (done) => {
        request(server)
            .get('/https://blocked.unittest')
            .expect(400)
            .expect('Content-Type', /json/)
            .expect(JSON.stringify({
                error: "http(s) protocols are not supported"
            }), done)
    })

    it("should block no protocols and no matched files", (done) => {
        request(server)
            .get('/blocked.unittest')
            .expect(404)
            .expect('Content-Type', /json/)
            .expect(JSON.stringify({
                error: "no protocol found"
            }), done)
    })

    it("should allow urns", (done) => {
        request(server)
            .get('/spotify:track:5mQNY6pTeSDl2doFB7uLbE')
            .expect('Location', 'spotify:track:5mQNY6pTeSDl2doFB7uLbE')
            .expect(301, done)
    })

    it("should allow uris", (done) => {
        request(server)
            .get('/protocolhandler://testvalue?passed=true')
            .expect('Location', 'protocolhandler://testvalue?passed=true')
            .expect(301, done)
    })
})