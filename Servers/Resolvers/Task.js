/*
 * @Author: melon
 * @Date: 2020-08-05 17:53:35
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-05 19:57:06
 */
const tasks = require('../Db/tasks.js')

const TaskQuery = {
  tasks: (parent, { completed }, context, inf) => {
    if (![null, undefined].includes(completed)) {
      return tasks
        .filter((task) => task.completed == completed)
        .sort((a, b) => a.sequence - b.sequence)
    }
    return tasks.sort((a, b) => a.sequence - b.sequence)
  },
  task: (parent, { id }, context, inf) => tasks.find((task) => task.id == id),
}

const TaskQueryMutation = {
  createTask: (parent, { name }, context, info) => {
    const id = tasks.length + 1 // 如果是数据库的话就不用管id,数据库会自己增加1
    const sequence = tasks.slice(-1)[0].sequence + 1024
    tasks.push({ id: id, name: name, completed: false, sequence: sequence })
    return tasks.slice(-1)[0]
  },
  updateTask: (parent, { id, name, completed }, context, info) => {
    let task = tasks.find((task) => task.id == id)
    if (name != undefined) task.name = name
    if (completed != undefined) task.completed = completed
    return task
  },
  updateSequence: (parent, { id, prev_id, next_id }, context, info) => {
    let task = tasks.find((task) => task.id == id)
    const prev = tasks.find((task) => task.id == prev_id)
    const next = tasks.find((task) => task.id == next_id)
    if (prev && next) {
      task.sequence = (prev.sequence + next.sequence) / 2
    } else if (prev) {
      task.sequence = prev.sequence + 1024
    } else if (next) {
      task.sequence = next.sequence - 1024
    }
    return task
  },
  deleteTask: (parent, { id }, context, info) => {
    const index = tasks.findIndex((item) => id == item.id)
    return tasks.splice(index, 1)[0]
  },
}

module.exports = {
  TaskQuery,
  TaskQueryMutation,
}
