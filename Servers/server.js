/*
 * @Author: melon
 * @Date: 2020-08-05 15:18:07
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-05 18:46:39
 */

const { ApolloServer, gql } = require('apollo-server')

const typeDefs = require('./Schema/index.js')
const resolvers = require('./Resolvers/index.js')

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
