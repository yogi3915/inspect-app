const { gql } = require('apollo-server');
const { register, getUser, getUserByEmail } = require('../models/user');
const { compare } = require('../helpers/encrypt');
const { sign: jwtSign } = require('../helpers/jwt');
const { register: registerNotValidated } = require('../helpers/validator');

const typeDefs = gql`
  type User {
    _id: ID
    first_name: String
    last_name: String
    email: String
    nationalin: String
    birth_date: String
    gender: String
    role: String
  }
  type Token {
    token: String
    email: String
  }
  type Login {
    Login(payload: LoginUser!): Token
  }
  input LoginUser {
    email: String
    password: String
    role: String
  }
  input RegisterUser {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    nationalin: String!
    birth_date: String!
    gender: String!
    role: String!
  }
  extend type Query {
    User(id: ID!): User
  }
  extend type Mutation {
    Register(payload: RegisterUser!): User
    Login(payload: LoginUser!): Token
  }
`;

const resolvers = {
  Query: {
    User: async (_, args) => {
      try {
        const { id } = args;
        const user = await getUser(id);
        return user;
      } catch (err) {
        return err;
      }
    }
  },
  Mutation: {
    Register: async (_, args) => {
      try {
        const { payload } = args;
        const data = { ...payload, role: "User" }

        if (registerNotValidated(data)) {
          return registerNotValidated(data);
        }

        const newUser = await register(data);

        return newUser.ops[0];
      } catch (err) {
        return err;
      }
    },
    Login: async (_, args) => {
      try {
        const { payload } = args;
        if (!payload.email || !payload.password) {
          return new Error({ message: 'Wrong Email/Password' })
        } else {
          const user = await getUserByEmail(payload.email);
          if (!compare(payload.password, user.password)) {
            return new Error({ message: 'Wrong Email/Password' })
          } else {
            const token = jwtSign({
              id: user._id,
              email: user.email,
              last_name: user.last_name
            });
            return { token, email: user.email, role: user.role };
          }
        }
      } catch (err) {
        return err;
      }
    }
  }
}

module.exports = { typeDefs, resolvers }
