import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

let TodoList = ({ state, onClickTodo }) => {
  let list = _.isEmpty(state) ? [] : state
  let textStyle = (flag) => {
    return { textDecoration: flag ? 'line-through' : 'none' }
  }
  return (
    <div>
      <ul>
        {list.map((s) => { return (
          <li key={s.id} style={textStyle(s.completed)} onClick={() => onClickTodo(s.id)}>{s.text}</li>
        )})}
      </ul>
    </div>
  )
}

let mapStateToProps = (state) => { return { state } }

let mapDispatchToProps = (dispatch) => {
  return { onClickTodo: (id) => dispatch({ type: 'TOGGLE_TODO', id })}
}

TodoList.propTypes = {
  state: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onClickTodo: PropTypes.func.isRequired
}

TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default TodoList