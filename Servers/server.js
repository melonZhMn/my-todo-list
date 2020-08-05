/*
 * @Author: melon
 * @Date: 2020-08-05 15:18:07
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-05 22:13:29
 */

const { ApolloServer, gql } = require('apollo-server')

const typeDefs = require('./schema/index.js')
const resolvers = require('./resolvers/index.js')

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
