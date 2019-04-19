import chai from 'chai'
import chaiHttp from 'chai-http'

import server from '../../src/index'
import User from '../../src/models/user.model'

const should = chai.should()

// Use chai-http
chai.use(chaiHttp)

// Tests
describe('Me', () => {
  beforeEach(() => {
    // Clear the database on start
    return User.deleteMany({})
  })

  /*
  * Test: PATCH:/me/update-password
  */
  describe('PATCH:/me/update-password', () => {
    it('it should update the password for the logged in user', async () => {
      // Add user to database
      const user = new User({
        username: 'test_username',
        password: 'test_password',
        likedBy: []
      })
      await user.save()

      // Login to get the token.
      const loginRes = await chai.request(server)
          .post('/auth/login')
          .send({
            username: 'test_username',
            password: 'test_password'
          })

      // Make the request with the token.
      const passwords = {
        currentPassword: 'test_password',
        newPassword: 'test_password_new'
      }

      const res = await chai.request(server)
          .patch('/me/update-password')
          .set('Authorization', `Bearer ${loginRes.body.token}`)
          .send(passwords)

      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.success.should.be.equal(true)
    })
  })

  /*
  * Test: GET:/me
  */
  describe('GET:/me', async () => {
    it('it should fetch details about the logged in user', async () => {
      // Add users to database
      const otherUser1 = new User({
        username: 'test_username_2',
        password: 'test_password',
        likedBy: []
      })

      const otherUser2 = new User({
        username: 'test_username_3',
        password: 'test_password',
        likedBy: []
      })

      const user1 = await otherUser1.save()
      const user2 = await otherUser2.save()

      const newUser = new User({
        username: 'test_username',
        password: 'test_password',
        likedBy: [
          user1._id,
          user2._id
        ]
      })
      const userMe = await newUser.save()

      // Get user details
      const user = new User({
        username: 'test_username',
        password: 'test_password'
      })

      // Login to get the token.
      const loginRes = await chai.request(server)
          .post('/auth/login')
          .send(user)

      // Make the request with the token.
      const res = await chai.request(server)
          .get('/me')
          .set('Authorization', `Bearer ${loginRes.body.token}`)
          .send(user)

      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.numberOfLikes.should.be.equal(2)
    })
  })
})
