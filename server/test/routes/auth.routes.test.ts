import chai from 'chai'
import chaiHttp from 'chai-http'

import server from '../../src/index'
import User from '../../src/models/user.model'

const should = chai.should()

// Use chai-http
chai.use(chaiHttp)

// Tests
describe('Auth', () => {
  beforeEach(() => {
    // Clear the database on start
    return User.deleteMany({})
  })

  /*
  * Test: POST:/auth/signup
  */
  describe('POST:/auth/signup', () => {
    it('it should register a new new users', async () => {
      const user = new User({
        username: 'test_username',
        password: 'test_password'
      })

      const res = await chai.request(server)
          .post('/auth/signup')
          .send(user)

      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.success.should.be.equal(true)
    })
  })

  /*
  * Test: POST:/auth/login
  */
  describe('POST:/auth/login', () => {
    it('it should login with the registred user', async () => {
      // Add user to database
      const newUser = new User({
        username: 'test_username',
        password: 'test_password',
        likedBy: []
      })

      await newUser.save()

      // Login with as the user.
      const user = {
        username: 'test_username',
        password: 'test_password'
      }

      // Execute request.
      const res = await chai.request(server)
          .post('/auth/login')
          .send(user)

      // Validate response.
      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.success.should.be.equal(true)
    })
  })
})
