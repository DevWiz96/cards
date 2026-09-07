const request = require('supertest')
const app = require('./app')

// An "integration test": spins up the real Express app in-memory (no DB, no listening port)
// and checks that routing + authMiddleware work together as expected.
test('/auth/me without a token returns 401', async () => {
  const res = await request(app).get('/v1/auth/me')

  expect(res.statusCode).toBe(401)
  expect(res.body.error).toBe('No token was available')
})
