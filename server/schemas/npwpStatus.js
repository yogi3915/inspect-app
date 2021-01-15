const { gql } = require('apollo-server')
const npwpValidator = require('../helpers/npwpValidator')

const typeDefs = gql`
  type NPWP {
    npwpIsValid: Boolean
  }

  extend type Mutation {
    npwp(number: String): NPWP
  }
`

const resolvers = {
  Mutation: {
    npwp: async (_, args) => {
      try {
        const { number } = args
        const status = await npwpValidator(number)
        return status
      } catch (error) {
        return error
      }
    }
  }
}

module.exports = { typeDefs, resolvers }