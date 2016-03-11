import React from 'react'
import { connect } from 'react-redux'

let input

let AddTodo = ({ dispatch }) => {
  return (
    <div>
      <form onSubmit={(event) => {
        event.preventDefault()
        let action = {
          type: 'ADD_TODO',
          text: input.value
        }
        dispatch(action)
        input.value = ''
      }} >
        <input type='text' ref={(node) => { input = node }} />
        <button type='submit'>Add todo</button>
      </form>
    </div>
  )
}

AddTodo = connect()(AddTodo)

export default AddTodo