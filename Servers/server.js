/*
 * @Author: melon
 * @Date: 2020-08-05 15:18:07
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-06 12:58:52
 */

const { ApolloServer, gql } = require('apollo-server')

const typeDefs = require('./schema/index.js')
const resolvers = require('./resolvers/index.js')

const Database = require('./db/tasks')

const knexConfig = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'apollo-server-dev',
  },
  debug: true,
}

const db = new Database(knexConfig)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ db }),
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
