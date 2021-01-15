const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const cors = require('cors');
const userSchema = require('./schemas/user');
const newsSchema = require('./schemas/news');
const reportSchema = require('./schemas/report');
const credibleSchema = require('./schemas/credible');
const npwpSchema = require('./schemas/npwpStatus');
const emailSchema = require('./schemas/sendEmail')
const express = require('express');
const { graphqlHTTP } = require("express-graphql");
const { startDatabase } = require('./config/database');
const { resolvers } = userSchema;

const app = express();
const typeDefs = gql`
  type Query
  type Mutation
`;

app.use(cors())

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, userSchema.typeDefs, newsSchema.typeDefs, reportSchema.typeDefs, credibleSchema.typeDefs, npwpSchema.typeDefs, emailSchema.typeDefs],
  resolvers: [userSchema.resolvers, newsSchema.resolvers, reportSchema.resolvers, credibleSchema.resolvers, npwpSchema.resolvers, emailSchema.resolvers]
})

const server = new ApolloServer({
  schema
})

const context = async () => {
  const db = await startDatabase();
  return { db };
}


app.use('/', graphqlHTTP({schema, rootValue: resolvers, context}))

// server.listen().then(() => {
//   console.log(`
//     INSPECT Server is running!
//     Listening on port 4000
//   `);
// });

module.exports = { server, app };
