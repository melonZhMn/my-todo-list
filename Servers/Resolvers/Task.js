/*
 * @Author: melon
 * @Date: 2020-08-05 17:53:35
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-06 14:20:32
 */
const tasks = require('../db/tasks.js')

const TaskQuery = {
  tasks: async (parent, { completed }, { dataSources: { db } }, inf) => {
    if (completed !== undefined && completed === 1) {
      return await db.getCompletedTasks()
    }
    return await db.getUnCompletedTasks()
  },
  task: async (parent, { id }, { dataSources: { db } }, inf) => {
    return await db.getTask(id)
  },
}

const TaskQueryMutation = {
  createTask: async (parent, { name }, { dataSources: { db } }, info) => {
    const ids = await db.createTask(name)
    return await db.getTask(ids[0])
  },
  updateTask: async (
    parent,
    { id, name, completed },
    { dataSources: { db } },
    info
  ) => {
    await db.updateTask(id, name, completed)
    return db.getTask(id)
  },
  updateSequence: async (
    parent,
    { id, prevId, nextId },
    { dataSources: { db } },
    info
  ) => {
    await db.sortTask(id, prevId, nextId)
    return db.getTask(id)
  },
  deleteTask: async (parent, { id }, { dataSources: { db } }, info) => {
    await db.deleteTask(id)
  },
}

module.exports = {
  TaskQuery,
  TaskQueryMutation,
}
