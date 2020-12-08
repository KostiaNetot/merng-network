const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

module.exports = {
  Mutation: {
    async register(_, { 
      registerInput: { username, email, password, confirmPassword }
     }, context, info){
      // Validate user data
      // Make sure use doesnt already exist
      // Hash password and create auth token
      password = await
    }
  }    
}