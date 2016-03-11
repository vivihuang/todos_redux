import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

let input

let App = ({ state,onTodoClick }) => {
  let list = _.isEmpty(state) ? [] : state
  return (
    <div>
      <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          onTodoClick(input.value)
          input.value = ''
        }} >
          <input type='text' ref={(node) => { input = node }} />
          <button type='submit'>Add todo</button>
        </form>
      </div>
      <div>
        <ul>
          {list.map((s) => { return (<li key={s.id}>{s.text}</li>) })}
        </ul>
      </div>
    </div>
  )
}

let mapStateToProps = (state) => {
  return { state: state }
}

let mapDispatchToProps = (dispatch) => {
  return { onTodoClick: (text) => { dispatch({type: 'ADD_TODO', text}) }}
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App