/*
 * @Author: melon
 * @Date: 2020-08-05 17:53:44
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-05 17:55:45
 */

// task
const { TaskQuery, TaskQueryMutation } = require('./Task')

const resolvers = {
  Query: {
    ...TaskQuery,
  },
  Mutation: {
    ...TaskQueryMutation,
  },
}

module.exports = resolvers
