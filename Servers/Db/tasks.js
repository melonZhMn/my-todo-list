/*
 * @Author: melon
 * @Date: 2020-08-05 17:53:52
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-06 14:20:53
 */
const { SQLDataSource } = require('datasource-sql')
class Database extends SQLDataSource {
  // 获取已经完成的tasks
  async getCompletedTasks() {
    return await this.knex
      .select('*')
      .from('tasks')
      .where('completed', 1)
      .orderBy('sequence', 'asc')
  }
  // 获取完成的tasks
  async getUnCompletedTasks() {
    return await this.knex
      .select('*')
      .from('tasks')
      .where('completed', 0)
      .orderBy('sequence', 'asc')
  }
  // 根据Id 获取 task
  async getTask(id) {
    return await this.knex('tasks').select('*').where('id', id).first()
  }
  // 获取最后一条 task
  async getLastTask() {
    return await this.knex('tasks').select('*').orderBy('id', 'desc').first()
  }
  // 新建一条 task
  async createTask(name) {
    const maxSequenceTask = await this.knex('tasks')
      .select('*')
      .orderBy('sequence', 'desc')
      .first()
    const ids = await this.knex('tasks')
      .insert({
        name: name,
        sequence: maxSequenceTask.sequence + 1024,
      })
      .catch(function (error) {
        console.error(error)
      })
    return ids
  }
  // 更新一条 task
  async updateTask(id, name, completed) {
    if (name && completed) {
      await this.knex('tasks')
        .where('id', id)
        .update({ name: name, completed: completed })
    } else if (completed) {
      await this.knex('tasks').where('id', id).update({ completed: completed })
    } else if (name) {
      await this.knex('tasks').where('id', id).update({ name: name })
    }
  }
  // 排序
  async sortTask(id, prevId = undefined, nextId = undefined) {
    const prevTask = prevId ? await this.getTask(prevId) : undefined
    const nextTask = nextId ? await this.getTask(nextId) : undefined

    if (prevTask && nextTask) {
      const sequence = (prevTask.sequence + nextTask.sequence) / 2
      return await this.knex('tasks')
        .where('id', id)
        .update({ sequence: sequence })
    } else if (prevTask) {
      const sequence = prevTask.sequence + 1024
      return await this.knex('tasks')
        .where('id', id)
        .update({ sequence: sequence })
    } else if (nextTask) {
      const sequence = nextTask.sequence - 1024
      return await this.knex('tasks')
        .where('id', id)
        .update({ sequence: sequence })
    }
  }
  // 删除
  async deleteTask(id) {
    return await this.knex('tasks').where('id', id).del()
  }
}

module.exports = Database
