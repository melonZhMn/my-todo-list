import { useQuery, gql } from '@apollo/client'

const GET_TASK_LIST = gql`
  query getTaskList($completed: Int!) {
    tasks(completed: $completed) {
      id
      name
      completed
      sequence
    }
  }
`
const GET_TASK = gql`
  query getTask($id: Int!) {
    task(id: $id) {
      id
      name
      completed
      sequence
    }
  }
`

const CREATE_TASK = gql`
  mutation createTask($name: String!) {
    createTask(name: $name) {
      id
      name
      completed
      sequence
    }
  }
`

const UPDATE_TASK = gql`
  mutation updateTask($id: Int!, $name: String, $completed: Int) {
    updateTask(id: $id, name: $name, completed: $completed) {
      id
      name
      completed
      sequence
    }
  }
`
const UPDATE_SEQUENCE = gql`
  mutation updateSequence($id: Int!, $prev_id: Int, $next_id: Int) {
    updateSequence(id: $id, prev_id: $prev_id, next_id: $next_id) {
      id
      name
      completed
      sequence
    }
  }
`
const DELETE_TASK = gql`
  mutation deleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
      name
      completed
      sequence
    }
  }
`

export {
  GET_TASK_LIST,
  GET_TASK,
  CREATE_TASK,
  UPDATE_TASK,
  UPDATE_SEQUENCE,
  DELETE_TASK,
}
