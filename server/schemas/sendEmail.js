const { gql } = require('apollo-server')
const NodeMailer = require('../helpers/nodeMailer')

const typeDefs = gql`
  type Email {
    from: String
    toReceiver: String
    subjectEmail: String
    message: String
  }

  input mailInfo {
    toReceiver: String!
    subjectEmail: String!
    message: String!
  }

  extend type Mutation {
    mail(payload: mailInfo): Email
  }
`

const resolvers = {
  Mutation: {
    mail: async (_, args) => {
      try {
        const { payload } = args
        await NodeMailer(payload)
        return { message: "Successfull" }
      } catch (error) {
        return error
      }
    }
  } 
}

module.exports = { typeDefs, resolvers }