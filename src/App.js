/*
 * @Author: melon
 * @Date: 2020-08-05 00:47:47
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-05 22:18:13
 */
import React from 'react'

import './App.css'

// 引入 TodoList
import TodoList from './containers/TodoList'

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  )
}

export default App
