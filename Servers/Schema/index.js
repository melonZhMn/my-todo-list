/*
 * @Author: melon
 * @Date: 2020-08-05 17:44:10
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-06 14:19:47
 */
const { gql } = require('apollo-server')

const typeDefs = gql`
  type Task {
    id: Int
    name: String
    completed: Int!
    sequence: Int
  }

  type Query {
    tasks(completed: Int!): [Task]
    task(id: Int!): Task
  }

  type Mutation {
    createTask(name: String!): Task!
    updateTask(id: Int!, name: String, completed: Int): Task!
    updateSequence(id: Int!, prevId: Int, nextId: Int): Task!
    deleteTask(id: Int!): Task
  }
`
module.exports = typeDefs
