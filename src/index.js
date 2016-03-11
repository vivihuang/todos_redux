import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import todos from './reducers/todos'

const store = createStore(todos)
let input

const render = () => {
  ReactDom.render(
    <div>
      <div>
        <form onSubmit={(event) => {
          event.preventDefault()
          let action = {
            type: 'ADD_TODO',
            text: input.value
          }
          store.dispatch(action)
          input.value = ''
        }} >
          <input type='text' ref={(node) => { input = node }} />
          <button type='submit'>Add todo</button>
        </form>
      </div>
      <div>
        <ul>
          {store.getState().map((s) => {
            return (<li key={s.id}>{s.text}</li>)
          })}
        </ul>
      </div>
    </div>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
