import chai from 'chai'
import chaiHttp from 'chai-http'

import server from '../../src/index'
import User from '../../src/models/user.model'

const should = chai.should()

// Use chai-http
chai.use(chaiHttp)

// Tests
describe('Most liked', () => {
  beforeEach(() => {
    // Clear the database on start
    return User.deleteMany({})
  })

  /*
  * Test: GET:/most-liked
  */
  describe('GET:/most-liked', () => {
    it('it should get all users sorted by most likes', async () => {
      // Add users to the database
      const user1 = new User({
        username: 'test_username_1',
        password: 'test_password',
        likedBy: []
      })
      const addedUser1 = await user1.save()

      const user2 = new User({
        username: 'test_username_2',
        password: 'test_password',
        likedBy: [
          addedUser1._id
        ]
      })
      const addedUser2 = await user2.save()

      const user3 = new User({
        username: 'test_username_3',
        password: 'test_password',
        likedBy: [
          addedUser1._id,
          addedUser2._id
        ]
      })
      await user3.save()

      // Make the request.
      const res = await chai.request(server)
          .get('/most-liked')
          .send()

      res.should.have.status(200)
      res.body.should.be.an('array')
      res.body.length.should.be.equal(3)
      res.body[0].username.should.be.equal('test_username_3')
      res.body[0].likes.should.be.equal(2)
    })
  })
})
