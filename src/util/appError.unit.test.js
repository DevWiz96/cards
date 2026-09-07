const AppError = require('./appError')

// A "unit test": no server, no database - just call the code and check the result.
test('AppError stores message, statusCode and errorCode', () => {
  const error = new AppError('Card not found', 404, 'CARD_001')

  expect(error.message).toBe('Card not found')
  expect(error.statusCode).toBe(404)
  expect(error.errorCode).toBe('CARD_001')
})
