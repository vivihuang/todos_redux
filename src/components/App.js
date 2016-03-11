import React from 'react'
import AddTodo from '../containers/AddTodo'
import TodoList from '../containers/TodoList'

let App = () => {
  return (
    <div>
      <AddTodo />
      <TodoList />
    </div>
  )
}

export default App