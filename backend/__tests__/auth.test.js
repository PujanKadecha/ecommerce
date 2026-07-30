const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Make sure your app.js exports the Express app!
const User = require('../models/user.model'); 

// Connect to a TEST database before any tests run
beforeAll(async () => {
  const testDbUrl = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/ecommerce_test';
  await mongoose.connect(testDbUrl);
});

// Clean up the database and close the connection after all tests finish
afterAll(async () => {
  await User.deleteMany({}); // Wipe the test users
  await mongoose.connection.close();
});

describe('Authentication API', () => {
  
  it('should successfully register a new user', async () => {
    // 1. Arrange: Setup the fake user data
    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@example.com',
      password: 'Password1@'
    };

    // 2. Act: Simulate a POST request to your auth route
    const response = await request(app)
      .post('/api/v1/auth/register') // Update this to match your actual register route
      .send(newUser);

    // 3. Assert: Check if the response matches what we expect
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('data');
    
    // Verify the user was actually saved to the database
    const userInDb = await User.findOne({ email: 'testuser@example.com' });
    expect(userInDb).toBeTruthy();
    expect(userInDb.firstName).toBe('Test');
  });

});