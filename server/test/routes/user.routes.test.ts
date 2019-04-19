import chai from 'chai'
import chaiHttp from 'chai-http'

import server from '../../src/index'
import User from '../../src/models/user.model'

const should = chai.should()

// Use chai-http
chai.use(chaiHttp)

// Tests
describe('User', () => {
  beforeEach(() => {
    // Clear the database on start
    return User.deleteMany({})
  })

  /*
  * Test: GET:/user/:id
  */
  describe('GET:/user/:id', () => {
    it('it should get details of an user', async () => {
      // Add user to database
      const user = new User({
        username: 'test_username',
        password: 'test_password',
        likedBy: []
      })
      const addedUser = await user.save()

      // Make the request.
      const res = await chai.request(server)
          .get('/user/' + addedUser._id)
          .send()

      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.username.should.be.equal('test_username')
      res.body.numberOfLikes.should.be.equal(0)
    })
  })

  /*
  * Test: GET:/user/:id/like
  */
  describe('GET:/user/:id/like', () => {
    it('it should like an user', async () => {
      // Add users to database
      const user = new User({
        username: 'test_username',
        password: 'test_password',
        likedBy: []
      })
      await user.save()

      const otherUser = new User({
        username: 'test_username_2',
        password: 'test_password',
        likedBy: []
      })
      const addedOtherUser = await otherUser.save()

      // Login to get the token.
      const loginRes = await chai.request(server)
          .post('/auth/login')
          .send({
            username: 'test_username',
            password: 'test_password'
          })

      // Make the request with the token.
      const res = await chai.request(server)
          .put(`/user/${addedOtherUser._id}/like`)
          .set('Authorization', `Bearer ${loginRes.body.token}`)
          .send()

      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.success.should.be.equal(true)
    })
  })

  /*
  * Test: GET:/user/:id/unlike
  */
  describe('GET:/user/:id/unlike', () => {
    it('it should unlike an user', async () => {
      // Add users to database
      const user = new User({
        username: 'test_username',
        password: 'test_password',
        likedBy: []
      })
      const addedUser = await user.save()

      const otherUser = new User({
        username: 'test_username_2',
        password: 'test_password',
        likedBy: [
          addedUser._id
        ]
      })
      const addedOtherUser = await otherUser.save()

      // Login to get the token.
      const loginRes = await chai.request(server)
          .post('/auth/login')
          .send({
            username: 'test_username',
            password: 'test_password'
          })

      // Make the request with the token.
      const res = await chai.request(server)
          .put(`/user/${addedOtherUser._id}/unlike`)
          .set('Authorization', `Bearer ${loginRes.body.token}`)
          .send()

      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.success.should.be.equal(true)
    })
  })
})
