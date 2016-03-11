import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

let TodoList = ({ state }) => {
  let list = _.isEmpty(state) ? [] : state
  return (
    <div>
      <ul>
        {list.map((s) => { return (<li key={s.id}>{s.text}</li>) })}
      </ul>
    </div>
  )
}

let mapStateToProps = (state) => { return { state } }

TodoList = connect(mapStateToProps)(TodoList)

export default TodoList