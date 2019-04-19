import chai, { should } from 'chai'
import chaiHttp from 'chai-http'
import server from '../../src/index'

// Use chai-http
chai.use(chaiHttp)

// Tests
describe('Ping', () => {
  /*
  * Test: GET:/ping
  */
  describe('GET:/ping', () => {
    it('it should GET pong', (done) => {
      chai.request(server)
          .get('/ping')
          .end((_err, res) => {
            res.should.have.status(200)
            res.body.should.be.an('object')
            res.body.pong.should.be.equal(true)
            done()
          })
    })
  })
})
